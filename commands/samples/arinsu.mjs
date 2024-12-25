import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('arinsu')
  .setDescription('うるティが返事してくれるよ');


export async function execute(interaction){
  
	await interaction.channel.send('ありんす💙');
  
  
}







	
  