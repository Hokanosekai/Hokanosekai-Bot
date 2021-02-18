const Discord = require('discord.js')

module.exports = {
    name: "dm",
    category: 'Autre',
	description: 'Envoie un message privé au membre mentionné',
	usage: '<@user> <message>',
    cooldown: 5,
    run: async (message, args, bot) => {
        const exec = message.member

        let dm = new Discord.MessageEmbed()
            .setTitle('**Commande** `&dm`')
            .setColor('#0099ff')
            
        message.delete()

        const member = message.mentions.members.first()
            
        if (!member) return message.channel.send(dm.setDescription('Veuillez mentionner le membre à dm.'))

        if (!args.slice(1).join(" ")) return message.channel.send(dm.setDescription('Veuillez indiquer votre message.'))

        member.user
            .send(args.slice(1).join(" ") + ` (message reçu de ${message.author.tag} )`)
            .catch(() => message.channel.send(dm.setDescription('Cet utillisateur ne peut être dm')))
    }
}