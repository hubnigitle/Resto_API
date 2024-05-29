const { PrismaClient } = require('@prisma/client');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');
const ClientError = require('../errors/ClientError');

const prisma = new PrismaClient();

const getAllUser = async (req, res, next) => {
  try {
    const listUser = await prisma.User.findMany();

    return res.status(200).json({
      message: 'Sukses',
      data: listUser,
    });
  } catch (error) {
    return next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const isUser = await prisma.User.findUnique({
      where: {
        email,
      },
    });

    if (isUser) {
      throw new ClientError('User sudah terdaftar');
    }

    const newPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.User.create({
      data: {
        email,
        password: newPassword,
      },
    });

    return res.status(201).json({
      message: 'User berhasil ditambahkan',
      data: newUser,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllUser,
  register,
};
