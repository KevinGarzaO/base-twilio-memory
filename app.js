const {
  createBot,
  createProvider,
  createFlow
} = require("@bot-whatsapp/bot");

const TwilioProvider = require("@bot-whatsapp/provider/twilio");
const MockAdapter = require("@bot-whatsapp/database/mock");
const welcomeFlow = require("./flows/welcome.flow");
const funcionaFlow = require("./flows/funciona.flow");
const hacerFlow = require("./flows/hacer.flow");
const empresasFlow = require("./flows/empresas.flow");
const precioFlow = require("./flows/precio.flow");
const siFlow = require("./flows/si.flow");
const noFlow = require("./flows/no.flow");
const pdfFlow = require("./flows/pdf.flow");


const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([welcomeFlow, funcionaFlow, hacerFlow, empresasFlow, precioFlow, siFlow, noFlow, pdfFlow]);

  const adapterProvider = createProvider(TwilioProvider, {
    accountSid: "MG9d10fad9e070e1bbbbb2acec53474329",
    authToken: "6eee906efa6920a117ba50d4a43fc02b",
    vendorNumber: "+14174907654",
  });

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
};

main();
