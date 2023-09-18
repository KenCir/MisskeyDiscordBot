import { BaseInteraction } from 'discord.js';
import MisskeyDiscordBot from '../../MisskeyDiscordBot';
import axios from 'axios';
import { MisskeyNoteCreateResponse } from '../../interfaces/misskey/notes/create';

export default async (client: MisskeyDiscordBot, interaction: BaseInteraction) => {
    if (interaction.user.bot || !interaction.guild) return;

    if (interaction.isChatInputCommand()) {
        const cmd = client.commands.get(interaction.commandName);
        if (!cmd) return await interaction.reply('ERROR: コマンドデータが見つかりませんでした');
        if (cmd.deferReply) await interaction.deferReply();

        await cmd.execute(client, interaction);
    } else if (interaction.isModalSubmit()) {
        if (interaction.customId === 'create_note') {
            const input = interaction.fields.getTextInputValue('note_input');
            const response = await axios.post(`${process.env.MISSKEY_INSTANCE_URL}api/notes/create`, {
                text: input,
                i: process.env.MISSKEY_TOKEN,
            });
            if (response.status !== 200) {
                await interaction.followUp('ノートの作成に失敗しました');
            }

            const data = response.data as MisskeyNoteCreateResponse;
            await interaction.reply(
                `ノートを作成しました\n${process.env.MISSKEY_INSTANCE_URL}notes/${data.createdNote.id}`
            );
        }
    }
};
