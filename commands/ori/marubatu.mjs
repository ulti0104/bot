import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('marubatu')
  .setDescription('交流戦日程⭕❌つけてよね');


export async function execute(interaction){
  
	await interaction.channel.send('交流戦日程⭕❌つけてないひと！\n早くつけてくれないと\n頭カチ割に行くでありんす！(怒)');
  
}