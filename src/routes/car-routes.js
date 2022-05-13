import fastify from "fastify";
import * as PostController from "../controllers/carcontroller.js";
import multer from "fastify-multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, reply, callback) => {
    callback(null, "public/images");
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, file.originalname + "-" + Date.now() + extension);
  },
});

const upload = multer({ storage });

const routes = [
  {
    method: "GET",
    url: "/cars",
    handler: PostController.getAllcar,
  },
  {
    method: "POST",
    url: "/cars",
    preHandler: upload.single("image"),
    handler: PostController.createCar,
  },
];

export default (fastify, _, next) => {
  for (let route of routes) {
    fastify.route(route);
  }
  next();
};
