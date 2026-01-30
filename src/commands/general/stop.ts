import { SlashCommandBuilder } from "@discordjs/builders";
import {
	ActivityType,
	type ChatInputCommandInteraction,
	PresenceUpdateStatus,
} from "discord.js";
import { Puffer } from "@/lib/puffer";

const puffer = new Puffer();

const command = {
	data: new SlashCommandBuilder()
		.setName("stop")
		.setDescription("stop command"),
	async execute(interaction: ChatInputCommandInteraction) {
		const response = await puffer.stop();
		interaction.client.user?.setActivity("🛑サーバー停止中", {
			type: ActivityType.Watching,
		});
		interaction.client.user?.setStatus(PresenceUpdateStatus.DoNotDisturb);
		await interaction.reply(`🛑サーバーを停止しました: ${response.statusCode}`);
	},
};

export default command;
