function getRecipeCardDOM(recipe) {
    // Create DOM elements
    const recipeCard = document.createElement('article');
    recipeCard.classList.add('card', 'bg-default', 'col-xl-4', 'col-md-6', 'col-sm-12','p-0','m-3')
    
    const recipePreview = document.createElement('div');
    recipePreview.classList.add('card__preview');
    recipePreview.innerHTML = `<!--<img src="" alt="recipe">-->`;

    const recipeField = document.createElement('section');
    recipeField.classList.add('card__field');

    const recipeHeader = document.createElement('div');
    recipeHeader.classList.add('card__header','d-sm-flex','flex-no-wrap','justify-content-between');

    const recipeTitle = document.createElement('h2');
    recipeTitle.classList.add('card__title');
    recipeTitle.textContent = recipe.name;

    const recipeTime = document.createElement('data');
    recipeTime.classList.add('card__time');
    recipeTime.setAttribute('value', recipe.time);
    recipeTime.innerHTML = `<i class="fa-regular fa-clock"></i> ${recipe.time} min`;

    const recipeContent = document.createElement('div');
    recipeContent.classList.add('card__content');

    const recipeIngredients = document.createElement('div');
    recipeIngredients.classList.add('card__content__ingredients');

    const recipeIngredientsList = document.createElement('ul');
    
    recipe.ingredients.forEach(function (ingredient) {
        const recipeIngredient = document.createElement('li');
        if (ingredient.quantity) {
            recipeIngredient.innerHTML = `<strong>${ingredient.ingredient}:</strong> ${ingredient.quantity}`;
        } else {
            recipeIngredient.innerHTML = `<strong>${ingredient.ingredient}</strong>`;
        }
        if (ingredient.unit) {
            if (ingredient.unit === 'grammes') {
                recipeIngredient.innerHTML += `g`;
            } else if (ingredient.unit === 'cuillères à soupe') {
                recipeIngredient.innerHTML += `cs`;
            } else if (ingredient.unit === 'cuillères à café') {
                recipeIngredient.innerHTML += `cc`;
            } else if (ingredient.unit === 'cl' || ingredient.unit === 'ml') {
                recipeIngredient.innerHTML += `${ingredient.unit}`;
            } else {
                recipeIngredient.innerHTML += ` ${ingredient.unit}`;
            }
        }
        recipeIngredientsList.appendChild(recipeIngredient);
    })
    const recipeRecipe = document.createElement('div');
    recipeRecipe.classList.add('card__content__recipe');

    const recipeRecipeText = document.createElement('p');
    recipeRecipeText.textContent = recipe.description;

    // Build and return the DOM
    recipeCard.appendChild(recipePreview);
    recipeCard.appendChild(recipeField);
    recipeField.appendChild(recipeHeader);
    recipeHeader.appendChild(recipeTitle);
    recipeHeader.appendChild(recipeTime);
    recipeField.appendChild(recipeContent);
    recipeContent.appendChild(recipeIngredients);
    recipeIngredients.appendChild(recipeIngredientsList);
    recipeContent.appendChild(recipeRecipe);
    recipeRecipe.appendChild(recipeRecipeText);

    return recipeCard;
}