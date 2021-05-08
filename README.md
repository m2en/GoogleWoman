# GoogleWoman

Discord で [『Googleの正しい発音
』](https://www.youtube.com/watch?v=QL2Wg3b6g8I) を再生するBotです。

## Usage(限界鯖民向け)
- このBotは [限界開発鯖](https://approvers.dev/) でのみ使えます。
1. VCへ参加します。
> BOTが参加できるVCのみ再生できます。
2. `g:<再生したい音楽のid>` を送信します。idは限界開発鯖内で `g:help` を実行するか、 [Document/id.md](https://github.com/Meru92/GoogleWoman/blob/main/Document/id.md) から参照。
3. Done.
<details><summary>Usage(一般向け)</summary><div>

- ダウンロードせずに [index.js](https://github.com/Meru92/GoogleWoman/blob/main/index.js) を見てコピペプログラミングすることをおすすめします。
1. [Release](https://github.com/Meru92/GoogleWoman/releases) から `index.js` をダウンロード。適当なところにファイルを作成しブチ込みます。
2. ファイルに移動します。
```
$ cd <pass>
```
3. `package.json` を生成します。
```
$ npm init
```
4. モジュールをダウンロードします。
```
$ npm i discord.js @discordjs/opus ffmpeg-static ytdl-core
```
5. `index.js` の以下の行を削除します。

[= 2 =](https://github.com/Meru92/GoogleWoman/blob/f4d5c8d1272a1562fed4224955050a5c668db3e1/index.js#L2)
```js
const dotenv = require('dotenv')
```
[= 4, 5 =](https://github.com/Meru92/GoogleWoman/blob/f4d5c8d1272a1562fed4224955050a5c668db3e1/index.js#L4)
```js
dotenv.config()
const token = process.env.TOKEN
```
6. `index.js` の以下の行を編集します。  

[= 9 =](https://github.com/Meru92/GoogleWoman/blob/f4d5c8d1272a1562fed4224955050a5c668db3e1/index.js#L9)
```js
bot.login('your token')
    .catch(console.error);
```
</div></details>

## Use module etc...
- @discordjs/opus
- discord.js
- dotenv
- ffmpeg-static
- nodemon
- ytdl-core