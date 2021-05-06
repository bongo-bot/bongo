const embeds = require('../../functions/embeds')
const Discord = require('discord.js');
module.exports = {
    name: 'showrole',
    description: 'Purge 1-99 messages from the chat',
    usage: '`a.show <role name>`',
    category: '',


    async execute(message, args) {

        if (message.author.id !== '248692731163967498') return



        await message.guild.members.fetch()
        let role = message.guild.roles.cache.find(role => role.name === args.join` `);

        if (!role) return embeds.errorEmbed(message, "Invalid role!")
        var text = role.members.map(m => m.id + ' - ' + m.user.tag + '\n');
        var string = "";
        var i;
        console.log(text.length)
        if (text.length > 30) {



            var string = "";
            var i;
            for (i = 0; i < text.length; i++) {
                if ((i) % 30 === 0 && i !== 0) {
                    message.channel.send('```css\n' + string + '```')
                    string = ""
                };

                string = string + text[i]
            }
            if ((i) % 30 !== 0) {
                message.channel.send('```css\n' + string + '```')

            }


        } else {
            message.channel.send('```css\n' + text.join('') + '```')

        }



    },
};














