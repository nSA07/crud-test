"use client"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"

export default function CreatePost() {
  const [title, setTitle] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const queryClient = useQueryClient()
  let toastPostID

  const {mutate} = useMutation(
    async (title) => await axios.post('/api/addPost', {title}),
    {
        onError: (error) => {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data.message, {id: toastPostID})
            }
            setIsDisabled(false)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"])
            toast.success("Запис доданно 🔥", {id: toastPostID})
            setTitle("")
            setIsDisabled(false)
        }
    }
  )

  const submitPost = async (e) => {
    e.preventDefault()
    setIsDisabled(true)
    mutate(title)
  }

  return (
    <form onSubmit={submitPost} className="form">
        <p className="form__title">Items</p>
        <div className="form__hero">
            <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                name="title"
                placeholder="Type name here..." 
                className="form__input"
            />
            <button
                disabled={isDisabled}
                className="form__btn-primery"
                type="submit"
            >
            Add New
            </button>
        </div>
    </form>
  )
}