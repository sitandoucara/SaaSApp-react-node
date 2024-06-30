const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllNews = async (req, res) => {
  try {
    const news = await prisma.news.findMany();
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving news" });
  }
};

const getNewsById = async (req, res) => {
  const { id } = req.params;
  try {
    const news = await prisma.news.findUnique({ where: { id } });
    if (news) {
      res.json(news);
    } else {
      res.status(404).json({ error: "News not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving news" });
  }
};

const createNews = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNews = await prisma.news.create({
      data: { title, content },
    });
    res.status(201).json(newNews);
  } catch (error) {
    res.status(500).json({ error: "Error creating news" });
  }
};

const updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedNews = await prisma.news.update({
      where: { id },
      data: { title, content },
    });
    res.json(updatedNews);
  } catch (error) {
    res.status(500).json({ error: "Error updating news" });
  }
};

const deleteNews = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.news.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error deleting news" });
  }
};

module.exports = {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};
