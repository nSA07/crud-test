"use client"

import axios from "axios"
import { useQuery } from "@tanstack/react-query"

const fetchDetails = async (slug ) => {
  const response = await axios.get(`/api/${slug}`)
  return response.data
}

export default function Commets({postId}) {
  if(!postId) {
    return null
  } else {
    const { data, isSuccess } = useQuery({
      queryKey: ["detail-post"],
      queryFn: () => fetchDetails(postId),
    })
    
    return (
      <>
          {isSuccess && data.comments.map((comm) => (
              <div key={comm.id} className="form-comment__hero">
                  <div style={{ background: comm.color }} className="form-comment__img"></div>
                  <span className="form-comment__descr">{comm.title}</span>
              </div>
          ))}
      </>
    )
  }
}