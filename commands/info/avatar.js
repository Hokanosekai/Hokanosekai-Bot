
const Discord = require('discord.js');

module.exports = {
	name: 'avatar',
	category: 'Info',
	description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
	aliases: ['icon', 'pp'],
	usage: '<@user>',
	cooldown: 5,
	run: async (message) => {

		let avatar = new Discord.MessageEmbed()
			.setTitle(`**Commande** \`&avatar\``)
            .setFooter("demandé par @" + message.author.tag)
			.setColor('#0099ff');


		if (!message.mentions.users.size) {
			avatar.setImage(`${message.author.displayAvatarURL({dynamic: true})}`)
			avatar.setDescription(message.author.displayAvatarURL())
			message.channel.send(avatar);
			message.delete();
			return
		}

		const avatarList = message.mentions.users.map(user => {
			avatar.setImage(`${user.displayAvatarURL({dynamic: true})}`)
			avatar.setDescription(user.displayAvatarURL())
			message.channel.send(avatar);
			message.delete();
		});
	},
};