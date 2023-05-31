const { Events } = require('discord.js');
const words = require("../commands/res/words.js")["WORDS"]
const fs = require("fs");

const write = (path, data) => {
	fs.writeFile(path, data, 'utf8', (err) => {
		if (err) throw err;
		console.log("written")
	})
}

module.exports = {
	name: Events.MessageCreate,
	async execute(msg) {
		console.log("message created")
		// parsing shit
		if (!msg.content.startsWith("/")) { return };
		msglist = msg.content.split(" ");

		if (msglist[0] == "/wordle") {
			switch (msglist[1]) {
				// when my boi starts the game
				case "start":
					var data = fs.readFileSync("./game.json", 'utf8')
					data = JSON.parse(data)
					// get random word and save to json
					var current_word = words[Math.floor(Math.random() * words.length)]
					var uid = msg.author.id
					userdata = { word: current_word, tries: 6 }
					data[uid] = userdata

					data = JSON.stringify(data)
					write("./game.json", data)

					break

				case "guess":

					data = fs.readFileSync("./game.json", 'utf8')
					data = JSON.parse(data)

					// get the random word
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

					if (guess.join("") == original.join("")) {

						data[msg.author.id]["tries"] -= 1
						msg.reply(`You got it in ${6 - data[msg.author.id]["tries"]} tries`)

						//rremove existing entry of user
						data[msg.author.id] = undefined
						data = JSON.stringify(data)
						fs.writeFile("./game.json", data, 'utf8', (err) => {
							if (err) throw err;
							console.log("written")
						})
					}

					else {
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
						key = msg.author.id
						data[msg.author.id]["tries"] -= 1
						if (data[msg.author.id]["tries"] == 0) {

							// remove entry
							msg.reply("You lost, The word was " + data[msg.author.id]["word"])
							data[msg.author.id] = undefined
							data = JSON.stringify(data)
							fs.writeFile("./game.json", data, 'utf8', (err) => {
								if (err) throw err;
								console.log("written")
							})
							return
						}



						msg.reply(bot_reply)
						msg.reply(`You have ${data[msg.author.id]["tries"]} tries left`)
						data = JSON.stringify(data)
					}

					fs.writeFile('./game.json', data, 'utf8', (err) => {
						if (err) throw err;
						console.log("written");
					});

			}

		}

	},
};
