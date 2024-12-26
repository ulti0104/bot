import {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";


export const data = new SlashCommandBuilder()
  .setName('schedule2')
  .setDescription('日付入力');


export async function execute(interaction){
        const button1 = new ButtonBuilder()
            .setCustomId('button1')//他のファイルのボタンと被らないようにする
            .setLabel('一つ目のボタン')
            .setStyle(ButtonStyle.Success);
    
        const button2 = new ButtonBuilder()
            .setCustomId('button2')
            .setLabel('二つ目のボタン')
            .setStyle(ButtonStyle.Secondary);
    
        const row = new ActionRowBuilder()
            .addComponents(button1, button2);
        //定数に入れて判別する
        const response = await interaction.reply({ content: 'ボタンを送信しました', components: [row]});
        //処理
        const collectorFilter = i => i.user.id === interaction.user.id;
            
        try {
    
            if (interaction.customId === 'button1') {
                await interaction.update('button1を押した!');
            } else if (interaction.customId === 'button2') {
                await interaction.update('button2を押した!');
            }
        } catch (e) {
            await interaction.editReply({ content: '1分たったのでボタンの処理を停止しました', components: [] });
        }            
};