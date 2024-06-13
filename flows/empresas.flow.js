const { addKeyword,  EVENTS } = require("@bot-whatsapp/bot");
const funcionaFlow = require("./funciona.flow");
const hacerFlow = require("./hacer.flow");
const precioFlow = require("./precio.flow");

module.exports = addKeyword(EVENTS.ACTION)
  .addAction(async (ctx, { flowDynamic }) => {
    await flowDynamic(
      "Como chatbot de WhatsApp, puedo trabajar para una amplia gama de empresas, independientemente de su tamaño o industria. Como por ejemplo: \n\n  *Empresas de Viajes* \n  *Compañías de Seguros* \n  *Academias y Centros Educativos* \n *Restaurantes y Servicios de Alimentación* \n  *Retail y E-commerce* \n  *Servicios de Salud*"
    );
  })
  .addAction(async (ctx, { flowDynamic }) => {
    await flowDynamic(
      "Que otra pregunta tienes puedes elegir de las siguientes opciones: \n  1.- ¿Cómo funciona el chatbot?  \n  2- ¿Que se puede hacer con en el chatbot? \n  3.- ¿Que precio tiene?"
    );
  })
  .addAction({ capture: true }, async (ctx, { gotoFlow, fallBack }) => {
    if (ctx.body == "1") {
      await gotoFlow(funcionaFlow);
    }
   else if (ctx.body == "2") {
        await gotoFlow(hacerFlow);
      }
    else if (ctx.body == "3") {
        await gotoFlow(precioFlow);
      }
    else {
      return fallBack("La opción elejeida no es correcta, por favor elige una correcta");  
    }
  });