const { Events } = require('discord.js');
const words = require("../commands/res/words.js")["WORDS"]
const fs = require("fs")


module.exports = {
	name: Events.MessageCreate,
	async execute(msg) {
		console.log("message created")
		if (!msg.content.startsWith("/")) { return };
		msglist = msg.content.split(" ");
		if (msglist[0] == "/wordle") {
			switch (msglist[1]) {
				case "start":
					var current_word = words[Math.floor(Math.random() * words.length)]
					let data = {
						name: msg.author.id,
						word: current_word
					}
					console.log(data)
					data = JSON.stringify(data);
					console.log(data)
					fs.writeFile('./igame.json', data, 'utf8', (err) => {
						if (err) throw err;
						console.log('Data written to file');
					});

				case "guess":
					if (current_word) {
						await msg.reply("game has started")
					}
					else {
						await msg.reply("start the game")
					}
			}
			await msg.reply(words[Math.floor(Math.random() * words.length)]);

		}

	},
};
