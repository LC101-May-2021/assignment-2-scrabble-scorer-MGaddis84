// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");


let newPointStructure = {};
const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const vowelBonusStructure = {
  3: ['A', 'E', 'I', 'O', 'U'],
  1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z']
};



function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints ="";
	for (let i = 0; i < word.length; i++) { 
	  for (const pointValue in oldPointStructure) { 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
}

function initialPrompt() {
  let greeting = input.question("Let's play some scrabble! Enter a word to score:");
  return greeting;
};

let simpleScore = function (word) {
  word = word.toUpperCase();

return word.length;
}

let vowelBonusScore = function (word) {
  word = word.toUpperCase();
  let letterPoints = 0;
  for (let i = 0; i < word.length; i++) {
    for (const pointValue in vowelBonusStructure) {
      if (vowelBonusStructure[pointValue].includes(word[i])) {
       letterPoints += Number(pointValue); 
      }
    }
  }
  return letterPoints;
}


function scrabbleScore(word) {
  let score = 0; 
   for (i = 0; i < word.length; i++) {
     score = score +Number(newPointStructure[word[i].toUpperCase()]);
     //let scrabbleScore = newPointStructure[item][i];
   }
   
   console.log(`Score for '${word}': ${score}`); 
   return score;
}

const scoringAlgorithms = [
  {name: "simpleScore",
  description: "Each letter is worth 1 point",
  scoringFunction: simpleScore},
  {name: "Bonus Vowels",
  description: "Vowels are worth 3 points, consonants are 1 pt.",
  scoringFunction: vowelBonusScore},
  {name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scoringFunction: scrabbleScore}
];

function scorerPrompt() {
  console.log("Which scoring algorithm would you like to use?");
  for (let i = 0; i < scoringAlgorithms.length; i++) {
    console.log(scoringAlgorithms[i].name);
  }
 let scoreChoice = input.question("Enter 0, 1, or 2:");
 return scoringAlgorithms[scoreChoice]; 
}




function transform(oldPointStructure) {
    for (let item in oldPointStructure) {
      //console.log(item);
      for (let i = 0; i < oldPointStructure[item].length; i++) {
        //let newPointStructure ={};
        newPointStructure[oldPointStructure[item][i]] = item;
      }
    } 
}
//objectName["new-key"] = propertyValue; // Does this need to go in transform function?  object?[newValue] = oldPointStructure[item][i];

function runProgram() {
  let word = initialPrompt();
  let scoreOptionFunction = scorerPrompt(); 
  transform(oldPointStructure);
  //console.log(newPointStructure);
  let score = scoreOptionFunction.scoringFunction(word);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};