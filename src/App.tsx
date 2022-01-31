import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { toDoState } from './atoms'
import Board from './components/Board'
import DragabbleCard from './components/DragabbleCard'

const Wrapper = styled.div`
  display: flex;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`




function App () {
  const [toDos, setToDos] = useRecoilState(toDoState)
  const onDragEnd = (info:DropResult) => {
    const {destination, draggableId, source} = info
    if (!destination) return
    if (destination?.droppableId === source.droppableId) {
      // same board!
      setToDos(allBoards => {
        const boardCopy = [...toDos[source.droppableId]]
        const taskObj = boardCopy[source.index]
        boardCopy.splice(source.index, 1)
        boardCopy.splice(destination?.index, 0, taskObj)
        return {
          ...allBoards,
          [source.droppableId]: boardCopy
        }
      })
    }
    if (destination.droppableId !== source.droppableId) {
      // other board move!
      setToDos(allBoards => {
        const sourceBoard = [...allBoards[source.droppableId]]
        const taskObj = sourceBoard[source.index]
        const targetBoard = [...allBoards[destination.droppableId]]

        sourceBoard.splice(source.index, 1)
        targetBoard.splice(destination?.index, 0, taskObj)

        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: targetBoard
        }
      })
    }
  }
  return <DragDropContext onDragEnd={onDragEnd}>
    <Wrapper>
      <Boards>
        {Object.keys(toDos).map(boardId => <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />)}
      </Boards>
    </Wrapper>
  </DragDropContext>
}

export default App