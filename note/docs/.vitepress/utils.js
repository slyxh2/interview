import path from 'path';
import fs from 'fs';

export default function (name) {
    const directoryPath = path.resolve(__dirname, `../${name}`);

    let files = fs.readdirSync(directoryPath);

    files = files.map(file => {
        return { text: `${file.split('.')[0]}`, link: `/${name}/${file}` }
    })


    return files;
}