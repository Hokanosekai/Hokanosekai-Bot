const Discord = require('discord.js')
const db = require('quick.db')
const fs = require('fs')
const { prefix } = require('../../config.json')

module.exports = {
    name: 'warn',
    category: 'Warn',
    description: 'Ajoute un warn au membre mentionné',
    aliases: ['w'],
    usage: '<@user> <raison>',
    guildOnly: true,
    args: true,
    cooldown: 0,
    run: async (message, args, bot) => {
        const exec = message.member
        const member = message.mentions.members.first()

        let warn = new Discord.MessageEmbed()
            .setTitle('**Commande** `&warn`')
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')

        message.delete()

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(warn.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.'))
        
        if (!member) return message.channel.send(warn.setDescription('Veuillez mentionner le membre à warn.'))

        if (member.id === message.guild.ownerID) return message.channel.send(warn.setDescription('Vous ne pouvez warn le propriétaire du serveur.'))

        if (member.id === exec.id) return message.channel.send(warn.setDescription('Vous ne pouvez vous warn.'))
        
        //if (message.mentions.users.first().bot) return message.channel.send(warn.setDescription('Vous ne pouvez warn le Bot.'))


        const reason = args.slice(1).join(' ')
        if (!reason) return message.channel.send(warn.setDescription('Veuillez indiquer une raison.'))

        let warnings = db.get(`warnings_${message.guild.id}_${member.id}`)
    
        if(warnings === 3) return message.channel.send(warn.setDescription(`${member} already reached his/her limit with 3 warnings`))
        
        if(warnings === null) {
            db.set(`warnings_${message.guild.id}_${member.id}`, 1)
            member.send(`You have been warned in **${message.guild.name}** for ${reason}`)
            await message.channel.send(warn.setDescription('**Warn**'+`${member}`+'\n**Warn by**'+`${exec}`+'\n**Reason : **'+`${reason}`))
        } else if(warnings !== null) {
            db.add(`warnings_${message.guild.id}_${member.id}`, 1)
            member.send(`You have been warned in **${message.guild.name}** for ${reason}`)
            await message.channel.send(warn.setDescription('**Warn**'+`${member}`+'\n**Warn by**'+`${exec}`+'\n**Reason : **'+`${reason}`))
        }

        // if (!bot.db.warns[member.id]) bot.db.warns[member.id] = []
        // bot.db.warns[member.id].unshift({
        //     reason,
        //     date: Date.now(),
        //     mod: message.author.id
        // })
        // fs.writeFileSync('./db.json', JSON.stringify(bot.db))

        message.channel.send(warn.setDescription('**Warn**'+`${member}`+'\n**Warn by**'+`${exec}`+'\n**Reason : **'+`${reason}`))
    }
}