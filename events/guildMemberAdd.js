module.exports = {
    event: "guildMemberAdd",
    once: false,

    run(member){
        console.log(member.id)
    }
}