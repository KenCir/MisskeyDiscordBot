import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import Command from '../../interfaces/Command';
import MisskeyDiscordBot from '../../MisskeyDiscordBot';

export default class PingCommand extends Command {
    constructor() {
        super(
            'ping',
            'BotのPing値を表示します',
            'main',
            '/ping',
            false,
            true,
            new SlashCommandBuilder().setName('ping').setDescription('BotのPing値を表示します')
        );
    }

    async execute(client: MisskeyDiscordBot, interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
        await interaction.followUp(`Pong!\nWebSocketPing: ${client.ws.ping}ms`);
    }
}
