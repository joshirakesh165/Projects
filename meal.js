const dynamicMeal = document.getElementById("dynamic-meal");

function fetchMeal() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(data => data.meals[0])
    .then(meal => {
      meal.strYoutube = meal.strYoutube.replace("watch?v=", "embed/");
      creteMealUI(meal);
    });
}

function creteMealUI(meal) {
  let ingredients = [];
  let listItemsForInd = "";

  for (let i = 1; i < 20; i++) {
    let name = "strIngredient" + i;
    let measue = "strMeasure" + i;
    ingredients.push({ ingrediendName: meal[name], quantity: meal[measue] });
  }
  ingredients.forEach(item => {
    if (item) {
      listItemsForInd =
        listItemsForInd +
        `<tr><td>${item.ingrediendName}</td><td>${item.quantity}</td></tr>`;
    }
  });
  const mealUI = `
  <div>
    <div class="flex-container">
        <div class="meal-details">
            <div class="image-container">
                <img src="${meal.strMealThumb}" height="100%" width="100%"/>
            </div>
            <div class="ingredients">
                <h2>Ingredients:</h2>
                <table>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                </tr>
                ${listItemsForInd}
                </table>
            </div>
        </div>
        
        <div class="instuction">
            <h2>Instruction:</h2>
            <p>${meal.strInstructions}</p>
        </div>
    </div>
    <div class="meal-vedio">
        <h2>Watch:</h2>
        <iframe width="100%" height="515"
            src= "${meal.strYoutube}?controls=1">
        </iframe>
    </div>
  </div>
  `;
  dynamicMeal.innerHTML = mealUI;
}
