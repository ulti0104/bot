export default async(message) => {
  if (message.content.match(/うるティ削除してください|削除してください/)) {
    
// コマンドが送信されたチャンネルから直近100件(上限)メッセージを取得する
     const messages = await message.channel.messages.fetch({ limit: 100 })
     // ボット以外が送信したメッセージを抽出
     // それらのメッセージを一括削除
     await message.channel.bulkDelete()
    
  }

};