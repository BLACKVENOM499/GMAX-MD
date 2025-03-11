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
    }
  } catch (error) {
    reply("*ERROR !!*");
    l(error);
  }
});
