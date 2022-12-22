function getSearchedUstensils(lastPressed, searchedUstensil) {
    const ustensilList = document.querySelector('.ustensils-list');
    let ustensils = [];

    // 0) If searchedUstensil is empty, return all the ustensils immediately
    if (searchedUstensil === '') { 
        ustensilList.innerHTML = ''
        return getAllUstensils() 
    }

    // 1) Get all the ustensil tags from the DOM ; 
    // This way, we're searching in current DOM, not in the whole recipes array
    let ustensilTags = Array.from(ustensilList.children);
    // if last key pressed was backspace, we need to reset the ustensil list
    if (lastPressed.key === 'Backspace') { ustensilTags = getAllUstensils() }
    ustensilList.innerHTML = '';
    
    // 2) Filter ustensilTags to keep only the ones that matches the searchedUstensil as a substring
    ustensilTags.forEach(function (ustensilTag) {
        // if ustensilTag is a DOM element, we need to get its textContent
        if (typeof ustensilTag === 'object') {
            ustensilTag = ustensilTag.textContent;
        }
        if (ustensilTag.toLowerCase().includes(searchedUstensil.toLowerCase())) {
            ustensils.push(ustensilTag);
        }
    })

    return ustensils;
}

function getAllUstensils() {
    let ustensils = [];

    // 1) Get every ingredient from every recipe
    recipes.forEach(function (recipe) {
        recipe.ustensils.forEach(function (ustensil) {
            ustensils.push(ustensil.charAt(0).toUpperCase() + ustensil.slice(1).toLowerCase());
        })
    })

    // 2) Remove duplicates
    ustensils = ustensils.filter((ustensil, index) => ustensils.indexOf(ustensil) === index);

    // 3) Sort alphabetically
    ustensils.sort();

    return ustensils;
}