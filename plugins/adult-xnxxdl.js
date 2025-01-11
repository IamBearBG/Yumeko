import fetch from 'node-fetch';
import cheerio from 'cheerio';


const handler = async (m, {conn, args, command, usedPrefix}) => {
  const datas = global
  
  if (!db.data.chats[m.chat].nsfw && m.isGroup) return m.reply('✧ *¡Estos comandos están desactivados!*');
  if (!args[0]) throw `*[✧ INFO ✧] Ingrese un enlace validó de xnxx, Ejemplo: ${usedPrefix + command} https://www.xnxx.com/video-14lcwbe8/rubia_novia_follada_en_cuarto_de_bano*`;
  try {
    await conn.reply(m.chat, '✧ El video esta siendo procesado, esperé un momento en lo que es enviado..\n\n﹣ El tiempo de envío depende del peso y duración del video', m, rcanal);
    let xnxxLink = '';
    if (args[0].includes('xnxx')) {
      xnxxLink = args[0];
    } else {
      const index = parseInt(args[0]) - 1;
      if (index >= 0) {
        if (Array.isArray(global.videoListXXX) && global.videoListXXX.length > 0) {
          const matchingItem = global.videoListXXX.find((item) => item.from === m.sender);
          if (matchingItem) {
            if (index < matchingItem.urls.length) {
              xnxxLink = matchingItem.urls[index];
            } else {
              throw `✧ No se encontró un enlace para ese numero, por favor ingresé un número entre el 1 y el ${matchingItem.urls.length}*`;
            }
          } else {
            throw `*✧ Para poder usar este comando de esta forma (${usedPrefix + command} <numero>), por favor realiza la búsqueda de vídeos con el comando ${usedPrefix}xnxxsearch <texto>*`;
          }
        } else {
          throw `*✧ Para poder usar este comando de ésta forma (${usedPrefix + command} <numero>), por favor realiza la búsqueda de vídeos con el comando ${usedPrefix}xnxxsearch <texto>*`;
        }
      }
    }
    const res = await xnxxdl(xnxxLink);
    const json = await res.result.files;
    conn.sendMessage(m.chat, {document: {url: json.high}, mimetype: 'video/mp4', fileName: res.result.title}, {quoted: m});
  } catch {
    throw `*[✧ INFO ✧] Error, por favor vuelva  a intentarlo*\n\n*- vea que el enlace sea similar a:\n*✧ https://www.xnxx.com/video-14lcwbe8/rubia_novia_follada_en_cuarto_de_bano*`;
  }
};
handler.command = ['xnxxdl'];
handler.register = true;
handler.group = true;
export default handler;

async function xnxxdl(URL) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}`, {method: 'get'}).then((res) => res.text()).then((res) => {
      const $ = cheerio.load(res, {xmlMode: false});
      const title = $('meta[property="og:title"]').attr('content');
      const duration = $('meta[property="og:duration"]').attr('content');
      const image = $('meta[property="og:image"]').attr('content');
      const videoType = $('meta[property="og:video:type"]').attr('content');
      const videoWidth = $('meta[property="og:video:width"]').attr('content');
      const videoHeight = $('meta[property="og:video:height"]').attr('content');
      const info = $('span.metadata').text();
      const videoScript = $('#video-player-bg > script:nth-child(6)').html();
      const files = {
        low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
        high: videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],
        HLS: videoScript.match('html5player.setVideoHLS\\(\'(.*?)\'\\);' || [])[1],
        thumb: videoScript.match('html5player.setThumbUrl\\(\'(.*?)\'\\);' || [])[1],
        thumb69: videoScript.match('html5player.setThumbUrl169\\(\'(.*?)\'\\);' || [])[1],
        thumbSlide: videoScript.match('html5player.setThumbSlide\\(\'(.*?)\'\\);' || [])[1],
        thumbSlideBig: videoScript.match('html5player.setThumbSlideBig\\(\'(.*?)\'\\);' || [])[1]};
      resolve({status: 200, result: {title, URL, duration, image, videoType, videoWidth, videoHeight, info, files}});
    }).catch((err) => reject({code: 503, status: false, result: err}));
  });
}
