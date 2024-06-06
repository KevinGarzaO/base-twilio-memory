const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const TwilioProvider = require('@bot-whatsapp/provider/twilio')
const MockAdapter = require('@bot-whatsapp/database/mock')


const flowPrecio = addKeyword(['2'])
        .addAnswer('La instalación y la configuración de mi chatbot son completamente gratuitas, sin ningún costo. Yo me encargaré de atender a todos tus clientes para que tú no tengas que preocuparte por nada.')
        .addAnswer('¿Te gustaria que me integre a tu equipo de ventas? \n 1.- SI \n 2.- NO')


const flowInformacion = addKeyword(['1'])
        .addAnswer('Soy un chatbot, tu asistente virtual diseñado para ayudarte en el proceso de venta y atención al cliente. Mi objetivo es reducir tu carga de trabajo y maximizar tus ganancias, proporcionando respuestas rápidas y eficientes las 24 horas del día.')
        .addAnswer('¿Te gustaria saber algo más? \n 1.- ¿Qué precio tiene? \n 2.- ¿Como me va a ayudar con el proceso de venta?')

const flowPrincipal = addKeyword(['Hola, ¿Me puedes ayudar?'])
    .addAnswer(["Hola Querido cliente, soy Caroline tu asistente virtual, dime en que te podemos ayudar \n Puedes elegir de las siguientes opciones:  \n 1.- ¿Cómo funciona el chatbot? \n 2.- ¿Qué precio tiene?"],
    {capture: true},
    async(ctx, {fallBack}) =>{
       if(!['1', '2'].includes(ctx.body)){
            return fallBack("Tu elección no es valida favor de elegir una valida");
       }
    },
    [flowInformacion, flowPrecio]
)



    
    

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal,])

    const adapterProvider = createProvider(TwilioProvider, {
        accountSid: 'ACd3fd9a0f4e07df8510c3b002c8504271',
        authToken: '0b81749dd2bbe3f33298ac76f0e235d6',
        vendorNumber: '+14155238886',
    })

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
}

main()
