import Fastify from "fastify";
import carRoutes from "../routes/car-routes.js";
import brandRoutes from "../routes/brand-routes.js";
import multer from "fastify-multer";
import fastifyStatic from "@fastify/static";
import path from "path";
import cors from "@fastify/cors";

const fastify = Fastify({
  logger: true,
});

const __dirname = path.resolve();

fastify.register(multer.contentParser);

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
});

fastify.register(carRoutes);

fastify.register(brandRoutes);

fastify.register(cors, {
  origin: (origin, callback) => {
    callback(null, true);
    return;
  },
});

export default fastify;
