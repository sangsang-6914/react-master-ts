import React from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { Categories, IToDo, toDoState } from "../atoms"

function ToDo ({text, category, id}: IToDo) {
    const [toDos, setToDos] = useRecoilState(toDoState)
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { currentTarget: {name}} = event
        console.log(name)
        setToDos(oldToDos => {
            const targetIndex = oldToDos.findIndex(item => item.id === id )
            const newToDo = {text, id, category: name as any}
            const newArray = [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex+1)]
            
            localStorage.setItem("toDos", JSON.stringify(newArray))

            return [
                ...oldToDos.slice(0, targetIndex), 
                newToDo, 
                ...oldToDos.slice(targetIndex+1)
            ]
        })
    }
    const onDelete = () => {
        setToDos(oldToDos => {
            const deleteIndex = oldToDos.findIndex(toDo => toDo.id === id)
            const newArray = [...oldToDos.slice(0, deleteIndex), ...oldToDos.slice(deleteIndex+1)]
            
            localStorage.setItem("toDos", JSON.stringify(newArray))

            return newArray
        })
    }
    return <li>
        <span>{text}</span>
        { category !== Categories.DOING && <button onClick={onClick} name={Categories.DOING}>Doing</button>} 
        { category !== Categories.TO_DO && <button onClick={onClick} name={Categories.TO_DO}>To Do</button>}
        { category !== Categories.DONE && <button onClick={onClick} name={Categories.DONE}>Done</button>}
        <button onClick={onDelete}>Delete</button>
    </li> 

}

export default ToDo