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
