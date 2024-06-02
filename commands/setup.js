const { Permissions, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'setup',
    async execute(client, message) {
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            return message.channel.send('Bu komutu kullanmak için **mesajları yönet** iznine sahip olmanız gerekir ❌');
        }

        const categorySelectMenu = new MessageSelectMenu()
            .setCustomId('categorySelect')
            .setPlaceholder('Biletlerin atılacağı kategoriyi seçin');

        
        const categories = message.guild.channels.cache.filter(channel => channel.type === 'GUILD_CATEGORY');

        
        const categoryOptions = categories.map(category => ({
            label: category.name,
            value: category.id
        }));

        
        categorySelectMenu.addOptions(categoryOptions);

       
        const setupEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setAuthor('Parsher Ticket Sistemi')
            .setDescription('Bir bilet oluşturmak için aşağıdaki reaksiyona tıklayın. NOT:Botu sebepsiz yere meşgul eden kişilerin ticket açması yasaklanacaktır.')
            .setFooter('Destek Ekibi ile konuşmanız için yeni bir kanal oluşturulacak! Not:Swingler iyi kullanımlar diler!');

        const ticketButton = new MessageButton()
            .setEmoji('🔓')
            .setStyle('SUCCESS')
            .setLabel('Bilet Oluştur')
            .setCustomId('createTicket');

      
        const row = new MessageActionRow()
            .addComponents(ticketButton);
      
      
        const sentMessage = await message.channel.send({ embeds: [setupEmbed], components: [row] });

        
        sentMessage.awaitMessageComponent({
            filter: i => i.customId === 'categorySelect',
            componentType: 'SELECT_MENU',
            time: 60000,
            max: 1,
            errors: ['time']
        }).then(async interaction => {
            const categoryId = interaction.values[0];
            await interaction.update({ content: 'Kategori seçimi yapıldı. Lütfen bekleyin...', components: [] });
            // Ticket sistemi fonksiyonunu çağır ve kategori ID'sini geçir
            await require('./ticketSystem')(client, interaction, categoryId);
        }).catch(console.error);
    },
};
