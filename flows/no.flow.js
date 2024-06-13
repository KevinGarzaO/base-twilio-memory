const { addKeyword,  EVENTS } = require("@bot-whatsapp/bot");

module.exports = addKeyword(EVENTS.ACTION)
.addAction(async (ctx, { flowDynamic }) => {
  await flowDynamic(
    "Si necesitas de mis servicios más adelante puedes contactarme."
  );
})