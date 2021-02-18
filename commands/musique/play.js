const Discord = require("discord.js");



module.exports = {
    name: 'play',
    category: 'Musique',
    description: 'Permet de lancer une musique dans un salon vocal',
    usage: '<url>',
    run: async (message, args, bot, serverQueue, queue) =>{
        if(!args[0]) return

        
    }
}