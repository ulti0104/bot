import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('delete-maru')
  .setDescription('うるティのまるを消す（調整中）');


export async function execute(message){
  
	await message.reactions.cache.get('⭕').users.remove(1320916943141736488)
  
}
