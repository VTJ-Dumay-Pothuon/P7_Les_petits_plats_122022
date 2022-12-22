function getSearchedIngredients(lastPressed, searchedIngredient) {
    const ingredientList = document.querySelector('.ingredients-list');
    let ingredients = [];

    // 0) If searchedIngredient is empty, return all the ingredients immediately
    if (searchedIngredient === '') { 
        ingredientList.innerHTML = ''
        return getAllIngredients() 
    }

    // 1) Get all the ingredient tags from the DOM ; 
    // This way, we're searching in current DOM, not in the whole recipes array
    let ingredientTags = Array.from(ingredientList.children);
    // if last key pressed was backspace, we need to reset the ingredient list
    if (lastPressed.key === 'Backspace') { ingredientTags = getAllIngredients() }
    ingredientList.innerHTML = '';
    
    // 2) Filter ingredientTags to keep only the ones that matches the searchedIngredient as a substring
    ingredientTags.forEach(function (ingredientTag) {
        // if ingredientTag is a DOM element, we need to get its textContent
        if (typeof ingredientTag === 'object') {
            ingredientTag = ingredientTag.textContent;
        }
        if (ingredientTag.toLowerCase().includes(searchedIngredient.toLowerCase())) {
            ingredients.push(ingredientTag);
        }
    })

    return ingredients;
}

function getAllIngredients() {
    let ingredients = [];

    // 1) Get every ingredient from every recipe
    recipes.forEach(function (recipe) {
        recipe.ingredients.forEach(function (ingredient) {
            ingredients.push(ingredient.ingredient);
        })
    })

    // 2) Remove duplicates
    ingredients = ingredients.filter((ingredient, index) => ingredients.indexOf(ingredient) === index);

    // 3) Sort alphabetically
    ingredients.sort();
    
    return ingredients;
}