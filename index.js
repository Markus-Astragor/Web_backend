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



function MywritetoFile (i, MyData) {
  fs.writeFile(`./${folderName}/${i}.txt`, MyData, err => {
    if (err) {
      console.log(err);
    }
  });
}



for (let i = 0; i < characters.length; i++) {
  const quotes = text.match(new RegExp(`${characters[i]}:.+`, 'gm'));
  
    const new_quotes = [];
    quotes.forEach( quote =>{

      if(!new_quotes.includes(quote.slice(characters[i].length + 1))){
        new_quotes.push(quote.slice(characters[i].length + 1));
    }

    })
    new_quotes.forEach(new_quote => {
      MywritetoFile(characters[i], `${new_quote}\n`);
    })
}




