import prisma from "../../prisma/client"

export default async function handler(req, res) {

  if (req.method === "DELETE") {
    const postId = +req.body
    try {
        const result = await prisma.post.delete({
        where: {
          id: postId,
        },
      })
      res.status(200).json(result)
    } catch (err) {
      res.status(403).json({ message: "Помилка при видаленні запису!" })
    }
  }
}