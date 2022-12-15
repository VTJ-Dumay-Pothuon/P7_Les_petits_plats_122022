function getAllAppliances() {
    let appliances = [];

    // 1) Get every ingredient from every recipe
    recipes.forEach(function (recipe) {
        appliances.push(recipe.appliance.charAt(0).toUpperCase() + recipe.appliance.slice(1).toLowerCase());
    })

    // 2) Remove duplicates
    appliances = appliances.filter((appliance, index) => appliances.indexOf(appliance) === index);

    // 3) Sort alphabetically
    appliances.sort();
    
    return appliances;
}