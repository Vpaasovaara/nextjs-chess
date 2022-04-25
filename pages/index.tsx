import type { NextPage } from 'next'
import { BoardType, defaultBoard } from '../utils/board'
import Image from 'next/image'
import { TileType, UnitType } from '../utils/board'
import { useState, useEffect } from 'react'
import { movePawn, moveFromTo, moveKnight, moveRook, moveBishop, moveQueen, moveKing, checkForMate, checkForCheckMate } from '../utils/movements'
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const [ board, setBoard ] = useState<BoardType>([] as BoardType);
  const [ gameOn, setGameOn ] = useState<boolean>(false);
  const [ gameOver, setGameOver ] = useState<boolean>(false);
  const [ player, setPlayer ] = useState<'black' | 'white'>('white');
  const [ selectedPiece, setSelectedPiece ] = useState<TileType | null>(null);
  const [ possibleMoves, setPossibleMoves ] = useState<Array<string>>([]);
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null);
  const router = useRouter();

  const clickTile = (tile: TileType) => {
    setErrorMessage(null);
    var boardCopy = JSON.parse(JSON.stringify(board))
    if (!tile.unit && !possibleMoves.includes(tile.tile)) {
      setSelectedPiece(null);
      setPossibleMoves([]);
      return;
    }
    if (gameOn && !possibleMoves.includes(tile.tile) && tile.unit?.team === player) {
      setSelectedPiece(tile);
    }
    if (selectedPiece && possibleMoves.includes(tile.tile)) {
      var newBoard = moveFromTo(selectedPiece, selectedPiece.tile, tile.tile, boardCopy);
      if (!checkForMate(newBoard, player)) {
        setBoard(newBoard);
        refreshData();
        if (player === 'white') {
          setPlayer('black');
        } else {
          setPlayer('white');
        }
      } else {
        setErrorMessage('Invalid move');
      }
      setSelectedPiece(null);
      setPossibleMoves([]);
      
    }
  }

  const startGame = () => {
    setGameOn(true);
    setBoard(defaultBoard);
  }

  useEffect(() => {
    setBoard(defaultBoard);
  }, [])

  useEffect(() => {
    if (selectedPiece?.unit) calculateMoves(selectedPiece.unit, selectedPiece.tile);
  }, [selectedPiece])

  useEffect(() => {
    var boardCopy = JSON.parse(JSON.stringify(board))
    if (checkForMate(boardCopy, player)) {
      if (checkForCheckMate(boardCopy, player)) {
        alert('check mate!')
        setGameOn(false);
        setGameOver(true);
      } else {
        setErrorMessage('mated');
      }
    }
  }, [player])

  const calculateMoves = (unit: UnitType, tile: string) => {
    switch (unit.class) {
      case 'pawn':
        setPossibleMoves(movePawn(tile, unit.team, [...board]));
        return;
      case 'knight':
        setPossibleMoves(moveKnight(tile, unit.team, [...board]));
        return;
      case 'rook':
        setPossibleMoves(moveRook(tile, unit.team, [...board])!);
        return;
      case 'bishop':
        setPossibleMoves(moveBishop(tile, unit.team, [...board])!);
        return;
      case 'queen':
        setPossibleMoves(moveQueen(tile, unit.team, [...board])!);
        return;
      case 'king':
        setPossibleMoves(moveKing(tile, unit.team, [...board])!);
        return;
      default:
        return
    }
  }

  const refreshData = () => {
    router.replace(router.asPath);
  }

  return (
    <div className='flex flex-col items-center justify-center align-middle mt-12'>
      <div className='board'>
        {board && board.map((row: Array<TileType>, i: number) => {
          return (
            <div className='flex flex-row' key={i}>
              {row.map((tile: TileType) => {
                return (
                  <div onClick={() => clickTile(tile)} key={tile.tile} className={
                      possibleMoves.includes(tile.tile) && tile.color === 'white' ? 'selectedWhiteTile' :
                      possibleMoves.includes(tile.tile) && tile.color === 'black' ? 'selectedBlackTile' :
                      !possibleMoves.includes(tile.tile) && tile.color === 'white' ? 'whiteTile' : 'blackTile'
                    }>
                    {
                    <>
                      <div>{tile.tile}</div>
                      <div className='flex items-center justify-center'>
                        {tile.unit && 
                        <Image 
                          src={`/${tile.unit.image}.png`}
                          alt={`${tile.unit.image}`}
                          width={40}
                          height={40}
                        />}
                      </div>
                    </>
                    }
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <div className='mt-4'>
        {!gameOn && <button onClick={() => startGame()} className='py-1 px-2 bg-white rounded'>Start Game</button>}
        {gameOn && 
        <div className='text-xl font-bold'>
          <div>{`${player} player's turn`}</div>
          {gameOn && selectedPiece?.unit && <div>{`Selected tile: ${selectedPiece.tile}`}<br />{`selected unit: ${selectedPiece.unit.team} ${selectedPiece.unit.class}`}</div>}
          {errorMessage && <div>{errorMessage}</div>}
        </div>
        }
      </div>
    </div>
  )
}

export default Home
