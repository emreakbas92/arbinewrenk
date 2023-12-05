const express = require('express');
const https = require('https');
const app = express();
const tokens = [
  { symbol: "abbcusdt", contract: "0xa9ccddae5d09e1871368033435d95fed985270bc", chain: "bsc" },
  { symbol: "capousdt", contract: "0x9c68caf5bc64ee78b25149888f0ef4fda0c5b7be", chain: "bsc" },  
  { symbol: "rabcusdt", contract: "0x48c89d69508fb65e5f2187fdc26bbd2bcb1dedd8", chain: "bsc" },
  { symbol: "raincusdt", contract: "0x913f925e533b26275f8581459969b694fe963cac", chain: "bsc" },
  { symbol: "bbcusdt", contract: "0x4c5b60991d4797211a1261d4eed641acf12d499e", chain: "bsc" },
  { symbol: "bullusdt", contract: "0x9f95e17b2668AFE01F8fbD157068b0a4405Cc08D", chain: "polygon" },
  { symbol: "grvusdt", contract: "0x96fef7f7d5a2302bdd116d47e010689adc1cbce6", chain: "bsc" },  
  { symbol: "voxelusdt", contract: "0x2a08c38c7e1fa969325e2b64047abb085dec3756", chain: "polygon" },
  { symbol: "gcoinusdt", contract: "0xd8e7d368ab9bdf0010a9934b0e801b3f38cecef6", chain: "polygon" },
  { symbol: "zedusdt", contract: "0x374552804f7ca26c307c8d31f4cc0d9215c87f46", chain: "polygon" },
  { symbol: "dfxusdt", contract: "0x2dbc9ab0160087ae59474fb7bed95b9e808fa6bc0001000000000000000003db-0x2791bca1f2de4661ed88a30c99a7a9449aa84174-0xe7804d91dfcde7f776c90043e03eaa6df87e6395", chain: "polygon" },
  { symbol: "routeusdt", contract: "0x40f0a05c8c7a86ad1491a3911c293e093fe92436", chain: "polygon" },
  { symbol: "orbusdt", contract: "0x2dab440dcf557e306ee47e288cf57ccd154e2f64", chain: "polygon" },
  { symbol: "nakausdt", contract: "0xe6c36eed27c2e8ecb9a233bf12da06c9730b5955", chain: "polygon" },
  { symbol: "wifiusdt", contract: "0xcf0bb95967cd006f5eaa1463c9d710d1e1550a96", chain: "polygon" },  
  { symbol: "lblusdt", contract: "0x3999cb687aac02c3cce3608561092b8947d0e994", chain: "bsc" },
  { symbol: "poolxusdt", contract: "0xd7efcd3a6f56d91eccde4412d702d9c4fb069672", chain: "bsc" },
  { symbol: "sfundusdt", contract: "0x74fa517715c4ec65ef01d55ad5335f90dce7cc87", chain: "bsc" },
  { symbol: "spsusdt", contract: "0xfdfde3af740a22648b9dd66d05698e5095940850", chain: "bsc" },
  { symbol: "gptusdt", contract: "0xd99d2241a64fadaa7b501c7f52a3925afd0c3553", chain: "bsc" },
  { symbol: "revousdt", contract: "0x87d578160fc865aaffe44e79e3cdbf8379d67caf", chain: "bsc" },
  { symbol: "ktusdt", contract: "0xa08b49787bbd9f958fd418a89d0d129427534c15", chain: "bsc" },
  { symbol: "vlxusdt", contract: "0x48d807e5cb92617953a88cce78dcf31012f4d6b6", chain: "bsc" },
  { symbol: "inrusdt", contract: "0x78ca1d4f1dfed89dfc152506828d56d18bc3c281", chain: "bsc" },
  { symbol: "dypusdt", contract: "0x3fbca1072fb101e9440bb97be9ef763aac312516", chain: "bsc" },
  { symbol: "fotausdt", contract: "0xd9abad6e7a4df8f2cef972202197764619f1154b", chain: "bsc" },
  { symbol: "tlosusdt", contract: "0xdcf714c05a04cf115afca0a5351d044c4e4149df", chain: "bsc" },
  { symbol: "fiuusdt", contract: "0x92b2a7fc80d45d0e0190419e94ae1bcb7af15b7c", chain: "bsc" },
  { symbol: "gearusdt", contract: "0xd16e57367519ead068cfcde7cf3b95a03994ace7", chain: "bsc" },
  { symbol: "wwyusdt", contract: "0x1368e2d14f39e609579b50aaac8e32d27c39e5c8", chain: "bsc" },
  { symbol: "tincusdt", contract: "0x0d5b9a0f4315a4bce36d1ea7d6b6d3123167afaa", chain: "bsc" },
  { symbol: "arknusdt", contract: "0x9b1c23fccc05ad8a2f78b92cfc243ac03d1ad0a2", chain: "bsc" },
  { symbol: "erthausdt", contract: "0x70531b39e2bb4d8da59e2ce41a98eba2990f8497", chain: "bsc" },
  { symbol: "strmusdt", contract: "0xc9e35a73b1c7e5724bc07187ea6de6afaab05be3", chain: "bsc" },
  { symbol: "sfundusdt", contract: "0x74fa517715c4ec65ef01d55ad5335f90dce7cc87", chain: "bsc" },
  { symbol: "ceekusdt", contract: "0x119d6ebe840966c9cf4ff6603e76208d30ba2179", chain: "bsc" },
  { symbol: "dksusdt", contract: "0x8d60314aff258d6ce282161e6c2c17d70bddd310", chain: "bsc" },
  { symbol: "starlyusdt", contract: "0x7edf1019de953c5539ce0c06035f8685ec49c908", chain: "bsc" },
  { symbol: "hotcrossusdt", contract: "0xf23bad605e94de0e3b60c9718a43a94a5af43915", chain: "bsc" },
  { symbol: "muusdt", contract: "0x3b1029ba0d554aacad5e482910bec50d173dcd1a", chain: "bsc" },
  { symbol: "tdxusdt", contract: "0xbd24a88c58ccc6ac8291e07cf71bff4c5d6ff7f3", chain: "bsc" },
  { symbol: "kaiusdt", contract: "0xc792bc0e9a8e102b3e59c25b4b5722aea430eabd", chain: "bsc" },
  { symbol: "wndrusdt", contract: "0xc9610796a580037ac7c346cdcd3a9f327c52ff53", chain: "bsc" },
  { symbol: "smcwusdt", contract: "0xb2ce64b78236e83bfbc625806116481dc5ffd642", chain: "bsc" },
  { symbol: "stcusdt", contract: "0xc6a40313afc32ac269ec9e90692b84575708063c", chain: "bsc" },
  { symbol: "arvusdt", contract: "0xa63e32feefc6590bbf869070fd2e706eb7881bd2", chain: "bsc" },
  { symbol: "mcrtusdt", contract: "0xf8209291b074dc74d39c906386f0037718a15072", chain: "bsc" },
  { symbol: "ntusdt", contract: "0x1ddf4d50f1f97e35898b8837fe672f4d7708e030", chain: "bsc" },
  { symbol: "iguusdt", contract: "0x55ceef0a5252b87b19b65ef5967674c91e5c3af6", chain: "bsc" }
];

