const moment = require('moment')
const Discord = require('discord.js')
 
moment.locale('fr')
 
module.exports = {
    name: 'infraction',
    category: 'Warn',
    description: 'Affiche les dix derniers warns du membre mentionné',
    aliases: ['i'],
    usage: '<@user>',
    guildOnly: true,
    args: true,
    cooldown: 5,
    run: async (message, args, bot) => {

        let infraction = new Discord.MessageEmbed()
            .setTitle('**Commande** `&infraction`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')

        message.delete()
        
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(infraction.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.'))

        const member = message.mentions.members.first()
        if (!member) return message.channel.send(infraction.setDescription('Veuillez mentionner le membre dont voir les warns.'))

        if (!bot.db.warns[member.id]) return message.channel.send(infraction.setDescription('Ce membre n\'a aucun warn.'))

        message.channel.send(infraction.setDescription(`**Total de warns :** ${bot.db.warns[member.id].length}\n\n:passport_control:  __**10 derniers warns**__  :passport_control:\n\n${bot.db.warns[member.id].slice(0, 10).map((warn, i) => `**${i + 1}.** ${warn.reason}\nSanctionné ${moment(warn.date).fromNow()} par <@!${warn.mod}>`).join('\n\n')}`))
    }
}