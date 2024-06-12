const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  EVENTS,
} = require("@bot-whatsapp/bot");

const TwilioProvider = require("@bot-whatsapp/provider/twilio");
const MockAdapter = require("@bot-whatsapp/database/mock");

let usuarioHaRecibidoBienvenida = false;

const flowSi = addKeyword("SI")
  .addAction(async (ctx, { flowDynamic }) => {
    await flowDynamic(
      "Excelente, necesitare que comiences proporcionado los siguientes datos: \n 1.- Nombre de tu empresa o negocio \n 2.- ¿Que vendes? \n 3.- Tu nombre completo \n 4.- Lugar o estado donde radica tu negocio");
  });

  const flowNo = addKeyword("NO")
  .addAction(async (ctx, { flowDynamic }) => {
    await flowDynamic(
      "Si necesitas de mis servicios más adelante puedes contactarme."
    );
  })

const flowPrecio = addKeyword(EVENTS.ACTION)
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
  .addAction({ capture: true }, async (ctx, { state, gotoFlow }) => {
    await state.update({ name: ctx.body });
    if (ctx.body == "SI") {
      await gotoFlow(flowSi);
    }
    if (ctx.body == "NO") {
        await gotoFlow(flowNo);
      }
  });
  
const flowEmpresas = addKeyword(EVENTS.ACTION)
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
  .addAction({ capture: true }, async (ctx, { state, gotoFlow }) => {
    await state.update({ name: ctx.body });
    if (ctx.body == "1") {
      await gotoFlow(flowfunciona);
    }
    if (ctx.body == "2") {
        await gotoFlow(flowHacer);
      }
      if (ctx.body == "3") {
        await gotoFlow(flowPrecio);
      }
  });


const flowHacer = addKeyword(EVENTS.ACTION)
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
  .addAction({ capture: true }, async (ctx, { state, gotoFlow }) => {
    await state.update({ name: ctx.body });
    if (ctx.body == "1") {
      await gotoFlow(flowfunciona);
    }
    if (ctx.body == "2") {
        await gotoFlow(flowEmpresas);
      }
      if (ctx.body == "3") {
        await gotoFlow(flowPrecio);
      }
  });


const flowfunciona = addKeyword(EVENTS.ACTION)
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
  .addAction({ capture: true }, async (ctx, { gotoFlow, fallBack }) => {
    if (ctx.body == "1") {
      await gotoFlow(flowHacer);
    }
    else if (ctx.body == "2") {
        await gotoFlow(flowEmpresas);
    }
    else if (ctx.body == "3") {
        await gotoFlow(flowPrecio);
      }
      else {
        console.log(ctx.body);
        return fallBack("La opción elejeida no es correcta, favor de elegir una correcta");  
      }
  });

const welcomeFlow = addKeyword(EVENTS.WELCOME)
  .addAction(async (ctx, { flowDynamic }) => {
    if (!usuarioHaRecibidoBienvenida) {
      await flowDynamic(
        "¡Hola! " +
          ctx.ProfileName +
          " soy Caroline tu asistente virtual, dime en que te podemos ayudar \n Puedes elegir de las siguientes opciones: \n  1.- ¿Cómo funciona el chatbot?  \n  2.- ¿Que se puede hacer con en el chatbot?  \n  3- ¿Para que tipos de empesa trabaja chatbot? ",
        { media: "https://babelink.com.mx/images/Caroline.jpg" }
      );

      usuarioHaRecibidoBienvenida = true;
    }
  })
  .addAction({ capture: true }, async (ctx, {  gotoFlow, fallBack }) => {
     if (ctx.body == "1") {
      await gotoFlow(flowfunciona);
    }
   else if (ctx.body == "2") {
        await gotoFlow(flowHacer);
      }
    else if (ctx.body == "3") {
        await gotoFlow(flowEmpresas);
      }
      else {
        console.log(ctx.body);
        return fallBack("La opción elejeida no es correcta, favor de elegir una correcta");  
      }
  });

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([welcomeFlow, flowfunciona, flowHacer, flowEmpresas, flowPrecio, flowSi, flowNo]);

  const adapterProvider = createProvider(TwilioProvider, {
    accountSid: "ACd3fd9a0f4e07df8510c3b002c8504271",
    authToken: "0b81749dd2bbe3f33298ac76f0e235d6",
    vendorNumber: "+14155238886",
  });

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
};

main();
