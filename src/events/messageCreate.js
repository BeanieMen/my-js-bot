const { Events } = require('discord.js');
const words = require("../commands/res/words.js")["WORDS"]
const fs = require("fs");


module.exports = {
	name: Events.MessageCreate,
	async execute(msg) {
		console.log("message created")

		if (!msg.content.startsWith("/")) { return };
		msglist = msg.content.split(" ");

		if (msglist[0] == "/wordle") {
			switch (msglist[1]) {
				case "start":
					var data = fs.readFileSync("./game.json", 'utf8')
					data = JSON.parse(data)

					var current_word = words[Math.floor(Math.random() * words.length)]
					var uid = msg.author.id
					userdata = { word: current_word, tries: 6 }
					data[uid] = userdata

					console.log(data)
					data = JSON.stringify(data);
					console.log(data)
					fs.writeFile('./game.json', data, 'utf8', (err) => {
						if (err) throw err;
						console.log('Data written to file');
					});

					await msg.reply(current_word)
					break

				case "guess":
					data = fs.readFileSync("./game.json", 'utf8')
					data = JSON.parse(data)
					let original = data[msg.author.id]["word"].split("")
					let bot_reply = ""
					if (!msglist[2]) {
						msg.reply("please specify a word")
					}
					if (msg.length < 5 || !words.includes(msglist[2])) {
						msg.reply("this is not a valid 5 letter word")
						return
					}

					guess = msglist[2].split("")
					console.log(guess, original)
					if (guess == original) {
						data[msg.author.id]["tries"] -= 1
						msg.reply(`You got it in ${6 - data[msg.author.id]["tries"]} tries`)
					}
					for (i = 0; i < guess.length; i++) {
						if (guess[i] == original[i]) {
							bot_reply += ":green_circle:"
						}
						else if (original.includes(guess[i])) {
							bot_reply += ":yellow_circle:";
						}
						else {
							bot_reply += ":black_circle:"
						}
					}

					data[msg.author.id]["tries"] -= 1
					msg.reply(bot_reply)
					msg.reply(`You have ${data[msg.author.id]["tries"]} left`)
					data = JSON.stringify(data)

					fs.writeFile('./game.json', data, 'utf8', (err) => {
						if (err) throw err;
						console.log("written");
					});

			}

		}

	},
};
