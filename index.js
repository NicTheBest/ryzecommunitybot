const Discord = require("discord.js")
const client = new Discord.Client(
    { intents: 32767,
        partials: ['MESSAGE', 'CHANNEL', 'REACTION']  }
)

client.login(process.env.token)

client.on("ready", () => {
    console.log("BOT ONLINE")
})

//------------------------------------------------------------------------------------------------------------//
//TICKET//

//Prima di tutto mandare il messaggio del ticket
client.on("messageCreate", message => {
    if (message.content == "!ticketr") {
        let embed = new Discord.MessageEmbed()
        .setTitle("<a:makeaticket:983869232154558464>__SISTEMA TICKET__<a:makeaticket:983869232154558464>")
        .setDescription("*Qui potrai sicuramente trovare il ticket adatto a te* \n \n <a:SirenaBlu:969898347014017105> | **TICKET SUPPORTO** <a:FrecciaDestra:969898345466318878> **__Apri questo ticket se hai bisogno di supporto__** \n \n 🤝 | **TICKET PARTNERSHIP** <a:FrecciaDestra:969898345466318878> **__Apri questo ticket se desideri fare una partnerhip__** \n \n ||ps: potrai aprire solo un ticket alla volta (anche se sono diversi)||")
        .setColor("#0006ff")
        .setTimestamp()
        .setFooter({ text: '⭐ Powered by Ryze Community ⭐', iconURL: 'https://cdn.discordapp.com/attachments/985176771471216700/985990397442555986/2020-11-16.jpg' })

        var button1 = new Discord.MessageButton()
            .setLabel("Ticket Supporto")
            .setCustomId("apriTicket")
            .setStyle("DANGER")
            .setEmoji("969898347014017105")

        var button2 = new Discord.MessageButton()
            .setLabel("🤝 Ticket Partnership")
            .setCustomId("apriTicketpartner")
            .setStyle("SUCCESS")

        var row = new Discord.MessageActionRow()
            .addComponents(button1)
            .addComponents(button2)

            message.delete()
            message.channel.send({embeds: [embed], components: [row] })
    }
})

//Ticket Supporto
client.on("interactionCreate", interaction => {
    if (interaction.customId == "apriTicket") {
        interaction.deferUpdate()
        if (interaction.guild.channels.cache.find(canale => canale.topic == `User ID: ${interaction.user.id}`)) {
            interaction.user.send("**__Hai un ticket aperto, assicurati di non aver nessun ticket aperto per crearne un altro__**").catch(() => { })
            return
        }
        interaction.guild.channels.create(interaction.user.username, {
            type: "text",
            topic: `User ID: ${interaction.user.id}`,
            parent: "937112469976006676", //Settare la categoria,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: ["VIEW_CHANNEL"]
                },
                {
                    id: interaction.user.id,
                    allow: ["VIEW_CHANNEL"]
                },
                { //Aggiungere l'id del ruolo che può visualizzare il ticket aperto
                    id: "937117801368416306", 
                    allow: ["VIEW_CHANNEL"]
                }
            ]
        }).then(canale => {
            var embed = new Discord.MessageEmbed()
            .setTitle("<a:makeaticket:983869232154558464> __TICKET SUPPORTO__ <a:makeaticket:983869232154558464>")
            .setDescription("**__Benvenuto nell'assistenza di questo server, mentre attende uno staff inizii ad esporre le sue problematiche__**")
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter({ text: '⭐ Powered by Ryze Community ⭐', iconURL: 'https://cdn.discordapp.com/attachments/985176771471216700/985990397442555986/2020-11-16.jpg' })

            var button2 = new Discord.MessageButton()
            .setLabel("Chiudi Ticket")
            .setCustomId("chiudiTicket")
            .setStyle("SUCCESS")
            .setEmoji("984118425263681546")
    
            var row = new Discord.MessageActionRow()
            .addComponents(button2)

            canale.send(` <@&937117801368416306>`)
            canale.send({embeds: [embed], components: [row] })
        }
)}})
client.on("interactionCreate", interaction => {
                if (interaction.customId == "chiudiTicket") {
                    interaction.deferUpdate()
                    interaction.channel.delete();
                
            }
})

