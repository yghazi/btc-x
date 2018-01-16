var EventEmitter = require('events').EventEmitter;
var bitcore = require('bitcore-lib');
var spawn = require('child_process').spawn;
var querystring = require('querystring');
var https = require('https');
const fetch = require("node-fetch");


// TODO: remove for mainnet
bitcore.Networks.defaultNetwork = bitcore.Networks.testnet;
Address = bitcore.Address;
// var lastFetched = Math.floor(Date.now() / 1000)

function CreateBitcoinAddress() {
  privateKey = new bitcore.PrivateKey();
  address = privateKey.toAddress().toString();
  return ({ pubKey: address, pvtKey: privateKey.bn });
}



var explorer = 'https://testnet.blockexplorer.com';

function performRequest(endpoint, method, data, success) {
  var dataString = JSON.stringify(data);
  var headers = {};
  
  if (method == 'GET') {
    endpoint += '?' + querystring.stringify(data);
  }
  else {
    headers = {
      'Content-Type': 'application/json',
      'Content-Length': dataString.length
    };
  }
  var options = {
    host: explorer,
    path: endpoint,
    method: method,
    headers: headers
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      console.log(responseString);
      var responseObject = JSON.parse(responseString);
      success(responseObject);
    });
  });

  req.write(dataString);
  req.end();
}

// functions to be exported
module.exports = {
  fetchLatestTxs: function (addr) {
  // performRequest('/api/addrs/'+ addr+'/utxo', 'GET', {}, function(data) {
  //   console.log('Fetched ' + data.);
  // })
  data = {};
  i = 0;
  console.log('trying here...')
  url = explorer + '/api/addrs/'+ addr +'/txs'
  fetch(url)
  .then(response => {
    response.json().then(json => {
      while(true) {
        if(json.items[i]) {
          data[json.items[i].vin[0].addr] = json.items[i].vout[0].value
          i++
        } else {
          break;
        }
      }
      // console.log(`${json}`)
      console.log(JSON.stringify(json))
      console.log(JSON.stringify(data))

    });
  })
}

}