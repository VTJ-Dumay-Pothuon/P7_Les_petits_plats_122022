// This file will be different depending on the branch you're on.
function getFilteredRecipes(searchedRecipe, currentRecipes=recipes) {
    // On this "native" branch, we're using the native loops and methods
    let matchingRecipes = [];
    for (recipe of currentRecipes) {
        if (recipe.name.toLowerCase().includes(searchedRecipe.toLowerCase())) {
            matchingRecipes.push(recipe);
        } else
        if (recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchedRecipe.toLowerCase()))) {
            matchingRecipes.push(recipe);
        } else
        if (recipe.description.toLowerCase().includes(searchedRecipe.toLowerCase())) {
            matchingRecipes.push(recipe);
        }
    }
    return matchingRecipes;
}