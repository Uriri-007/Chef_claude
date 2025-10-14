import { useRef, useState, useEffect } from "react";
import ClaudeRecipe from "./claude-recipe.jsx";
import IngredientsList from "./ingredient-list.jsx";
import { generateRecipeFromMistral } from "../ai.js";

export default function Main() {
  const [ingredients, setIngredient] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const recipeSection = useRef(null);

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    if (!newIngredient.trim()) {
      alert("Ingredient cannot be a white space")
      return
    }
    setIngredient((prevIngredient) => [...prevIngredient, newIngredient]);
  }

  function removeIngredient(myIngredient, myIndex) {
    setIngredient((prevIngredient) =>
      prevIngredient.filter(
        (ingredient, index) => myIngredient !== ingredient && myIndex !== index
      )
    );
  }

 async function getRecipe() {
    const recipe = await generateRecipeFromMistral(ingredients)
    setRecipe(recipe)
  }

  useEffect(() => {
  if(recipe && recipeSection.current) {
    recipeSection.current.scrollIntoView({ behavior: "smooth" });
  }   
  }, [recipe])
  
  return (
    <>
      <form action={addIngredient}>
        <input name="ingredient" type="search" placeholder="e.g egusi" />
        <button type="submit">+ Add Ingredient</button>
      </form>

      <IngredientsList ingredients={ingredients}removeIngredient={removeIngredient} getRecipe={getRecipe} refProp={recipeSection} />

      {recipe && <ClaudeRecipe recipe={recipe} />}
    </>
  );
}