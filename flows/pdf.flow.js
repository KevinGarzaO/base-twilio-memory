const { addKeyword,  EVENTS } = require("@bot-whatsapp/bot");

module.exports = addKeyword(EVENTS.ACTION)
.addAction({delay: 600000}, async (ctx, {flowDynamic}) =>{
    await flowDynamic(
      "Hola de nuevo, soy Caroline, me comunico para dar seguimiento y unirme a tu equipo de ventas" +
      "\n Necesitare un *PDF* con la información de tu negocio:"+
      "\n 1.- Precio de tu producto o servicios con imagenes y breve descripcion de cada uno"+
      "\n 2.- El FAQ  (Las preguntas frecuentes) de productos o servicios"+
      "\n 3.- Las objeciones de porque no comprpan tu producto o servicio"+
      "\n 4. Algunas ofertas activas"+
      "\n 5.- Cualquier informacion adicional para que yo puedo entednder de tu negocio es de mucha ayuda para mi"+
      "\n\n Puedes regresar conmigo cuando tengas este *PDF*, escribiendo la palabra *PDF*",
      { media: "https://babelink.com.mx/images/Caroline.jpg"}, 
    );
  });