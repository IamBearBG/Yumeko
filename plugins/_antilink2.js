let linkRegex = /\b((https?:\/\/|www\.)?[\w-]+\.[\w-]+(?:\.[\w-]+)*(\/[\w\.\-\/]*)?)\b/i
export async function before(m, {isAdmin, isBotAdmin, text}) {
  if (m.isBaileys && m.fromMe) {
    return !0;
  }
  if (!m.isGroup) return !1;
  const chat = global.db.data.chats[m.chat];
  const delet = m.key.participant;
  const bang = m.key.id;
  const bot = global.db.data.settings[this.user.jid] || {};
  const user = `@${m.sender.split`@`[0]}`;
  const isGroupLink = linkRegex.exec(m.text);
  if (chat.antiLink2 && isGroupLink && !isAdmin) {
    if (isBotAdmin) {
      const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
      const linkThisGroup2 = `https://www.youtube.com/`;
      const linkThisGroup3 = `https://youtu.be/`;
      if (m.text.includes(linkThisGroup)) return !0;
      if (m.text.includes(linkThisGroup2)) return !0;
      if (m.text.includes(linkThisGroup3)) return !0;
    }
    await this.sendMessage(m.chat, {text: `*「 ANTI LINKS 」*\nNunca aprenden ${user} As roto las reglas del grupo, serás expulsado/a...!!`, mentions: [m.sender]}, {quoted: m});
    if (!isBotAdmin) return m.reply('✧ No soy admin! por tanto no puedo ejecutar la acción de expulsar');
    // await conn.sendButton(m.chat, `*「 ANTI LINKS 」*\nNunca aprenden, ${await this.getName(m.sender) As roto las reglas del grupo, serás expulsado/a...!!*${isBotAdmin ? '' : '\n\n*[✧ INFO ✧] El bot no es admin, no puede exterminar a las personas*'}`, author, ['DESACTIVAR ANTILINKS', '/disable antilink'], m)
    if (isBotAdmin && bot.restrict) {
      await conn.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: bang, participant: delet}});
      const responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      if (responseb[0].status === '404') return;
    } else if (!bot.restrict) return m.reply('*✧ El Owner no tiene activa la opción de restringir, No puedo ejecutar la acción');
  }
  return !0;
}