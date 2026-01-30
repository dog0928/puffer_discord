import fs from "node:fs";
import path from "node:path";
import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from "discord.js";
import setBotActivity from "@/lib/bot";

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildPresences,
	] 
});

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);

  console.log("=== Local Loaded Commands ===");
  for (const [name] of (client as any).commands) console.log(`- ${name}`);

  const guildId = process.env.DISCORD_GUILD_ID!;
  const guild = await readyClient.guilds.fetch(guildId);
  const guildCommands = await guild.commands.fetch();

  console.log(`=== Guild Application Commands (Discord side) : ${guild.name} ===`);
  for (const [id, cmd] of guildCommands) {
    console.log(`- ${cmd.name} (id=${id})`);
  }

  await readyClient.application?.fetch();
  const globalCommands = await readyClient.application!.commands.fetch();
  console.log("=== Global Application Commands (Discord side) ===");
  for (const [id, cmd] of globalCommands) console.log(`- ${cmd.name} (id=${id})`);

	void setBotActivity(client);

	const updateStatus: number = 5 * 60 * 1000;
	const timer = setInterval(async () => {
		void setBotActivity(client);
	}, updateStatus);
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".ts"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);

    const loaded = require(filePath);
    const command = loaded?.default ?? loaded;

    if (command && "data" in command && "execute" in command) {
      (client as any).commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = (interaction.client as any).commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    const payload = {
      content: "There was an error while executing this command!",
      flags: MessageFlags.Ephemeral,
    } as const;

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(payload);
    } else {
      await interaction.reply(payload);
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);

