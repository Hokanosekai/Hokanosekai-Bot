const Discord = require("discord.js");
const { gifToken } = require('../../config.json')
var giphy = require('giphy-api')(gifToken);

module.exports = {
    name: 'bonjour',
    category: 'Autre',
	description: 'Souhaite bonjour au membre mentionné',
	aliases: ['jour','j','bj'],
	usage: '<@user>',
    cooldown: 0,
    run: async (message, args) =>{
        const exec = message.member
        const member = message.mentions.members.first()

        let jour = new Discord.MessageEmbed()
            .setFooter("demandé par @" + message.author.tag)
            .setTitle('**Commande** `&jour`')
            .setColor('RANDOM')

        giphy.random('Hello').then(function(res){
            let answer = res.data.fixed_height_small_url
            let url = res.data.bitly_url
            
            if (!member) return message.channel.send(jour.setDescription('Veuillez mentionner le membre à qui vous voulez souhaiter un bonjour.'))

            jour.setDescription(`${member}`+' **Tu as le Bonjour de la part de**'+`  ${exec}`+'\n'+`${url}`)
            jour.setImage(answer)

            message.channel.send(jour)

            message.delete()
        }).catch(console.error)
    }
}