import { prisma } from "../helpers/utils.js";

export const getAllcar = async (request, reply) => {
  try {
    const posts = await prisma.car.findMany();
    return posts;
  } catch (error) {
    console.log(error);
    reply.status(500).send("Não foi possível ver os carrros");
  }
};

export const createCar = async (req, reply) => {
  try {
    console.log(req.body);
    console.log(req.file);
    const { name, year, brand_id, image } = req.body;
    const car = await prisma.car.create({
      data: {
        name,
        year,
        brand: {
          connect: { id: Number(brand_id) },
        },
        image: req.file.path,
      },
    });
    reply.send(car);
  } catch (error) {
    console.log(error);
    reply.status(500).send("Não foi possível criar o carro");
  }
};
