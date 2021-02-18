const Discord = require("discord.js");
const { gifToken } = require('../../config.json')
const giphy = require('giphy-api')(gifToken);

module.exports = {
    name: 'bonap',
    category: 'Autre',
	description: 'Souhaite bon appétit au membre mentionné',
	aliases: ['bap','bnap'],
	usage: '<@user>',
    cooldown: 20,
    run: async (message, args) =>{
        const exec = message.member
        const member = message.mentions.members.first()

        let bonap = new Discord.MessageEmbed()
            .setTitle('**Commande** `&bonap`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('RANDOM')

        giphy.random('enjoy your meal').then(function(res){
            let answer = res.data.fixed_height_small_url
            let url = res.data.bitly_url
            
            if (!member) return message.channel.send(bonap.setDescription('Veuillez mentionner le membre à qui vous voulez souhaiter bonne appétit.'))

            bonap.setDescription(`${exec}`+'** Te souhaite de bien te remplir le bide**'+`  ${member}`+'\n'+`${url}`)
            bonap.setImage(answer)

            message.channel.send(bonap)

            message.delete()
        }).catch(console.error)
    }
}