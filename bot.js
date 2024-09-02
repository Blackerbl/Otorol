require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

const app = express();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers
  ]
});

const {
  TOKEN,
  PORT,
  GUILD_ID,
  MESSAGE_ID,
  EMOJI_ID,
  ROLE_ID,
  CHANNEL_ID
} = process.env;

client.once('ready', () => {
  console.log('Bot is ready!');
});

client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.id === MESSAGE_ID && reaction.emoji.id === EMOJI_ID) {
    const guild = await client.guilds.fetch(GUILD_ID);
    const member = await guild.members.fetch(user.id);

    if (!member.roles.cache.has(ROLE_ID)) {
      await member.roles.add(ROLE_ID);
      console.log(`Rol eklendi: ${user.username}`);
    }
  }
});

client.login(TOKEN);

// Basit bir sunucu kuruyoruz, böylece botumuz çevrim içi kalabilir
app.get('/', (req, res) => {
  res.send('Bot is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
