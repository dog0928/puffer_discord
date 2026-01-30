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
		.setName("stop")
		.setDescription(msg("commands.stop.description")),
	async execute(interaction: ChatInputCommandInteraction) {
		const response = await puffer.stop();

		interaction.client.user?.setActivity(msg("presence.activity.stopping"), {
			type: ActivityType.Watching,
		});
		interaction.client.user?.setStatus(PresenceUpdateStatus.DoNotDisturb);
		await interaction.reply(
			msg("commands.stop.reply.success", { statusCode: response.statusCode }),
		);
	},
};

export default command;
