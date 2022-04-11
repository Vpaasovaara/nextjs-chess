import type { NextPage } from 'next'
import { defaultBoard } from '../utils/board'
import Image from 'next/image'
import { TileType, UnitType } from '../utils/board'
import { useState, useEffect } from 'react'

const Home: NextPage = () => {
  const [ gameOn, setGameOn ] = useState<boolean>(false);
  const [ player, setPlayer ] = useState<'black' | 'white'>('white');
  const [ selectedPiece, setSelectedPiece ] = useState<TileType | null>(null);
  const [ possibleMoves, setPossibleMoves ] = useState<Array<string>>([]);

  const clickTile = (tile: TileType) => {
    if (!tile.unit) return;
    if (tile.unit.team === player) {
      setSelectedPiece(tile);
    }
  }

  useEffect(() => {
    if (selectedPiece?.unit) calculateMoves(selectedPiece.unit);
  }, [selectedPiece])

  const calculateMoves = (unit: UnitType) => {
    let calculatedList: Array<string> = [];
    switch (unit.class) {
      case 'pawn':
        return {
          
        }
    }
  }

  return (
    <div className='flex flex-col items-center justify-center align-middle mt-12'>
      <div className='board'>
        {defaultBoard && defaultBoard.map((row: Array<TileType>, i: number) => {
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
