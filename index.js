const { default: axios } = require("axios")
const Discord = require("discord.js")

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

client
  .login("OTM0MDQ4ODA1MTMxNzk2NTAx.YeqavA.vV5nhAFtljIDtxxt9kXPPSFAqDA")
  .then(console.log("bot started"))

client.on("messageCreate", async (ctx) => {
  const minTrophies = 35000
  if (ctx.author.bot) return

  try {
    const { data } = await axios.get(
      `https://api.brawlstars.com/v1/players/%23${ctx.content}`,
      {
        headers: {
          Authorization: `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjM4Y2RkYTkwLTcwM2QtNDMxNy04ZWRkLTY1ODY2OWViNmU4NSIsImlhdCI6MTY0Mjc2NDQ2MSwic3ViIjoiZGV2ZWxvcGVyL2FmMzFiYjljLWU5OTgtNzc0YS1hODVjLTc3NWExNjBmYTFjMiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiOTQuMjUuMTgyLjE1NiIsIjAuMC4wLjAiXSwidHlwZSI6ImNsaWVudCJ9XX0.VOJ7-0ERX0zCNZn38QXyWYc_m9pGpG34Il4OvzLYNl027tcqmGbcul4F9bsO7vGWrxiSz5zdiuIYvM_CIVJXBA"}`,
        },
      }
    )

    ctx.reply(`нужно кубков ${minTrophies} у тебя ${data.trophies}`)
    if (data.trophies > minTrophies) {
      const role = ctx.member.guild.roles.cache.find(
        (role) => role.name === "Begemot"
      )
      ctx.member.roles.add(role)
      ctx.reply(`ты прошел проверка на длоха`)
    } else {
      ctx.reply(`ты лох`)
    }
  } catch (error) {
    ctx.reply(`Ты что скинул? бездарь`)
    console.log(error)
  }
})
