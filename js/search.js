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
// 2. Search By Name
async function searchByName(term) {
    let container = document.getElementById("searchContainer");
    
    // إذا كان الحقل فارغاً، قم بتفريغ النتائج ولا ترسل طلب
    if (term.trim() === "") {
        container.innerHTML = "";
        return;
    }

    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
        let data = await response.json();
        
        // data.meals قد تكون null إذا لم توجد نتائج
       displayMeals(data.meals || []);
    } catch (error) {
        console.error(error);
    }
}

// 3. Search By First Letter
async function searchByFirstLetter(term) {
    let container = document.getElementById("searchContainer");

    // Empty input → clear results
    if (term.trim() === "") {
        container.innerHTML = "";
        return;
    }

    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
        let data = await response.json();

        displayMeals(data.meals || []);
    } catch (error) {
        console.error(error);
    }
}


function displayMeals(arr) {
    let container = document.getElementById("searchContainer");

    // لو arr فاضي أو مش موجود → خليه فاضي وخلاص
    if (!arr || arr.length === 0) {
        container.innerHTML = "";
        return;
    }

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
