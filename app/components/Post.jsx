'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import axios from "axios"
import { useState } from "react"

export const Post = ({id, title, comments, getSelectedPost}) => {

  const [color, setColor] = useState(false)

  const queryClient = useQueryClient()
  let deleteToastID

  const { mutate } = useMutation(
    async (id) => await axios.delete('/api/deletePost', {data: id}),
    {
      onError: (error) => {
        console.log(error)
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"])
        toast.success("Запис видаленно", { id: deleteToastID })
      },
    }
  )

  const deletePost = () => {
    mutate(id)
  }

  return (
        <div onClick={e => getSelectedPost(id)} className={`form__inner ${color ? 'active-item' : ''}`}>
            <p className="form__descr">{title}</p>
            <div className="form__count">
                <span>{comments.length}</span>
            </div>
            <button
              onClick={deletePost}
              className="form__btn-outline"
            >Delete</button>
        </div>
  )
}
