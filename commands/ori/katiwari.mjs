import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('katiwari')
  .setDescription('カチワリ');


export async function execute(interaction){
  
	await interaction.channel.send('頭カチ割ってやるでありんす');
  
}