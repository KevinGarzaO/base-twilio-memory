const { addKeyword,  EVENTS } = require("@bot-whatsapp/bot");
const funcionaFlow = require("./funciona.flow");
const hacerFlow = require("./hacer.flow");
const empresasFlow = require("./empresas.flow");

let usuarioHaRecibidoBienvenida = false;

module.exports = addKeyword(EVENTS.WELCOME)
  .addAction(async (ctx, { flowDynamic }) => {
    if (!usuarioHaRecibidoBienvenida) {
      await flowDynamic(
        "¡Hola! " +
          ctx.ProfileName +
          " Soy Caroline tu asistente virtual, dime en que te podemos ayudar \n Puedes elegir de las siguientes opciones: \n  1.- ¿Cómo funciona el chatbot?  \n  2.- ¿Que se puede hacer con en el chatbot?  \n  3- ¿Para que tipos de empesa trabaja chatbot?",
        { media: "https://babelink.com.mx/images/Caroline.jpg" }
      );

      usuarioHaRecibidoBienvenida = true;
    }
  })
  .addAction({ capture: true }, async (ctx, { gotoFlow,  fallBack }) => {
     if (ctx.body == "1") {
      await gotoFlow(funcionaFlow);
    }
   else if (ctx.body == "2") {
        await gotoFlow(hacerFlow);
      }
    else if (ctx.body == "3") {
        await gotoFlow(empresasFlow);
      }
      else {
        return fallBack("La opción elejeida no es correcta, por favor elige una correcta");  
      }
  });
