const parseDuration = require('parse-duration')
const humanizeDuration = require('humanize-duration')
const Discord = require('discord.js')
 
module.exports = {
    name: 'tempban',
    category: 'Ban',
	description: 'Bannis temporairement du serveur le membre mentionné',
	aliases: ['tb','tmpb'],
    usage: '<@user> <durée> <raison>',
    guildOnly: true,
    args: true,
    cooldown: 5,
    run: async (message, args) => {
        const exec = message.member

        let tempban = new Discord.MessageEmbed()
            .setTitle('**Commande** `&tempban`')
            .setColor('#0099ff')
            .setFooter("demandé par @" + message.author.tag)

        message.delete()

        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(tempban.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.'))
        
        const member = message.mentions.members.first()
        if (!member) return message.channel.send(tempban.setDescription('Veuillez mentionner le membre à bannir.'))

        if (member.id === message.guild.ownerID) return message.channel.send(tempban.setDescription('Vous ne pouvez bannir le propriétaire du serveur.'))

        if (!member.bannable) return message.channel.send(tempban.setDescription('Le bot ne peut pas bannir ce membre.'))

        const duration = parseDuration(args[1])
        if (!duration) return message.channel.send(tempban.setDescription('Veuillez indiquer une durée valide.'))

        const reason = args.slice(2).join(' ') || 'Aucune raison fournie'
        await member.ban({reason})
        message.channel.send(tempban.setDescription('**BanTemp**'+`${member}`+'\n**BanTemp by**'+`${exec}`+'\n**Duration : **'+`${humanizeDuration(duration, {language: 'fr'})}`+'\n**Reason : **'+`${reason}`))

        setTimeout(() => {
            message.guild.members.unban(member)
            message.channel.send(tempban.setDescription('**Unban**'+`${member}`+'\n**Unban by**'+`${exec}`))
        }, duration)

    }
}