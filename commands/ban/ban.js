const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    category: 'Ban',
	description: 'Bannis du serveur le membre mentionné',
	aliases: ['b'],
    usage: '<@user> <raison>',
    guildOnly: true,
    args: true,
    cooldown: 5,
    
    run: async (message, args) => {
        const exec = message.member

        let ban = new Discord.MessageEmbed()
            .setTitle(`**Commande** \`&ban\``)
            .setColor('#0099ff')

        message.delete()

        if (!exec.hasPermission('BAN_MEMBERS')) return ban.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.')

        const member = message.mentions.members.first()

        if(!member) return ban.setDescription('Veuillez mentionner le membre a bannir')

        if (member.id === message.guild.ownerID) return ban.setDescription('Vous ne pouvez bannir le propriétaire du serveur.')

        if (!member.bannable) return ban.setDescription('Le bot ne peut pas bannir ce membre.')
        
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'

        await member.ban(reason)
        ban.setDescription('**Ban**'+`${member}`+'\n**Ban by**'+`${exec}`+'\n**Reason : **'+`${reason}`)

        message.channel.send(ban)
    }
}