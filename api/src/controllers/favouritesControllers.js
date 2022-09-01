const favouriteServices = require("../services/favouritesServices");

const createFavourite = async (req, res, next) => {
  const { query } = req;
  //console.log(query.box_id)
  try {
    const findFav = await favouriteServices.findFavouritBox(query.box_id);
    if (findFav) {
      return res.status(404).send("alredy exist");
    }
    const createFavourite = await favouriteServices.newFavourite(query);

    if (createFavourite) {
      // const findFavourites = await favouriteServices.findFavourites();
      res.status(201).send(createFavourite);
    } else {
      res.status(404).send("Error at Server");
    }
  } catch (error) {
    next(error);
  }
};

const findFavourite = async (req, res, next) => {
  //id = userId
  const { user_id } = req.query;
  try {
    const favourite = await favouriteServices.findFavourite(user_id);
    if (favourite) {
      res.status(201).send(favourite);
    } else {
      res.status(404).send("Error at Server");
    }
  } catch (error) {
    next(error);
  }
};

const deleteFavourite = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteFavourite = await favouriteServices.deleteFavourite(id);
    if (deleteFavourite) {
      res.status(201).send(id);
    } else {
      res.status(404).send("Error at Server");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFavourite,
  findFavourite,
  deleteFavourite,
};
