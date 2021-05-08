const { Client, MessageEmbed } = require('discord.js')
const dotenv = require('dotenv')
const ytdl = require('ytdl-core')
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

bot.on('message', async (message) => {
    if(!message.content.startsWith(`${prefix}`)) return;
    if(message.content === `${prefix}help`) {
        await message.channel.send([
            '```asciidoc',
            '= GoogleWoman Help =',
            'g:help :: これです。',
            'g:gururu :: 『Googleの正しい発音』を再生します。',
            'g:mura :: 『『バイオハザード　ヴィレッジ』公式イメージソング「俺らこんな村いやだLv.100」』を再生します。長いので飽きたら切断してください。',
            'g:dis :: 再生を強制的に停止します。',
            '```'
        ])
        await message.channel.send(
            new MessageEmbed()
                .setTitle('このBOTのリポジトリ / Github')
                .setDescription('このBotのリポジトリを読むと彼女ができる！？')
                .setURL('https://github.com/Meru92/GoogleWoman')
        )
    } else if(message.content.startsWith(`${prefix}gururu`) && message.guild) {
        const channel = message.member.voice.channel
        if(!channel) return message.reply('『Googleの正しい発音』を再生するにはまず <#683939861539192865> などのVCチャンネルに参加してください。また音量にご注意ください。')
        const connection = await channel.join()
        const stream = ytdl(ytdl.getURLVideoID('https://www.youtube.com/watch?v=QL2Wg3b6g8I'), { filter: 'audioonly' })
        const dispatcher = connection.play(stream)
        message.reply()
        dispatcher.once('finish', () => {
            channel.leave()
            message.reply('再生しました。ぐるる！ <:gururu:840642008305500191>')
        })
    } else if(message.content.startsWith(`${prefix}mura`) && message.guild) {
        const channel_mura = message.member.voice.channel
        if(!channel_mura) return message.reply('『『バイオハザード　ヴィレッジ』公式イメージソング「俺らこんな村いやだLv.100」』を再生するにはまず <#683939861539192865> などのVCチャンネルに参加してください。また音量にご注意ください。')
        const connection_mura = await channel_mura.join()
        const stream_mura = ytdl(ytdl.getURLVideoID('https://www.youtube.com/watch?v=_Is8EOl18qk&t=79s'), {filter: 'audioonly'})
        const dispatcher_mura = connection_mura.play(stream_mura)
        dispatcher_mura.once('finish', () => {
            channel_mura.leave()
            message.reply('再生しました。')
        })
    } else if(message.content.startsWith(`${prefix}dis`)) {
        const channel_dis = message.member.voice.channel
        channel_dis.leave()
        await message.reply('再生を強制的に終了しました。')
    }
})