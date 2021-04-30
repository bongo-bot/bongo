
const Discord = require('discord.js');
const db = require("../../db")
const embeds = require("../../functions/embeds")

module.exports = {
    name: 'disable',
    description: 'Disable commands!',
    usage: '`a.disable <command>`',
    category: 'utility',

    async execute(message, args) {

        var command = message.client.commands.get(args[0]) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
        if (!command) return message.channel.send("This is not a valid command.")

        if (!message.member.hasPermission('ADMIN')) {
            return message.reply('You cannot use the **disable** command.');
        }


        var result = await db.fetchguild(message.guild.id)
        if (result.disabled[command.name]) return message.channel.send("This command is already disabled.")

        
        result.disabled[command.name] = true
        await db.guildset(message.guild.id, "disabled", result.disabled)

        console.log(result.disabled)



	},
};