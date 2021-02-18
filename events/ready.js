module.exports = {
    event: 'ready',
    once: false,

    run(bot){
        console.log('\x1b[35m','\n\n⇐=','\x1b[45m\x1b[32m','Hokanosekai is now ONLINE','\x1b[40m\x1b[35m','=⇒','\x1b[37m');

        const statuses = [
            `${bot.guilds.cache.size}🌐 servers`,
            `${bot.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}👥 users`,
            `by Hokanosekai`,
            `EN BETA`,
            `&help <command>`
        ]
        let i = 0
        setInterval(() => {
            bot.user.setActivity(statuses[i])
            i = ++i % statuses.length
        }, 3000)
    }
}