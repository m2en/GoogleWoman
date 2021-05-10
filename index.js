const { Client, MessageEmbed } = require('discord.js')
const dotenv = require('dotenv')
const ytdl = require('ytdl-core')
const video_url = require('./resources/video_url.json')
const url = require('./resources/url.json')
const config = require('./config/message.json')
dotenv.config()
const token = process.env.TOKEN
const bot = new Client()
const prefix = 'g:'
const version_prefix = 'v1.0.5'

bot.login(token)
    .catch(console.error);

bot.on('ready', () => {
    console.log(`${bot.user.username}を起動しました。実行バージョン： ${version_prefix}`)
    bot.user.setActivity("生徒たちに \"Google\" の正しい発音の教育中..... ")
        .catch(console.error)
})

bot.on('message', async (message) => {
    if(!message.content.startsWith(`${prefix}`)) return;
    if(message.content === `${prefix}help`) {
        await message.channel.send(
            new MessageEmbed()
                .setTitle('Google Woman')
                .setURL(url.github)
                .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                .setColor('YELLOW')
                .setFooter(`${version_prefix}`)
                .addField('💿｜再生：', [
                    '```asciidoc',
                    'g:play :: 『Googleの正しい発音』を再生します。',
                    'g:free-play [url] :: 指定されたURlを再生します。',
                    'g:dis :: 再生を強制的に停止します。',
                    '```',
                ])
                .addField('⭐｜その他：', [
                    '```asciidoc',
                    'g:help :: ヘルプを返します。',
                    'g:ping :: pingを返します。',
                    '```',
                ])
        )
    } else if(message.content.startsWith(`${prefix}play`) && message.guild) {
        const channel = message.member.voice.channel
        if(!channel) return message.reply(config.play_failure)
        await message.channel.send(config.play_start)
        const connection = await channel.join()
        const stream = ytdl(ytdl.getURLVideoID(video_url.google), { filter: 'audioonly' })
        const dispatcher = connection.play(stream)
        dispatcher.once('finish', () => {
            channel.leave()
            message.reply(config.play_done)
        })
    } else if(message.content.startsWith(`${prefix}free-play`)) {
        const url = message.content.split(' ')[1]
        if (!ytdl.validateURL(url)) return message.reply(config.play_failure_link)
        const channel = message.member.voice.channel
        if (!channel) return message.reply(config.play_failure_vc)
        const connection = await channel.join()
        await message.channel.send(
            new MessageEmbed()
                .setTitle(config.play_free)
                .setURL(url)
        )
        const stream = ytdl(ytdl.getURLVideoID(url), { filter: 'audioonly' })
        const dispatcher = connection.play(stream)
        dispatcher.once('finish', () => {
            channel.leave()
            message.reply(config.play_done)
        })
    } else if(message.content.startsWith(`${prefix}ping`)) {
        await message.channel.send('Pong! : ' + `${bot.ws.ping}ms`)
    } else if(message.content.startsWith(`${prefix}dis`)) {
        const channel_dis = message.member.voice.channel
        channel_dis.leave()
        await message.reply(config.play_forced_stop)
    } else if(["Google", "google", "グーグル", "ぐーぐる"].includes(message.content)) {
        await message.react('840642008305500191')
        /**
         * Releaseからソースコードを入手したときはこの Array.prototype.includes は削除してください。
         * でないとここの4つの文字列がチャンネルに送信されるとDiscordAPIErrorを吐きます。
         */
    }
    else {
        await message.channel.send(config.command_miss)
    }
})