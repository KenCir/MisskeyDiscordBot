import MisskeyDiscordBot from '../../MisskeyDiscordBot';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export default async (client: MisskeyDiscordBot, reason: Error, promise: Promise<any>) => {
    if (
        [
            'Collector received no interactions before ending with reason: time',
            'Collector received no interactions before ending with reason: messageDelete',
        ].includes(reason.message)
    )
        return;

    client.logger.error(reason);
};
