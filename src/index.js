const { Client } = require('discord.js')
const dotenv = require('dotenv')
dotenv.config()
const token = process.env.TOKEN
const bot = new Client()
const prefix = 'g:'

bot.login(token)
    .catch(console.error);

bot.on('ready', () => {
    console.log(`${bot.user.username}を起動しました。`)
    bot.user.setActivity("Googleの正しい発音", { type: 'LISTENING' })
        .catch(console.error)
})

bot.on('message', (message) => {
    if(!message.content.startsWith(`${prefix}`)) return;
    if(message.content === `${prefix}help`) {
        message.channel.send([
            '```asciidoc',
            '= GoogleWoman Help =',
            'g:help :: これです。',
            'g:gururu :: 『Googleの正しい発音』を再生します。',
            '```'
        ])
    }
})