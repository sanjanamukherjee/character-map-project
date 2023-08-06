const express = require('express');
const { Configuration, OpenAIApi } = require("openai");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "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"

// "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"

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// const response = await openai.createChatCompletion({
//   model: "gpt-3.5-turbo",
//   messages: [
//     {
//       "role": "system",
//       "content": "You will be provided with statements, and your task is to convert them to standard English."
//     },
//     {
//       "role": "user",
//       "content": "She no went to the market."
//     }
//   ],
//   temperature: 0,
//   max_tokens: 64,
//   top_p: 1.0,
//   frequency_penalty: 0.0,
//   presence_penalty: 0.0,
// });

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

app.get('/try',async (req, res)=>{

    const title = req.query.title;

    const sample2 = {
        character1:{character2: "relation", character3: "relation"}
        };

    const sample = {
        "character": "name of the character",
        "relations": [{
          "character": "name of the character it is related to",
          "rel": "the relation"
        }]
      }

    const prompt2 = "list all the important characters in "+title+" series and their relationships with each other, represented in JSON schema "+ JSON.stringify(sample);

    const prompt = "Create a list of all the important characters in the show "+title+" and their associated relation to each other.Do not include any explanations, only provide a  RFC8259 compliant JSON response following this format without deviation. ["+ JSON.stringify(sample)+"] The JSON response:"
    console.log(prompt);

    // const completion = await openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: prompt,
    //     temperature: 0.6,
    //   });

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "You are a story character expert. You need to provide a mapping of all the important characters in a show/movie given by user in the json format specified."}, {role: "user", content: prompt}],
      });
    const response = completion.data.choices[0].message.content;

    // const result = JSON.parse(completion.data.choices);

    // console.log(completion.data.choices);

    res.status(200).send(
        response
    )
});
