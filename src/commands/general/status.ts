import { SlashCommandBuilder } from "@discordjs/builders";
import type { ChatInputCommandInteraction } from "discord.js";
import { Puffer } from "@/lib/puffer";
import { msg } from "@/lib/i18n";

const puffer = new Puffer();

const command = {
	data: new SlashCommandBuilder()
		.setName("status")
		.setDescription("status command"),
	async execute(interaction: ChatInputCommandInteraction) {
		const response = await puffer.status();
		if (!response.running) {
			return await interaction.reply(msg("commands.status.reply.stopped"));
		}
		await interaction.reply(msg("commands.status.reply.running"));
	},
};

export default command;
