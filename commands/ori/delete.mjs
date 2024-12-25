client.on('messageCreate', async message => {
   // !purge コマンドが実行されたら
   if (message.content === '!purge') {
     // コマンドが送信されたチャンネルから直近100件(上限)メッセージを取得する
     const messages = await message.channel.messages.fetch({ limit: 100 })
     // ボット以外が送信したメッセージを抽出
     const filtered = messages.filter(message => !message.author.bot)
     // それらのメッセージを一括削除
     message.channel.bulkDelete(filtered)
   }
 })