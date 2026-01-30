import { SlashCommandBuilder } from "@discordjs/builders";
import type { ChatInputCommandInteraction } from "discord.js";
import { Puffer } from "@/lib/puffer";

const puffer = new Puffer();

const command = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("status command"),
  async execute(interaction: ChatInputCommandInteraction) {
		const response = await puffer.status();
		if (!response.running) {
			return await interaction.reply("🛑サーバーを停止しています");
		}
    await interaction.reply("🟢サーバーを起動中");
  },
};

export default command;

