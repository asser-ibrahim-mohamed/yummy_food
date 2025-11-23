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
// Get meals from API (Home Page Logic)
async function getMeals() {
    try {
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef");
        let data = await response.json();
        return data.meals;
    } catch (error) {
        console.error("Error fetching meals:", error);
        return [];
    }
}

// Display first 20 meals
async function start() {
    let meals = await getMeals();

    if (meals) {
        meals = meals.slice(0, 20);
    }

    const container = document.getElementById("mealContainer");
    if (container) {
        container.innerHTML = "";
        let cartona = "";

        for (let meal of meals) {
            cartona += `
            <div class="col-md-3">
                <div onclick="window.location.href='details.html?id=${meal.idMeal}'" class="img position-relative rounded-2 cursor-pointer">
                    <img class="images w-100" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="overlay position-absolute d-flex align-items-center justify-content-center p-2">
                        <h2 class="m-0 text-black">${meal.strMeal}</h2>
                    </div>
                </div>
            </div>`;
        }
        container.innerHTML = cartona;
    }
}

start();