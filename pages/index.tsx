import type { NextPage } from 'next'
import { BoardType, defaultBoard } from '../utils/board'
import Image from 'next/image'
import { TileType, UnitType } from '../utils/board'
import { useState, useEffect } from 'react'
import { movePawn, moveFromTo, moveKnight, moveRook, moveBishop, moveQueen, moveKing } from '../utils/movements'
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const [ board, setBoard ] = useState<BoardType>([] as BoardType);
  const [ gameOn, setGameOn ] = useState<boolean>(false);
  const [ player, setPlayer ] = useState<'black' | 'white'>('white');
  const [ selectedPiece, setSelectedPiece ] = useState<TileType | null>(null);
  const [ possibleMoves, setPossibleMoves ] = useState<Array<string>>([]);
  const router = useRouter();

  const clickTile = (tile: TileType) => {
    if (!tile.unit && !possibleMoves.includes(tile.tile)) {
      setSelectedPiece(null);
      setPossibleMoves([]);
      return;
    }
    if (gameOn && !possibleMoves.includes(tile.tile) && tile.unit?.team === player) {
      setSelectedPiece(tile);
    }
    if (selectedPiece && possibleMoves.includes(tile.tile)) {
      setBoard(moveFromTo(selectedPiece, selectedPiece.tile, tile.tile, [...board]));
      setSelectedPiece(null);
      setPossibleMoves([]);
      refreshData();
      if (player === 'white') {
        setPlayer('black')
      } else {
        setPlayer('white')
      }
    }
  }

  useEffect(() => {
    setBoard(defaultBoard);
  }, [])

  useEffect(() => {
    if (selectedPiece?.unit) calculateMoves(selectedPiece.unit, selectedPiece.tile);
  }, [selectedPiece])

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
        {!gameOn && <button onClick={() => setGameOn(true)} className='py-1 px-2 bg-white rounded'>Start Game</button>}
        {gameOn && 
        <div className='text-xl font-bold'>
          <div>{`${player} player's turn`}</div>
          {gameOn && selectedPiece?.unit && <div>{`Selected tile: ${selectedPiece.tile}`}<br />{`selected unit: ${selectedPiece.unit.team} ${selectedPiece.unit.class}`}</div>}
        </div>
        }
      </div>
    </div>
  )
}

export default Home



/*


return (
            <div className='' key={i}>
              {row.map((tile: TileType) => {
                return (
                  <div onClick={() => clickTile(tile)} key={tile.tile} className={tile.color === 'white' ? 'whiteTile' : 'blackTile'}>
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
              return (
            
            <div className='' key={i}>
              {row.map((tile: TileType) => {
                return (
                  <div onClick={() => clickTile(tile)} key={tile.tile} className={tile.color === 'white' ? 'whiteTile' : 'blackTile'}>
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

*/