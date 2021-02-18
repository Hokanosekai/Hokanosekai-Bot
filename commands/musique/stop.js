const Discord = require("discord.js");
    
module.exports = {
    name: 'stop',
    category: 'Musique',
    description: 'Arrete la musique en cours',
    usage: '<none>',
    run: async (message) =>{
        let stop = new Discord.MessageEmbed()
			.setTitle(`**Commande** \`&stop\``)
            .setFooter("demandé par @" + message.author.tag)
            .setColor('RANDOM');

        if(!message.member.voice.channel) return message.channel.send(stop.setDescription("Veuillez être connecté à un salon vocal"))
        return message.member.voice.channel.leave()
    }
}