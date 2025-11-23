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


async function getAreas() {
    let container = document.getElementById("rowData");
    container.innerHTML = "<div class='text-center text-white'>Loading...</div>";

    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        let data = await response.json();
        displayAreas(data.meals);
    } catch (error) {
        console.error(error);
    }
}

// 2. Display Areas Icons
function displayAreas(arr) {
    let container = document.getElementById("rowData");
    let cartona = "";

    for (let item of arr) {
        cartona += `
        <div class="col-md-3">
            <div onclick="getMealsByArea('${item.strArea}')" class="rounded-2 text-center cursor-pointer text-white">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3 class="mt-2">${item.strArea}</h3>
            </div>
        </div>
        `;
    }
    container.innerHTML = cartona;
}

// 3. Fetch Meals by Selected Area
async function getMealsByArea(area) {
    let container = document.getElementById("rowData");
    container.innerHTML = "<div class='text-center text-white'>Loading Meals...</div>";

    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        let data = await response.json();
        displayMeals(data.meals.slice(0, 20));
    } catch (error) {
        console.error(error);
    }
}

// 4. Display Meals (Standard Card View)
function displayMeals(arr) {
    let container = document.getElementById("rowData");
    let cartona = "";

    for (let meal of arr) {
        cartona += `
        <div class="col-md-3">
            <div onclick="window.location.href='details.html?id=${meal.idMeal}'" class="img position-relative rounded-2 cursor-pointer overflow-hidden">
                <img class="w-100" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="overlay position-absolute d-flex align-items-center justify-content-center p-2">
                    <h2 class="m-0 text-black">${meal.strMeal}</h2>
                </div>
            </div>
        </div>`;
    }
    container.innerHTML = cartona;
}


getAreas();