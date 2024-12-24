client.on('message', message=> {
 if (message.content ==='ありんす') {
message.channel.send ('この言葉で反応する');
}
});