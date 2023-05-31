const { SlashCommandBuilder } = require("discord.js")
const { WORDS } = require("./res/words.js")

module.exports = {
  name: "wordle",
  description: "Plays a game of wordle with the user",
  data: new SlashCommandBuilder()
    .setName("wordle")
    .setDescription("Plays a game of wordle with the user"),
  async execute(interaction) {
    // random word from WORDS
    await interaction.reply(WORDS[Math.floor(Math.random() * WORDS.length)]);

  },
}
