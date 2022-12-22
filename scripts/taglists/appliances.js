function getSearchedAppliances(lastPressed, searchedAppliance) {
    const applianceList = document.querySelector('.appliances-list');
    let appliances = [];

    // 0) If searchedAppliance is empty, return all the appliances immediately
    if (searchedAppliance === '') { 
        applianceList.innerHTML = ''
        return getAllAppliances() 
    }

    // 1) Get all the appliance tags from the DOM ; 
    // This way, we're searching in current DOM, not in the whole recipes array
    let applianceTags = Array.from(applianceList.children);
    // if last key pressed was backspace, we need to reset the appliance list
    if (lastPressed.key === 'Backspace') { applianceTags = getAllAppliances() }
    applianceList.innerHTML = '';
    
    // 2) Filter applianceTags to keep only the ones that matches the searchedAppliance as a substring
    applianceTags.forEach(function (applianceTag) {
        // if applianceTag is a DOM element, we need to get its textContent
        if (typeof applianceTag === 'object') {
            applianceTag = applianceTag.textContent;
        }
        if (applianceTag.toLowerCase().includes(searchedAppliance.toLowerCase())) {
            appliances.push(applianceTag);
        }
    })

    return appliances;
}

function getAllAppliances() {
    let appliances = [];

    // 1) Get the appliance from every recipe
    recipes.forEach(function (recipe) {
        appliances.push(recipe.appliance.charAt(0).toUpperCase() + recipe.appliance.slice(1).toLowerCase());
    })

    // 2) Remove duplicates
    appliances = appliances.filter((appliance, index) => appliances.indexOf(appliance) === index);

    // 3) Sort alphabetically
    appliances.sort();
    
    return appliances;
}