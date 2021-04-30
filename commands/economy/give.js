


const db = require('../../db.js');
const embeds = require('../../functions/embeds')
const functions = require('../../functions/functions')

const Discord = require('discord.js');





module.exports = {
	name: 'give',
	description: 'Give money to a user!',
	aliases: ['pay', 'send'],
	usage: '`a.give <amount> @user`',
	category: 'economy',

	async execute(message, args) {

		var amount;


		if (!message.mentions.users.first()) return embeds.errorEmbed(message, 'You have to **mention** someone!')
		if (args[0][0] === '<') {
			amount = parseInt(args[1])
		}else{
			amount = parseInt(args[0])
		}

		if(!parseInt(amount)) return embeds.errorEmbed(message, 'You have to say **how much** you want to give.')


		var giver = message.author;
		var reciever = message.mentions.users.first();
		if(giver.id === reciever.id) return message.errorEmbed(message, 'You can\'t send money to your self!')
		var recieverResults = await db.fetch(reciever.id)

		var giverResults = await db.fetch(giver.id)
		if(giverResults.bal < amount) return message.errorEmbed(message, "You don't have enough money!")
		if(amount < 1) return message.errorEmbed(message, "What money are you trying to give? lmao.")

		await db.set(giver.id, "bal", giverResults.bal - amount)
		await db.set(reciever.id, "bal", recieverResults.bal + amount)

		message.reply(
			`You gave ${reciever.username} **$${functions.comma(amount)}**, now you have **$${giverResults.bal - amount}** and they have **$${recieverResults.bal + amount}**.`
		)


	},
};

