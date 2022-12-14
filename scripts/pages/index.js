function render() {
    recipesField = document.querySelector('main.recipes');
    try {
    recipes.forEach(function (recipe) {
        const recipeCard = getRecipeCardDOM(recipe);
        recipesField.appendChild(recipeCard);
    })} catch (error) {
        console.log(error);
    }
}

render();