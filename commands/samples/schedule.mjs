const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });

client.login("MTMyMDkxNjk0MzE0MTczNjQ4OA.GnADJS.GzZn0riV862roNHzW-V-BdWuW_ewwfIn4XA5Sk");

client.on('ready', () => {
    console.log(`${client.user.tag}`);
});


var tomorrow = new Date();
tomorrow.setDate( tomorrow.getDate());
var yearNum = tomorrow.getFullYear(); // not getYear()
var monthNum = tomorrow.getMonth();
var dayNum = tomorrow.getDate(); // not getDay()
var jpDateStr = String( yearNum ) + "年" 
                   + String( monthNum ) + "月"
                   + String( dayNum ) + "日" ;

var tomorrow = new Date();
tomorrow.setDate( tomorrow.getDate() + 1 );
var yearNum = tomorrow.getFullYear(); // not getYear()
var monthNum = tomorrow.getMonth() + 1 ;
var dayNum = tomorrow.getDate(); // not getDay()
var jpDateStr1 = String( yearNum ) + "年" 
                   + String( monthNum ) + "月"
                   + String( dayNum ) + "日" ;

var tomorrow = new Date();
tomorrow.setDate( tomorrow.getDate() + 2 );
var yearNum = tomorrow.getFullYear(); // not getYear()
var monthNum = tomorrow.getMonth() + 2 ;
var dayNum = tomorrow.getDate(); // not getDay()
var jpDateStr2 = String( yearNum ) + "年" 
                   + String( monthNum ) + "月"
                   + String( dayNum ) + "日" ;

var tomorrow = new Date();
tomorrow.setDate( tomorrow.getDate() + 3 );
var yearNum = tomorrow.getFullYear(); // not getYear()
var monthNum = tomorrow.getMonth() + 3 ;
var dayNum = tomorrow.getDate(); // not getDay()
var jpDateStr3 = String( yearNum ) + "年" 
                   + String( monthNum ) + "月"
                   + String( dayNum ) + "日" ;

var tomorrow = new Date();
tomorrow.setDate( tomorrow.getDate() + 4 );
var yearNum = tomorrow.getFullYear(); // not getYear()
var monthNum = tomorrow.getMonth() + 4 ;
var dayNum = tomorrow.getDate(); // not getDay()
var jpDateStr4 = String( yearNum ) + "年" 
                   + String( monthNum ) + "月"
                   + String( dayNum ) + "日" ;

var tomorrow = new Date();
tomorrow.setDate( tomorrow.getDate() + 5 );
var yearNum = tomorrow.getFullYear(); // not getYear()
var monthNum = tomorrow.getMonth() + 5 ;
var dayNum = tomorrow.getDate(); // not getDay()
var jpDateStr5 = String( yearNum ) + "年" 
                   + String( monthNum ) + "月"
                   + String( dayNum ) + "日" ;

var tomorrow = new Date();
tomorrow.setDate( tomorrow.getDate() + 6 );
var yearNum = tomorrow.getFullYear(); // not getYear()
var monthNum = tomorrow.getMonth() + 6 ;
var dayNum = tomorrow.getDate(); // not getDay()
var jpDateStr6 = String( yearNum ) + "年" 
                   + String( monthNum ) + "月"
                   + String( dayNum ) + "日" ;





client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (message.content.includes('日程入力')) {
        message.channel.send(jpDateStr);
        message.channel.send(jpDateStr);
        message.channel.send(jpDateStr);
        message.channel.send(jpDateStr);
      
    }
});