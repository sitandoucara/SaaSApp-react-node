const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users" });
  }
};

exports.updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating user role" });
  }
};
