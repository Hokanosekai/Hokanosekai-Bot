const Discord = require("discord.js");
const { gifToken } = require('../../config.json')
var giphy = require('giphy-api')(gifToken);

module.exports = {
    name: 'bonnenuit',
    category: 'Autre',
	description: 'Souhaite bonne nuit au membre mentionné',
	aliases: ['nuit','n','bn'],
	usage: '<@user>',
    cooldown: 20,
    run: async (message, args) =>{
        const exec = message.member
        const member = message.mentions.members.first()

        let nuit = new Discord.MessageEmbed()
            .setTitle('**Commande** `&nuit`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('RANDOM')
        
        giphy.random('Good night').then(function(res){
            let answer = res.data.fixed_height_small_url
            let url = res.data.bitly_url
            
            if (!member) return message.channel.send(nuit.setDescription('Veuillez mentionner le membre à qui vous voulez souhaiter bonne nuit.'))

            nuit.setDescription(`${exec}`+'** Te souhaite de bien dormir**'+`  ${member}`+'\n'+`${url}`)
            nuit.setImage(answer)

            message.channel.send(nuit)

            message.delete()
        }).catch(console.error)
    }
}