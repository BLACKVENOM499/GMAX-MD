const tiktokDownloader = {
  pattern: "tiktok",
  alias: ["ttdl", "tt"],
  react: "🏷️",
  desc: "Download TikTok Videos",
  category: "download",
  use: ".tiktok <Tiktok link>",
  filename: __filename
};

cmd(tiktokDownloader, async (bot, msg, quotedMsg, { 
  from, l, prefix, quoted, body, isCmd, command, args, q, 
  isGroup, sender, senderNumber, botNumber, botNumber2, pushname, 
  isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, 
  isBotAdmins, isAdmins, reply 
}) => {
  try {
    if (!q.includes("tiktok.com")) {
      return await reply("Please provide a valid TikTok link.");
    }
    const response = await fetchJson("https://vajira-api-0aaeb51465b5.herokuapp.com/download/tiktokdl?url=" + q);
    let message = "[👨‍💻 VAJIRA - MD 👨‍💻]\n\n*TIKTOK DOWNLOADER*\n\n*📃 Title:* " + response.result.title + "\n*✍🏼 Link:* " + q;

    if (config.MODE === "nonbutton") {
      const options = [
        {
          title: "Without Watermark",
          rows: [
            { title: "1.1", rowId: prefix + "ttw " + q, description: "Without Watermark" },
            { title: "1.2", rowId: prefix + "ttwd " + q, description: "Without Watermark Doc" }
          ]
        },
        {
          title: "With Watermark",
          rows: [
            { title: "2.1", rowId: prefix + "tnd " + q, description: "With Watermark" },
            { title: "2.2", rowId: prefix + "tndd " + q, description: "With Watermark Doc" }
          ]
        },
        {
          title: "Voice Cut Type 🎶",
          rows: [
            { title: "3.1", rowId: prefix + "ta " + q, description: "Audio Download" },
            { title: "3.2", rowId: prefix + "td " + q, description: "Document Download" }
          ]
        }
      ];

      const image = { url: response.result.thumbnail };
      const footer = { caption: message, footer: config.FOOTER, buttonText: "*🔢 Reply below number*", sections: options };

      const quotedData = { quoted: quotedMsg };
      return await bot.replyList(from, footer, quotedData);
    }

    if (config.MODE === "button") {
      const buttonOptions = [
        {
          title: "Without Watermark",
          rows: [
            { header: '', title: '', description: "Without Watermark", id: prefix + "ttw " + q },
            { header: '', title: '', description: "Without Watermark Doc", id: prefix + "ttwd " + q }
          ]
        },
        {
          title: "With Watermark",
          rows: [
            { header: '', title: '', description: "With Watermark", id: prefix + "tnd " + q },
            { header: '', title: '', description: "With Watermark Doc", id: prefix + "tndd " + q }
          ]
        },
        {
          title: "Voice Cut Type 🎶",
          rows: [
            { header: '', title: '', description: "Audio Download", id: prefix + "ta " + q },
            { header: '', title: '', description: "Document Download", id: prefix + "td " + q }
          ]
        }
      ];

      const buttons = {
        title: "Click Here⎙",
        sections: buttonOptions
      };

      const logo = { url: config.LOGO };
      const button1 = { displayText: "🪫 `SD` QUALITY VIDEO", buttonId: prefix + "ttw " + q };
      const button2 = { displayText: "🔋 `HD` QUALITY VIDEO", buttonId: prefix + "tnd " + q };
      const button3 = { displayText: "🎶 Audio file", buttonId: prefix + "ta " + q };

      const quotedData = { quoted: quotedMsg };

      await bot.sendMessage(from, {
        image: logo,
        caption: message,
        footer: config.FOOTER,
        buttons: [button1, button2, button3, {
          buttonId: "action",
          buttonText: { displayText: "Interactive Meta" },
          type: 4,
          nativeFlowInfo: { name: "single_select", paramsJson: JSON.stringify(buttons) }
        }],
        headerType: 1,
        viewOnce: true
      }, quotedData);
    }
  } catch (error) {
    reply("*ERROR !!*");
    l(error);
  }
});
