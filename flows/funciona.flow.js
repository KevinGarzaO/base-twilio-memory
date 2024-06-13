const { addKeyword,  EVENTS } = require("@bot-whatsapp/bot");
const hacerFlow = require("./hacer.flow");
const empresasFlow = require("./empresas.flow");
const precioFlow = require("./precio.flow");

module.exports = addKeyword(EVENTS.ACTION)
  .addAction(async (ctx, { flowDynamic }) => {
    await flowDynamic(
      "Soy un chatbot, tu asistente virtual diseñado para ayudarte en el proceso de venta y atención al cliente. Mi objetivo es reducir tu carga de trabajo y maximizar tus ganancias, proporcionando respuestas rápidas y eficientes las 24 horas del día."
    );
  })
  .addAction(async (ctx, { flowDynamic }) => {
    await flowDynamic(
      "Que otra pregunta tienes puedes elegir de las siguientes opciones: \n  1.- ¿Que se puede hacer con en el chatbot?  \n  2- ¿Para que tipos de empesa trabaja chatbot? \n  3.- ¿Que precio tiene?"
    );
  })
  .addAction({ capture: true  }, async (ctx, {gotoFlow,  fallBack }) => {
    if (ctx.body == "1") {
     await gotoFlow(hacerFlow);
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
