import React from 'react';

const firstNames: string[] = [
    'Billy',
    'Will',
    'Willem',
    'Squilliam',
    'Moneybags',
    'Squills',
    'Big Boy',
    'Greasy',
    'Willem',
    'Wom',
    'Bron',
    'Willville',
    'Scribbles',
    'Odin',
    `Won't`,
    'Will "Will Brown"',
    'WILL',
    'Wilf',
    'Squillem',
    'Larry',
    'Scrom',
    'Dill',
    'Yarll',
    'Squallop',
    'Wimper',
    'Wet',
    'Wimly',
    'Warm',
    'Primal',
    'Hunter',
    'Rob',
    'Wilma',
    'Gordon',
    'Squillmuth',
    'Anne Boleyn',
    'Wembury',
    'Will Brown',
    'Brown',
    'Willdolf',
    'Willhammad',
    'Wilhouse',
]
const lastNames: string[]= [
    'Brown',
    'Black',
    'McGeezer',
    'Barkley',
    'Browntown',
    'Barks',
    'Bongs',
    'McGreaserton',
    'McBrownie',
    'Bron',
    'Chom',
    'The Cheetah',
    'McGinley',
    'The Uno King',
    'Beige',
    'Wisely',
    'BROWN',
    'Bilf',
    'Biggles',
    'McPherson',
    'Bum',
    'Bulge',
    'Bath',
    'Hunter',
    'Behaviour',
    '"Will Brown" Brown',
    'The Dark Lord',
    'Browning',
    'XIV',
    'Bin Willden',
    'Orwill',
]

function generateRecruit () {

    // Generate stats.
    const statNames: string[] = ['strength', 'dexterity', 'intelligence', 'constitution', 'wisdom', 'charisma']
    const statValues: number[] = []
    for (const _ of statNames) {
      statValues.push(Math.floor(Math.random() * (20 - 1 + 1) + 1))
    }
  
    // Generate rarity and multiply stats.
    const rarityNumbers: number[] = [40, 70, 90, 98, 101];
    const rarityNames: string[] = ['common', 'uncommon', 'rare', 'epic', 'legendary']
    const statMultiplier: number[] = [0.8, 1.0, 1.2, 1.5, 2.0];
    const randomRarityNumber: number = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    let randomRarityName: string = 'common';
    let multiplier: number = 1.0
  
    rarityNames.every(function(rarityName, i) {
      const rarityNumber = rarityNumbers[i];
      if (randomRarityNumber < rarityNumber) {
        randomRarityName = rarityName;
        multiplier = statMultiplier[i];
        return false
      }
      else return true
    })
  
    // Apply multiplier to stats.
    for (let i=0; i<statValues.length; i++) {
      statValues[i] *= multiplier
      statValues[i] = Math.round(statValues[i])
    }
  
    // Generate New name.
    const randomWill: string = firstNames[Math.floor(Math.random()*firstNames.length)];
    const randomBrown: string = lastNames[Math.floor(Math.random()*lastNames.length)];
    let randomWillBrown: string = randomWill +' '+ randomBrown;
    if (randomRarityName == 'legendary') {
      randomWillBrown = [randomWill, randomBrown][Math.floor(Math.random()*2)]
    }
    const returnArray: [string, number[], string] = [randomWillBrown, statValues, randomRarityName]
    return returnArray
}

export { generateRecruit } ;
export { firstNames, lastNames };