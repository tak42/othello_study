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
  flex: 1;
  padding: 5rem 0;
`

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  margin-top: 3rem;
`

const Block = styled.div<{ val: number }>`
  width: 100px;
  height: 100px;
  background-color: ${(props) => (props.val === 1 ? 'yellow' : 'green')};
  border: 1px solid black;
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

  const boardCreate = (): Board => {
    return [...Array(structure.row * structure.col)].map((elm, idx) => {
      return { point: [Math.floor(idx / structure.row), idx % structure.col], stone: 0 }
    })
  }

  const newBoard = () => {
    const board = boardCreate()
    board[27].stone = 1
    board[28].stone = 2
    board[35].stone = 2
    board[36].stone = 1
    return board
  }

  const [board, setBoard] = useState(newBoard)

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

  const isCellMatch = (a: Cell, b: Cell) => {
    return a[0] === b[0] && a[1] === b[1]
  }

  const whileStone = (emptyCell: Cell) => {
    return board
      .filter((e) => e.stone === color)
      .map((elm) => {
        const dMap = directionMap(emptyCell)
        const find = dMap.find((e) => isCellMatch(e.cell, elm.point))
        const Cells = find !== undefined ? dMap.filter((e) => e.dir === find.dir) : []
        const stones: Cell[] = Cells.map((e) => e.cell).filter(
          (e) =>
            validate(e[0], [emptyCell[0], elm.point[0]]) &&
            validate(e[1], [emptyCell[1], elm.point[1]])
        )
        stones.pop()
        const isEvery = stones.every((e) => {
          const find = board.find((x) => isCellMatch(x.point, e))
          return find?.stone === reverseColor
        })
        return { result: stones.length > 0 && isEvery, Cells: stones }
      })
      .filter((e) => e.result)
  }

  const updateBoard = (original: Board, target: Board, val: number) => {
    return original.map((e) => {
      const stone = target.find((x) => isCellMatch(x.point, e.point)) ? val : e.stone
      return { point: e.point, stone: stone }
    })
  }

  const puttables = useMemo(() => {
    const target = board.filter((e) => e.stone === 0 && whileStone(e.point).length > 0)
    return updateBoard(boardCreate(), target, 1)
  }, [board, color, reverseColor])

  const isPass = useMemo(() => {
    const OneDimensional = puttables.flatMap((e) => e.stone)
    return !OneDimensional.includes(1) && whiteCount + blackCount < 64
  }, [puttables])

  const onClick = (emptyCell: Cell) => {
    const target: Board = whileStone(emptyCell)
      .flatMap((e) => e.Cells)
      .map((e) => {
        return { point: e, stone: 0 }
      })
    target.push({ point: emptyCell, stone: 0 })
    setBoard(updateBoard(board, target, color))
    setColor(reverseColor)
  }

  useEffect(() => {
    const copyStructure = { ...structure }
    const firstPass = isPass && structure.passCnt === 0
    const secondPass = isPass && structure.passCnt === 1
    const isFull = whiteCount + blackCount === 64
    if (secondPass) alert(`${whiteCount > blackCount ? '白' : '黒'}の勝ちです。`)
    if (firstPass) alert('パスします。')
    setStructure({ ...structure, ...{ passCnt: isPass ? (copyStructure.passCnt += 1) : 0 } })
    setColor(firstPass ? reverseColor : color)
    if (isFull) alert(`${whiteCount > blackCount ? '白' : '黒'}の勝ちです。`)
    setBoard(secondPass || isFull ? newBoard : board)
  }, [isPass, structure.passCnt, color, reverseColor, whiteCount, blackCount])

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
              onClick={() => (puttables[idx].stone === 1 ? onClick(elm.point) : false)}
              val={puttables[idx].stone ? puttables[idx].stone : 0}
            >
              {elm.stone > 0 && <Stone val={elm.stone} />}
            </Block>
          ))}
        </Grid>
      </Main>
    </Container>
  )
}

export default Home
