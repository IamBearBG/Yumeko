import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
   await m.react('🎉');

    let fkontak = { 
        "key": { 
            "participants": "0@s.whatsapp.net", 
            "remoteJid": "status@broadcast", 
            "fromMe": false, 
            "id": "Halo" 
        }, 
        "message": { 
            "contactMessage": { 
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            }
        }, 
        "participant": "0@s.whatsapp.net" 
    };

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let name = await conn.getName(who);
    let edtr = `@${m.sender.split`@`[0]}`;
    let username = conn.getName(m.sender);

    // VCARD
    let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp;  IamBearBG\nNICKNAME:IamBearBG\nORG: IamBearBG\nTITLE:soft\nitem1.TEL;waid=51939658716:+51 93 9 658 716\nitem1.X-ABLabel:WhatsApp Owner\nitem2.URL:https://github.com/IamBearBG/Yumeko\nitem2.X-ABLabel:💬 More\nitem3.EMAIL;type=INTERNET: iambearbg@gmail.com\nitem3.X-ABLabel:Correo soporte\nitem4.ADR:;;Perú;;;;\nitem4.X-ABADR:💬 More\nitem4.X-ABLabel: Localización\nBDAY;value=date:01-10-2009\nEND:VCARD`;

    const tag_own = await conn.sendMessage(m.chat, { 
        contacts: { 
            displayName: "Creador",
            contacts: [{ vcard }] 
        }
    }, { quoted: estilo });

    let txt = `✧ *Hola \`${username}\` este es*\n*el contacto de mi creador*`;

    await conn.sendMessage(m.chat, {
        text: txt,
        footer: '✧ Powered By IamBearBG',
        buttons: [
            {
                buttonId: ".menu",
                buttonText: {
                    displayText: 'MENU BOT'
                },
                type: 1
            }
        ],
        viewOnce: true,
        headerType: 1
    }, { quoted: m });
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;
