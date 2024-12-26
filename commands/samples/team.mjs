import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("sans-or-oceans")
  .setDescription("チームを決める");

export async function execute(interaction) {
  const arr = ["サンズ", "オーシャンズ"];
  const weight = [50, 50];
  let result = "";

  let totalWeight = 0;
  for (let i = 0; i < weight.length; i++) {
    totalWeight += weight[i];
  }
  let random = Math.floor(Math.random() * totalWeight);
  
  for (let i = 0; i < weight.length; i++) {
    if (random < weight[i]) {
      result = arr[i];
      break;
    } else {
      random -= weight[i];
    }
  }

  await interaction.reply(`${result} が出たよ～！`);
}
