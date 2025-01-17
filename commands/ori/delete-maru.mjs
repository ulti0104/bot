import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('delete-maru')
  .setDescription('うるティのまるを消す');


export async function execute(interaction){
  
	await message.reactions.cache.get('🤔').users.remove(user)
  
}
