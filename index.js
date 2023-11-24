import openai from "./config/open-ai.js";
import readlineSync from "readline-sync";
import colors from "colors";

async function main() {
  console.log(colors.bold.green("Welcome to your chatbot, Tom!"));
  console.log(colors.bold.green("You can start chatting with me."));

  // store conversation history
  const chatHistory = [];

  while (true) {
    const userInput = readlineSync.question(colors.yellow("You: "));

    try {
      // store the user input in the chat history
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      // add latest user input to the chat history
      messages.push({ role: "user", content: userInput });

      // call the API with user input
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      // get the response from the API
      const completionText = completion.choices[0].message.content;

      if (userInput.toLocaleLowerCase() === "exit") {
        console.log(colors.green("Bot: ") + completionText);
        return;
      }

      console.log(colors.green("Bot: ") + completionText);

      // update history with bot response
      chatHistory.push(["user", userInput]);
      chatHistory.push(["assistant", completionText]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();
