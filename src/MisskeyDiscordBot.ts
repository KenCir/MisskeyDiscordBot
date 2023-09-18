import { ActivityType, Client, Collection, GatewayIntentBits, TextChannel } from 'discord.js';
import { Logger, configure, getLogger, shutdown } from 'log4js';
import ReconnectingWebSocket from 'reconnecting-websocket';
import ws from 'ws';
import Command from './interfaces/Command';
import MisskeyChannelMessage from './interfaces/misskey/ws/MisskeyChannelMessage';

export default class MisskeyDiscordBot extends Client {
    /**
     * ロガー
     */
    public readonly logger!: Logger;

    /**
     * コマンドのコレクション
     */
    public readonly commands!: Collection<string, Command>;

    /**
     * WebSocket
     */
    public readonly misskeyWS!: ReconnectingWebSocket;

    private readonly notifyUsers: Array<string> = ['9j2a1wf8hw'];

    public constructor() {
        super({
            intents: [GatewayIntentBits.Guilds],
            allowedMentions: {
                parse: ['users'],
                repliedUser: false,
            },
            presence: {
                status: 'idle',
                activities: [
                    {
                        name: 'Misskey - Discord',
                        type: ActivityType.Playing,
                    },
                ],
            },
        });

        configure({
            appenders: {
                out: { type: 'stdout', layout: { type: 'coloured' } },
                app: { type: 'file', filename: 'logs/misskey-discord-bot.log', pattern: 'yyyy-MM-dd.log' },
            },
            categories: {
                default: { appenders: ['out', 'app'], level: 'all' },
            },
        });

        this.logger = getLogger('MisskeyDiscordBot');
        this.commands = new Collection();

        const wsOrigin = `${process.env
            .MISSKEY_INSTANCE_URL!.replace('http://', 'ws://')
            .replace('https://', 'wss://')}`;
        this.misskeyWS = new ReconnectingWebSocket(`${wsOrigin}streaming?i=${process.env.MISSKEY_TOKEN!}`, [], {
            minReconnectionDelay: 1, // https://github.com/pladaria/reconnecting-websocket/issues/91,
            WebSocket: ws,
        });

        this.misskeyWS.addEventListener('open', () => {
            this.logger.info('MisskeyとのWebSocket接続に成功しました');
            this.misskeyWS.send(
                JSON.stringify({
                    type: 'connect',
                    body: {
                        channel: 'localTimeline',
                        id: 'localTimeline',
                    },
                })
            );
        });
        this.misskeyWS.addEventListener('message', (event) => this.MisskeyWSMessage(event));
        this.misskeyWS.addEventListener('error', (event) => this.logger.error(event));
        this.misskeyWS.addEventListener('close', () => this.logger.info('MisskeyとのWebSocket接続が切断されました'));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private MisskeyWSMessage(event: MessageEvent<any>): void | { handleEvent: (event: MessageEvent<any>) => void } {
        if (!this.isReady()) return;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const data = JSON.parse(event.data) as MisskeyChannelMessage;

        if (data.type === 'channel') {
            if (data.body.type === 'note') {
                if (!this.notifyUsers.includes(data.body.body.userId)) return;
                void (this.channels.cache.get(process.env.NOTIFY_CHANNEL_ID!) as TextChannel).send(
                    `${data.body.body.user.name ?? data.body.body.user.username}さんの新規${
                        data.body.body.renoteId ? 'リ' : ''
                    }ノートです\n${process.env.MISSKEY_INSTANCE_URL}notes/${data.body.body.id}`
                );
            }
        }
    }

    public async shutdown(): Promise<void> {
        this.logger.info('シャットダウンしています...');
        this.misskeyWS.close();
        await this.destroy();
        shutdown();
    }
}
