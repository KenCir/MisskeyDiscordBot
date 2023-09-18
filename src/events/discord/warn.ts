import MisskeyDiscordBot from '../../MisskeyDiscordBot';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export default (client: MisskeyDiscordBot, info: string) => {
    client.logger.warn(info);
};
