import { HandType, HAND_TYPES, PlayerType, HandCharacter, HAND_CHARACTERS } from "../../types";

export class Player {
  public typeOfPlayer: PlayerType;
  public isDead = false;
  public playerName: string

  constructor (typeOfPlayer: PlayerType, playerName: string) {
    this.typeOfPlayer = typeOfPlayer;
    this.playerName = playerName
  }


  /**
   * Create new hand object with random number.
   */
  public nextHand (): HandCharacter  {
    const randomNumber = Math.floor( Math.random() * HAND_TYPES.length)
    return HAND_CHARACTERS[randomNumber]
  }


  /**
   * Change when player is lose.
   */
  public isLose() {
    this.isDead = true
  }
}
