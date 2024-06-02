module.exports = {
    name: 'ping',

    execute(client, message) {
        message.channel.send(`Dostum Desteklemekte ne kadar yoruldum **${client.ws.ping}ms** 👋`);
    },
}; 