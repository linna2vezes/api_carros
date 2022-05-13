import { prisma } from "../helpers/utils.js";

export const getAllbrand = async (request, reply) => {
  try {
    const posts = await prisma.brand.findMany();
    return posts;
  } catch (error) {
    console.log(error);
    reply.status(500).send("Não foi ver as marcas");
  }
};

export const createBrand = async (req, reply) => {
  try {
     const { name} = req.body;
    const post = await prisma.brand.createBrand({
      data: {name}});
    reply.send(post);
  } catch (error) {
    console.log(error);
    reply.status(500).send("Não foi possível criar a marca");
  }
};
