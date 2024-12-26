import { SlashCommandBuilder } from 'discord.js';


export const data = new SlashCommandBuilder()
  .setName('delete')
  .setDescription('今日の日付から入力');


export default async(message)  => {
   // !purge コマンドが実行されたら
   if (message.content === '!purge') {
     // コマンドが送信されたチャンネルから直近100件(上限)メッセージを取得する
     const messages = await message.channel.messages.fetch({ limit: 100 })
     // ボット以外が送信したメッセージを抽出
     // それらのメッセージを一括削除
     message.channel.bulkDelete(messages)
   }
 }

};