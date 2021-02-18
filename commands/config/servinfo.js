const Discord = require("discord.js")

module.exports = {
    name: 'servinfo',
    category: 'Config',
	description: 'Information sur le server',
	aliases: ['si'],
	usage: '<none>',
    cooldown: 5,
    run: async (message) => {
 
        let serv = new Discord.MessageEmbed()
            .setThumbnail('https://cdn.discordapp.com/avatars/743254348460720129/3c26b655060e6672990b3c2ddaa5d188.webp')
            .setTitle(`Server name: ${message.guild.name}`)
            .addField(`Total members:`,` ${message.guild.memberCount}`)
            .addField(`Créateur du Server`,`${message.guild.owner}`)
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')
        
        message.channel.send(serv);
        message.delete()
    }
}