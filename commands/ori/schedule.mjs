import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('schedule')
  .setDescription('日付入力');

export async function execute(interaction){
	await interaction.reply(new Date().toLocaleDateString('sv-SE'));
  await interaction.followUp(new Date()+1.toLocaleDateString('sv-SE'));
}
