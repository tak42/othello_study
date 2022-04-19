import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 100vh;
  padding: 0 0.5rem;
  background-color: green;
`

const Main = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
`

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  margin-top: 3rem;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
`
const Block = styled.div<{ val: number }>`
  width: 100px;
  height: 100px;
  background-color: ${(props) => (props.val === 1 ? 'yellow' : 'green')};
  border: 1px solid white;
`

const Stone = styled.div<{ val: number }>`
  height: 60px;
  margin: 1rem;
  background-color: ${(props) => (props.val === 1 ? 'black' : 'white')};
  border-radius: 50%;
`

const Home: NextPage = () => {
  type Cell = [number, number]

  type Board = { point: Cell; stone: number }[]

  const [structure, setStructure] = useState({ row: 8, col: 8, passCnt: 0 })

  const [color, setColor] = useState(1)

  const reverseColor: number = useMemo(() => {
    return color === 1 ? 2 : 1
  }, [color])

  const directions: number[][] = [-1, 0, 1]
    .flatMap((elm1, idx, self) => self.map((elm2) => [elm1, elm2]))
    .filter((e) => e[0] !== 0 || e[1] !== 0)

  const boardCreate = () => {
    const squareCnt = structure.row * structure.col
    const board: Board = [...Array(squareCnt)].map((elm, idx) => {
      return { point: [Math.floor(idx / structure.row), idx % structure.col], stone: 0 }
    })
    board[27].stone = 1
    board[28].stone = 2
    board[35].stone = 2
    board[36].stone = 1
    return board
  }

  const [board, setBoard] = useState(boardCreate)

  const { whiteCount, blackCount } = useMemo(() => {
    return {
      whiteCount: board.filter((e) => e.stone === 2).length,
      blackCount: board.filter((e) => e.stone === 1).length,
    }
  }, [board])

  const validate = (target: number, val: [number, number]) => {
    val.sort()
    return target >= val[0] && target <= val[1]
  }

  const directionMap = (target: Cell): { dir: number[]; cell: Cell }[] => {
    return directions
      .flatMap((e) => {
        return [...Array(8)].map((e2, idx) => {
          const cell: Cell = [target[0] + e[0] * (idx + 1), target[1] + e[1] * (idx + 1)]
          return { dir: e, cell: cell }
        })
      })
      .filter((e) => e.cell[0] > -1 && e.cell[0] < 8 && e.cell[1] > -1 && e.cell[1] < 8)
  }

  const whileCell = (start: Cell, end: Cell) => {
    // startとendの間にある石を配列で返す(方向性が成り立っていることが前提)
    const find = directionMap(start).find((e) => e.cell[0] === end[0] && e.cell[1] === end[1])
    return find !== undefined ? directionMap(start).filter((e) => e.dir === find.dir) : []
  }

  const whileStone = (emptyCell: Cell) => {
    const aryColor = board.filter((e) => e.stone === color)
    return aryColor.map((elm) => {
      const colorCell = elm.point
      const stones: Cell[] = whileCell(emptyCell, colorCell)
        .map((e) => e.cell)
        .filter(
          (e) =>
            validate(e[0], [emptyCell[0], colorCell[0]]) &&
            validate(e[1], [emptyCell[1], colorCell[1]])
        )
      stones.pop()
      const isEvery = stones.every((e) => {
        const find = board.find((x) => x.point === e)
        return find?.stone === reverseColor
      })
      return { result: stones.length > 0 && isEvery, Cells: stones }
    })
  }

  const puttables = useMemo(() => {
    // const aryCell: Cell[] = convertBoard
    // const aryEmpty = board.filter((e) => e.stone === 0)
    // const aryColor = board.filter((e) => e.stone === color)
    const aryReverse = board.filter((e) => e.stone === reverseColor)
    // possibles:石を配置可能なCell
    // const possibles = aryEmpty
    return board
      .filter((e) => e.stone === 0)
      .filter((elm) => {
        const emptyCell: Cell = elm.point
        // ひっくり返す石と隣接しているか？
        return aryReverse
          .map((elm) => {
            const cell: Cell = elm.point
            const dx = cell[0] - emptyCell[0]
            const dy = cell[1] - emptyCell[1]
            const direction = directions.find((elm) => {
              return elm[0] === dx && elm[1] === dy
            })
            return direction ? true : false
          })
          .includes(true)
      })
      .filter((elm) => {
        const emptyCell = elm.point
        // 隣接位置から、同色の石の間はreverseColorのみかどうかを確認
        // const filter = aryColor.map((elm) => {
        //   const colorCell = elm
        //   const stones = whileCell(emptyCell, colorCell)
        //     .map((e) => e.cell)
        //     .filter(
        //       (e) =>
        //         validate(e[0], [emptyCell[0], colorCell[0]]) &&
        //         validate(e[1], [emptyCell[1], colorCell[1]])
        //     )
        //   stones.pop()
        //   const res = stones.every((e) => {
        //     return board[e[0]][e[1]] === reverseColor
        //   })
        //   return stones.length > 0 && res
        // })
        return whileStone(emptyCell)
          .map((e) => e.result)
          .includes(true)
      })
    // return [...Array(structure.row)].map((row, x) => {
    //   return [...Array(structure.col)].map((col, y) => {
    //     return possibles.find((elm) => elm.point[0] === x && elm.point[1] === y) ? 1 : 0
    //   })
    // })
  }, [board, color, reverseColor])

  const isPass = useMemo(() => {
    const OneDimensional = puttables.flatMap((e) => e.stone)
    return !OneDimensional.includes(1)
  }, [puttables])

  const resetBoard = () => {
    setBoard(boardCreate)
  }

  const onClick = (x: number, y: number) => {
    puttables
    const newBoard: number[][] = JSON.parse(JSON.stringify(board)) // boardを直接書き換えないようにコピー作成
    // const candidates: Cell[] = []
    const aryColor = convertBoard.filter((elm) => board[elm[0]][elm[1]] === color)
    const emptyCell: Cell = [x, y]
    // 隣接位置にあるreverse対象の石のリスト
    const candidates = whileStone(emptyCell).filter((e) => e.result)
    // [[],[]]
    // return filter.includes(true)
    // for (const direction of directions) {
    //   for (let n = 1; n < 8; n++) {
    //     const newX = x + direction[0] * n
    //     const newY = y + direction[1] * n
    //     if (newX < 0 || newY < 0 || newX > 7 || newY > 7) break
    //     if (newBoard[newX][newY] === reverseColor) {
    //       candidates.push([newX, newY])
    //     } else if (newBoard[newX][newY] === color) {
    //       candidates.push([newX, newY])
    //       break
    //     } else {
    //       break
    //     }
    //   }
    //   if (candidates.length > 1) {
    //     const lastCell = candidates[candidates.length - 1]
    //     if (newBoard[lastCell[0]][lastCell[1]] === color) {
    //       candidates.splice(candidates.length - 1, 0)
    //       for (const cell of candidates) {
    //         newBoard[cell[0]][cell[1]] = color
    //       }
    //       newBoard[x][y] = color
    //     }
    //   }
    //   candidates.splice(0, candidates.length)
    // }
    // if (newBoard[x][y] === color) {
    //   setBoard(newBoard) // boardに変更を反映
    //   setColor(reverseColor)
    //   setStructure(structure)
    // }
  }

  useEffect(() => {
    const passCount = structure.passCnt
    const pCnt: number = isPass ? passCount + 1 : 0
    structure.passCnt = pCnt
    if (isPass && whiteCount + blackCount < 64) {
      alert('打てるところがないためパスします。')
      setColor(reverseColor)
    }
    if (pCnt > 1) {
      alert('パスが２回続いたので終了します。')
      whiteCount > blackCount ? alert('白の勝ちです。') : alert('黒の勝ちです。')
      resetBoard()
    }
    setStructure(structure)
  }, [isPass, structure.passCnt, color, reverseColor])

  useEffect(() => {
    if (whiteCount + blackCount === 64) {
      if (whiteCount > blackCount) {
        alert('白の勝ちです。')
      } else {
        alert('黒の勝ちです。')
      }
      resetBoard()
    }
  }, [whiteCount, blackCount])

  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <h1>{color === 1 ? '黒の番です。' : '白の番です。'}</h1>
        <Grid>
          {board.map((elm, idx) => (
            <Block
              key={`${elm.point[0]}-${elm.point[1]}`}
              onClick={() =>
                puttables[idx].stone === 1 ? onClick(elm.point[0], elm.point[1]) : false
              }
              val={puttables[idx].stone}
            >
              {/* {x}, {y} */}
              {color > 0 && <Stone val={color} />}
            </Block>
          ))}
        </Grid>
      </Main>
    </Container>
  )
}

export default Home
