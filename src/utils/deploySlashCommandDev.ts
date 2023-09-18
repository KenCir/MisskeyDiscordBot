/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
import { config } from 'dotenv';
import { ApplicationCommandDataResolvable, REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import Command from '../interfaces/Command';
config();

void (async () => {
    const commands: Array<ApplicationCommandDataResolvable> = [];
    const commandFolders = readdirSync(join(__dirname, '../commands'));
    for (const folder of commandFolders) {
        readdirSync(join(__dirname, '../commands/', folder)).forEach((file) => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const command = require(join(__dirname, '../commands/', folder, file));
            const cmd: Command = new command.default();
            commands.push(cmd.commandData);
            console.info(`${cmd.name} command is Loading`);
        });
    }

    const rest: REST = new REST().setToken(process.env.DISCORD_TOKEN as string);
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID as string, process.env.GUILD_ID as string),
            { body: commands }
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
