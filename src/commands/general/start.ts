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
		.setName("start")
		.setDescription("start command"),
	async execute(interaction: ChatInputCommandInteraction) {
		const response = await puffer.start();
		interaction.client.user?.setActivity("🟢サーバー稼働中", {
			type: ActivityType.Playing,
		});
		interaction.client.user?.setStatus(PresenceUpdateStatus.Online);
		await interaction.reply(`🟢サーバーを起動しました: ${response.statusCode}`);
	},
};

export default command;
