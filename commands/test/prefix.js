const Discord = require("discord.js");
const { prefix } = require('../../config.json')

module.exports = {
    name: 'prefix',
    category: 'Config',
	description: 'change le préfix des commandes du bot',
	aliases: ['pre'],
    guildOnly: true,
    args: true,
	usage: '<new préfix>',
    cooldown: 0,
    run: async (message, args, bot) =>{
        const exec = message.member
        const newpre = args.slice()

        let prefx = new Discord.MessageEmbed()
            .setTitle('**Commande** `&prefix`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('RANDOM')
        
        message.delete()

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(prefx.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.'))

        if (!newpre[0]) return message.channel.send(prefx.setDescription('Veuillez choisir un préfix !'))

        if (newpre[1]) return message.channel.send(prefx.setDescription('Veuillez entrer un préfix avec un seul argument !'))

        if (newpre[0].length > 3) return message.channel.send(prefx.setDescription('Veuillez entrer un préfix inférieur à 3 caractères'))
        
        if (newpre.join("") === prefix){
            con
        }

        prefx.setDescription(`${member}`+'** Tu à été traité de**'+` ${answer} par ${exec}`)

        message.channel.send(prefx)
    }
}