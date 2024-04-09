import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// const { generateText } = require("../utils/Result");

// require("dotenv").config();

// //REQUIREMENTS: req.body must have prompt:{
// //     "chapter":"<CHAPTER NAME>",
// //     "levelName":"<LEVEL NAME>",
// //     "subject":"<SUBJECT NAME>"
// // }

// var levels = [];
// async function sendLayer2(req, res) {
//   const input = req.body.prompt;
//   const prompt = `List out all possible lessons from chapter: ${input.chapter}. for the subject: ${input.subject}, that is of level: ${input.levelName}.  Try to write a very brief note about the lessons after the name of lessons.`;
//   var messages = [];
//   levels = [];

//   console.log("processing...");

//   const { DiscussServiceClient } = require("@google-ai/generativelanguage");
//   const { GoogleAuth } = require("google-auth-library");

//   const MODEL_NAME = "models/chat-bison-001";
//   const API_KEY = process.env.API_KEY;

//   const client = new DiscussServiceClient({
//     authClient: new GoogleAuth().fromAPIKey(API_KEY),
//   });

//   let PaLM_res;
//   const context = `List all the possible lessons from the chapter: ${input.chapter} for the subject of ${input.subject} at level ${input.levelName}.   Try to write a very brief note about the lessons after the name of lessons`;
//   const examples = [];

//   console.log(`Prompt arrived..... ${prompt}`);

//   // log(`Prompt arrived..... ${prompt}`);
//   messages.push({ content: prompt });
//   const resp = await generateText(context, examples, messages);

//   // if(sizeInBytes>=20000){
//   //     messages.pop();
//   // }
//   messages.push({ content: resp });

//   function getArraySizeInBytes(arr) {
//     var jsonString = JSON.stringify(arr);
//     var bytes = Buffer.from(jsonString).length;
//     return bytes;
//   }
//   var sizeInBytes = getArraySizeInBytes(messages);

//   // console.log(`\n⚡Prompt: ${convo.prompt}\n✨Response:${convo.resp}`);
//   console.log(`✨ ${resp}`);

//   const lines = resp.split("\n");

//   lines.forEach((line) => {
//     if (line.startsWith("* **") || line.startsWith("*")) {
//       const level = line.replace("* **", "").replace("*", "").trim();
//       levels.push(level);
//     }
//   });

//   console.log("🔥🔥", levels);

//   const levelsJson = levels.map((lessonStr) => {
//     const match = lessonStr.match(/^(.*?)([:?]\s|:\s\*|\.\*|\s-\s|\d+\.\s)(.*)$/);
  

//     if (match) {
//       const [, name, , content] = match;
//       return {
//         lessonName: name.trim(),
//         lessonContent: content.trim(),
//       };
//     } else {
//       return {
//         lessonName: lessonStr.trim(),
//         lessonContent: "",
//       };
//     }
//   });
//   console.log(levelsJson);

//   console.log(`Size of request payload: ${sizeInBytes} bytes`);
//   res.status(200).json(levelsJson);

//   // console.log(messages);
//   messages.push({ content: "NEXT REQUEST" });
// }

// module.exports = sendLayer2;

// const levelsJson = levels.map(levelStr => {
//     // Check if the string contains ":*"
//     const delimiterIndex = levelStr.indexOf(':*');
//     if (delimiterIndex !== -1) {
//       // If ":*" is found, split the string into name and content
//       const [name, content] = levelStr.split(':*');
//       return {
//         lessonName: name.trim(),
//         lessonContent: content.trim()
//       };
//     } else {
//       // If ":*" is not found, split the string by ":"
//       const [name, content] = levelStr.split(":");
//       return {
//         lessonName: name.trim(),
//         lessonContent: content ? content.trim() : '' // Handle case where there's no content after ":"
//       };
//     }
//   });
