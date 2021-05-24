# node Janken

## Description of this repository
This repository is for TypeScript learning of Max.<br/>
CLI based janken game.

## Technical information
| name | version |
----|----
| OS | macOS Catalina |
| node | 10.20.1 |
| TypeScript | 4.1.2 |


## Description of game
Basically user can play janken game against computer.<br/>
User can select following game settings.
- Number of game times
- Number of human players
- Number of bot players<br/>

User can change hand rule easily by modifying original code. Detail description is in section How to change hand rule.

## Game rule
The most important thing is the index of each hands in this game system.<br/>
And hand type should be 3 or more.

### Win and Lose
First of all, hand types must be only two.<br/>
Second, difference of index of each hand should be 1. Or index combination is `0` and biggest one.<br/>
Generally bigger index number of hand wins smaller index number of hand.<br/>
Only `0` index hand wins biggest index hand.

Here is example of current Janken hand

| index | hand Type |
----|----
| 0 | rock |
| 1 | paper |
| 2 | scissors |

As you can see from this example table, paper wins rock, scissors wins paper, scissors loses rock.

### Draw
In this game, the following conditions are draw situations.
- Hand Type is not two. (one, or more than three)
- Hand type is two. And index combination is not `0` and biggest one, But difference of index of each hands is not 1.


## How to play
Before playing this game, you should have the ability to understand Japanese(especially KANSAI-Dialect) and node.js.<br/>
Clone this repository to your local. And init node modules. <br/>
In this node project, TypeScripts files are compiled to JS files in `root/dist`
Run `node dist/index.js`

## How to change hand types
To change game system, please modify Line 1 and 2 in `root/src/type.ts`<br/>

Default setting is following
```typescript:type.ts
export type HandType = 'グー' | '親指' | 'ちょき' | 'フォー' | 'パー'
export const HAND_TYPES: HandType[] = ['グー', 'パー', 'ちょき']
```

For example, if you want to change hand types as `bacteria`, `person`, `shark`, `orca`, Please Change line 1 and 2 as following
```typescript:type.ts
export type HandType = 'bacteria' | 'person' | 'shark' | 'orca'
export const HAND_TYPES: HandType[] = ['bacteria', 'human', 'shark', 'orca']
```
