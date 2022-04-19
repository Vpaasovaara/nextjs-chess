import { BoardType, TileType } from "./board";

// Constants
export const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export const numbers = ['1', '2', '3', '4', '5', '6', '7', '8'];


// Function types
type MoveFuncType = (arg1: BoardType, arg2: Array<string>, arg3: Array<string>, arg4: string, arg5: string, arg6: number, arg7: number) => TileType | null;
type LinearMovementFuncType = (arg1: BoardType, arg2: string, arg3: string, arg4: number, arg5: string, arg6: string) => Array<string>;
type FilterKnightMovesFuncType = (arg1: Array<TileType | null>, arg2: 'black' | 'white') => Array<string>;
type GeneralMoverFuncType = (arg1: string, arg2: string, arg3: BoardType) => Array<string>;
type MoveFromToFuncType = (arg1: TileType, arg2: string, arg3: string, arg4: BoardType) => BoardType;

const move: MoveFuncType = (board, letters, numbers, boardLetter, boardNumber, stepsY, stepsX) => {
    if (board[numbers.indexOf(boardNumber) + stepsY]) {
        if (board[numbers.indexOf(boardNumber) + stepsY][letters.indexOf(boardLetter) + stepsX]) {
            return board[numbers.indexOf(boardNumber) + stepsY][letters.indexOf(boardLetter) + stepsX];
        } else {
            return null
        }
    } else {
        return null
    }
}

const linearMovement: LinearMovementFuncType = (board, boardLetter, boardNumber, count, direction, team, lett: Array<string> = letters, nums: Array<string> = numbers, mov: MoveFuncType = move) => {
    var returnArray: Array<string> = [];
    for (var i = 1; i < count; i++) {

        var dir: Array<number> = 
            direction === 'left' ? [0, -i] :
            direction === 'right' ? [0, i] :
            direction === 'up' ? [i, 0] :
            direction === 'down' ? [-i, 0] :
            direction === 'upLeft' ? [i, -i] :
            direction === 'upRight' ? [i, i] :
            direction === 'downLeft' ? [-i, -i] :
            direction === 'downRight' ? [-i, i] : [0, 0]

        var directionHold = mov(board, lett, nums, boardLetter, boardNumber, dir[0], dir[1])

        if (directionHold?.unit === null) {
            returnArray.push(directionHold!.tile);
        } else if (directionHold?.unit?.team === (team === 'white' ? 'black' : 'white')) {
            returnArray.push(directionHold!.tile);
            break;
        } else if (directionHold?.unit?.team === (team === 'white' ? 'white' : 'black')) {
            break;
        } else {
            break;
        }
    }
    return returnArray;
}

const filterKnightMoves: FilterKnightMovesFuncType = (moves, team) => {
    var returnArray: Array<string> = []
    for (let i = 0; i < moves.length; i++) {
        if (moves[i] === null || moves[i] === undefined) {
            continue;
        } else {
            if (moves[i] && moves[i]!.unit === null || moves[i]!.unit?.team === team) {
                returnArray.push(moves[i]!.tile)
            }
        }
    }
    return returnArray;
}



