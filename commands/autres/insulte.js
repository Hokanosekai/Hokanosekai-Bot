const Discord = require("discord.js");
const { insultes } = require('../../db.json')

module.exports = {
    name: 'insulte',
    category: 'Autre',
	description: 'insulte le membre mentionné',
	aliases: ['ins','inslt'],
	usage: '<@user>',
    cooldown: 120,
    run: async (message, args) =>{

        const exec = message.member
        const member = message.mentions.members.first()

        const answer = insultes[Math.floor(Math.random() * insultes.length)]

        let nuit = new Discord.MessageEmbed()
            .setTitle('**Commande** `&insulte`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('RANDOM')
        
        message.delete()

        if (!member) return message.channel.send(nuit.setDescription('Veuillez mentionner le membre que vous voulez insulter'))

        nuit.setDescription(`${member}`+'** Tu à été traité de**'+` ${answer} par ${exec}`)

        message.channel.send(nuit)
    }
}