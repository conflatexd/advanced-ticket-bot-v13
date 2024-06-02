const chalk = require('chalk');
const moment = require('moment');

module.exports = client => {
   
    const games = [
        'Parsher Code - Gelişmiş',
        'Parsher Code - Ticket',
        'Parsher Code - Botu',
        'Swingler tarafından güncellenmiştir.'
    ];

    let currentIndex = 0;

  
    setInterval(() => {
        client.user.setActivity(games[currentIndex]);
        currentIndex = (currentIndex + 1) % games.length;
    }, 10 * 1000); 
    
    
    client.user.setStatus("idle");
};
