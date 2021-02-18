const { MessageEmbed } = require("discord.js");

const Discord = new MessageEmbed()


module.exports = {
  name: "annonce",
  run: async (client, message, args) => {
    let rChannel = message.guild.channels.cache.get(args[0]);
    if (!rChannel)
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**Commande** `&annonce`')
      .setDescription('Veuillez indiquer le salon.')
      .setColor('#0099ff')
    )

    console.log(rChannel);
    let MSG = args.slice(1).join(" ")
    if (!MSG)
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle('**Commande** `&annonce`')
      .setDescription('Veuillez indiquer votre message.')
      .setColor('#0099ff')
    )
    rChannel.send(new MessageEmbed()
    .setTitle(`New announcement!`)
    .setDescription(`${MSG}`)
    .setColor("RANDOM")
    )
    message.delete();
  },
};