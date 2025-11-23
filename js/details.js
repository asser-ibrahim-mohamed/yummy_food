// 1. Sidebar Toggle Logic
function toggleMenu() {
    let nav = document.getElementById("sideNav");
    let icon = document.getElementById("toggleIcon");

    if (nav.style.left === "0px") {
        nav.style.left = "-250px";
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    } else {
        nav.style.left = "0px";
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    }
}

const urlParams = new URLSearchParams(window.location.search);
const paramId = urlParams.get('id');

async function getMealDetails() {

    if (!paramId) return;

    // Fetch the specific meal
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${paramId}`);
    let data = await response.json();
    let meal = data.meals[0];

    // 4. Process Ingredients (The Blue Badges)
    let ingredients = ``;
    for (let i = 1; i <= 20; i++) {
        let ingredient = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];

        // Check if ingredient exists and isn't empty
        if (ingredient && ingredient.trim() !== "") {
            ingredients += `
            <li class="alert alert-info m-2 p-1 text-black">
                ${measure} ${ingredient}
            </li>`;
        }
    }

    let tagsStr = '';
    if (meal.strTags) {
        let tags = meal.strTags.split(",");
        for (let tag of tags) {
            tagsStr += `<li class="alert alert-danger m-2 p-1 text-black">${tag}</li>`;
        }
    }

    let cartona = `
    <div class="col-md-4">
        <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h2 class="mt-2">${meal.strMeal}</h2>
    </div>

    <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        
        <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
        
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${ingredients}
        </ul>

        <h3 class="mt-2">Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${tagsStr}
        </ul>

        <a target="_blank" href="${meal.strSource}" class="btn btn-success text-white">Source</a>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger text-white">Youtube</a>
    </div>`;


    document.getElementById("detailsContent").innerHTML = cartona;
}


getMealDetails();