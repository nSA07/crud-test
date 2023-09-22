import prisma from '../../prisma/client'

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await prisma.post.findUnique({
        where: {
          id: +req.query.slug,
        },
        include: {
          comments: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      })
      return res.status(200).json(data)
    } catch (err) {
      res.status(403).json({ message: "Error has occured while making a post" })
    }
  }
}