const loadMeals = (searchValue) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
        .catch(error => {
            console.log(error);
        })
}

const displayMeals = (meals) => {
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML = '';
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML = `
            <div class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>

                    <!-- Button trigger modal -->
                    <button onclick="loadMealDetails(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetailsModal">
                        Meal Details
                    </button>
                </div>
                <div class="card-footer">
                    <small class="text-muted">
                        <span class="me-2">Category: ${meal.strCategory}</span>
                        <span>Area: ${meal.strArea}</span>
                    </small>
                </div>
            </div>
        `;
        mealsContainer.appendChild(mealDiv);
    });
}

const searchMeals = () => {
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value;
    loadMeals(searchValue);
}

/* 
const loadMealDetailsOld = (idMeal) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]))
        .catch(error => {
            console.log(error);
        })
} 
*/

const loadMealDetails = async (idMeal) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayMealDetails(data.meals[0]);
    }
    catch (error) {
        console.log(error);
    }
}

const displayMealDetails = (meals) => {
    document.getElementById('mealDetailsModalLabel').innerText = meals.strMeal;
    document.getElementById('mealDetailsModalBody').innerHTML = `
        <p>${meals.strInstructions}</p>
    `;
    document.getElementById('meal-video').innerHTML = `
        <a href="${meals.strYoutube}" target="_blank" class="card-text text-decoration-none text-white">See Video</a>
    `;
}

loadMeals('chicken');