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
for (var i = 0; i < sacnum; i++) {
	CheckSac(makeid(saclength))
}
function CheckSac(sac) {
	if (fs.readFileSync('./unused.txt').toString().split('\n').includes(sac) || fs.readFileSync('./used.txt').toString().split('\n').includes(sac))
		axios.get(`https://fortnite-api.com/v2/creatorcode?name=${sac}`).catch(() => {
			fs.appendFile('valid.txt', sac + '\n', function(err) {
				if (err) console.log(err);
			});
		}).then(function(response) {
			if (!response?.data) return
			fs.appendFile('invalid.txt', response.data.data.code + '\n', function(err) {
				if (err) console.log(err);
			})
		})
}