setInterval(() => {
  tokens.forEach((token) => {
    // Get the ask and bid prices for the token from Huobi
    https.get(`https://api.huobi.pro/market/detail/merged?symbol=${token.symbol}`, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          if (!json.tick || !json.tick.ask[0] || !json.tick.bid[0]) return;
          const ask = json.tick.ask[0];
          const bid = json.tick.bid[0];

          https.get(`https://api.dexscreener.com/latest/dex/pairs/${token.chain}/${token.contract}`, (res) => {
            let data = '';
            res.on('data', (chunk) => {
              data += chunk;
            });
            res.on('end', () => {
              try {
                const dexData = JSON.parse(data);
                if (dexData.pairs && dexData.pairs.length > 0) {
                  const dexPriceUsd = dexData.pairs[0].priceUsd;
                  console.log('Dex Price USD:', dexPriceUsd);

                  const dexPrice = parseFloat(dexPriceUsd);
                  token.al_dex = dexPrice / bid;
                  token.sat_dex = dexPrice / ask;
                  console.log(token);
                } else {
                  console.log('No pairs found in the data.');
                }
              } catch (err) {
                console.log('Error: ' + err.message);
              }
            });
          }).on('error', (err) => {
            console.log('Error: ' + err.message);
          });
        } catch (err) {
          console.log('Error: ' + err.message);
        }
      });
    }).on('error', (err) => {
      console.log('Error: ' + err.message);
    });
  });
}, 30000);

app.get("/", (req, res) => {
  function format_number(num) {
    if (num !== undefined) {
      return num.toFixed(3);
    }
    return '';
  }

  res.send(`
    <h1>Token List</h1>
    <table>
      <tr>
        <th>Symbol</th>
        <th>BSC/Huobi Bid Ratio</th>
        <th>Huobi/BSC Ask Ratio</th>
      </tr>
      ${tokens.map(token => {
        if (token.al_dex < 0.995 || token.sat_dex > 1.005) {
          return `
            <tr>
              <td>${token.symbol}</td>
              <td style="color:${token.al_dex < 0.95 ? 'green' : 'inherit'}">${format_number(token.al_dex) < 0.99 ? format_number(token.al_dex) : ''}</td>
              <td style="color:${token.sat_dex > 1.05 ? 'red' : 'inherit'}">${format_number(token.sat_dex) > 1.01 ? format_number(token.sat_dex) : ''}</td>
            </tr>
          `;
        }
        return '';
      }).join('')}
    </table>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