export const movePawn: GeneralMoverFuncType = (tile, team, board) => {
    var moveArray: Array<string> = [];
    var boardCopy: BoardType = [...board];

    if (team === 'white') {
        var straight1: TileType = boardCopy[numbers.indexOf(tile[1]) + 1][letters.indexOf(tile[0])];
        var straight2: TileType | null = tile[1] === '2' ? boardCopy[numbers.indexOf(tile[1]) + 2][letters.indexOf(tile[0])] : null;
        var leftStraight: TileType = boardCopy[numbers.indexOf(tile[1]) + 1][letters.indexOf(tile[0]) - 1];
        var rightStraight: TileType = boardCopy[numbers.indexOf(tile[1]) + 1][letters.indexOf(tile[0]) + 1];
        
        if (straight1 && straight1?.unit === null) {
            moveArray.push(straight1.tile);
            if (straight2 && straight2.unit === null) {
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
            if (straight2 && straight2.unit === null) {
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

export const moveKnight: GeneralMoverFuncType = (tile, team, board) => {
    var moveArray: Array<string> = [];
    var boardCopy: BoardType = [...board];
    var knightMoves: Array<Array<number>> = [[2, -1], [2, 1], [-2, -1], [-2, 1], [1, -2], [1, 2], [-1, -2], [-1, 2]];
    var possibleMoves: Array<TileType | null> = [];
    
    for (var i = 0; i < knightMoves.length; i++) {
        possibleMoves.push(move(boardCopy, letters, numbers, tile[0], tile[1], knightMoves[i][0], knightMoves[i][1]));
    };

    if (team === 'white') {
        moveArray = filterKnightMoves(possibleMoves, 'black');
    } else if (team === 'black') {
        moveArray = filterKnightMoves(possibleMoves, 'white');
    }

    return moveArray;
}

export const moveRook: GeneralMoverFuncType = (tile, team, board) => {
    var tempArray = [];
    var moveArray: Array<string> = [];
    var boardCopy: BoardType = [...board];
    var directions: Array<string> = ['left', 'right', 'left', 'right'];

    if (team === 'white') {
        for (var i = 0; i < directions.length; i++) {
            tempArray.push(linearMovement(boardCopy, tile[0], tile[1] ,8, directions[i], 'white'));
        }
        moveArray = tempArray.flat();

    } else if (team === 'black') {
        for (var i = 0; i < directions.length; i++) {
            tempArray.push(linearMovement(boardCopy, tile[0], tile[1] ,8, directions[i], 'black'));
        }
        moveArray = tempArray.flat();
    }
    return moveArray;
}

export const moveBishop: GeneralMoverFuncType = (tile, team, board) => {
    var tempArray = [];
    var moveArray: Array<string> = [];
    var boardCopy: BoardType = [...board];
    var directions: Array<string> = ['upLeft', 'upRight', 'downLeft', 'downRight'];

    if (team === 'white') {
        for (var i = 0; i < directions.length; i++) {
            tempArray.push(linearMovement(boardCopy, tile[0], tile[1] ,8, directions[i], 'white'));
        }
        moveArray = tempArray.flat();

    } else if (team === 'black') {
        for (var i = 0; i < directions.length; i++) {
            tempArray.push(linearMovement(boardCopy, tile[0], tile[1] ,8, directions[i], 'black'));
        }
        moveArray = tempArray.flat();
    }
    return moveArray;
}

export const moveQueen: GeneralMoverFuncType = (tile, team, board) => {
    var tempArray = [];
    var moveArray: Array<string> = [];
    var boardCopy: BoardType = [...board];
    var directions: Array<string> = ['upLeft', 'upRight', 'downLeft', 'downRight', 'up', 'down', 'left', 'right'];

    if (team === 'white') {
        for (var i = 0; i < directions.length; i++) {
            tempArray.push(linearMovement(boardCopy, tile[0], tile[1] ,8, directions[i], 'white'));
        }
        moveArray = tempArray.flat();

    } else if (team === 'black') {
        for (var i = 0; i < directions.length; i++) {
            tempArray.push(linearMovement(boardCopy, tile[0], tile[1] ,8, directions[i], 'black'));
        }
        moveArray = tempArray.flat();
    }
    return moveArray;
}

export const moveKing: GeneralMoverFuncType = (tile, team, board) => {
    var tempArray = [];
    var moveArray: Array<string> = [];
    var boardCopy: BoardType = [...board];
    var directions: Array<string> = ['upLeft', 'upRight', 'downLeft', 'downRight', 'up', 'down', 'left', 'right'];

    if (team === 'white') {
        for (var i = 0; i < directions.length; i++) {
            tempArray.push(linearMovement(boardCopy, tile[0], tile[1] ,2, directions[i], 'white'));
        }
        moveArray = tempArray.flat();

    } else if (team === 'black') {
        for (var i = 0; i < directions.length; i++) {
            tempArray.push(linearMovement(boardCopy, tile[0], tile[1] ,2, directions[i], 'black'));
        }
        moveArray = tempArray.flat();
    }
    return moveArray;
}


export const moveFromTo: MoveFromToFuncType = (unit, from, to, board) => {
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
