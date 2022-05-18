import { prisma } from "../helpers/utils.js";

export const getAllcar = async (request, reply) => {
  try {
    const posts = await prisma.car.findMany();
    return posts;
  } catch (error) {
    console.log(error);
    reply.status(500).send("Não foi possível ver os carros");
  }
};

export const createCar = async (req, reply) => {
  try {
    // console.log(req.body);
    // console.log(req.file);
    const { name, year, brand_id } = req.body;
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

export const deleteCar = async (req, reply) => {
  try {
    const {id} = req.params
    const post = await prisma.car.delete({ where: { id:+id } });
    return reply.send(post);
  } catch (error) {
    reply.status(500).send("Não foi possível deletar o carro");
  }
};

export const putCar = async (req, reply) => {
  try {
    
    const { name, year, brand_id } = req.body;
    const {id} = req.params

    const car = await prisma.car.update({
      where: {
        id: +id
      },
      data: {
        name,
        year,
        brand: {
        connect: { id: Number(brand_id) },
        },
        image: req.file.path
      }
    })
    reply.send(car);
  } catch (error) {
    console.log(error);
    reply.status(500).send("Não foi possível atualizar o carro");
  }
};




export const patchCar = async (req, reply) => {
  try {
    const data = { };

    if (req.body.name){
      data.name = req.body.name;
    };

    if (req.body.year){
      data.year = req.body.year;
    };

    if (req.body.brand_id){
      data.brand = {
        connect: { id: Number(brand_id) }
        }
    };

    if (req.file?.path){
      data.image = req.file.path
    };
    
    const {id} = req.params
    const car = await prisma.car.update({
      where: {
        id: +id,
      },
      data,
    })
    reply.send(car);
 } catch (error) {
    console.log(error);
    reply.status(500).send("Não foi possível atualizar o carro");
  }
};






// outra forma de fazer

//  export const patchCar = async (req, reply) => {
//    try {
//      const id = Number(req.params.id)
//      const img = req.file?.path ? req.file.path : ''
//      const { name, year, brand_id } = req.body;
//      let data = {}
//      name ? data.name = name : ''
//      year ? data.year = year : ''
//      brand_id ? data.brand_id = brand_id : ''
//      img ? data.image = img : ''
//      const car = await prisma.car.update({
//        where: {
//          id: id
//        },
//        data: data
//      })
//      reply.send(car);
//   } catch (error) {
//      console.log(error);
//      reply.status(500).send("Não foi possível atualizar o carro");
//    }
//  };

 
