const axios = require('axios')
const fs = require('fs').promises;
let amount = 1000
let saclength = 3

function makeid(length) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function CheckSac(sac, unused, used) {
    if (unused.includes(sac) || used.includes(sac)) return;
    try {
        const response = await axios.get(`https://fortnite-api.com/v2/creatorcode?name=${sac}`)
        if (response.data) {
            await fs.appendFile('used.txt', response.data.data.code + '\n');
            used.push(sac);
        }
    } catch (error) {
        await fs.appendFile('unused.txt', sac + '\n');
        unused.push(sac);
    }
}

async function main() {
    let unused = [], used = [];
    try {
        unused = (await fs.readFile('unused.txt')).toString().split('\n');
        used = (await fs.readFile('used.txt')).toString().split('\n');
    } catch (error) {
        await fs.writeFile('unused.txt', '');
        await fs.writeFile('used.txt', '');
    }
    for (var i = 0; i < amount; i++) {
        await CheckSac(makeid(saclength), unused, used)
    }
}

main().catch(console.error);
