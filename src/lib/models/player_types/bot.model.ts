import { PlayerType } from "../../../types";
import { Player } from "../player.model";

export class BotPlayer extends Player {

  constructor (playerName: string) {
    super('bot', playerName);
  }
}
