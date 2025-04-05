import RecipeHeader from "./RecipeHeader";
import RecipeImage from "./RecipeImage";
import RecipeIngredients from "./RecipeIngredients";
import RecipeInstructions from "./RecipeInstructions";
import RecipeActions from "./RecipeActions";

export default function RecipeDetail() {
    return (
        <div className="bg-rose-400 min-h-screen p-8 text-white">
            <RecipeHeader />
            <RecipeImage />
            <RecipeIngredients />
            <RecipeInstructions />
            <RecipeActions />
        </div>
    );
}
