const fs = require('fs')
const Discord = require('discord.js')
 
module.exports = {
    name: 'unwarn',
    category: 'Warn',
    description: 'Supprimme un warn du membre mentionné',
    aliases: ['uw'],
    usage: '<@user> <n° du warn>',
    guildOnly: true,
    args: true,
    cooldown: 5,
    run: async (message, args, bot) => {
        const exec = message.member

        let unwarn = new Discord.MessageEmbed()
            .setTitle('**Commande** `&unwarn`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')

        message.delete()

        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(unwarn.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.'))

        const member = message.mentions.members.first()
        if (!member) return message.channel.send(unwarn.setDescription('Veuillez mentionner un membre.'))

        if (!bot.db.warns[member.id]) return message.channel.send(unwarn.setDescription('Ce membre n\'a aucun warn.'))

        const warnIndex = parseInt(args[1], 10) - 1
        if (warnIndex < 0 || !bot.db.warns[member.id][warnIndex]) return message.channel.send(unwarn.setDescription('Ce warn n\'existe pas'))

        const { reason } = bot.db.warns[member.id].splice(warnIndex, 1)[0]
        if (!bot.db.warns[member.id].length) delete bot.db.warns[member.id]
        fs.writeFileSync('./db.json', JSON.stringify(bot.db))

        message.channel.send(unwarn.setDescription('**Unwarn**'+`${member}`+'\n**Unwarn by**'+`${exec}`+'\n**Warn reason : **'+`${reason}`))
    }
}