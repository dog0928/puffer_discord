import fs from "node:fs";
import path from "node:path";
import { REST, Routes } from "discord.js";
import type { RESTPutAPIApplicationGuildCommandsJSONBody } from "discord-api-types/v10";

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const GUILD_ID = process.env.DISCORD_GUILD_ID;

if (!TOKEN || !CLIENT_ID || !GUILD_ID) {
	throw new Error(
		"Missing env: DISCORD_BOT_TOKEN / DISCORD_CLIENT_ID / DISCORD_GUILD_ID",
	);
}

const commands: RESTPutAPIApplicationGuildCommandsJSONBody[] = [];

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs
		.readdirSync(commandsPath)
		.filter((file) => file.endsWith(".ts"));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);

		const loaded = require(filePath);
		const command = loaded?.default ?? loaded;

		if (command?.data?.toJSON) {
			commands.push(command.data.toJSON());
			console.log(`Queued: ${command.data.name}`);
		} else {
			console.log(`[SKIP] ${filePath} (no data.toJSON)`);
		}
	}
}

const rest = new REST({ version: "10" }).setToken(TOKEN);

console.log(`Deploying ${commands.length} guild commands...`);

await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
	body: commands,
});

console.log("Done.");
