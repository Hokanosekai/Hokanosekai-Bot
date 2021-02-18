const Discord = require('discord.js')
const { prefix } = require('../../config.json');
module.exports = {
    event: 'message',
    once: false,

    run(bot, message){
        if(!message.content.startsWith(prefix) || message.author.bot) return
    
        const args = message.content.slice(prefix.length).trim().split(/ +/)
    
        const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
    
        if(!command) return
    
        if(command.guidOnly && message.channel.type === 'dm') return message.reply('I can\'t execute this command inside DM')
    
        if(command.args && !args.length){
            let param = new Discord.MessageEmbed()
                .setTitle(`**Commande** \`${prefix}${command.name}\``)
                .setColor('#0099ff')
                .setDescription(`${message.author}, Les arguments de la commande sont invalides`);
            if(command.usage){
                param.setDescription(`${message.author}, Les arguments de la commande sont invalides \nVeuillez entrer des arguments du type\n\`${prefix}${command.name} ${command.usage}\``)
            }
            message.delete()
            message.channel.send(param)
            return
        } 
    
        if(!cooldowns.has(command.name)){
            cooldowns.set(command.name, new Discord.Collection())
        }
    
        const now = Date.now()
        const timestamp = cooldowns.get(command.name)
        const cooldownAmount = (command.cooldown || 3) * 1000
        
        if(timestamp.has(message.author.id)){
            const expirationTime = timestamp.get(message.author.id) + cooldownAmount
    
            if(now < expirationTime){
                const timeLeft = (expirationTime - now)/ 1000
                return message.channel.send(new Discord.MessageEmbed()
                                                .setColor('#0099ff')
                                                .setTitle(`**Commande** \`${prefix}${command.name}\``)
                                                .setDescription(`${message.author}, Attend ${timeLeft.toFixed(1)}s avant de reutilliser cette commande`)
                                            )
            }
        }
    
        timestamp.set(message.author.id, now)
        setTimeout(() => timestamp.delete(message.author.id), cooldownAmount)
    
        try{
            command.run(message, args, bot)
        } catch (error) {
            console.error(error)
            message.channel.send(new Discord.MessageEmbed() 
                                    .setColor('#0099ff')
                                    .setTitle(`**Commande** \`${prefix}${command.name}\``)
                                    .setDescription(`${message.author}, Une erreur c'est produite lors de l'éxecution de la commande`)
                                )
        }
    }
}
