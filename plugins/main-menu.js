import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'
import fs from 'fs'
import fetch from 'node-fetch'
const { generateWAMessageFromContent, proto, getDevice } = (await import('@whiskeysockets/baileys')).default
let estilo = (text, style = 1) => {
  var xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  var yStr = Object.freeze({
    1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
  });
  var replacer = [];
  xStr.map((v, i) => replacer.push({
    original: v,
    convert: yStr[style].split('')[i]
  }));
  var str = text.toLowerCase().split('');
  var output = [];
  str.map(v => {
    const find = replacer.find(x => x.original == v);
    find ? output.push(find.convert) : output.push(v);
  });
  return output.join('');
};
const defaultMenu = {
  before: `*${ucapan()} \`%name\`*

❀ _\`ᴀᴄᴛɪᴠᴏ\`_ :: %muptime
❀ _\`ᴜꜱᴜᴀʀɪᴏꜱ\`_ :: _%rtotalreg de %totalreg_
❀ _\`estrellas\`_ :: _%estrellas_
❀ _\`ᴘʀᴇꜰɪᴊᴏ\`_ :: _< . >_
❀ _\`ᴘᴀᴛʀᴏᴄɪɴᴀᴅᴏʀ\`_ :: _Tk-Host_
➫ _\`ᴛᴏᴛᴀʟ ᴄᴏᴍᴀɴᴅᴏꜱ\`_ :: _%totalf_

⭒─ׄ─ׅ─ׄ──ׄ─ׅ─ׄ─ׅ─ׄ─ׄ─ׄ─ׅ─ׄ─⭒
 %readmore
  `.trimStart(),
  header: '✧*̥˚ ︶︶︶︶︶︶︶︶︶  ✧*̥˚\n┊ %category \n✧*̥˚ ︶︶︶︶︶︶︶︶︶  ✧*̥˚',
  body: '*┊ ❀   ᠀᠀ㅤ۟ 📓* %cmd %isestrellas %isPremium',
  footer: '  ︶︶︶︶︶︶︶︶︶︶︶︶\n\n',
  after: ``,
  }
let handler = async (m, { conn, usedPrefix: _p, __dirname, args, command }) => {

  let tags = {
    "main": "❀ 「 *`PRINCIPAL`* 」 ❀",
    "tk": "❀ 「 *`TK-HOSTING`* 」 ❀",
    "info": "❀ 「 *`INFORMACION`* 」 ❀",
    "search": "❀ 「 *`SEARCH`* 」 ❀",
    "rpg": "❀ 「 *`RPG`* 」 ❀",
    "nable": "❀ 「 *`ON - OFF`* 」 ❀",
    "start": "❀ 「 *`START`* 」 ❀",
    "sticker": "❀ 「 *`STICKER`* 」 ❀",
    "dl": "❀ 「 *`DOWNLOADER`* 」 ❀",
    "ai": "❀ 「 *`INTELIGENCIAS`* 」 ❀",
    "tools": "❀ 「 *`TOOLS`* 」 ❀",
    "anonymous": "❀ 「 *`ANONYMOUS`* 」 ❀",
    "confesar": "❀ 「 *`CONFESIONES`* 」 ❀",
    "internet": "❀ 「 *`INTERNET`* 」 ❀",
    "anime": "❀ 「 *`ANIME`* 」 ❀",
    "group": "❀ 「 *`GROUP`* 」 ❀",
    "owner": "❀ 「 *`OWNER`* 」 ❀",
  }

  try {
    // DEFAULT MENU
    let dash = global.dashmenu
    let m1 = global.dmenut
    let m2 = global.dmenub
    let m3 = global.dmenuf
    let m4 = global.dmenub2

    // COMMAND MENU
    let cc = global.cmenut
    let c1 = global.cmenuh
    let c2 = global.cmenub
    let c3 = global.cmenuf
    let c4 = global.cmenua

    // LOGO L P
    let lprem = global.lopr
    let llim = global.lolm
    let tag = `@${m.sender.split('@')[0]}`
    let device = await getDevice(m.id)

    //-----------TIME---------
    let ucpn = `${ucapan()}`
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let _mpt
    if (process.send) {
      process.send('uptime')
      _mpt = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let mpt = clockString(_mpt)
    let usrs = db.data.users[m.sender]


    /**************************** TIME *********************/
    let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    let wibh = moment.tz('Asia/Jakarta').format('HH')
    let wibm = moment.tz('Asia/Jakarta').format('mm')
    let wibs = moment.tz('Asia/Jakarta').format('ss')
    let wit = moment.tz('Asia/Jayapura').format('HH:mm:ss')
    let wita = moment.tz('Asia/Makassar').format('HH:mm:ss')
    let wktuwib = `${wibh} H ${wibm} M ${wibs} S`

    let mode = global.opts['self'] || global.opts['owneronly'] ? 'Private' : 'Publik'
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { age, exp, estrellas, level, role, registered, money } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let premium = global.db.data.users[m.sender].premiumTime
    let prems = `${premium > 0 ? 'Premium' : 'Free'}`
    let platform = os.platform()

    //---------------------
    let totalf = Object.values(global.plugins).filter(
    (v) => v.help && v.tags
  ).length;
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        estrellas: plugin.estrellas,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%_p' + help)
                .replace(/%isestrellas/g, menu.estrellas ? '◜🪙◞' : '')
                .replace(/%isPremium/g, menu.premium ? '◜🎫◞' : '')
//                .replace(/%isestrellas/g, menu.estrellas ? estrellas : '')
//                .replace(/%isPremium/g, menu.premium ? lprem : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      tag, dash, m1, m2, m3, m4, cc, c1, c2, c3, c4, lprem, llim,
      ucpn, platform, wib, mode, _p, money, age, tag, name, prems, level, estrellas, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role, totalf,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

    let img = 'https://i.ibb.co/rtLQsxW/file.jpg'
    await m.react('⭐')
    await conn.sendMessage(m.chat, {
      image: { url: img },
      caption: estilo(text),
      footer: dev,
      buttons: [
        {
          buttonId: `.ping`,
          buttonText: {
            displayText: 'PING',
          },
        },
        {
          buttonId: `.owner`,
          buttonText: {
            displayText: 'OWNER',
          },
        },
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: m })

//    await conn.sendFile(m.chat, img, 'thumbnail.jpg', text.trim(), m, null, fake)
  } catch (e) {
    conn.reply(m.chat, ' error', m)
    throw e
  }
}
handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(allmenu|menu|menú|\?)$/i
handler.register = true
handler.exp = 3

export default handler

//----------- FUNCIÓN -------

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, ' H ', m, ' M ', s, ' S '].map(v => v.toString().padStart(2, 0)).join('')
}
function clockStringP(ms) {
  let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
  let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [ye, ' *Years 🗓️*\n', mo, ' *Month 🌙*\n', d, ' *Days ☀️*\n', h, ' *Hours 🕐*\n', m, ' *Minute ⏰*\n', s, ' *Second ⏱️*'].map(v => v.toString().padStart(2, 0)).join('')
}
function ucapan() {
    const time = moment.tz('America/Buenos_Aires').format('HH')
    let res = "Buenas Noches🌙"
    if (time >= 5) {
        res = "Buena Madrugada🌄"
    }
    if (time > 10) {
        res = "Buenos días☀️"
    }
    if (time >= 12) {
        res = "Buenas Tardes🌅"
    }
    if (time >= 19) {
        res = "Buenas Noches🌙"
    }
    return res
}
