"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import AddPost from './components/AddPost'
import { Post } from './components/Post'
import FormComments from './components/FormComments'
import { useState } from "react"

const allPosts = async () => {
  const response = await axios.get("/api/getPost")
  return response.data
}

export default function Home() {

const [selectPost, setSelectPost] = useState()

const getSelectedPost = (id) => {
  setSelectPost(id)
}

const { data: post, error, isLoading } = useQuery({
  queryFn: allPosts,
  queryKey: ["posts"],
})
if (error) return error
if (isLoading) return "Loading....."

return (
  <main>
    <div className='wrap'>
      <AddPost />
        {
          post.map((posts) => (
            <Post
              key={posts.id}
              id={posts.id}
              title={posts.title}
              comments={posts.comments}
              getSelectedPost={getSelectedPost}
            />
          ))
        }
    </div>
    <FormComments
      key={selectPost}
      postId={selectPost}
    />
  </main>
)
}
