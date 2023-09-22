import prisma from '../../prisma/client'

export default async function handler(req, res) {

  if(req.method === "POST") {

    const title = req.body.title

    if (!title.length) {
      return res
        .status(403)
        .json({ message: "Будь-ласка напишіть шось, а потім ми покажемо Вам це!" })
    }

    try{
      const result = await prisma.post.create({
        data: {
          title,
        }
      })
      res.status(200).json(result)
    }catch(err) {
      res.status(403).json({ message: "Помилка при створенні запису!" })
    }
  }
}