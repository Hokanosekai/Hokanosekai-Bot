const { prefix } = require('../../config.json');
const Discord = require('discord.js')

module.exports = {
    name: 'kick',
    category: 'Ban',
	description: 'kick du serveur le membre memtionné',
	aliases: ['k'],
    usage: '<@user> <raison>',
    guildOnly: true,
    args: true,
    cooldown: 5,

    run: async (message, args) => {
        const exec = message.member

        let kick = new Discord.MessageEmbed()
            .setTitle(`**Commande** \`${prefix}kick\``)
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')

        message.delete()

        if (!exec.hasPermission('KICK_MEMBERS')) return kick.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.')

        const member = message.mentions.members.first()

        if(!member) return kick.setDescription('Veuillez mentionner le membre a exclure')

        if (member.id === message.guild.ownerID) return kick.setDescription('Vous ne pouvez exclure le propriétaire du serveur.')

        if (!member.kickable) return kick.setDescription('Le bot ne peut pas exclure ce membre.')

        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'

        await member.kick(reason)
        kick.setDescription('**Kick**'+`${member}`+'\n**Kick by**'+`${exec}`+'\n**Reason : **'+`${reason}`)

        message.channel.send(kick)
    }
}