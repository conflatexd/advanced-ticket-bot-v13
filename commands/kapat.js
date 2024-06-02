const { Permissions } = require('discord.js');

module.exports = {
    name: 'kapat',
    description: 'Tüm ticketleri kapatır',
    async execute(client, message, args) {
      
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return message.channel.send('Bu komutu kullanabilmek için yönetici yetkisine sahip olmalısınız.');
        }

        
        const channels = message.guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT');

    
        channels.forEach(channel => {
            if (channel.name.startsWith('ticket-')) {
                channel.delete()
                    .then(() => console.log(`Kanal ${channel.name} başarıyla kapatıldı.`))
                    .catch(error => console.error(`Kanal ${channel.name} kapatılırken bir hata oluştu: ${error}`));
            }
        });

        message.channel.send('Tüm ticket kanalları başarıyla kapatıldı.');
    },
};
