import fetch from 'node-fetch'

let handler  = async (m, { conn, usedPrefix, command }) => {
let img = await (await fetch(`https://i.ibb.co/2t9VhmP/file.jpg`)).buffer()
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
let txt = `*Hola!, te invito a unirte a los grupos oficiales de la Bot para convivir con la comunidad :D*

1- Yumeko ✧
*✰* https://chat.whatsapp.com/LGFhgOIlxIJJN0U8EF90rQ

*─ׄ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׄ*

➠ Enlace anulado? entre aquí! 

✧ Canal Yumeko :
*✰* https://whatsapp.com/channel/0029Vb2NkWWFsn0ghn9mOA2G

♡ Canal TK-Host :
*✰* https://whatsapp.com/channel/0029VaGGynJLY6d43krQYR2g

> ${dev}`
await conn.sendFile(m.chat, img, "Thumbnail.jpg", txt, m, null, fake)
}
handler.help = ['grupos']
handler.tags = ['main']
handler.command = /^(grupos)$/i
export default handler