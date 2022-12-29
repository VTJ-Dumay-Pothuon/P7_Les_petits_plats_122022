// This file will be different depending on the branch you're on.
function getFilteredRecipes(searchedRecipe) {
    // On this "native" branch, we're using the native loops and methods
    let matchingRecipes = [];
    for (recipe of recipes) {
        if (recipe.name.toLowerCase().includes(searchedRecipe.toLowerCase())) {
            matchingRecipes.push(recipe);
        }
    }
    return matchingRecipes;
}