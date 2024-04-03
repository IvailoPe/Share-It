const express = require("express");
const router = require("./routes.js")
const mongoose = require("mongoose")
//const {isAuth} = require("./middlewares/authMiddlewares.js")
const cors = require("cors")
const Chat = require("./src/models/Chat.js")

const port = 3000;
const app = express();
let expressWs = require('express-ws')(app);

const connectedClients = new Map()

expressWs.app.ws('/echo', function (ws, req) {
    console.log(1);
    ws.on('message', async function (msg) {
        let message = JSON.parse(msg);
        if (message.connect === "register") {
            const chat = await Chat.findOne({
                owners: { $all: [message.userId, message.userId2] }
            })
            connectedClients.set(ws, {
                connectedId: message.userId,
                chatRef: chat,
                userId2: message.userId2
            })
        }
        else if (message.connect === "post") {   //moitoId chata aiditoNaChoveka   //negovotId chata aiditoNaChoveka
            let sender = connectedClients.get(ws)  
            for (let [key, value] of connectedClients.entries()) {
                if (sender.userId2 === value.connectedId && sender.connectedId === value.userId2) {
                    key.send(JSON.stringify({content:message.content}))
                }
            }
            sender.chatRef.chat.push({
                message:message.content,
                messageOwner:sender.connectedId,
                date:new Date()
            })
            await sender.chatRef.save({ validateBeforeSave: false })
        }
    });

    ws.on("close", () => {
        connectedClients.delete(ws)
    })
})

app.set("views", "views")

app.use(cors({ origin: "http://localhost:4200" }))
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"))
app.use(express.json())
//app.use(isAuth)
app.use("/", router);

mongoose.connect(`mongodb://127.0.0.1:27017/share-it`) //DOBAVI DATA BAZI
    .then(() => {
        console.log(`Connected to DB`);
        app.listen(port, () => {
            console.log("server is listening on port " + port);
        });
    })