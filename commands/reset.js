const { Permissions } = require('discord.js');

module.exports = {
    name: 'resetle',
    description: 'Ticket sayısını sıfırlar',
    async execute(client, message, args) {
        // Yalnızca yönetici yetkisine sahip kullanıcılar bu komutu kullanabilir
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return message.channel.send('Bu komutu kullanabilmek için yönetici yetkisine sahip olmalısınız.');
        }

        // Ticket sayısını sıfırla
        client.ticketCounter = 1;

        message.channel.send('Ticket sayısı başarıyla sıfırlandı.');
    },
};
