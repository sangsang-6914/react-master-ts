import React, { useState } from "react"
import { useForm } from "react-hook-form"

interface IForm {
    email: string;
    firstName: string;
    lastName?: string;
    username: string;
    password: string;
    password2: string;
    extraError?: string;
}

function ToDoList () {
    const {register, handleSubmit, formState: {errors}, setError} = useForm<IForm>({
        defaultValues: {
            email: '@naver.com'
        }
    })
    const onValid = (data:IForm) => {
        if (data.password !== data.password2) {
            setError("password2", { message: "Password are not the same"}, {shouldFocus: true})
        }
        // setError("extraError", {message: "Server offline."})
    }
    const onInValid = () => {
        console.log('not correct validation!')
    }

    console.log(errors)

    return ( 
        <div>
            <form style={{display:"flex", flexDirection: "column"}} onSubmit={handleSubmit(onValid, onInValid)}>
                <input 
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9.+%_-]+@naver.com$/,
                            message: "Only naver.com"
                        }
                })} placeholder="Email" />
                <span>
                    {errors?.email?.message}
                </span>
                <input {...register("firstName", {
                    required: true,
                    validate: {
                        noNico: (value) => value.includes("nico") ? "no nicons allowed" : true,
                        noNick: (value) => value.includes("nick") ? "no nicks allowed" : true
                    }
                })} placeholder="FirstName" />
                <span>{errors?.firstName?.message}</span>
                <input {...register("lastName", {required: true})} placeholder="lastName" />
                <input {...register("username", {required: true, minLength: 5})} placeholder="Username" />
                <input {...register("password", {required: true, minLength: 5})} placeholder="Password" />
                <input 
                    {...register("password2", {
                        required: "Password check is Required", 
                        minLength: {
                            value: 5,
                            message: 'your password is short'
                        }})} 
                    placeholder="Password" />
                <span>
                    {errors?.password2?.message}
                </span>
                <button>Add</button>
                <span>
                    {errors?.extraError?.message}
                </span>
            </form>
        </div>
    )
}

export default ToDoList