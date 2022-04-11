import type { NextPage } from 'next'
import { defaultBoard } from '../utils/board'

const Home: NextPage = () => {
  return (
    <div className='flex items-center justify-center align-middle mt-6'>
      <div className='board'>
        {defaultBoard && defaultBoard.map((row, i) => {
          return (
            <div className='' key={i}>
              {row.map((tile, y) => {
                return (
                  <div key={tile.tile} className={tile.color === 'white' ? 'whiteTile' : 'blackTile'}>{tile.tile}</div>
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
