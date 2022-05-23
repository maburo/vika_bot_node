import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import states from './states.js';


const port = process.env.PORT || 3001;
const token = process.env.TOKEN || '';
const baseUrl = process.env.APP_URL || 'https://2221-178-66-158-184.eu.ngrok.io'

const hookPath = "telegram/hook"
const telegramUrl = `https://api.telegram.org/bot${token}`

const users = new Map();
function getUser(message) {
    const user = users.get(message.from.username);
    if (!user) {
        const tmp = {
            username: message.from.username,
            state: states.find(s => s.name === 'start')
        };
        users.set(message.from.username, tmp);
        return tmp;
    }

    return user
}

const photos = new Map();
export function getPhoto(name) {
    const url = `${baseUrl}/assets/${name}`;
    return photos.get(name) || url;
}

setWebhook()
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("ok")
});

app.use('/assets', express.static('./assets'))

app.post(`/${hookPath}`, async (req, res) => {
    try {
        const body = req.body
        console.log(body);
        const chatId = body.message.chat.id

        const user = getUser(body.message);
        const context = {
            chatId,
            user
        };

        let nextStateName = await user.state.nextState(body, context);
        while (nextStateName && nextStateName !== '') {
            const nextState = states.find(s => s.name === nextStateName)

            console.log(`${user.state.name} >> ${nextStateName}`);

            nextStateName = await nextState.action(context);
            user.prevState = user.state
            user.state = nextState
        }

        console.log(`chat id ${chatId}`);
    } catch(err) {
        console.error(err);
    }

    res.sendStatus(200)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

async function setWebhook() {
    const hook = `${telegramUrl}/setWebhook`
    console.log(hook);
    await axios.post(hook, {
        url: `${baseUrl}/${hookPath}`
    })
    .then(resp => {
        console.log('setWebhook', resp.data);
    })
    .catch(err => {
        console.error('setWebhook ERROR', err.code, err.data);
    })
}

export async function sendDefaultMessage(ctx) {
    console.log('sendDefaultMessage');

    await sendMessage({
        chat_id: ctx.chatId,
        text: 'Что что?'
    });

    console.log(`state: ${ctx.user?.state?.name}`)

    ctx.user.state.action(ctx);

    return ''
}

export async function sendMessage(message) {
    await axios.post(`${telegramUrl}/sendMessage`, message)
    // .then(resp => console.log(resp.data))
    .catch(err => console.error('sendMessage ERROR', err.data))
}

export async function sendDice(chatId) {
    return await axios.post(`${telegramUrl}/sendDice`, {
        chat_id: chatId,
        emoji:  "\uD83C\uDFB2",
        reply_markup: { remove_keyboard: true }
    })
    // .then(resp => console.log(resp.data))
    .catch(err => console.error('sendDice ERROR', err.data))
}

export async function sendPhoto(message) {
    return await axios.post(`${telegramUrl}/sendPhoto`, message)
    .then(resp => {
        // resp.data.photo[resp.data.photo.length - 1]
        // response.body<Message>().photo?.last()?.let {
        //     photos.put(message.photo, it.file_id)
        // }
    })
    .catch(err => console.error('sendPhoto ERROR', message, err.data))

}

export function findCompany(ctx) {
    if (users.length === 1) {
        return;
    }

    let user = null
    do {
        const idx = Math.floor(Math.random() * users.length);
        user = users[idx];
    } while (user === null || user === ctx.user);
    
    return user;
}

export async function createChatInviteLink(ctx) {
    return await axios.post(`${telegramUrl}/createChatInviteLink`, {
        chat_id: ctx.chatId
    })
}