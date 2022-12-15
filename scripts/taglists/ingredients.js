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