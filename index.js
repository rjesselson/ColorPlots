const express = require('express')
const app = express()
const port = process.env.PORT || 8080;

var cors = require('cors');

app.use(cors());



var fs = require("fs");
var text = fs.readFileSync("./metadata.txt").toString('utf-8');
var textByLine = text.split("\n")

app.get('/api/color/:size/:token_id', async(req, res) => {
  const tokenId = req.params["token_id"]
  const size = req.params["size"]
  console.log('received')
  console.log(size);
  let id = parseInt(tokenId) + 1;
  let tempTheme = textByLine[id];
  let theme = tempTheme.substring(0, tempTheme.length - 1);
  let origin = 'Descendant'
  let image = 'https://color-plots.s3.amazonaws.com/' + id + theme + size + '.png';
  let dimensions = size + 'x' + size;
  if (tokenId < 2179){
    origin = 'Genesis';
  }
  let metadata = {
    "description": "Color Plot",  
    "image": image, 
    "name": "Plot " + tokenId,
    "attributes": [
      {
        "trait_type": "Origin",
        "value": origin
      },
      {
        "trait_type": "Theme",
        "value": theme
      },
      {
      "trait_type": "Dimensions", 
      "value": dimensions
      },
    ] 
  }
  console.log(metadata)
  res.send(metadata);
})

app.listen(port, () => {
  console.log(`token.tools api listening at http://localhost:${port}`)})