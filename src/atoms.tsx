import { atom, selector } from "recoil";

const output = localStorage.getItem("toDos")
let localData = JSON.parse(output as any)

export enum Categories {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE"
}

export interface IToDo {
    text: string;
    id: number;
    category: Categories;
}

export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.TO_DO
})

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: localData
})

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({get}) => {
        const toDos = get(toDoState)
        const category = get(categoryState)
        if (category === Categories.TO_DO) return toDos.filter(toDo => toDo.category === Categories.TO_DO)
        if (category === Categories.DOING) return toDos.filter(toDo => toDo.category === Categories.DOING)
        if (category === Categories.DONE) return toDos.filter(toDo => toDo.category === Categories.DONE)
    }
})
