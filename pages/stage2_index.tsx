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
  type Cell = { row: number; col: number }
  const [structure, setStructure] = useState({ row: 8, col: 8, color: 1, passCnt: 0 })
  // const [passCount, setPassCount] = useState(0)

  const reverseColor: number = useMemo(() => {
    return structure.color === 1 ? 2 : 1
  }, [structure])

  // prettier-ignore
  const directions: number[][] = [
    [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]
  ]

  const boardCreate = () => {
    const board = [...Array(structure.row)].map(() => [...Array(structure.col)].map(() => 0))
    board[3][3] = 1
    board[3][4] = 2
    board[4][3] = 2
    board[4][4] = 1
    return board
  }

  const [board, setBoard] = useState(boardCreate)

  const { whiteCount, blackCount } = useMemo(() => {
    return {
      whiteCount: board.flat().filter((x) => x === 2).length,
      blackCount: board.flat().filter((x) => x === 1).length,
    }
  }, [board])

  // const [color, setColor] = useState(1)

  const validate = (target: number, val: [number, number]) => {
    val.sort()
    return target <= val[0] && target >= val[1]
  }

  const puttables = useMemo(() => {
    const color = structure.color
    // const rtnList = [...Array(structure.row)].map(() => [...Array(structure.col)].map(() => 0))
    // const candidates: Cell[] = []
    const aryEmpty = board.flat().filter((x) => x === 0)
    const aryColor = board.flat().filter((x) => x === color)
    // possibles:石を配置可能なCell
    const possibles = aryEmpty
      .filter((elm, idx) => {
        const emptyCell: Cell = { row: idx / 10, col: idx % 10 }
        // 方向性があることを確認
        const maybe = aryColor
          .map((elm, idx) => {
            const cell: Cell = { row: idx / 10, col: idx % 10 }
            const direction = directions.find(
              (elm) => elm === [cell.row - emptyCell.row, cell.col - emptyCell.col]
            )
            return { direction: direction, cell: cell }
          })
          .filter((elm) => elm.direction)
          .filter((elm) => {
            const colorCell = elm.cell
            // 間にある石が反対色のみなら候補とする
            const whileStone = board
              .flat()
              .map((elm, idx) => {
                return { row: idx / 10, col: idx % 10 }
              })
              .filter((elm: Cell) => {
                // 間にあるCellのみ抽出
                return (
                  validate(elm.row, [emptyCell.row, colorCell.row]) &&
                  validate(elm.col, [emptyCell.col, colorCell.col])
                )
              })
            return whileStone.every((e) => board[e.row][e.col] === reverseColor)
          })
        return maybe.length
      })
      .map((elm, idx) => [idx / 10, idx % 10])
    const rtn = [...Array(structure.row)].map((row, x) => {
      return [...Array(structure.col)].map((col, y) => {
        return possibles.includes([x, y]) ? 1 : 0
      })
    })
    console.log(rtn)
    return rtn
    // for (let x = 0; x < 8; x++) {
    //   for (let y = 0; y < 8; y++) {
    //     if (board[x][y] === 0) {
    //       for (const direction of directions) {
    //         for (let n = 1; n < 8; n++) {
    //           const newX = x + direction[0] * n
    //           const newY = y + direction[1] * n
    //           if (newX < 0 || newY < 0 || newX > 7 || newY > 7) break
    //           if (board[newX][newY] === reverseColor) {
    //             candidates.push({ row: newX, col: newY })
    //           } else if (board[newX][newY] === color) {
    //             candidates.push({ row: newX, col: newY })
    //             break
    //           } else {
    //             break
    //           }
    //         }
    //         if (candidates.length > 1) {
    //           const lastCell = candidates[candidates.length - 1]
    //           if (board[lastCell.row][lastCell.col] === color) {
    //             rtnList[x][y] = 1
    //           }
    //         }
    //         candidates.splice(0, candidates.length)
    //       }
    //     }
    //   }
    // }
    // return rtnList
  }, [board, structure])

  const isPass = useMemo(() => {
    const OneDimensional = puttables.flat(2)
    return !OneDimensional.includes(1)
  }, [puttables])

  const resetBoard = () => {
    setBoard(boardCreate)
  }

  const onClick = (x: number, y: number) => {
    const color = structure.color
    const newBoard: number[][] = JSON.parse(JSON.stringify(board)) // boardを直接書き換えないようにコピー作成
    const candidates: Cell[] = []
    for (const direction of directions) {
      for (let n = 1; n < 8; n++) {
        const newX = x + direction[0] * n
        const newY = y + direction[1] * n
        if (newX < 0 || newY < 0 || newX > 7 || newY > 7) break
        if (newBoard[newX][newY] === reverseColor) {
          candidates.push({ row: newX, col: newY })
        } else if (newBoard[newX][newY] === color) {
          candidates.push({ row: newX, col: newY })
          break
        } else {
          break
        }
      }
      if (candidates.length > 1) {
        const lastCell = candidates[candidates.length - 1]
        if (newBoard[lastCell.row][lastCell.col] === color) {
          candidates.splice(candidates.length - 1, 0)
          for (const cell of candidates) {
            newBoard[cell.row][cell.col] = color
          }
          newBoard[x][y] = color
        }
      }
      candidates.splice(0, candidates.length)
    }
    if (newBoard[x][y] === color) {
      setBoard(newBoard) // boardに変更を反映
      // setColor(reverseColor)
      structure.color = reverseColor
      setStructure(structure)
    }
  }

  useEffect(() => {
    const passCount = structure.passCnt
    const pCnt: number = isPass ? passCount + 1 : 0
    console.log(pCnt)
    // setPassCount(pCnt)
    structure.passCnt = pCnt
    if (isPass && whiteCount + blackCount < 64) {
      alert('打てるところがないためパスします。')
      // setColor(reverseColor)
      structure.color = reverseColor
    }
    if (pCnt > 1) {
      alert('パスが２回続いたので終了します。')
      whiteCount > blackCount ? alert('白の勝ちです。') : alert('黒の勝ちです。')
      resetBoard()
    }
    setStructure(structure)
  }, [puttables])

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
        <h1>{structure.color === 1 ? '黒の番です。' : '白の番です。'}</h1>
        <Grid>
          {board.map((row, x) =>
            row.map((color, y) => (
              <Block key={`${x}-${y}`} onClick={() => onClick(x, y)} val={puttables[x][y]}>
                {x}, {y}
                {color > 0 && <Stone val={color} />}
              </Block>
            ))
          )}
        </Grid>
      </Main>
    </Container>
  )
}

export default Home
