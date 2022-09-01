const { Router } = require("express");
const AllBoxes = require("../routes/Boxes.routes.js");
const AllUsers = require("../routes/Users.routes.js");
const categotyRouter = require("./categoryRoutes");
const products = require("../routes/Products.routes.js");
const filtersRoutes = require("./filtersRoutes.js");
const providerRouter = require("./providerRoutes");
const testRouter = require("./testRoutes");
const payment = require("./stripe");
const register = require("./Register.routes.js");
const login = require("./Login.routes");
const orderRouter = require("./ordersRoutes");
const redeem = require("./giftRoutes");
const googleLogin = require("./googleLogin.routes.js");
const favourites = require("./favouritesRoutes");
const reviews = require("./ReviewsUser");
const admin = require("./adminRoutes.js");

const router = Router();

router.use("/boxes", AllBoxes);
router.use("/products", products);
router.use("/categories", categotyRouter);
router.use("/providers", providerRouter);
router.use("/orders", orderRouter);
router.use("/filters", filtersRoutes);
router.use("/test", testRouter);
router.use("/users", AllUsers);
router.use("/stripe", payment);
router.use("/register", register);
router.use("/login", login);
router.use("/redeem", redeem);
router.use("/googleLogin", googleLogin);
router.use("/favourites", favourites);
router.use("/reviews", reviews);
router.use("/admin", admin);

module.exports = router;
