const { prefix } = require('../../config.json');
const Discord = require('discord.js')

module.exports = {
  name: 'unmute',
  category: 'Mute',
  description: 'Unmute le membre memtionné',
  aliases: ['um'],
  usage: '<@user> <raison>',
  guildOnly: true,
  args: true,
  cooldown: 5,

  run: async (message, args) => {
    const exec = message.member

    let unmute = new Discord.MessageEmbed()
        .setTitle(`**Commande** \`${prefix}unmute\``)
        .setFooter("demandé par @" + message.author.tag)
        .setColor('#0099ff')

    message.delete()
    
    if (!exec.hasPermission('MANAGE_MESSAGES')) return unmute.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.')

    const member = message.mentions.members.first()

    if (!member) return unmute.setDescription('Veuillez mentionner le membre a unmute')

    if (member.id === message.guild.ownerID) return unmute.setDescription('Vous ne pouvez unmute le propriétaire du serveur.')

    if (member === exec) return unmute.setDescription('Vous ne pouvez pas vous mute.')

    if (!member.manageable) return unmute.setDescription('Le bot ne peut pas unmute ce membre.')

    const reason = args.slice(1).join(' ') || 'Aucune raison fournie'

    
    let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
    if (!muteRole) {
      unmute.setDescription('Aucun role Muted n\'a été trouvé sur ce membre')
    }
    await member.roles.remove(muteRole)
    
    unmute.setDescription('**Unmute**' + `${member}` + '\n**Unmute by**' + `${exec}` + '\n**Reason : **' + `${reason}`)

    message.channel.send(unmute)
  }
}