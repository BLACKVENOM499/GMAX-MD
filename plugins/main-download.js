const { fetchJson } = require("../lib/functions");
const { downloadTiktok } = require('@mrnima/tiktok-downloader');
const { facebook } = require("@mrnima/facebook-downloader");
const cheerio = require("cheerio");
const { igdl } = require("ruhend-scraper");
const axios = require('axios');
const { cmd, commands } = require("../command");
const { ytsearch, ytmp3, ytmp4 } = require('@dark-yasiya/yt-dl.js');
const apilink = 'https://www.dark-yasiya-api.site'

cmd({
  pattern: 'fb',
  react: "🏷️",
  alias: ["facebook"],
  desc: "Download Facebook videos",
  category: "download",
  filename: __filename
}, async (bot, message, chat, options) => {
  try {
    const { from, q: url, reply } = options;

    // Validate URL
    if (!url || !url.startsWith("https://")) {
      return reply("Please provide a valid Facebook video URL.");
    }

    // React to the command
    await bot.sendMessage(from, { react: { text: '⏳', key: message.key } });

    // Fetch Facebook video details
    const videoData = await facebook(url);
    if (!videoData || !videoData.result) {
      return reply("Failed to fetch Facebook video details. Please try again.");
    }

    // Build options menu
    const caption = `
╭═════════════════○
*Duration*: ${videoData.result.duration}
╰═════════════════○
═════════════════○
╭═════════════════○
│ © 🎉 𝙏𝙊 𝘿𝘼𝙒𝙉𝙇𝙊𝘼𝘿 𝙎𝙀𝙉𝘿 : 🔢
│
│ ➽ *VIDEO DAWNLOADING*
> 1️⃣ *ꜱᴅ ᴠɪᴅᴇᴏ*
> 2️⃣ *ʜᴅ ᴠɪᴅᴇᴏ*
│ 
│ ═════════════════
│ 
│ ➽ *OTHER DAWNLOADING*
> 3️⃣ *ᴀᴜᴅɪᴏ*
> 4️⃣ *ᴅᴏᴄᴜᴍᴇɴᴛ*
> 5️⃣ *ᴠᴏɪᴄᴇ*
╰═════════════════○

> *© 𝙿𝙾𝚆𝙴𝙰𝚁𝙳 𝙱𝚈 𝚀𝚄𝙴𝙴𝙽 𝚁𝙰𝚂𝙷𝚄 𝙼𝙳 ✾*
    `;

    const menuMessage = await bot.sendMessage(from, {
      image: { url: videoData.result.thumbnail },
      caption,
    }, { quoted: message });

    // Listen for user response
    bot.ev.on("messages.upsert", async (update) => {
      const response = update.messages[0];
      if (!response.message) return;

      const userChoice = response.message.conversation || response.message.extendedTextMessage?.text;
      const isReply = response.message.extendedTextMessage?.contextInfo.stanzaId === menuMessage.key.id;

      if (isReply) {
        await bot.sendMessage(from, { react: { text: '⬇️', key: response.key } });

        const { links } = videoData.result;

        switch (userChoice) {
          case "1":
            await bot.sendMessage(from, { video: { url: links.SD }, caption: "> *© 𝙿𝙾𝚆𝙴𝙰𝚁𝙳 𝙱𝚈 𝚀𝚄𝙴𝙴𝙽 𝚁𝙰𝚂𝙷𝚄 𝙼𝙳 𝚂𝙳 𝚅𝙸𝙳𝙴𝙾*" });
            break;
          case "2":
            await bot.sendMessage(from, { video: { url: links.HD }, caption: "> *© 𝙿𝙾𝚆𝙴𝙰𝚁𝙳 𝙱𝚈 𝚀𝚄𝙴𝙴𝙽 𝚁𝙰𝚂𝙷𝚄 𝙼𝙳 𝙷𝙳 𝚅𝙸𝙳𝙴𝙾 ✾*" });
            break;
          case "3":
            await bot.sendMessage(from, { audio: { url: links.SD }, mimetype: "audio/mpeg" });
            break;
          case "4":
            await bot.sendMessage(from, {
              document: { url: links.SD },
              mimetype: "audio/mpeg",
              fileName: "Facebook_Audio.mp3",
              caption: "Here is your audio as a document.",
            });
            break;
          case "5":
            await bot.sendMessage(from, { audio: { url: links.SD }, mimetype: "audio/mp4", ptt: true });
            break;
          default:
            reply("Invalid choice. Please reply with a valid number.");
        }

        await bot.sendMessage(from, { react: { text: '⬆️', key: response.key } });
      }
    });

  } catch (error) {
    console.error(error);
    reply("An error occurred while processing your request. Please try again.");
  }
});

