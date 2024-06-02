const config = require("../config.js");

module.exports = async (client, type, guild, user) => {
    const logChannelId = config.logChannelID;

  
    if (logChannelId) {
        const logChannel = await client.channels.fetch(logChannelId);
        if (logChannel && logChannel.type === 'GUILD_TEXT') {
            switch (type) {
                case 'newTicket': {
                    return logChannel.send(`${user.tag} az önce ${guild.name} sunucusunda bir bilet oluşturdu`);
                }
    
                case 'closeTicket': {
                    return logChannel.send(`${user.tag} az önce ${guild.name} sunucusundaki bir bileti kapattı`);
                }
    
                case 'reopenTicket': {
                    return logChannel.send(`${user.tag}, ${guild.name} sunucusunda bir bileti yeniden açtı`);
                }
    
                case 'deleteTicket': {
                    return logChannel.send(`${user.tag} az önce ${guild.name} sunucusundaki bir bileti sildi`);
                }
    
                case 'saveTicket': {
                    return logChannel.send(`${user.tag} az önce ${guild.name} sunucusuna bir bilet kaydetti`);
                }
            }
        } else {
            console.error('Belirtilen log kanalı bulunamadı veya metin kanalı değil!');
        }
    } else {
        console.log('Log kanalı ID\'si tanımlanmamış, loglar gönderilmeyecek.');
    }
};
