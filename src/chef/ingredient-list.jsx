export default function IngredientsList({ingredients, removeIngredient, getRecipe, refProp, loading}) {
  const ingredientsArray = ingredients.map((ingredient, index) => (
    <li key={`${ingredient}-${index}`}>
      {ingredient}
      <button
        type="button"
        className="remove-ingredient"
        onClick={() => removeIngredient(ingredient, index)}
      >
        Remove
      </button>
    </li>
  ));

    return (
       <section
        style={{ display: ingredientsArray.length > 0 ? "flex" : "none" }}
        className="generating-ingredients"
      >
        <h2>Ingredients on hand:</h2>
        <ul className="ingredient-list">{ingredientsArray}</ul>
        {ingredientsArray.length > 3 && (
          <div className="get-recipe-container">
            <div ref={refProp}>
              <h3>Ready for a recipe?</h3>
              <p>Generate a recipe from your list of ingredients</p>
            </div>
            <button type="button" className={loading ? "get-recipe generating" : "get-recipe"} onClick={getRecipe}>
              Get a Recipe
            </button>
          </div>
        )}
      </section>
    )
}