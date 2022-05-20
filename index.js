import express from "express";
import bodyParser from "body-parser";
import fetch from 'node-fetch';
// import axios from "axios";

const port = process.env.PORT || 3001;
const token = process.env.TOKEN || '';
const baseUrl = process.env.APP_URL || 'https://8aba-178-66-158-184.eu.ngrok.io'

const hookPath = "telegram/hook"
const telegramUrl = `https://api.telegram.org/bot${token}`

setWebhook()
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("ok")
});

app.post(`/${hookPath}`, (req, res) => {
    console.log(req.body);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

axios.interceptors.request.use(cfg => {
    console.log(cfg);
    return cfg
})

async function setWebhook() {
    const hook = `${telegramUrl}/setWebhook`
    // axios.post(hook, {
    //     url: `${baseUrl}/${hookPath}`
    // })
    // .then(resp => {
    //     console.log(resp.data);
    // })
    // .catch(err => {
    //     console.log(err.data);
        // for (const k in err.request) {
        //     console.log(k);
        // }
        // console.log(err.response.data);
    // })
    // console.log(hook);
    const resp = await fetch(hook, {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({url: `${baseUrl}/${hookPath}`})
    })
    console.log(await resp.json());
    // console.log(resp.);
}