cmd({
  pattern: "tiktok",
  alias: ['tt'],
  react: '🎥',
  desc: "Download TikTok videos",
  category: "download",
  filename: __filename
}, async (bot, message, chat, options) => {
  try {
    const { from, q: url, reply } = options;

    // Validate URL
    if (!url || !url.startsWith("https://")) {
      return reply("Please provide a valid TikTok URL.");
    }

    // React to command
    chat.react('⬇️');

    // Fetch download links
    const videoData = await downloadTiktok(url);
    if (!videoData || !videoData.result) {
      return reply("Failed to fetch TikTok video details. Please try again.");
    }

    // Send options to user
    const caption = `
╭═════════════════○
*Title*: ${videoData.result.title}
╰═════════════════○
═════════════════○
╭═════════════════○
│ © 🎉 𝙏𝙊 𝘿𝘼𝙒𝙉𝙇𝙊𝘼𝘿 𝙎𝙀𝙉𝘿 : 🔢
│    
│
│ ➽ *DAWNLOADING VIDEO FILE 🎬*
> 1️⃣ *ꜱᴅ ᴠɪᴅᴇᴏ*
> 2️⃣ *ʜᴅ ᴠɪᴅᴇᴏ*
│
│═════════════════○
│
│ ➽ *DAWNLOADING DOCUMENT 🎧*
> 3️⃣ *ᴀᴜᴅɪᴏ*
│ 
╰═════════════════○

> *© 𝙿𝙾𝚆𝙴𝙰𝚁𝙳 𝙱𝚈 𝚀𝚄𝙴𝙴𝙽 𝚁𝙰𝚂𝙷𝚄 𝙼𝙳 ✾*
    `;
    const menuMessage = await bot.sendMessage(from, {
      image: { url: videoData.result.image },
      caption,
    });

    // Wait for user selection
    bot.ev.on("messages.upsert", async (update) => {
      const response = update.messages[0];
      if (!response.message) return;

      const userChoice = response.message.conversation || response.message.extendedTextMessage?.text;
      const isReply = response.message.extendedTextMessage?.contextInfo.stanzaId === menuMessage.key.id;

      if (isReply) {
        // Process user selection
        chat.react('⬇️');
        const { dl_link } = videoData.result;

        if (userChoice === '1') {
          await bot.sendMessage(from, { video: { url: dl_link.download_mp4_1 }, caption: "> *© 𝙿𝙾𝚆𝙴𝙰𝚁𝙳 𝙱𝚈 𝚀𝚄𝙴𝙴𝙽 𝚁𝙰𝚂𝙷𝚄 𝙼𝙳 𝚂𝙳 𝚅𝙸𝙳𝙴𝙾 ✾*" });
        } else if (userChoice === '2') {
          await bot.sendMessage(from, { video: { url: dl_link.download_mp4_2 }, caption: "> *© 𝙿𝙾𝚆𝙴𝙰𝚁𝙳 𝙱𝚈 𝚀𝚄𝙴𝙴𝙽 𝚁𝙰𝚂𝙷𝚄 𝙼𝙳 𝙷𝙳 𝚅𝙸𝙳𝙴𝙾 ✾*" });
        } else if (userChoice === '3') {
          await bot.sendMessage(from, { audio: { url: dl_link.download_mp3 }, mimetype: "audio/mpeg" });
        } else {
          reply("Invalid choice. Please reply with 1, 2, or 3.");
        }
        chat.react('⬆️');
      }
    });

  } catch (error) {
    console.error(error);
    reply("An error occurred. Please try again.");
  }
});
