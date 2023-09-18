import { ChatInputCommandInteraction, CacheType, ApplicationCommandDataResolvable } from 'discord.js';
import MisskeyDiscordBot from '../MisskeyDiscordBot';

export default abstract class Command {
    /**
     * コマンド名
     */
    public readonly name!: string;

    /**
     * コマンドの説明
     */
    public readonly description!: string;

    /**
     * コマンドカテゴリ
     */
    public readonly category!: string;

    /**
     * コマンドの使用方法
     */
    public readonly usage!: string;

    /**
     * オーナー専用コマンドかどうか
     */
    public readonly ownerOnly!: boolean;

    /**
     * このコマンドはdeferReplyを使用するかどうか
     */
    public readonly deferReply!: boolean;

    /**
     * スラッシュコマンドデータ
     */
    public readonly commandData!: ApplicationCommandDataResolvable;

    public constructor(
        name: string,
        description: string,
        category: string,
        usage: string,
        ownerOnly: boolean,
        deferReply: boolean,
        commandData: ApplicationCommandDataResolvable
    ) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.usage = usage;
        this.ownerOnly = ownerOnly;
        this.deferReply = deferReply;
        this.commandData = commandData;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function, no-empty-function
    async execute(client: MisskeyDiscordBot, interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {}
}
