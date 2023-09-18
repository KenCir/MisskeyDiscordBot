import MisskeyDiscordBot from '../../MisskeyDiscordBot';

export default (client: MisskeyDiscordBot) => {
    client.logger.info(`Logged in as ${client.user?.tag as string}`);
};
