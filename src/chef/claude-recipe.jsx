import Markdown from "react-markdown";

export default function ClaudeRecipe({ recipe }) {
  return (
    <section className="generated-recipe" aria-live="polite">
      <h2>Chef Claude Recommends:</h2>
      <br />
      <Markdown>{recipe}</Markdown>
    </section>);
}
