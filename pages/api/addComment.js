import prisma from "../../prisma/client"


export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, color, postId } = req.body.data
    console.log(title, color, postId);
    if (!title.length) {
      return res.status(401).json({ message: "Напишіть комент" })
    }

    try {
      const result = await prisma.comment.create({
        data: {
          title,
          color,
          postId
        },
      })
      res.status(200).json(result)
    } catch (err) {
      res.status(403).json({ message: "Error has occured while making a post" })
    }
  }
}