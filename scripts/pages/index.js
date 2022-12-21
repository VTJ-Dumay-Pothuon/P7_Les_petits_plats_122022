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

// Tag DOM builder
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

        li.addEventListener('click', function () {
            li.classList.add('d-none'); 
            const tag = document.createElement('li');
            tag.classList.add('tag','d-sm-flex','align-items-center','justify-content-between');
            tag.classList.add(`tag--${type}`);
            tag.innerHTML = `<span>${item}</span><i class="fa-regular fa-circle-xmark"></i>`;
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
    fill('appliances');
    fill('ustensils');
}

render();