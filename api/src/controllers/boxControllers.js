const boxServices = require("../services/boxServices");
const cloudinary = require("../utils/cloudinary.js");
const createNewBox = async (req, res, next) => {
  const { body } = req;

  try {
    if (body.image) {
      const uploadRes = await cloudinary.uploader.upload(body.image, {
        upload_preset: "henry-gift",
      });

      if (uploadRes) {
        const newItemBox = {
          name: body.name,
          price: body.price,
          product: body.product,
          category: body.category,
          image: uploadRes,
          expiration_date: body.expiration_date,
          detail: body.detail,
          person: body.person,
        };
        const newBox = await boxServices.createNewBox(newItemBox);

        const findedProducts = await boxServices.findProducts(body.products);
        newBox.addProducts(findedProducts);

        const findedCategory = await boxServices.findCategory(body.category);
        newBox.addCategory(findedCategory);

        if (newBox) {
          const newboxList = await boxServices.getAllBoxes();
          res.status(200).send(newboxList);
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

const getBox = async (req, res, next) => {
  try {
    const { id } = req.params;
    const box = await boxServices.getBox(id);
    if (box) {
      res.status(201).send(box);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    next(error);
  }
};

const getAllBoxes = async (req, res, next) => {
  try {
    const allBoxes = await boxServices.getAllBoxes();

    if (allBoxes || allBoxes.length > 0) {
      res.status(200).send(allBoxes);
    } else {
      res.status(404).send("Error at Server");
    }
  } catch (error) {
    next(error);
  }
};

const getAdminBoxes = async (req, res, next) => {
  try {
    const adminBoxes = await boxServices.getAdminBoxes();

    if (adminBoxes || allBoxes.length > 0) {
      res.status(200).send(adminBoxes);
    } else {
      res.status(404).send("Error at Server");
    }
  } catch (error) {
    next(error);
  }
};

const deleteBox = async (req, res, next) => {
  const { id } = req.params;
  try {
    const box = await boxServices.getBox(id);
    if (!box) {
      return res.status(404).send("Product not found...");
    }
    const destroy = await boxServices.deleteBox(id);
    if (destroy) {
      const newlist = await boxServices.getAllBoxes();
      res.status(200).send(newlist);
    } else {
      res.status(404).send("Error");
    }
  } catch (error) {
    next(error);
  }
};

const updateBox = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const boxFind = await boxServices.getBox(id);
    if (!boxFind) {
      return res.status(404).send("Box not found...");
    }
    if (body.image !== "") {
      const updateRes = await cloudinary.uploader.upload(body.image, {
        upload_preset: "henry-gift",
      });

      if (updateRes) {
        const updateBox = await boxServices.updateBox(id, {
          ...body,
          image: updateRes,
        });
        if (updateBox) {
          const newListUp = await boxServices.getAdminBoxes();
          return res.status(200).send(newListUp);
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

const statusBox = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const status = await boxServices.updateBox(id, body);
    if (status) {
      const newListBox = await boxServices.getAdminBoxes();
      res.status(200).send(newListBox);
    } else {
      res.status(404).send("Error");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewBox,
  getBox,
  getAllBoxes,
  deleteBox,
  updateBox,
  statusBox,
  getAdminBoxes,
};
