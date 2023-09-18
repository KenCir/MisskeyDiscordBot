import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType, EmbedBuilder } from 'discord.js';
import MisskeyDiscordBot from '../../MisskeyDiscordBot';
import Command from '../../interfaces/Command';
import { MisskeyUserSearchResult } from '../../interfaces/misskey/users/search';
import MisskeyUserDetailedNotMe from '../../interfaces/misskey/users/MisskeyUserDetailedNotMe';
import MisskeyUsertMeDetailed from '../../interfaces/misskey/users/MisskeyUserMeDetailed';
import axios from 'axios';

export default class MisskeyUserCommand extends Command {
    constructor() {
        super(
            'user',
            'Misskey上のユーザーを取得します',
            'misskey',
            '/user <username>',
            false,
            true,
            new SlashCommandBuilder()
                .setName('user')
                .setDescription('Misskey上のユーザーを取得します')
                .addStringOption((option) => option.setName('username').setDescription('ユーザー名').setRequired(true))
        );
    }

    async execute(client: MisskeyDiscordBot, interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
        const username = interaction.options.getString('username', true);

        const response = await axios.post(`${process.env.MISSKEY_INSTANCE_URL}api/users/search`, {
            query: username,
            origin: 'local',
            i: process.env.MISSKEY_TOKEN,
        });
        if (response.status !== 200) {
            await interaction.followUp('ユーザーが見つかりませんでした');
        }
        const users = response.data as MisskeyUserSearchResult;

        if (Array.isArray(users)) {
            const user = users[0] as MisskeyUserDetailedNotMe | MisskeyUsertMeDetailed;
            console.log(user);
            await interaction.followUp({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(user.name ?? user.username)
                        .setURL(user.url ?? `${process.env.MISSKEY_INSTANCE_URL}@${user.username}`)
                        .setDescription(user.description ?? '自己紹介が設定されていません')
                        .addFields([
                            {
                                name: 'ユーザーID',
                                value: user.id,
                            },
                            {
                                name: '名前',
                                value: user.name ?? user.username,
                            },
                            {
                                name: 'フォロー数',
                                value: user.followingCount.toString(),
                            },
                            {
                                name: 'フォロワー数',
                                value: user.followersCount.toString(),
                            },
                            {
                                name: 'ノート数',
                                value: user.notesCount.toString(),
                            },
                            {
                                name: '言語',
                                value: user.lang ?? '言語が未設定です',
                            },
                            {
                                name: '誕生日',
                                value: user.birthday ?? '誕生日が未設定です',
                            },
                            {
                                name: '場所',
                                value: user.location ?? '場所が未設定です',
                            },
                            {
                                name: 'メモ',
                                value: user.memo ?? 'メモはありません',
                            },
                            {
                                name: 'Bot？',
                                value: user.isBot ? 'はい' : 'いいえ',
                            },
                            {
                                name: '猫？',
                                value: user.isCat ? 'はい' : 'いいえ',
                            },
                        ])
                        .setFooter({ text: `@${user.username}` })
                        .setImage(user.bannerUrl)
                        .setThumbnail(user.avatarUrl),
                ],
            });
        } else {
            await interaction.followUp('ユーザーが見つかりませんでした');
            return;
        }
    }
}
