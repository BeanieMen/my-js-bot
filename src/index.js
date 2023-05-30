import {
  Client,
  GatewayIntentBits,
} from 'discord.js';


const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.cid;
const GUILD_ID = process.env.gid;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});


client.on('ready', () => console.log(`${client.user.tag} has logged in!`));

client.on('messageCreate', msg => {
  msg.channel.send("hey girly")
  console.log(msg)
  return
});

async function main() {
  try {
    client.login(TOKEN);
  } catch (err) {
    console.log(err);
  }
}

main();