//Ticket Partner
client.on("interactionCreate", interaction => {
    if (interaction.customId == "apriTicketpartner") {
        interaction.deferUpdate()
        if (interaction.guild.channels.cache.find(canale => canale.topic == `User ID: ${interaction.user.id}`)) {
            interaction.user.send("**__Hai un ticket aperto, assicurati di non aver nessun ticket aperto per crearne un altro__**").catch(() => { })
            return
        }
        interaction.guild.channels.create(interaction.user.username, {
            type: "text",
            topic: `User ID: ${interaction.user.id}`,
            parent: "937112469976006676", //Settare la categoria,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: ["VIEW_CHANNEL"]
                },
                {
                    id: interaction.user.id,
                    allow: ["VIEW_CHANNEL"]
                },
                { //Aggiungere l'id del ruolo che può visualizzare il ticket aperto
                    id: "937117801368416306", 
                    allow: ["VIEW_CHANNEL"]
                }
            ]
        })

        .then(canale => {
            var embed = new Discord.MessageEmbed()
            .setTitle("<a:makeaticket:983869232154558464> __TICKET PARTNERSHIP__ <a:makeaticket:983869232154558464>")
            .setDescription("**__Benvenuto nell'area partnership di questo server, la preghiamo di attendere l'arrivo di uno staff__**")
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter({ text: '⭐ Powered by Ryze Community ⭐', iconURL: 'https://cdn.discordapp.com/attachments/985176771471216700/985990397442555986/2020-11-16.jpg' })

            var button4 = new Discord.MessageButton()
            .setLabel("Chiudi Ticket")
            .setCustomId("chiudiTicketpartner")
            .setStyle("SUCCESS")
            .setEmoji("984118425263681546")
    
            var row = new Discord.MessageActionRow()
            .addComponents(button4)

            canale.send(` <@&937117801368416306>`) 
            canale.send({embeds: [embed], components: [row] })
        }
)}})
client.on("interactionCreate", interaction => {
                if (interaction.customId == "chiudiTicketpartner") {
                    interaction.deferUpdate()
                    interaction.channel.delete();
                
            }
})

//------------------------------------------------------------------------------------------------------------//

//VERIFICA
client.on("messageCreate", message => {
    if (message.content.startsWith("!ryzeverifica")) {

            var sondaggio = new Discord.MessageEmbed()
                .setColor("#12ff00")
                .setTitle("<:si5:985170878952255518>__VERIFICA__<:si5:985170878952255518>")
                .setDescription(`**Benvenuto nel server, prima di entrare ufficialmente nel server dovrai verificarti per garantirci che lei non sia un bot,** **__è semplicissimo__,** **ti basterà cliccare l'emoji qui sotto, buona permanenza**`) //Testo
                .setTimestamp()
                .setFooter({ text: '⭐ Powered by Ryze Community ⭐', iconURL: 'https://cdn.discordapp.com/attachments/985176771471216700/985990397442555986/2020-11-16.jpg' })
            message.delete()
            message.channel.send({embeds: [sondaggio]})
            .then(msg => {
                msg.react("<a:Si3:982186431634083871>")
            })
    }
})
//ruolo verifica
client.on("messageReactionAdd", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "989498387730685962") {
        if (messageReactionAdd._emoji.name == "Si3") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.add("937330656269189191");
        }
    }
})

//------------------------------------------------------------------------------------------------------------//

