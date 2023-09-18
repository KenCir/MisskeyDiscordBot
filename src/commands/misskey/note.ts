import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    CacheType,
    ActionRowBuilder,
    ModalActionRowComponentBuilder,
    TextInputBuilder,
    TextInputStyle,
    ModalBuilder,
} from 'discord.js';
import MisskeyDiscordBot from '../../MisskeyDiscordBot';
import Command from '../../interfaces/Command';

export default class MisskeyUserCommand extends Command {
    constructor() {
        super(
            'note',
            'ノートを作成します',
            'misskey',
            '/note',
            false,
            false,
            new SlashCommandBuilder().setName('note').setDescription('ノートを作成します')
        );
    }

    async execute(client: MisskeyDiscordBot, interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
        const modal = new ModalBuilder().setCustomId('create_note').setTitle('ノートを作成');
        const input = new TextInputBuilder()
            .setCustomId('note_input')
            .setLabel('ノートの内容を入力してください')
            .setStyle(TextInputStyle.Paragraph);
        modal.addComponents([new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(input)]);
        await interaction.showModal(modal);
    }
}
