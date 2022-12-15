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