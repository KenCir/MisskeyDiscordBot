import MisskeyDiscordBot from '../../MisskeyDiscordBot';

export default (client: MisskeyDiscordBot, error: Error) => {
    client.logger.error(error);
};
