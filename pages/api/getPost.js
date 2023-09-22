import prisma from '../../prisma/client'

export default async function handler(req, res) {

  if(req.method === "GET") {

    try{
      const data = await prisma.post.findMany({
        include: {
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
      res.status(200).json(data)
    }catch(err) {
      res.status(403).json({ message: "Помилка при отриманні данних!" })
    }
  }
}