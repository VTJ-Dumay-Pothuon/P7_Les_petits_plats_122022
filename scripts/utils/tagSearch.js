function tagSearch(recipes, activeTags) {
    
    // Level 0 of recursion: no more tags to filter by, we return the recipes
    if (activeTags.length === 0) { return recipes }

    // Level 1 of recursion: we filter by the first tag
    // if the tag is an ingredient, we filter by the ingredient name
    if (activeTags[0][1]=='tag--ingredients') {
        // filteredRecipes is an array of recipes that contain the ingredient
        const filteredRecipes = recipes.filter(function (recipe) {
            // this array is built by filtering the ingredients of the recipe
            return recipe.ingredients.some(function (ingredient) {
                // each ingredient from each recipe is compared to the tag name
                return ingredient.ingredient.toLowerCase() === activeTags[0][0].toLowerCase();
            })
        });
        // then we call tagSearch recursively with the filtered recipes,
        // and the taglist without the first tag that has been filtered.
        return tagSearch(filteredRecipes, activeTags.slice(1));

    // if the tag is an appliance, we filter by the appliance name.
    // in that case, there is only one appliance per recipe, so we don't need to use .some()
    } else if (activeTags[0][1]=='tag--appliances') {
        const filteredRecipes = recipes.filter(function (recipe) {
            return recipe.appliance.toLowerCase() === activeTags[0][0].toLowerCase();
        });
        return tagSearch(filteredRecipes, activeTags.slice(1));

    // for ustensils, it works the same way as for ingredients.
    } else if (activeTags[0][1]=='tag--ustensils') {
        const filteredRecipes = recipes.filter(function (recipe) {
            return recipe.ustensils.some(function (ustensil) {
                return ustensil.toLowerCase() === activeTags[0][0].toLowerCase();
            })
        });
        return tagSearch(filteredRecipes, activeTags.slice(1));

    // Unlikely case: the tag category is not found because the tag was not built properly.
    } else {
        throw new Error('tagSearch: tag category not found');
    }
}

function filterByTag(tags) {
    // activeTags is an array of pairs sub-arrays, each pair containing
    // the tag name and its category found as a tag--* class.
    const activeTags = Array.from(tags.children).map(function (tag) {
        return [tag.querySelector('span').textContent, 
        Array.from(tag.classList).find(tag => tag.startsWith('tag--'))];
    })

    recipesField.innerHTML = '';

    tagSearch(recipes, activeTags).forEach(function (recipe) {
        const recipeCard = getRecipeCardDOM(recipe);
        recipesField.appendChild(recipeCard);
    })
}