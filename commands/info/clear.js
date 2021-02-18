const Discord = require ("discord.js");
 
module.exports = {
    name: 'clear',
    category: 'Info',
    description: 'Supprimme le nombre de messages entré',
    aliases: ['c','cls'],
    usage: '<nombre de messages>',
    guildOnly: true,
    args: true,
    cooldown: 5,
    run: async (message, args) => {
        const exec = message.member

        let clear = new Discord.MessageEmbed()
            .setTitle('**Commande** `&clear`')
            .setColor('#0099ff')
            .setFooter("demandé par @" + message.author.tag)

        message.delete()
        
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(clear.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.'))

        const reason = args.slice(0).join(' ')
        if (!reason) return message.channel.send(clear.setDescription('Indique le nombre de messages que tu souhaite supprimer.'))

        message.channel.bulkDelete(reason)
        message.channel.send(clear.setDescription(`${reason} messages ont bien été supprimés par ${exec}`))
    }
}