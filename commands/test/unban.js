const Discord = require('discord.js');

module.exports = {
    name: 'unban',
    category: 'Ban',
	description: 'Débannis du serveur le membre mentionné',
	aliases: ['ub'],
    usage: '<@user> <raison>',
    guildOnly: true,
    args: true,
    cooldown: 5,
    
    run: async (message, args) => {
        const exec = message.member

        let unban = new Discord.MessageEmbed()
            .setTitle(`**Commande** \`&unban\``)
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')
        
        message.delete()

        if (!exec.hasPermission('BAN_MEMBERS')) return unban.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.')

        const member = message.mentions.members.first()

        if(!member) return unban.setDescription('Veuillez mentionner le membre a unban')
        
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'

        await message.guild.members.unban(member)
        unban.setDescription('**Unban**'+`${member.id}`+'\n**Unban by**'+`${exec}`+'\n**Reason : **'+`${reason}`)

        message.channel.send(unban)
    }
}