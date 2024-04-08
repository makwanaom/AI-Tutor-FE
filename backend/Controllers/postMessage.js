// IF YOU ARE CREATING ANY ANOTHER FUNCTION FOR PROMPT YOU HAVE TO PROVIDE  const examples = [] along with context....
import dotenv from 'dotenv';
dotenv.config();

import { DiscussServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = process.env.API_KEY;

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

async function postMessage(req, res) {
  const prompt = req.body.prompt;
  const messages = [];

  console.log("processing...");

  try {
    //if question is simple then don't divide propmpt into different topics
    if (isDirectQuestion(prompt)) {
      // Attempt to get a direct answer
      const directAnswer = await getDirectAnswer(prompt, client);

      if (directAnswer) {
        res.status(200).json({ result: directAnswer });
      } else {
        res.status(200).json({ error: "Unable to find a direct answer" });
      }
    } else {
      // Generate topics and explain the selected one
      const context = `Give name of 5 topics name related to ${prompt} in one to two words`;
      const examples = [];
      console.log(`Prompt arrived..... ${prompt}`);
      messages.push({ content: prompt });

      const result = await client.generateMessage({
        model: MODEL_NAME,
        temperature: 0.6,
        candidateCount: 1,
        top_k: 50,
        top_p: 0.9,
        prompt: { context, examples, messages: [{ content: "Your message content here" }] },
      });

      const resp = result[0].candidates[0].content;
      console.log(resp);
      const topics = resp.split("\n*").map((topic) => topic.trim());
      console.log(topics);

      // Replace this with actual logic to get user's choice (what user click on front-end)
      const selectedTopicIndex = 2;
      const selectedTopic = topics[selectedTopicIndex];

      try {
        const detailedExplanation = await explainTopic(selectedTopic, client);
        res.status(200).json({ topics, detailedExplanation });
        console.log(detailedExplanation);
      } catch (error) {
        console.error("Error explaining topic:", error);
        res.status(500).json({ error: "Failed to explain topic" });
      }
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//if prompt contain following keyword then it is considered as simple and we can directly answer is as it is
function isDirectQuestion(question) {
  const directKeywords = [
    "what is",
    "who is",
    "how many",
    "when did",
    "definition",
    "capital",
    "formula",
  ];
  return directKeywords.some((keyword) =>
    question.toLowerCase().startsWith(keyword)
  );
}


// For getting answer directly
async function getDirectAnswer(question, client) {
  const context = `Answer the following question directly and concisely: ${question}`;
  const examples = [];
  const messages = [{ content: question }];

  try {
    const result = await client.generateMessage({
      model: MODEL_NAME,
      temperature: 0.3, // Lower temperature for factual responses
      candidateCount: 1,
      top_k: 50,
      top_p: 0.9,
      prompt: { context, examples, messages },
    });
    const answer = result[0].candidates[0].content.trim();
    console.log(answer);
    return answer;
  } catch (error) {
    console.error("Error in getDirectAnswer:", error);
    return null; // Return null if no direct answer is found
  }
}


// explain selected topic in detail
async function explainTopic(topic, client) {
  const context = `Explain the following topic in detail, providing comprehensive information and insights: ${topic}`;
  const examples = [];
  const messages = [{ content: topic }];

  try {
    const result = await client.generateMessage({
      model: MODEL_NAME,
      temperature: 0.6,
      candidateCount: 1,
      top_k: 50,
      top_p: 0.9,
      prompt: { context, examples, messages },
    });
    return result[0].candidates[0].content;
  } catch (error) {
    console.error("Error in explainTopic:", error);
    throw error; // Re-throw to allow handling in postMessage
  }
}

export default postMessage;