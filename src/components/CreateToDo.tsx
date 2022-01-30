import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const [toDos, setToDos] = useRecoilState(toDoState)
    const category = useRecoilValue(categoryState)
    const {handleSubmit, register, setValue} = useForm<IForm>()
    const handleValid = ({toDo}: IForm) => {
        setValue("toDo", "")
        setToDos(oldToDos => {
            const newArray = [{text: toDo, id: Date.now(), category: category}, ...oldToDos]
            localStorage.setItem("toDos", JSON.stringify(newArray))
            
            return newArray
        })
    }
    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input {...register("toDo", {
                required: "Please write a to Do"
            })}placeholder="write here" />
            <button>Add</button>
        </form>
    )
}

export default CreateToDo;