// eslint-disable-next-line import/no-extraneous-dependencies
const { v4: uuidv4 } = require('uuid'); // Import fungsi untuk menghasilkan UUID
// eslint-disable-next-line import/no-extraneous-dependencies
const { PrismaClient } = require('@prisma/client');
const NotFoundError = require('../errors/NotFoundError');

const prisma = new PrismaClient();

const getAllMenu = async (req, res, next) => {
  try {
    const { q } = req.query;

    const listMenu = await prisma.menu.findMany({
      include: {
        kategori: true,
        ukurans: true,
      },
      where: {
        menu: {
          contains: q,
          mode: 'insensitive',
        },
      },
    });

    return res.status(200).json({
      message: 'Sukses',
      data: listMenu,
    });
  } catch (error) {
    return next(error);
  }
};

const getMenuById = async (req, res, next) => {
  try {
    const { id } = req.params; // ID dari permintaan adalah string UUID
    const menu = await prisma.menu.findUnique({
      where: {
        id,
      },
      include: {
        kategori: true,
        ukurans: true,
      },
    });

    if (!menu) {
      throw new NotFoundError('Menu tidak ditemukan');
    }

    return res.status(200).json({
      message: 'Sukses',
      data: menu,
    });
  } catch (error) {
    return next(error);
  }
};

const addMenu = async (req, res, next) => {
  try {
    const menuData = req.body;

    // Menentukan id menu secara acak
    const menuId = uuidv4();

    // Mendapatkan data ukuran dari body request
    const ukuranData = menuData.ukurans;

    // Menambahkan menu ke database
    const newMenu = await prisma.menu.create({
      data: {
        id: menuId,
        menu: menuData.menu,
        deskripsi: menuData.deskripsi,
        harga: menuData.harga,
        kategoriId: menuData.kategoriId,
        ukurans: {
          connect: ukuranData.map((ukuran) => ({ id: ukuran.id })),
        },
      },
      include: {
        ukurans: true, // Memasukkan data ukuran ke dalam respons
      },
    });

    return res.status(201).json({
      message: 'Menu berhasil ditambahkan',
      data: newMenu,
    });
  } catch (error) {
    return next(error);
  }
};

const updateMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { menu: updatedMenu, deskripsi, harga } = req.body;

    // Periksa apakah menu dengan id yang diberikan ada di database
    const existingMenu = await prisma.menu.findUnique({
      where: { id },
    });

    if (!existingMenu) {
      throw new NotFoundError('Menu tidak ditemukan');
    }

    // Update menu di database
    const updatedMenuData = await prisma.menu.update({
      where: { id },
      data: {
        menu: updatedMenu || existingMenu.menu,
        deskripsi: deskripsi || existingMenu.deskripsi,
        harga: harga || existingMenu.harga,
      },
      include: {
        ukurans: true,
      },
    });

    res.status(200).json({
      message: 'Menu berhasil diperbarui',
      data: updatedMenuData,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMenu = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Hapus menu dari database
    const deletedMenu = await prisma.menu.delete({
      where: { id },
    });

    if (!deletedMenu) {
      throw new NotFoundError('Menu tidak ditemukan');
    }

    res.status(200).json({
      message: 'Menu berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMenu,
  getMenuById,
  addMenu,
  updateMenu,
  deleteMenu,
};
