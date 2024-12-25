export default async(message) => {
  if (message.content.match(/年|月/)) {
    
////
    
  var now = new Date();

// 本日を取得する.
var todayString = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日'

now.setDate(now.getDate() + 1);
var todayString1 = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日'
now.setDate(now.getDate() + 1);
var todayString2 = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日'
now.setDate(now.getDate() + 1);
var todayString3 = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日'
now.setDate(now.getDate() + 1);
var todayString4 = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日'
now.setDate(now.getDate() + 1);
var todayString5 = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日'
now.setDate(now.getDate() + 1);
var todayString6 = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日'
now.setDate(now.getDate() + 1);
var todayString6 = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日'
    
////
    
    await message.channel.send(todayString);
    await message.channel.send(todayString1);
    await message.channel.send(todayString2);
    await message.channel.send(todayString3);
    await message.channel.send(todayString4);
    await message.channel.send(todayString5);
    await message.channel.send(todayString6);
    
  }

};