const { Client } = require('discord.js')
const dotenv = require('dotenv')
dotenv.config()
const token = process.env.TOKEN
const bot = new Client()

bot.login(token)
    .catch(console.error);

bot.on('ready', () => {
    console.log(`${bot.user.username}を起動しました。`)
    bot.user.setActivity("Googleの正しい発音", { type: 'LISTENING' })
        .catch(console.error)
})