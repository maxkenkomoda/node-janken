import { HandCharacter, HAND_CHARACTERS, HAND_TYPES, InputMethod, Lines, PlayerType } from "../../../types";
import { Player } from "../player.model";

export class HumanPlayer extends Player {

  constructor (playerName: string) {
    super('human', playerName);
  }


  /**
   * Return user input hand. It loops while user inputs wrong number.
   */
  public nextHand(): HandCharacter {
    //require user input
    const message: string [] = []
    for(const hand of HAND_CHARACTERS) {
      message.push(`${hand.self}なら${hand.indexNumber}を`)
    }

    while (true) {
      console.log(Lines)
      const userInput = InputMethod(`${this.playerName}さん${message.join('、')}入れてや`) as string;

      //for checking input number is positive and integer number
      const userInputNumber = Number(userInput)
      const inputIsInteger = Number.isInteger(userInputNumber)
      const isNotNegativeNumber = 0 <= userInputNumber
      const isEmpty  = userInput === ''

      if (!isEmpty && isNotNegativeNumber && inputIsInteger && userInputNumber < HAND_TYPES.length) {
        return HAND_CHARACTERS[userInputNumber]
      } else {
        console.log('まちがっているで')
      }
    }
  }
}
