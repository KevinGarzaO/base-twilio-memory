const { addKeyword,  EVENTS } = require("@bot-whatsapp/bot");
const axios = require('axios');
const pdfFlow = require("./pdf.flow");

let GLOBAL_STATE = {}

const guardarLead = async (datosEntrantes) =>{
let config = {
  method: 'post',
  url: 'https://f3ee-2806-109f-17-2cd9-d123-5be5-601f-9cc6.ngrok-free.app/api/leads',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer f6188dbdd9d370c14a8c61572413af9a77937b1aa516cb5ba1ceb5fee87a1897935468029a378820c928cb631b30c093537480049fd317a0059d4de7a6d932cb0efbc377cb17dab685376015f286e64f1107cebb89c0cd4d42edbc79c77eaca84d9d6e98eb7201583c8c62d2b68eea89685393d4c7459bf86c7d44f17e4d988f'
  },
  data : JSON.stringify({
    "data": datosEntrantes
  })
};

await axios.request(config)
}

module.exports = addKeyword(EVENTS.ACTION)
  .addAction(async (ctx, { flowDynamic }) => {
    await flowDynamic(
      "Excelente, necesitare que comiences proporcionado los siguientes datos: \n 1.- Nombre de tu empresa o negocio \n 2.- ¿Que vendes? \n 3.- Tu nombre completo \n 4.- Lugar o estado donde radica tu negocio");
  })
  .addAction(async (ctx, { flowDynamic }) => {
    await flowDynamic(
     "¿Cual es el nombre de tu negocio?"
    );
  })
  .addAction({ capture: true }, async (ctx) => {
    GLOBAL_STATE[ctx.from] = {
        "nombreEmpresa": ctx.body,
        "vendes": "",
        "nombreApellido": "",
        "ubicacionNegocio": "",
        "telefono": ctx.from
    }
  })
.addAnswer("¿Que vendes?", {capture: true}, async(ctx) =>{
    GLOBAL_STATE[ctx.from].vendes = ctx.body
  }
)
.addAnswer("¿Cual es tu nombre y apellido?", {capture: true}, async(ctx) =>{
    GLOBAL_STATE[ctx.from].nombreApellido = ctx.body
  }
)
.addAnswer("¿Donde se ubica tu negocio?", {capture: true}, async(ctx) =>{
    GLOBAL_STATE[ctx.from].ubicacionNegocio = ctx.body
  }
)
.addAction(async (ctx, { flowDynamic, gotoFlow }) => {
    await flowDynamic(
     "Se esta procesando tu información"
    );
   await guardarLead(GLOBAL_STATE[ctx.from]);
   await flowDynamic(
    "Muchas Gracias 😊 por la información en breve me comunico contigo"
   );
  await gotoFlow(pdfFlow);
  });