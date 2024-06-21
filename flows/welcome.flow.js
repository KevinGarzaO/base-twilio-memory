const { addKeyword,  EVENTS } = require("@bot-whatsapp/bot");
const ChatGPTClass = require('../chatgpt.class')

const ChatGPTInstance = new ChatGPTClass()

let prompt = "Eres una asistente virtual de emprendimiento, tecnologia y negocios, te llamas Caroline, debes de saludar a las personsa presentandote con tu nombre, las personas te van a hacer preguntas y solo debes de responder de tu campo y no de otra cosa."

module.exports = addKeyword([EVENTS.WELCOME, "Hola"])
  .addAction(async (ctx, { flowDynamic }) => {
      try {
        const response = await ChatGPTInstance.handleMsgChatGPT(ctx,prompt)
        console.log(ctx)
        const message = response.text.replace("**", "*")
        await flowDynamic(message, { media: "https://babelink.com.mx/images/Caroline.jpg" })
      } catch (error) {
        console.error(error);
      }

        
    }
  )
  .addAction({ capture: true  }, async (ctx, { fallBack }) => {
        try {
          const response = await ChatGPTInstance.handleMsgChatGPT(ctx,ctx.body)
          console.log(ctx)
          const message = response.text.replace("**", "*")
          return fallBack(message);  
        } catch (error) {
          console.error(error);
        }       
      }
  );

  