//AUTO ROLES PIATTAFORMA
client.on("messageCreate", message => {
    if (message.content.startsWith("!piattaforma")) {

            var sondaggio = new Discord.MessageEmbed()
                .setColor("#12ff00")
                .setTitle("<a:Pushpin:969898346254852096>__PIATTAFORMA__<a:Pushpin:969898346254852096>")
                .setDescription(`<:Xbox:969898346259021834> <a:FrecciaDestra:969898345466318878> **__Xbox__** \n <:Playstation:969898345818644560> <a:FrecciaDestra:969898345466318878> **__PlayStation__** \n 🖥️ <a:FrecciaDestra:969898345466318878> **__PC__** \n <:NintendoSwitch:985999774501179422> <a:FrecciaDestra:969898345466318878> **__Nintendo Switch__** \n 📱  <a:FrecciaDestra:969898345466318878> **__Telefono__**`) //Testo
                .setTimestamp()
                .setFooter({ text: '⭐ Powered by Ryze Community ⭐', iconURL: 'https://cdn.discordapp.com/attachments/985176771471216700/985990397442555986/2020-11-16.jpg' })
            message.delete()
            message.channel.send({embeds: [sondaggio]})
            .then(msg => {
                msg.react("<:Xbox:969898346259021834>")
                msg.react("<:Playstation:969898345818644560>")
                msg.react("🖥️")
                msg.react("<:NintendoSwitch:985999774501179422>")
                msg.react("📱")
            })
    }
})

//xbox aggiungi//
client.on("messageReactionAdd", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000723447623721060") {
        if (messageReactionAdd._emoji.name == "Xbox") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.add("985997107095797820");
        }
    }
})
//xbox rimuovi//
client.on("messageReactionRemove", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000723447623721060") {
        if (messageReactionAdd._emoji.name == "Xbox") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.remove("985997107095797820");
        }
    }
})
//playstation aggiungi//
client.on("messageReactionAdd", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000723447623721060") {
        if (messageReactionAdd._emoji.name == "Playstation") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.add("985997131775107132");
        }
    }
})
//playstation rimuovi//
client.on("messageReactionRemove", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000723447623721060") {
        if (messageReactionAdd._emoji.name == "Playstation") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.remove("985997131775107132");
        }
    }
})
//pc aggiungi//
client.on("messageReactionAdd", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000723447623721060") {
        if (messageReactionAdd._emoji.name == "🖥️") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.add("985997137508700190");
        }
    }
})
//pc rimuovi//
client.on("messageReactionRemove", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000723447623721060") {
        if (messageReactionAdd._emoji.name == "🖥️") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.remove("985997137508700190");
        }
    }
})
//nintendo aggiungi//
client.on("messageReactionAdd", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000723447623721060") {
        if (messageReactionAdd._emoji.name == "NintendoSwitch") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.add("985997143670145054");
        }
    }
})
//nintendo rimuovi//
client.on("messageReactionRemove", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000723447623721060") {
        if (messageReactionAdd._emoji.name == "NintendoSwitch") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.remove("985997143670145054");
        }
    }
})
//mobile aggiungi//
client.on("messageReactionAdd", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000723447623721060") {
        if (messageReactionAdd._emoji.name == "📱") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.add("985997149126934618");
        }
    }
})
//mobile rimuovi//
client.on("messageReactionRemove", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000723447623721060") {
        if (messageReactionAdd._emoji.name == "📱") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.remove("985997149126934618");
        }
    }
})

//------------------------------------------------------------------------------------------------------------//

//AUTO ROLES COLORI
client.on("messageCreate", message => {
    if (message.content.startsWith("!colori")) {

            var sondaggio = new Discord.MessageEmbed()
                .setColor("#ff0005")
                .setTitle("🎨__COLORI__🎨")
                .setDescription(`⚪ \<a:FrecciaDestra:969898345466318878> **__Bianco__** \n 🟡 \<a:FrecciaDestra:969898345466318878> **__Giallo__** \n 🔴 \<a:FrecciaDestra:969898345466318878> **__Rosso__** \n 🔵 \<a:FrecciaDestra:969898345466318878> **__Blu__** \n ⚫ \<a:FrecciaDestra:969898345466318878> **__Nero__** \n 🟣 \<a:FrecciaDestra:969898345466318878> **__Viola__** \n 🟢 \<a:FrecciaDestra:969898345466318878> **__Verde__** \n 🟠 \<a:FrecciaDestra:969898345466318878> **__Arancione__**`) //Testo
                .setTimestamp()
                .setFooter({ text: '⭐ Powered by Ryze Community ⭐', iconURL: 'https://cdn.discordapp.com/attachments/985176771471216700/985990397442555986/2020-11-16.jpg' })
            message.delete()
            message.channel.send({embeds: [sondaggio]})
            .then(msg => {
                msg.react("⚪")
                msg.react("🟡")
                msg.react("🔴")
                msg.react("🔵")
                msg.react("⚫")
                msg.react("🟣")
                msg.react("🟢")
                msg.react("🟠")
            })
    }
})

