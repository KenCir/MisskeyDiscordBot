import MisskeyDiscordBot from '../../MisskeyDiscordBot';

export default async (client: MisskeyDiscordBot, code: number) => {
    client.logger.info(`コード${code}で終了しました`);
    await client.shutdown();
};
