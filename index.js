import openai from "./config/open-ai.js";
import readlineSync from "readline-sync";
import colors from "colors";

async function main() {
  console.log(colors.bold.green("Welcome to your chatbot, Tom!"));
  console.log(colors.bold.green("You can start chatting with me."));

  while (true) {
    const userInput = readlineSync.question(colors.bold.yellow("You: "));

    try {
      // call the API with user input
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userInput }],
      });

      // get the response from the API
      const completionText = completion.choices[0].message.content;

      if (userInput.toLocaleLowerCase() === "exit") {
        console.log(colors.green("Bot: ") + completionText);
        return;
      }

      console.log(colors.green("Bot: ") + completionText);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();
