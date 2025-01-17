import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('yokoso')
  .setDescription('ようこそ');


export async function execute(interaction){
  
	await interaction.channel.send('ありんすへようこそ～');
  
}
