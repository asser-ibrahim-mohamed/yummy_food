// categories.js
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
async function getCategories() {
    let container = document.getElementById("mealContainer");
    
    try {
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        let data = await response.json();
        displayCategories(data.categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        container.innerHTML = "<h3 class='text-white'>Failed to load categories</h3>";
    }
}

function displayCategories(arr) {
    let cartona = "";
    for (let item of arr) {
        let desc = item.strCategoryDescription ? item.strCategoryDescription.split(" ").slice(0, 20).join(" ") : "";

        cartona += `
        <div class="col-md-3">
            <div onclick="getMealsByCategory('${item.strCategory}')" class="img position-relative rounded-2 cursor-pointer overflow-hidden">
                <img class="w-100" src="${item.strCategoryThumb}" alt="${item.strCategory}">
                <div class="overlay position-absolute d-flex flex-column align-items-center justify-content-center text-center p-2">
                    <h3 class="m-0 text-black">${item.strCategory}</h3>
                    <p class="text-black mt-1 small">${desc}...</p>
                </div>
            </div>
        </div>`;
    }
    document.getElementById("mealContainer").innerHTML = cartona;
}

async function getMealsByCategory(category) {
    let container = document.getElementById("mealContainer");
    container.innerHTML = "<h3 class='text-white'>Loading...</h3>";
    
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        let data = await response.json();
        let meals = data.meals.slice(0, 20);
        
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
    } catch(error) {
        console.error(error);
    }
}

// تشغيل الدالة تلقائياً عند تحميل صفحة الأقسام
getCategories();