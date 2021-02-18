const { prefix } = require('../../config.json');
const Discord = require('discord.js')

module.exports = {
  name: 'mute',
  category: 'Mute',
  description: 'Mute le membre memtionné',
  aliases: ['m'],
  usage: '<@user> (<raison> <durée>)',
  guildOnly: true,
  cooldown: 5,

  run: async (message, args) => {
    const exec = message.member

    let mute = new Discord.MessageEmbed()
        .setTitle(`**Commande** \`${prefix}mute\``)
        .setFooter("demandé par @" + message.author.tag)
        .setColor('#0099ff')
    
    message.delete()

    if (!exec.hasPermission('MANAGE_MESSAGES')) return mute.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.')

    const member = message.mentions.members.first()

    if (!member) return mute.setDescription('Veuillez mentionner le membre a mute')

    if (member.id === message.guild.ownerID) return mute.setDescription('Vous ne pouvez mute le propriétaire du serveur.')

    if (member === exec) return mute.setDescription('Vous ne pouvez pas vous mute.')

    if (!member.manageable) return mute.setDescription('Le bot ne peut pas mute ce membre.')

    const reason = args.slice(1).join(' ') || 'Aucune raison fournie'

    const duration = parseDuration(args[2])
    let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
    if (!muteRole) {
      muteRole = await message.guild.roles.create({
          data: {
              name: 'Muted',
              permissions: 0
          }
      })
      message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
          SEND_MESSAGES: false,
          CONNECT: false,
          ADD_REACTIONS: false
      }))
    }

    if (!duration){
      await member.roles.add(muteRole)
      
      mute.setDescription('**Mute**' + `${member}` + '\n**Mute by**' + `${exec}` + '\n**Reason : **' + `${reason}`)

      message.channel.send(mute)
    } else {
      await member.roles.add(muteRole)
      message.channel.send(tempmute.setDescription('**MuteTemp**'+`${member}`+'\n**MuteTemp by**'+`${exec}`+'\n**Duration : **'+`${humanizeDuration(duration, {language: 'fr'})}`+'\n**Reason : **'+`${reason}`))
      
      setTimeout(() => {
          if (member.deleted || !member.manageable) return
          member.roles.remove(muteRole)
          message.channel.send(tempmute.setDescription('**Unmute**'+`${member}`+'\n**Unmute by**'+`${exec}`))
      }, duration)
    }
  }
}