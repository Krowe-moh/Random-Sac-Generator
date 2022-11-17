const axios = require('axios')
const fs = require('fs');
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
if (fs.existsSync('unused.txt') && fs.existsSync('used.txt')) {
	for (var i = 0; i < amount; i++) { CheckSac(makeid(saclength)) }
} else {
	fs.appendFile('unused.txt', '', function(err) {
		if (err) console.log(err);
	});
	fs.appendFile('used.txt', '', function(err) {
		if (err) console.log(err);
	})
	for (var i = 0; i < amount; i++) {
		CheckSac(makeid(saclength))
	}
}
function CheckSac(sac) {
	if (fs.readFileSync('./unused.txt').toString().split('\n').includes(sac) || fs.readFileSync('./used.txt').toString().split('\n').includes(sac)) return;
	axios.get(`https://fortnite-api.com/v2/creatorcode?name=${sac}`).catch(() => {
		fs.appendFile('unused.txt', sac + '\n', function(err) {
			if (err) console.log(err);
		});
	}).then(function(response) {
		if (!response?.data) return
		fs.appendFile('used.txt', response.data.data.code + '\n', function(err) {
			if (err) console.log(err);
		})
	})
}
