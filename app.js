// const Client = require('bitcoin-core');
// const client = new Client({ network: 'testnet', host: '115.186.176.139', username: 'testrpc', password: 'y06Zhyok50n4tcElT9FJ8ndekkFBfOdC'});

// client.getInfo().then((help) => console.log(help));

var express = require('express');
var app = express();

var util = require('./util');

app.get('/address/create', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
    res.status(200).json(util.CreateBitcoinAddress());
});

app.get('/address/watch/:address', function (req, res) {
	address = req.params.address;
	res.setHeader('Content-Type', 'application/json');
	util.fetchLatestTxs(address);
	if (address && Address.isValid(address)) {
	    res.send(address);
	} else {
		res.status(400).json({ error : 'Invalid request! Address required.'});
	}
});



app.listen(3000, function () {
  console.log('btc-x listening on port 3000!');
});