import { BoardType, TileType } from "./board";

export const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export const numbers = ['1', '2', '3', '4', '5', '6', '7', '8'];

export const movePawn = (tile: string, team: string, board: BoardType) => {
    let moveArray: Array<string> = [];
    var boardCopy: BoardType = [...board];

    if (team === 'white') {
        var straight1: TileType = boardCopy[numbers.indexOf(tile[1]) + 1][letters.indexOf(tile[0])];
        var straight2: TileType | null = tile[1] === '2' ? boardCopy[numbers.indexOf(tile[1]) + 2][letters.indexOf(tile[0])] : null;
        var leftStraight: TileType = boardCopy[numbers.indexOf(tile[1]) + 1][letters.indexOf(tile[0]) - 1];
        var rightStraight: TileType = boardCopy[numbers.indexOf(tile[1]) + 1][letters.indexOf(tile[0]) + 1];
        
        if (straight1 && straight1?.unit === null) {
            moveArray.push(straight1.tile);
            if (straight2 && straight2.unit === null || straight2?.unit?.team === 'black') {
                moveArray.push(straight2.tile);
            }
        }
        if (leftStraight && leftStraight.unit?.team === 'black') {
            moveArray.push(leftStraight.tile)
        }
        if (rightStraight && rightStraight.unit?.team === 'black') {
            moveArray.push(rightStraight.tile)
        }
    } else if (team === 'black') {
        var straight1: TileType = boardCopy[numbers.indexOf(tile[1]) - 1][letters.indexOf(tile[0])];
        var straight2: TileType | null = tile[1] === '7' ? boardCopy[numbers.indexOf(tile[1]) - 2][letters.indexOf(tile[0])] : null;
        var leftStraight: TileType = boardCopy[numbers.indexOf(tile[1]) - 1][letters.indexOf(tile[0]) - 1];
        var rightStraight: TileType = boardCopy[numbers.indexOf(tile[1]) - 1][letters.indexOf(tile[0]) + 1];
        
        if (straight1 && straight1?.unit === null) {
            moveArray.push(straight1.tile);
            if (straight2 && straight2.unit === null || straight2?.unit?.team === 'white') {
                moveArray.push(straight2.tile);
            }
        }
        if (leftStraight && leftStraight.unit?.team === 'white') {
            moveArray.push(leftStraight.tile)
        }
        if (rightStraight && rightStraight.unit?.team === 'white') {
            moveArray.push(rightStraight.tile)
        }
    }
    return moveArray
}

export const moveKnight = (tile: string, team: string, board: BoardType) => {
    let moveArray: Array<string> = [];
    var boardCopy: BoardType = [...board];

    var possibleMoves: Array<TileType | null> = [
        boardCopy[numbers.indexOf(tile[1]) + 2] ? boardCopy[numbers.indexOf(tile[1]) + 2][letters.indexOf(tile[0]) - 1] : null,
        boardCopy[numbers.indexOf(tile[1]) + 2] ? boardCopy[numbers.indexOf(tile[1]) + 2][letters.indexOf(tile[0]) + 1] : null,
        boardCopy[numbers.indexOf(tile[1]) - 1] ? boardCopy[numbers.indexOf(tile[1]) - 1][letters.indexOf(tile[0]) + 2] : null,
        boardCopy[numbers.indexOf(tile[1]) + 1] ? boardCopy[numbers.indexOf(tile[1]) + 1][letters.indexOf(tile[0]) + 2] : null,
        boardCopy[numbers.indexOf(tile[1]) - 2] ? boardCopy[numbers.indexOf(tile[1]) - 2][letters.indexOf(tile[0]) - 1] : null,
        boardCopy[numbers.indexOf(tile[1]) - 2] ? boardCopy[numbers.indexOf(tile[1]) - 2][letters.indexOf(tile[0]) + 1] : null,
        boardCopy[numbers.indexOf(tile[1]) - 1] ? boardCopy[numbers.indexOf(tile[1]) - 1][letters.indexOf(tile[0]) - 2] : null,
        boardCopy[numbers.indexOf(tile[1]) + 1] ? boardCopy[numbers.indexOf(tile[1]) + 1][letters.indexOf(tile[0]) - 2] : null
    ]

    if (team === 'white') {
        for (let i = 0; i < possibleMoves.length; i++) {
            if (possibleMoves[i] === null || possibleMoves[i] === undefined) {
                continue;
            } else {
                if (possibleMoves[i] && possibleMoves[i]!.unit === null || possibleMoves[i]!.unit?.team === 'black') {
                    moveArray.push(possibleMoves[i]!.tile)
                }
            }
        }
    }

    if (team === 'black') {
        for (let i = 0; i < possibleMoves.length; i++) {
            if (possibleMoves[i] === null || possibleMoves[i] === undefined) {
                continue;
            } else {
                if (possibleMoves[i] && possibleMoves[i]!.unit === null || possibleMoves[i]!.unit?.team === 'white') {
                    moveArray.push(possibleMoves[i]!.tile)
                }
            }
        }
    }

    console.log(possibleMoves);
    return moveArray;
}



export const moveFromTo = (unit: TileType, from: string, to: string, board: BoardType) => {
    var boardCopy: BoardType = [...board];

    
    boardCopy[numbers.indexOf(from[1])][letters.indexOf(from[0])] = { ...unit, unit: null };
    if (unit.unit?.team === 'white' && unit.unit.class === 'pawn' && numbers.indexOf(to[1]) === 7) {
        boardCopy[numbers.indexOf(to[1])][letters.indexOf(to[0])].unit = {
            class: 'queen',
            team: 'white',
            image: 'q_w'
        };
    } else if (unit.unit?.team === 'black' && unit.unit.class === 'pawn' && numbers.indexOf(to[1]) === 0) {
        boardCopy[numbers.indexOf(to[1])][letters.indexOf(to[0])].unit = {
            class: 'queen',
            team: 'black',
            image: 'q_b'
        };
    } else {
        boardCopy[numbers.indexOf(to[1])][letters.indexOf(to[0])].unit = unit.unit;
    }
    

    return boardCopy;
}



































/*let straight1 = board[num].find(tile => tile.tile === `${lett}${num + 1}`);
        let straight2 = num === 2 ? board[num + 1].find(tile => tile.tile === `${lett}${num + 2}`) : null;
        let leftStraight = board[num].find(tile => tile.tile === `${letters[letterIndex - 1]}${num + 1}`)
        let rightStraight = board[num].find(tile => tile.tile === `${letters[letterIndex + 1]}${num + 1}`)
        */