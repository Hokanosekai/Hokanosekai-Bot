const Discord = require('discord.js')
const fs = require('fs')
const { prefix, token } = require('./config.json')

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection()
bot.db = require('./db.json')


/**
 * Commandes
 */
fs.readdir('./commands/', (err, folders) => {
    if (err) return console.error(err)
    folders.forEach(folder => {
        const loadeds = fs.readdirSync(`./commands/${folder}`).filter(jsonfile => jsonfile.endsWith('.json'))
        const { loaded } = require(`./commands/${folder}/${loadeds}`)
        console.log('\x1b[34m',`↳___________/${folder}/_____________↴`,'\x1b[37m')

        const files = fs.readdirSync(`./commands/${folder}/`).filter(file => file.endsWith('.js'))
            
        files.forEach(file => {
            const command = require(`./commands/${folder}/${file}`)
            if (!loaded) return console.log(`   ↳ ${file}`,'\x1b[31m',`not loaded`,'\x1b[37m')
            else {
                console.log(`   ↳ ${file}`,'\x1b[32m',`loaded`,'\x1b[37m')
                bot.commands.set(command.name, command)
            }
        })
    })
})

/**
 * Events
 */
// fs.readdir('./events/', (err, files) => {
// 	if (err) return console.error(err);
// 	files.forEach(file => {
// 		const eventFunction = require(`./events/${file}`);
// 		if (eventFunction.disabled) return;

// 		const event = eventFunction.event || file.split('.')[0];
// 		const emitter = (typeof eventFunction.emitter === 'string' ? bot[eventFunction.emitter] : eventFunction.emitter) || bot;
// 		const once = eventFunction.once;
		
// 		try {
// 			emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(...args,bot,member));
// 		} catch (error) {
// 			console.error(error.stack);
// 		}
// 	});
// });

const cooldowns = new Discord.Collection();
bot.on('message',async message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).trim().split(/ +/)
    console.log(args)
    const commandName = args.shift().toLowerCase()

    const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

    if(!command) return message.channel.send(new Discord.MessageEmbed().setTitle(`**Commande** \`${prefix}${commandName}\``).setColor('RANDOM').setDescription('Cette commande n\'existe pas'))

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
});

bot.login(token);