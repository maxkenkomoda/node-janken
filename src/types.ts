export type HandType = 'グー' | '親指' | 'チョキ' | 'フォー' | 'パー'
export const HAND_TYPES: HandType[] = ['グー', 'パー', 'チョキ']
// export const HAND_TYPES: HandType[] = ['グー', '親指', 'ちょき', 'フォー', 'パー']
export type PlayerType = "human" | "bot";

//Define type of hand object
export type HandCharacter = {
  indexNumber: number,
  self: HandType,
}

export const HAND_CHARACTERS: HandCharacter[] = []
export const LAST_INDEX = HAND_TYPES.length - 1

// Create Hand objects. Each hand loses next index of hand. Last index of hand loses first index of hand
for (let i = 0; i < HAND_TYPES.length; i++) {
  if (i === LAST_INDEX) {
    HAND_CHARACTERS.push({
      indexNumber: i,
      self: HAND_TYPES[i],
    })
  } else {
    HAND_CHARACTERS.push({
      indexNumber: i,
      self: HAND_TYPES[i],
    })
  }
}

export const Lines = '--------------------------------------------------------------'
export const InputMethod = require('prompt-sync')();
