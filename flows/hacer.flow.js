const { addKeyword,  EVENTS } = require("@bot-whatsapp/bot");
const funcionaFlow = require("./funciona.flow");
const empresasFlow = require("./empresas.flow");
const precioFlow = require("./precio.flow");

module.exports = addKeyword(EVENTS.ACTION)
  .addAction(async (ctx, { flowDynamic }) => {
    await flowDynamic(
      "Como tu asistente virtual, puedo realizar varias tareas para facilitar la comunicación y mejorar la eficiencia de tu negocio. \n Aquí hay algunas cosas que puedo hacer por ti: \n\n  *Automatizar Respuestas* \n  *Enviar Notificaciones y alertas sobre promociones* \n  *Ofrezco atención al cliente las 24 horas del día, los 7 días de la semana* \n  *Ayudo en el proceso de ventas, desde la generación hasta el cierre* \n  *Puedo llevar a cabo encuestas de satisfacción y recopilar comentarios* \n  *Adapto las conversaciones basándome en el historial y las preferencias de cada cliente*"
    );
  })
  .addAction(async (ctx, { flowDynamic }) => {
    await flowDynamic(
      "Que otra pregunta tienes puedes elegir de las siguientes opciones: \n  1.- ¿Cómo funciona el chatbot?  \n  2- ¿Para que tipos de empesa trabaja chatbot? \n  3.- ¿Que precio tiene?"
    );
  })
  .addAction({ capture: true }, async (ctx, { gotoFlow , fallBack}) => {
    if (ctx.body == "1") {
      await gotoFlow(funcionaFlow);
    }
   else if (ctx.body == "2") {
        await gotoFlow(empresasFlow);
      }
    else if (ctx.body == "3") {
        await gotoFlow(precioFlow);
      }
    else {
      return fallBack("La opción elejeida no es correcta, por favor elige una correcta");  
    }
  });
