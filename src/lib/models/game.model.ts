import { HAND_TYPES, HandCharacter, LAST_INDEX, Lines, InputMethod } from '../../types';
import { Player } from './player.model';
import { BotPlayer } from './player_types/bot.model';
import { HumanPlayer } from './player_types/human.model';

type PlayersAndHands = {
  player: Player,
  hand: HandCharacter
}

type PlayerNumbers = {
  human: number,
  bot: number
}

type PlayerNames = {
  human: string[],
  bot: string[]
}

export class Game {
  private players: Player[]
  private isOver = false

  //Make loop function in the future
  constructor (private playerNames: PlayerNames[], private gameTurns: number) {
    const humanNames = playerNames[0].human
    const botNames = playerNames[0].bot
    const players: Player[] = []

    for (const name of humanNames) {
      players.push(new HumanPlayer(name))
    }

    for (const name of botNames) {
      players.push(new BotPlayer(name))
    }

    this.players = players
    this.gameTurns = gameTurns
  }


  /**
   * this function is initialize game and return game object to index ts
   */
  public static initializeGame(): Game {
    const gameTurns = this.inputGameTurns()
    const playerNumbers = this.selectPlayerNumbers()
    const playerNames = this.inputPlayerName(playerNumbers)

    return new Game(playerNames, gameTurns)
  }

  get gameTurnNumber(): number {
    return this.gameTurns
  }

  get gameOver(): boolean {
    return this.isOver
  }

  /**
   * User can select game times by this function
   */
  //getter　めそっどを使って読めるだけにしとく
  private static inputGameTurns(): number {
    while(true) {
      const inputGameTimes = InputMethod('あんたはあいこが出た時何回までくりかえす？ ') as string
      const gameTimes = Number(inputGameTimes)
      const isNotNegativeNumber = 0 < gameTimes
      if (isNotNegativeNumber && Number.isInteger(gameTimes)) {
        return gameTimes
      } else {
        console.log('正しい値入力してや〜')
      }
    }
  }


  /**
   * User can select how many players does players need for game and return numbers of player
   */
  private static selectPlayerNumbers(): PlayerNumbers[] {
    let count = 0
    const playerNumbers: PlayerNumbers[] = [{human: 0, bot: 0}]

    //Loop while user input values are correct
    while(true){
      const checkList: number[] = []
      const userInput = InputMethod('ユーザープレイヤーの人数を半角数字で入力してな。そんで半角スペースを空けて、ほしいbotの人数を半角で入力してや〜 例：3 2   ') as string
      const userInputList = userInput.split(' ')
      count++

      userInputList.forEach(n => {
        const playerNum = Number(n)
        checkList.push(playerNum)
      })

      //checking user input is integer and <= 0
      const isAllPositiveInteger = (n: number) => Number.isInteger(n) && 0 <= n
      const isMoreThan2Players = 2 <= checkList[0] + checkList[1]

      if (isMoreThan2Players && checkList.length === 2 && checkList.every(isAllPositiveInteger)) {
        playerNumbers[0].human = checkList[0]
        playerNumbers[0].bot = checkList[1]
        console.log(`humanの人数は${playerNumbers[0].human}人、botの人数は${playerNumbers[0].bot}人やで`)
        return playerNumbers
      } else {
        console.log('勝負できへん人数か、入力方法が間違っているで〜正しい値をもういっぺん入力してや')
      }
    }
  }


  /**
   * This function is for create player name by user
   * @param playerNumber numbers of player
   */
  private static inputPlayerName(playerNumber: PlayerNumbers[]): PlayerNames[] {
    const playerNames: PlayerNames[] = [{human: [], bot: []}]
    const humanPlayerNumber = playerNumber[0].human
    const botPlayerNumber = playerNumber[0].bot

    for (let i = 0; i < humanPlayerNumber; i++) {
      const userInput = InputMethod(`Human Player${i + 1}の名前入れてや〜 空欄でEnter押すとワイが勝手に決めるで〜 `) as string
      if (userInput !== '') {
        playerNames[0].human.push(userInput)
      } else {
        console.log(`human名無し${i + 1}さんにしとくで`)
        playerNames[0].human.push(`human名無し${i + 1}`)
      }

    }
    for (let i = 0; i < botPlayerNumber; i++) {
      const userInput = InputMethod(`Bot Player${i + 1}の名前入れてや〜 空欄でEnter押すとワイが勝手に決めるで〜`) as string
      if (userInput !== '') {
        playerNames[0].bot.push(userInput)
      } else {
        console.log(`bot名無し${i + 1}さんにしとくで`)
        playerNames[0].bot.push(`bot名無し${i + 1}`)
      }
    }
    return playerNames
  }



