import { useRef } from "react"
import { Droppable } from "react-beautiful-dnd"
import { useForm } from "react-hook-form"
import { useSetRecoilState } from "recoil"
import styled from "styled-components"
import { IToDo, toDoState } from "../atoms"
import DragabbleCard from "./DragabbleCard"


const Wrapper = styled.div`
  padding-top: 10px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
    text-align: center;
    font-weight: 600;
    font-size: 18px; 
    padding: 10px 0px;
`

interface IAreaProps {
    isDraggingOver: boolean;
    isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
    background-color: ${props => props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#dcdde1" : "transparent"};
    flex-grow: 1;
    transition: background-color 0.3s ease-in;
    padding: 20px;
`

const Form = styled.form`
    width: 100%;
    input {
        width: 100%;
    }
`

interface IBoardProps {
    toDos: IToDo[];
    boardId: string;
}

interface IForm {
    toDo: string;
}

function Board ({toDos, boardId}:IBoardProps) {
    const {register, setValue, handleSubmit, formState} = useForm<IForm>()
    const setToDos = useSetRecoilState(toDoState)
    const onValid = ({toDo}:IForm) => {
        setValue("toDo", "")
        const newToDo = {
            id: Date.now(),
            text: toDo
        }
        setToDos(allBoards => {
            return {
                ...allBoards,
                [boardId]: [
                    newToDo,
                    ...allBoards[boardId]
                ]
            }
        })
    }
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input {...register("toDo", { required: true })} placeholder="Add task on"/>
            </Form>
            <Droppable droppableId={boardId}>
            {(magic, snapshot) => 
            <Area 
                isDraggingOver={snapshot.isDraggingOver} 
                isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                ref={magic.innerRef} 
                {...magic.droppableProps}
            >
                {toDos.map((toDo, index) => (
                <DragabbleCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text}/>
                ))}
                {magic.placeholder}
            </Area>
            }
            </Droppable>
        </Wrapper>
    )
}

export default Board