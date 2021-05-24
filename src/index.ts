import { Game } from "./lib/models/game.model";
import { InputMethod } from "./types";

const game = Game.initializeGame()
const gameTurns = game.gameTurnNumber
let isOver = game.gameOver
let count = 0;

/**
 * Loop while there is no winner player
 */
while (!isOver) {
  game.nextTurn();
  count++
  isOver = game.gameOver

  if (count === gameTurns) {
    console.log('勝負つかんかったな〜またあそんでや')
    break
  }
}

console.log(`ちなみに${count}回勝負したで〜`)
