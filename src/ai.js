import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `You are a world class chef that creates delicious recipes based on the ingredients provided. You will be given a list of ingredients, and you will create a recipe that uses as many of the ingredients as possible. The recipe should be easy to follow and should include a list of ingredients and step-by-step instructions. The recipe should be formatted in markdown to make it easier to render to a web page.`;

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN);

export async function generateRecipeFromMistral(ingredientsArray) {
    const ingredientsString = ingredientsArray.join(", ");
    try{
        const response = await hf.chatCompletion({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `Create a recipe using the following ingredients: ${ingredientsString}` }
        ],
        max_tokens: 1024,
    })
    return response.choices[0].message.content;
    } catch(error){
        console.error(error.message)
    }
}