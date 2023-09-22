"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import Commets from "./Comments"
import toast from "react-hot-toast"

export default function CreateCommets({postId}) {

  let commentToastId
  const [title, setTitle] = useState("")
  const [color, setColor] = useState("")

  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    async (data) => {
      return axios.post("/api/addComment", { data })
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["detail-post"])
        queryClient.invalidateQueries(["post"])
        setTitle("")
        toast.success("Added your comment", { id: commentToastId })
      },
      onError: (error) => {
        console.log(error)
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: commentToastId })
        }
      },
    }
  )

  const submitPost = async (e) => {
    e.preventDefault()
    if(postId && color) {
      mutate({ title, color, postId: postId })
    }
  }

  return (
    <div className="form-comment">
        <p className="form-comment__title">Comments #{postId}</p>
        <Commets 
          postId={postId}
        />
        <form onSubmit={submitPost} className="form-comment__inner">
            <input
              onChange={(e) => setColor(e.target.value)}
              value={color}
              type="color"
              className="form-comment__color"
              name="title"
             />
            <textarea
              placeholder="Type comment here..." 
              className="form-commet__textarea"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="input"
              name="title"
            />
            <button className="form-comment__btn-secondary">
                Add New
            </button>
        </form>
    </div>
  )
}