//bianco aggiungi//
client.on("messageReactionAdd", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000724846247940106") {
        if (messageReactionAdd._emoji.name == "⚪") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.add("985997164230635561");
        }
    }
})
//bianco rimuovi//
client.on("messageReactionRemove", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000724846247940106") {
        if (messageReactionAdd._emoji.name == "⚪") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.remove("985997164230635561");
        }
    }
})
//giallo aggiungi//
client.on("messageReactionAdd", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000724846247940106") {
        if (messageReactionAdd._emoji.name == "🟡") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.add("985997174968037496");
        }
    }
})
//giallo rimuovi//
client.on("messageReactionRemove", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000724846247940106") {
        if (messageReactionAdd._emoji.name == "🟡") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.remove("985997174968037496");
        }
    }
})
//rosso aggiungi//
client.on("messageReactionAdd", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000724846247940106") {
        if (messageReactionAdd._emoji.name == "🔴") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.add("985997170719215687");
        }
    }
})
//rosso rimuovi//
client.on("messageReactionRemove", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000724846247940106") {
        if (messageReactionAdd._emoji.name == "🔴") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.remove("985997170719215687");
        }
    }
})
//blu aggiungi//
client.on("messageReactionAdd", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000724846247940106") {
        if (messageReactionAdd._emoji.name == "🔵") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.add("985997180470976532");
        }
    }
})
//blu rimuovi//
client.on("messageReactionRemove", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000724846247940106") {
        if (messageReactionAdd._emoji.name == "🔵") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.remove("985997180470976532");
        }
    }
})
//nero aggiungi//
client.on("messageReactionAdd", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000724846247940106") {
        if (messageReactionAdd._emoji.name == "⚫") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.add("985997197470474290");
        }
    }
})
//nero rimuovi//
client.on("messageReactionRemove", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000724846247940106") {
        if (messageReactionAdd._emoji.name == "⚫") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.remove("985997197470474290");
        }
    }
})
//viola aggiungi//
client.on("messageReactionAdd", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000724846247940106") {
        if (messageReactionAdd._emoji.name == "🟣") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.add("985997191871094815");
        }
    }
})
//viola rimuovi//
client.on("messageReactionRemove", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000724846247940106") {
        if (messageReactionAdd._emoji.name == "🟣") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.remove("985997191871094815");
        }
    }
})
//verde aggiungi//
client.on("messageReactionAdd", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000724846247940106") {
        if (messageReactionAdd._emoji.name == "🟢") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.add("985997234464243722");
        }
    }
})
//verde rimuovi//
client.on("messageReactionRemove", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000724846247940106") {
        if (messageReactionAdd._emoji.name == "🟢") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.remove("985997234464243722");
        }
    }
})
//arancione aggiungi//
client.on("messageReactionAdd", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000724846247940106") {
        if (messageReactionAdd._emoji.name == "🟠") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.add("985997185764188190");
        }
    }
})
//arancione rimuovi//
client.on("messageReactionRemove", async function (messageReactionAdd, user) {
    if (user.bot) return

    if (messageReactionAdd.message.partial) await messageReactionAdd.message.fetch();

    if (messageReactionAdd.message.id == "1000724846247940106") {
        if (messageReactionAdd._emoji.name == "🟠") {
            var utente = messageReactionAdd.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.remove("985997185764188190");
        }
    }
})

