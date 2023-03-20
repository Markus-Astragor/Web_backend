const text = `Max: Quod equidem non reprehendo;
Geralt: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quibus natura iure responderit non esse verum aliunde finem beate vivendi, a se principia rei gerendae peti; Quae enim adhuc protulisti, popularia sunt, ego autem a te elegantiora desidero. Duo Reges: constructio interrete. Tum Lucius: Mihi vero ista valde probata sunt, quod item fratri puto. Bestiarum vero nullum iudicium puto. Nihil enim iam habes, quod ad corpus referas; Deinde prima illa, quae in congressu solemus: Quid tu, inquit, huc? Et homini, qui ceteris animantibus plurimum praestat, praecipue a natura nihil datum esse dicemus?
Yennefer: Iam id ipsum absurdum, maximum malum neglegi. Quod ea non occurrentia fingunt, vincunt Aristonem; Atqui perspicuum est hominem e corpore animoque constare, cum primae sint animi partes, secundae corporis. Fieri, inquam, Triari, nullo pacto potest, ut non dicas, quid non probes eius, a quo dissentias. Equidem e Cn. An dubium est, quin virtus ita maximam partem optineat in rebus humanis, ut reliquas obruat?
Geralt: Quis istum dolorem timet?`;


const result = text
 // .match(new RegExp("^[A-Z][a-z]+:", "gm"))
 .match(/^[A-Z][a-z]+:/gm);

console.log('result:', result);

const characters = [];
result.forEach(characterName => {
 if (!characters.includes(characterName)) {
  characters.push(
   // characterName.replace(':', '')
   // characterName.slice(0, characterName.length - 1)
   characterName.slice(0, -1)
  );
 }
});

console.log('characters:', characters);