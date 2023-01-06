//Discord Bot
const Discord = require("discord.js")
const client = new Discord.Client()
//INSERT TOKEN HERE
client.login('Insert Discord Bot Token Here');

//ChatGPT API
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

require('dotenv').config();


//Both
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {   
    if(msg.author.bot) return;
    (async function() {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: msg.content,
            temperature: 1,
            max_tokens: 60,
          });
        let body = response.data;
        let output = body.choices[0].text;
        console.log(output);
        msg.channel.send(output)
        
    })();
   
  
})

