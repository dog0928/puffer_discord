import { SlashCommandBuilder } from "@discordjs/builders";
import {
	ActivityType,
	type ChatInputCommandInteraction,
	PresenceUpdateStatus,
} from "discord.js";
import { Puffer } from "@/lib/puffer";
import { msg } from "@/lib/i18n";

const puffer = new Puffer();

const command = {
	data: new SlashCommandBuilder()
		.setName("start")
		.setDescription(msg("commands.start.description")),
	async execute(interaction: ChatInputCommandInteraction) {
		const response = await puffer.start();

		interaction.client.user?.setActivity(msg("presence.activity.running"), {
			type: ActivityType.Watching,
		});
		interaction.client.user?.setStatus(PresenceUpdateStatus.Online);

		await interaction.reply(
			msg("commands.start.reply.success", { statusCode: response.statusCode }),
		);
	},
};

export default command;