  /**
   * Create player's hand by calling Human Player and Bot Player nextHand method.
   */
  public nextTurn (): void {
    const playersAndHands: PlayersAndHands[] = []
    console.log(`最初は${HAND_TYPES[0]}、じゃんけん..............`)
    for (let i = 0; i < this.players.length; i++ ) {
      let player = this.players[i]
      // if player is not dead, then create hands
      if (!player.isDead) {
        let hand = player.nextHand()
        //これは配列に連想配列を挿入している部分
        playersAndHands.push({
          player: player,
          hand: hand
        })
      }
    }
    console.log(`ぽんっ${Lines}`)
    //Show player names and hands
    playersAndHands.forEach(player => {
      console.log(`${player.player.playerName}さんの手は${player.hand.self}やな`)
    })
    console.log(Lines)
    this.judgeHands(playersAndHands)
  }


  /**
   * Judge janken by index.
   * @param playersAndHands is list contains player instance and hand object
   */
  private judgeHands (playersAndHands: PlayersAndHands[]): Player[] {
    let results: Player[] = []
    //receive list of removed duplicate hands
    const currentHandTypes = this.removeDuplicate(playersAndHands)
    const numberOfCurrentHands = currentHandTypes.length

    //search
    const isFirstIndex = currentHandTypes.some(hand => hand.indexNumber === 0)
    const isLastIndex = currentHandTypes.some(hand => hand.indexNumber === LAST_INDEX)
    const isOnly2Players = numberOfCurrentHands === 2

    if (isOnly2Players && isFirstIndex && isLastIndex) {
      console.log('勝負あり')
      //At this moment, losers are players who uses last index hand
      results = this.returnOnlyWinners(playersAndHands, currentHandTypes[0], currentHandTypes[1])
    } else if (isOnly2Players && currentHandTypes[0].indexNumber - currentHandTypes[1].indexNumber === 1) {
      console.log('勝負あり')
      //At this moment, losers are the players who use currentHandTypes[1]
      results = this.returnOnlyWinners(playersAndHands, currentHandTypes[1], currentHandTypes[0])
    } else {
      console.log('あいこやったな')
      playersAndHands.forEach(player => results.push(player.player))
    }

    if (results.length === 1) {
      this.isOver = true
      console.log(`おめでとう！最終勝者は ${results[0].playerName} やで! `)
      return results
    } else {
      return results
    }
  }


  /**
   * This function is create new list of current hands that removed duplicate. And that list is sorted by descending order of index number
   * @param playerAndHands is list contains player instance and hand object
   */
  private removeDuplicate (playerAndHands: PlayersAndHands[]): HandCharacter[] {
    //define list for count hand
    const allHands: HandCharacter[] = []
    playerAndHands.forEach(player =>{
      allHands.push(player.hand)
    })
    // create new list that removed duplicates
    const hands = Array.from(new Set(allHands))
    //sorting by descending order of index number
    hands.sort((hand1, hand2) => hand2.indexNumber - hand1.indexNumber)
    return hands
  }


  /**
   * This function divides only losers and create new list of losers
   * @param playerAndHands is list contains player instance and hand object
   * @param currentHands is  list of current two hands
   */
  private returnOnlyWinners(playerAndHands: PlayersAndHands[], loserHand: HandCharacter, winnerHand: HandCharacter): Player[] {
    //Create new array that contains only loser players
    const losersAndHands = playerAndHands.filter(playerAndHand => {
      return playerAndHand.hand === loserHand
    })
    const onlyLosers: Player[] = losersAndHands.map(loser => {
      return loser.player
    })
    //Create new array that contains only winner players
    const winnerAndHands = playerAndHands.filter(playerAndHand => {
      return playerAndHand.hand === winnerHand
    })
    const onlyWinners: Player[] = winnerAndHands.map(winner => {
      return winner.player
    })
    onlyLosers.forEach(player => {
      console.log(`${player.playerName}は負けやで`)
    })
    this.killLosers(onlyLosers)
    return onlyWinners
  }


  /**
   * This function is change losers' Player model property "isDead"  false to true.
   * @param losers is array of losers
   */
  private killLosers(losers: Player[]): void {
    losers.forEach(loser => {
      loser.isDead = true
    })
  }
}
