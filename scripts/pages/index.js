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

// Depending on the number of tags found, the column span is changed
// and the width of the dropdown is adjusted to fit the content.
function adjustWidth(tagList, tagDropDown) {
    if (tagList.childElementCount < 10) {
        tagList.querySelectorAll('li').forEach(function (li) {
            li.classList.remove('col-lg-4');
            li.classList.add('col-lg-12');
        })
        if (window.innerWidth > 960) { tagDropDown.style.width = '14vw'}
    } else if (tagList.childElementCount < 20) {
        tagList.querySelectorAll('li').forEach(function (li) {
            li.classList.remove('col-lg-4');
            li.classList.add('col-lg-6');
        })
        if (window.innerWidth > 960) { tagDropDown.style.width = '25vw'}
    } else {
        tagDropDown.removeAttribute('style');
    }
}

// if there are no recipes, the message is displayed
function checkIfEmpty() {
    const recipesField = document.querySelector('.recipes');
    if (recipesField.childElementCount === 0) {
        recipesField.innerHTML = '<p class="text-center pt-5">Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>';
    }
}

// Turns any tag into a toggleable tag
function makeToggleable(li, type) {
    li.addEventListener('click', function () {
        li.classList.add('d-none'); 
        const tag = document.createElement('li');
        tag.classList.add('tag','d-inline-flex','d-sm-flex','align-items-center','justify-content-between');
        tag.classList.add(`tag--${type}`);
        tag.innerHTML = `<span>${li.textContent}</span><i class="fa-regular fa-circle-xmark"></i>`;
        const tags = document.querySelector('.taglist--active');
        tags.appendChild(tag);
        filterByTag(tags);
        checkIfEmpty();

        const removeTag = tag.querySelector('i');
        removeTag.addEventListener('click', function () {
            tags.removeChild(tag);
            li.classList.remove('d-none');
            filterByTag(tags);
            checkIfEmpty();
        })
    })
}

// Unique tag factory
function addOneTag(type,tag) {
    const li = document.createElement('li');
    li.classList.add(`${type}`.slice(0, -1),'col-6','col-lg-4');
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

    const tagDropDown = document.querySelector(`.dropdown__${type}`);
    const searchForTag = tagDropDown.querySelector('input');
    searchForTag.addEventListener('keyup', function (e) {
        const tagList = document.querySelector(`.${type}-list`);
        if (type === 'ingredients') {
            getSearchedIngredients(e,searchForTag.value).forEach(function (ingredient) {
                tagList.appendChild(addOneTag('ingredients',ingredient));
            })
        } else if (type === 'appliances') {
            getSearchedAppliances(e,searchForTag.value).forEach(function (appliance) {
                tagList.appendChild(addOneTag('appliances',appliance));
            })
        } else if (type === 'ustensils') {
            getSearchedUstensils(e,searchForTag.value).forEach(function (ustensil) {
                tagList.appendChild(addOneTag('ustensils',ustensil));
            })
        }
        adjustWidth(tagList, tagDropDown);
    })
    adjustWidth(list, tagDropDown);
}

// Recipe card builder
function render(init=false) {

    const recipesField = document.querySelector('main.recipes');
    recipes.forEach(function (recipe) {
        const recipeCard = getRecipeCardDOM(recipe);
        recipesField.appendChild(recipeCard);
    })

    const recipeSearch = document.querySelector('#searchbar input');
    // The boolean init is used to prevent the event listener and tags
    // from being added multiple times when the page is re-rendered.
    if (init) {
        recipeSearch.addEventListener('keyup', function (e) {
            // if length of searchbar is less than 3, don't filter
            if (recipeSearch.value.length <3 ) {
                recipesField.innerHTML = '';
                render();
            } else {
                recipesField.innerHTML = '';
                const filteredRecipes = getFilteredRecipes(recipeSearch.value);
                filteredRecipes.forEach(function (recipe) {
                    const recipeCard = getRecipeCardDOM(recipe);
                    recipesField.appendChild(recipeCard);
                })
            }
            // if there are tags, re-filter by tags
            const tags = document.querySelector('.taglist--active');
            if (tags.childElementCount > 0) { filterByTag(tags) }
            checkIfEmpty();
        })
        
        fill('ingredients');
        fill('appliances');
        fill('ustensils');
    }
}

render(true);