//------------------------------------------------------------------------------------------------------------//

//BENVENUTO
client.on("guildMemberAdd", member => {
    if (member.user.bot) return
    var embed = new Discord.MessageEmbed()
        .setColor("#ef00ff")
        .setTitle("<a:Welcome:999724104515076216> __WELCOME TO RYZE COMMUNITY__ <a:Welcome:999724104515076216>")
        .setDescription(`${member.toString()} Grazie per esserti unito in ⚡ • 𝐑𝐲𝐳𝐞 𝐂𝐨𝐦𝐦𝐮𝐧𝐢𝐭𝐲 • ⚡ in questo server potrai trovare diverse cose, ma se hai bisogno di info non esitare a creare un ticket supporto nella chat <#989516097172680734>`)
        .setTimestamp()
        .setFooter({ text: '⭐ Powered by Ryze Community ⭐', iconURL: 'https://cdn.discordapp.com/attachments/985176771471216700/985990397442555986/2020-11-16.jpg' })

    client.channels.cache.get("999726470333206588").send({embeds: [embed]}); 
})

//ADDIO
client.on("guildMemberRemove", member => {
    if (member.user.bot) return
    var embed = new Discord.MessageEmbed()
        .setColor("#ef00ff")
        .setTitle("⚡ • 𝐑𝐲𝐳𝐞 𝐂𝐨𝐦𝐦𝐮𝐧𝐢𝐭𝐲 • ⚡")
        .setDescription(`${member.toString()} Ha lasciato il server ⚡ • 𝐑𝐲𝐳𝐞 𝐂𝐨𝐦𝐦𝐮𝐧𝐢𝐭𝐲 • ⚡`)
        .setTimestamp()
        .setFooter({ text: '⭐ Powered by Ryze Community ⭐', iconURL: 'https://cdn.discordapp.com/attachments/985176771471216700/985990397442555986/2020-11-16.jpg' })

    client.channels.cache.get("986011857951289364").send({embeds: [embed]}); 
})

//ANNUNCIO
client.on("messageCreate", message =>  { 
    if (message.content.startsWith("!annuncio")) {
        var args = message.content.split(/\s+/);
        var testo;
        testo = args.slice(1).join(" ");

        var azione = new Discord.MessageEmbed ()
        .setColor ("RANDOM") 
        .setTitle ("<a:annuncio3:972113993818861618> **__ANNUNCIO DALLO STAFF__** <a:annuncio3:972113993818861618>")
        .setDescription (`${testo} \n \n **__ANNOUNCEMENT BY__** <a:FrecciaDestra:969898345466318878> ${message.author.toString ()}`)
        .setTimestamp ()
        .setFooter({ text: '⭐ Powered by Ryze Community ⭐', iconURL: 'https://cdn.discordapp.com/attachments/985176771471216700/985990397442555986/2020-11-16.jpg' })
        message.delete ()
        message.channel.send ({embeds: [azione]});
        } 
})

//REGOLAMENTO
client.on("messageCreate", message => {
    if (message.content.startsWith("!regolamento")) {
        message.channel.send("\<:Rules2:999229234847416372>**__REGOLAMENTO RYZE COMMUNITY__**\<:Rules2:999229234847416372> \n \n 1) ***È severamente vietato entrare nella chat altrui e dar fastidio*** \n \n 2) ***È severamente vietato bestemmiare nelle chat dove sono presenti altre persone*** \n \n 3) ***È severamente vietato insultare le altre persone in chat, che siano membri normalissimi oppure staff di questa community*** \n \n 4) ***È vietato entrare nelle chat di altre persone che ascoltano la musica e disturbarli*** \n \n 5) ***È vietato spammare messaggi nelle chat testuali*** \n \n 6) ***È severamente vietato mandare link di altri server o dei social personali senza il consenso del*** <@&937095569875300372> \n \n **__Se queste regole non verranno eseguite sarete sanzionati__**")
    }
})