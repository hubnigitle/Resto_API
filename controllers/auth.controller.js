const { PrismaClient } = require('@prisma/client');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const AuthenticationError = require('../errors/AuthenticationError');

const prisma = new PrismaClient();

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const User = await prisma.User.findUnique({
      where: {
        email,
      },
    });

    if (!User) {
      throw new AuthenticationError('Email atau password salah');
    }

    const isPassword = await bcrypt.compare(password, User.password);

    if (!isPassword) {
      throw new AuthenticationError('Email atau password salah');
    }

    const token = jwt.sign({ id: User.id }, process.env.SECRET_KEY, {
      expiresIn: '6h',
    });

    return res.cookie('token', token).status(200).json({
      message: 'User berhasil login',
      token,
    });
  } catch (error) {
    return next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({
      message: 'Success',
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  login,
  logout,
};
