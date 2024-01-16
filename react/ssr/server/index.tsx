import express from 'express';
import App from '../client/App';
import fs from 'fs';
import path from 'path';
import { renderToString, renderToPipeableStream, renderToReadableStream } from 'react-dom/server';
import { Writable } from "node:stream";


const app = express();
const port = 3008;
app.use(express.static(path.resolve(__dirname, '../client')))

const createReactApp = async () => {
    // @ts-ignore
    const reactApp = renderToString(<App />);
    const html = await fs.promises.readFile(path.resolve(__dirname, '../client/index.html'), 'utf-8');
    const reactHtml = html.replace(
        '<div id="root"></div>', `<div id="root">${reactApp}</div>`
    );
    console.log(reactHtml);
    return reactHtml;
}

app.get('/index', (req, res) => {
    // const html = await createReactApp();
    // @ts-ignore
    const stream = renderToReadableStream(<App />);
    // @ts-ignore
    res.send(new Response(stream));
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
