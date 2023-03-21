const fs = require('fs');


const text = fs.readFileSync('./scenario.txt', 'utf8');

// fs.writeFile(`./репліки/${characterName}`)

let regex = /^[A-Z][a-z]+:/gm;
let result = text.match(regex);
result = [...new Set(result)]


console.log('result:', result);

const characters = [];

result.forEach(characterName => {
  characters.push(
    characterName.slice(0, -1)
  );

});

console.log('characters:', characters);


let folderName = 'Heroes';
function CheckExist(folderName) {
  
  if (fs.existsSync(`./${folderName}`)) {
    return
  }
  fs.mkdirSync(folderName);
}

CheckExist(folderName);



result.forEach(characterName =>{
  const quotes = text.match(new RegExp(`${characterName}.+`, 'g'));
  console.log(quotes);
})


characters.forEach(filename => {
  fs.writeFile(`${folderName}/${filename}.txt`, '', err => {
    if (err) {
      console.log(err);
    }
  })
})