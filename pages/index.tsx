import type { NextPage } from 'next'
import { defaultBoard } from '../utils/board'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className='flex items-center justify-center align-middle mt-6'>
      <div className='board'>
        {defaultBoard && defaultBoard.map((row, i) => {
          return (
            <div className='' key={i}>
              {row.map((tile, y) => {
                return (
                  <div key={tile.tile} className={tile.color === 'white' ? 'whiteTile' : 'blackTile'}>
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
    </div>
  )
}

export default Home
