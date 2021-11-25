import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
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

const Title = styled.h1`
  margin: 0;
  font-size: 4rem;
  line-height: 1.15;
  text-align: center;

  a {
    color: #0070f3;
    text-decoration: none;
  }
  a:hover,
  a:focus,
  a:active {
    text-decoration: underline;
  }
`

const Description = styled.p`
  font-size: 1.5rem;
  line-height: 1.5;
  text-align: center;
`

const Code = styled.code`
  padding: 0.75rem;
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
    Bitstream Vera Sans Mono, Courier New, monospace;
  font-size: 1.1rem;
  background: #fafafa;
  border-radius: 5px;
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
const Block = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid white;
`

const Stone = styled.div<{ val: number }>`
  height: 60px;
  margin: 1rem;
  background-color: ${(props) => (props.val === 1 ? 'white' : 'black')};
  border-radius: 50%;
`

const Card = styled.a`
  width: 45%;
  padding: 1.5rem;
  margin: 1rem;
  color: inherit;
  text-align: left;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;

  :hover,
  :focus,
  :active {
    color: #0070f3;
    border-color: #0070f3;
  }

  h2 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.5;
  }
`

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;

  a {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
  }
`

const Logo = styled.span`
  height: 1em;
  margin-left: 0.5rem;
`
const Home: NextPage = () => {
  // prettier-ignore
  const [board, setBoard] = useState([
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,1,2,0,0,0],
    [0,0,0,2,1,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
  ])
  const [turnColor, setTurnColor] = useState(1)

  const onClick = (x: number, y: number) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board)) // boardを直接書き換えないようにコピー作成
    const reverseColor: number = turnColor === 1 ? 2 : 1
    let isPossible = false
    // 周りの９マスにひっくり返せる石はあるかチェック
    // 上下,左右,斜め
    for (let i = x - 1; i <= x + 1; i++) {
      for (let l = y - 1; l <= y + 1; l++) {
        if (newBoard[i][l] === reverseColor) {
          isPossible = true
        }
      }
    }
    if (!isPossible) {
      // ひっくり返せる石はないのでルール上打てない
      console.log('ここには打てません。')
      return false
    }
    // newBoard[x][y] = turnColor
    // 同じ色の石の位置を抽出
    const stonePositionList: { row: number; col: number }[] = [] // 同じ色の石の位置を保持
    for (let i = 0; i < 8; i++) {
      for (let l = 0; l < 8; l++) {
        if (newBoard[i][l] === turnColor) {
          stonePositionList.push({ row: i, col: l })
        }
      }
    }
    let turnOverLen = 0 // 始点から見た対象の石をひっくり返す長さ
    let startIdx = 0 // 始点
    let isChanged = false // ひっくり返したかどうか
    for (const item of stonePositionList) {
      console.log('item', item.row, item.col)
      if (item.row === x && item.col !== y) {
        // 同じ行内の石をひっくり返す
        turnOverLen = y < item.col ? item.col - y : y - item.col // 絶対値を返すように後程修正
        startIdx = y < item.col ? y : item.col
        for (let i = startIdx; i < turnOverLen + startIdx; i++) {
          if (newBoard[x][i] === reverseColor) {
            console.log('row_turn', x, i)
            newBoard[x][i] = turnColor
            isChanged = true
          }
        }
      }
      if (item.row !== x && item.col === y) {
        // 同じ列内の位置にある石をひっくり返す
        turnOverLen = x < item.row ? item.row - x : x - item.row
        startIdx = x < item.row ? x : item.row
        for (let i = startIdx; i < turnOverLen + startIdx; i++) {
          if (newBoard[i][y] === reverseColor) {
            console.log('col_turn', i, y)
            newBoard[i][y] = turnColor
            isChanged = true
          }
        }
      }
      if (Math.abs(x - item.row) === Math.abs(y - item.col)) {
        // 斜めをひっくり返す
        if (item.row > x) {
          // 左斜め下 x+ y-
          // 右斜め下 x+ y+
          turnOverLen = Math.abs(x - item.row)
          startIdx = x
          let count = 0
          let colIdx = 0
          for (let i = startIdx; i < turnOverLen + startIdx; i++) {
            colIdx = y > item.col ? y - count : y + count
            if (newBoard[i][colIdx] === reverseColor) {
              newBoard[i][colIdx] = turnColor
              console.log('diagonal_under_turn', i, colIdx)
              isChanged = true
            }
            count += 1
          }
        }
        if (item.row < x) {
          // 左斜め上 x- y-
          // 右斜め上 x- y+
          turnOverLen = Math.abs(x - item.row)
          startIdx = item.row
          let count = 0
          let colIdx = 0
          for (let i = startIdx; i < turnOverLen + startIdx; i++) {
            colIdx = y < item.col ? y + count : y - count // バグあり
            // item(2,4)の状況で(2,5)の石をひっくり返している
            if (newBoard[i][colIdx] === reverseColor) {
              console.log('diagonal_up_turn', i, colIdx)
              newBoard[i][colIdx] = turnColor
              isChanged = true
            }
            count += 1
          }
        }
      }
    }
    if (isChanged) {
      setBoard(newBoard) // boardに変更を反映
      setTurnColor(reverseColor)
    }
  }
  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <h1>{turnColor === 1 ? '白の番です。' : '黒の番です。'}</h1>
        <Grid>
          {board.map((row, x) =>
            row.map((color, y) => (
              <Block key={`${x}-${y}`} onClick={() => onClick(x, y)}>
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
