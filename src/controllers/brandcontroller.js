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
    const post = await prisma.brand.create({
      data: {name}});
    reply.send(post);
  } catch (error) {
    console.log(error);
    reply.status(500).send("Não foi possível criar a marca");
  }
};

export const deleteBrand = async (req, reply) => {
  try {
    const {id} = req.params
    const post = await prisma.brand.delete({ where: { id:+id }  });
    reply.send(post);
  } catch (error) {
    console.log(error);
   if (error.code === "P2003") reply.status(500).send("Essa marca está vinculada a outro registro e não pode ser apagada")
    else reply.status(500).send("Não foi possível deletar a marca");
  }
};

 export const putBrand = async (req, reply) => {
  try {
    const {id} = req.params
     const { name } = req.body;
     const brand = await prisma.brand.update({
       where: { id: +id },
       data: { name }
     })
     reply.send(brand);
   } catch (error) {
     console.log(error);
     reply.status(500).send("Não foi possível atualizar a marca");
   }
 };