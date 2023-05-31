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
					write("./game.json", data)

					break

				case "guess":
					data = fs.readFileSync("./game.json", 'utf8')
					data = JSON.parse(data)
					authid = msg.author.id
					if (!data[msg.author.id]) {
						msg.reply("please start the game by doing ```/wordle start``` ")
					}

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
						delete data.authid
						write("./game.json", data)
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

						data[msg.author.id]["tries"] -= 1
						if (data[msg.author.id]["tries"] == 0) {
							msg.reply("You lost, The word was " + data[msg.author.id]["word"])
							delete data.authid
							write("./game.json", data)

						}
						else {
							msg.reply(bot_reply)
							msg.reply(`You have ${data[msg.author.id]["tries"]} left`)
							data = JSON.stringify(data)
							write("./game.json", data)
						}
					}

			}

		}

	},
};
