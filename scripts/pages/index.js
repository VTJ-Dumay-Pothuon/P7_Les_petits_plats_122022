function getAllItems(type) {
    if (type === 'ingredients') {
        return getAllIngredients();
    } else if (type === 'appliances') {
        return getAllAppliances();
    } else if (type === 'ustensils') {
        return getAllUstensils();
    }
}

function fill(type) {
    const field = document.querySelector(`.dropdown__list--${type}`);
    const list = document.createElement('ul');
    list.classList.add(`${type}-list`,'row','m-0','flex-wrap','justify-content-around');
    field.appendChild(list);

    const items = getAllItems(type);
    items.forEach(function (item) {
        const li = document.createElement('li');
        li.classList.add(`${type}`.slice(0, -1),'col-4');
        li.textContent = item;
        list.appendChild(li);
    })
}

function render() {

    recipesField = document.querySelector('main.recipes');
    recipes.forEach(function (recipe) {
        const recipeCard = getRecipeCardDOM(recipe);
        recipesField.appendChild(recipeCard);
    })

    fill('ingredients');
    fill('appliances');
    fill('ustensils');
}

render();