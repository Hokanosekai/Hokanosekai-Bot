const Discord = require("discord.js");
const { prefix } = require('../../config.json');
const moment = require("moment");


module.exports = {
    name: "userinfo",
    category: 'Info',
    description: "Affiche les informations sur l\'utillisateur mentionné",
    guilOnly: true,
    usage: '<@user>',
    run: async(message, args) => {
        const status = {
            online: "En ligne",
            idle: "Inactif",
            dnd: " Ne pas dérenger",
            offline: " Hors-Ligne/Invisble"
        }
    
        const member = message.mentions.members.first() || message.member;
        let target = message.mentions.users.first() || message.author
        
        let isbot

        if (member.user.bot === true) {
            isbot = 'Oui';
        } else {
            isbot = 'Non';
        }
    
    
        let embed = new Discord.MessageEmbed()
            .setTitle(`**Commande** \`${prefix}userinfo\``)
            .setThumbnail((target.displayAvatarURL({dynamic: true})))
            .setColor("#00ff00")
            .addField("Pseudo :two_women_holding_hands:", `${member.user.tag}`)
            .addField(":id: --- ID --- :id:", member.user.id)
            .addField(":robot: --- Bot --- :robot:", `${isbot}`)
            .addField("Statut", `${status[member.user.presence.status]}`)
            .addField("Joue à 🎮 ", `${member.user.presence.game ? `${member.user.presence.game.name}` : ":negative_squared_cross_mark: Ne joue pas"}`)
            .addField("A rejoint Discord le :", moment(member.user.createdAt).format("LL"))
            .setFooter(`Information a propos de ${member.user.username}`)
            //.addField('📅 Arriver sur le serveur', moment(message.guild.members.get(member.id).joinedAt).format("LL"), true)
            .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
    
        message.channel.send(embed);
    
        message.delete();
    }
}