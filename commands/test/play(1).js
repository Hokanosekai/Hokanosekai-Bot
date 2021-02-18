const Discord = require("discord.js");
const ytdl = require('ytdl-core')

var queue = new Map()

module.exports = {
    name: 'play',
    category: 'Musique',
    description: 'Permet de lancer une musique dans un salon vocal',
    usage: '<url>',
    run: async (message, args, bot) =>{
        if(!args[0]) return

        let url = args.join(" ")

        let serverQueue = queue.get(message.guild.id)
        let voiceChannel = message.member.voice

        let play = new Discord.MessageEmbed()
			.setTitle(`**Commande** \`&play\``)
            .setFooter("demandé par @" + message.author.tag)
            .setColor('RANDOM');

        if(!voiceChannel) return message.channel.send(play.setDescription('Veuillez vous connecter a un salon vocal pour écouter de la musique !'))

        if(!voiceChannel.channel.permissionsFor(bot.user).has('CONNECT')) return message.channel.send(play.setDescription('Je n\'ai pas la permission pour me connecter à ce salon vocal'))
        if(!voiceChannel.channel.permissionsFor(bot.user).has('SPEAK')) return message.channel.send(play.setDescription('Je n\'ai pas la permission de parler dans ce salon'))

        let songinfo = await ytdl.getInfo(url)
        let song = {
            title: songinfo.videoDetails.title,
            url: songinfo.videoDetails.video_url
        }

        console.log(song.title,song.url)

        if(!serverQueue){
            let queueConst = {
                textChannel: message.channel,
                voiceChannel: voiceChannel.channel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            }

            queue.set(message.guild.id, queueConst)
            queueConst.songs.push(song)

            try {
                let connection = await voiceChannel.channel.join()
                queueConst.connection = connection
                playSong(message.guild, queueConst.songs[0])
                message.channel.send(`Now playing ${song.title}`)
            } catch (error) {
                console.log(error)
                queue.delete(message.guild.id)
            }
        } else {
            serverQueue.songs.push(song)
            return message.Channel.send(`${song.title} à été ajoouté a la queue`)
        }
    }
}


/**
 * 
 * @param {Discord.Guild} guild
 * @param {Object} song
 */

async function playSong(guild, song){
    let serverQueue = queue.get(guild.id)

    if(!song){
        serverQueue.voiceChannel.leave()
        queue.delete(guild.id)
        return
    }

    const dispatcher = serverQueue.connection.play(ytdl(song.url)).on('end', () => {
        serverQueue.songs.shift()
        playSong(guild, serverQueue.songs[0])
    })
    .on('error', () => {
        console.log(error)
    })

    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)
}