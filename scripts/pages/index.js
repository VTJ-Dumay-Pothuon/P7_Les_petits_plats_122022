// Tag type factory
function getAllItems(type) {
    if (type === 'ingredients') {
        return getAllIngredients();
    } else if (type === 'appliances') {
        return getAllAppliances();
    } else if (type === 'ustensils') {
        return getAllUstensils();
    }
}

// Turns any tag into a toggleable tag
function makeToggleable(li, type) {
    li.addEventListener('click', function () {
        li.classList.add('d-none'); 
        const tag = document.createElement('li');
        tag.classList.add('tag','d-sm-flex','align-items-center','justify-content-between');
        tag.classList.add(`tag--${type}s`);
        tag.innerHTML = `<span>${li.textContent}</span><i class="fa-regular fa-circle-xmark"></i>`;
        const tags = document.querySelector('.taglist--active');
        tags.appendChild(tag);
        filterByTag(tags);

        const removeTag = tag.querySelector('i');
        removeTag.addEventListener('click', function () {
            tags.removeChild(tag);
            li.classList.remove('d-none');
            filterByTag(tags);
        })
    })
}

// Unique tag factory
function addOneTag(type,tag) {
    const li = document.createElement('li');
    li.classList.add(`${type}`.slice(0, -1),'col-4');
    li.textContent = tag;
    makeToggleable(li, type);
    return li;
}

// Tag DOM builder
function fill(type) {
    const field = document.querySelector(`.dropdown__list--${type}`);
    const list = document.createElement('ul');
    list.classList.add(`${type}-list`,'row','m-0','flex-wrap','justify-start');
    field.appendChild(list);

    const items = getAllItems(type);
    items.forEach(function (tag) {
        list.appendChild(addOneTag(type,tag));
    })
}

// Recipe card builder
function render() {

    recipesField = document.querySelector('main.recipes');
    recipes.forEach(function (recipe) {
        const recipeCard = getRecipeCardDOM(recipe);
        recipesField.appendChild(recipeCard);
    })

    fill('ingredients');
    const searchForIngredient = document.querySelector('.dropdown__ingredients input');
    searchForIngredient.addEventListener('keyup', function (e) {
        const ingredientList = document.querySelector('.ingredients-list');
        getSearchedIngredients(e,searchForIngredient.value).forEach(function (ingredient) {
            ingredientList.appendChild(addOneTag('ingredient',ingredient));
        })
    })

    fill('appliances');
    const searchForAppliance = document.querySelector('.dropdown__appliances input');
    searchForAppliance.addEventListener('keyup', function (e) {
        const applianceList = document.querySelector('.appliances-list');
        getSearchedAppliances(e,searchForAppliance.value).forEach(function (appliance) {
            applianceList.appendChild(addOneTag('appliance',appliance));
        })
    })

    fill('ustensils');
    const searchForUstensil = document.querySelector('.dropdown__ustensils input');
    searchForUstensil.addEventListener('keyup', function (e) {
        const ustensilList = document.querySelector('.ustensils-list');
        getSearchedUstensils(e,searchForUstensil.value).forEach(function (ustensil) {
            ustensilList.appendChild(addOneTag('ustensil',ustensil));
        })
    })
}

render();