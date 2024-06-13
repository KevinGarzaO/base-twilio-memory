const { addKeyword,  EVENTS } = require("@bot-whatsapp/bot");
const siFlow = require("./si.flow");
const noFlow = require("./no.flow");

module.exports = addKeyword(EVENTS.ACTION)
  .addAction(async (ctx, { flowDynamic }) => {
    await flowDynamic(
      "La instalación y la configuración de mi chatbot son completamente gratuitas, sin ningún costo. Yo me encargaré de atender a todos tus clientes para que tú no tengas que preocuparte por nada."
    );
  })
  .addAction(async (ctx, { flowDynamic }) => {
    await flowDynamic(
      "¿Te gustaria que me una a tu equipo de ventas? \n Escribe *SI* o *NO* para brindarte más información"
    );
  })
  .addAction({ capture: true }, async (ctx, { gotoFlow, fallBack }) => {
    if (ctx.body.toUpperCase() == "SI") {
      await gotoFlow(siFlow);
    }
   else if (ctx.body.toUpperCase() == "NO") {
       await gotoFlow(noFlow);
    }
    else {
      return fallBack("La opción elejeida no es correcta, por favor elige una correcta");  
    }
  });