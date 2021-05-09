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

bot.login(token)
    .catch(console.error);

bot.on('ready', () => {
    console.log(`${bot.user.username}を起動しました。`)
    bot.user.setActivity("Googleの正しい発音 - v1.0.3", { type: 'LISTENING' })
        .catch(console.error)
})

bot.on('message', async (message) => {
    if(!message.content.startsWith(`${prefix}`)) return;
    if(message.content === `${prefix}help`) {
        await message.channel.send([
            '```asciidoc',
            '= GoogleWoman Help - Ver1.0.3 =',
            '',
            '【💿再生】',
            'g:help :: これです。',
            'g:gururu :: 『Googleの正しい発音』を再生します。',
            'g:mura :: 『『バイオハザード　ヴィレッジ』公式イメージソング「俺らこんな村いやだLv.100」』を再生します。長いので飽きたら切断してください。',
            'g:damedane :: 『龍が如く5　ばかみたい full(桐生ver.）』を再生します。曲です。',
            'g:ten :: この点は出ねぇヨォオｵｵｵ！！！',
            '',
            '【⭐その他】',
            'g:play [url] :: 指定されたURlを再生します。',
            'g:dis :: 再生を強制的に停止します。',
            '```'
        ])
        await message.channel.send(
            new MessageEmbed()
                .setTitle('このBOTのリポジトリ / GitHub')
                .setDescription('このBotのリポジトリを読むと彼女ができる！？')
                .setURL(url.github)
        )
    } else if(message.content.startsWith(`${prefix}gururu`) && message.guild) {
        const channel = message.member.voice.channel
        if(!channel) return message.reply(config.play_failure)
        await message.channel.send("**__『Googleの正しい発音』__**を再生します。音量にご注意ください。")
        const connection = await channel.join()
        const stream = ytdl(ytdl.getURLVideoID(video_url.google), { filter: 'audioonly' })
        const dispatcher = connection.play(stream)
        dispatcher.once('finish', () => {
            channel.leave()
            message.reply('再生しました。ぐるる！ <:gururu:840642008305500191>')
        })
    } else if(message.content.startsWith(`${prefix}mura`) && message.guild) {
        const channel = message.member.voice.channel
        if(!channel) return message.reply(config.play_failure)
        await message.channel.send("**__『バイオハザード　ヴィレッジ』公式イメージソング「俺らこんな村いやだLv.100」__**を再生します。音量にご注意ください。")
        const connection = await channel.join()
        const stream = ytdl(ytdl.getURLVideoID(video_url.baio), {filter: 'audioonly'})
        const dispatcher = connection.play(stream)
        dispatcher.once('finish', () => {
            channel.leave()
            message.reply(config.play_done)
        })
    } else if(message.content.startsWith(`${prefix}damedane`) && message.guild) {
        const channel = message.member.voice.channel
        if(!channel) return message.reply(config.play_failure)
        await message.channel.send("**__『龍が如く5　ばかみたい full(桐生ver.）』__**を再生します。音量にご注意ください。")
        const connection = await channel.join()
        const stream = ytdl(ytdl.getURLVideoID(video_url.damenanoyo), { filter: 'audioonly' })
        const dispatcher = connection.play(stream)
        dispatcher.once('finish', () => {
            channel.leave()
            message.reply(config.play_done)
        })
    } else if(message.content.startsWith(`${prefix}ten`) && message.guild) {
        const channel = message.member.voice.channel
        if(!channel) return message.reply(config.play_failure)
        await message.channel.send("この点は出ねぇヨォオｵｵｵ！！！この点は出ねぇヨォオｵｵｵ！！！この点は出ねぇヨォオｵｵｵ！！！この点は出ねぇヨォオｵｵｵ！！！")
        const connection = await channel.join()
        const stream = ytdl(ytdl.getURLVideoID(video_url.ten), {filter: 'audioonly'})
        const dispatcher = connection.play(stream)
        dispatcher.once('finish', () => {
            channel.leave()
            message.reply(config.play_done)
        })
    } else if(message.content.startsWith(`${prefix}gennkai`) && message.guild) {
        const gennkai_channel = bot.channels.cache.get('840681185423130674')
        await message.reply(`**__${bot.user.username} 限界モード__**を行います。このモードは <#840681185423130674> に居座りながら快眠BGMを垂れ流し限界ポイントをためます。やめるときは \`g:dis\`を実行してください。`)
        const connection = await gennkai_channel.join()
        const stream = ytdl(ytdl.getURLVideoID('https://www.youtube.com/watch?v=KHuO05O2Lb4'), { filter: 'audioonly' })
        await connection.play(stream)
    }  else if(message.content.startsWith(`${prefix}dis`)) {
        const channel_dis = message.member.voice.channel
        channel_dis.leave()
        await message.reply(config.play_forced_stop)
    } else {
        await message.channel.send("そんなコマンドないです。コマンド一覧は\`g:help\`で確認できます。")
    }
})