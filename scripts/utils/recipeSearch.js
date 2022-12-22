// This file will be different depending on the branch you're on.
function getFilteredRecipes(e,searchedRecipe) {
    // On this "array" branch, we're using the array forEach method
    let matchingRecipes = [];
    recipes.forEach(function (recipe) {
        if (recipe.name.toLowerCase().includes(searchedRecipe.toLowerCase())) {
            matchingRecipes.push(recipe);
        }
    })
    return matchingRecipes;
}