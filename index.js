const searchField = document.getElementById('search-input');
const containerDiv = document.getElementById('display-items')
const detailsContainer = document.getElementById('details-container')

document.getElementById('search-button').addEventListener('click',function(){
    
    containerDiv.textContent='';
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchField.value}`
    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => showResults(data.drinks))
    searchField.value='';
})

const showResults = drinks =>{
    // console.log(drinks)
    
    drinks.forEach(drink => {
        // console.log(drink)
        
      const div =   document.createElement('div');
      div.classList.add('col')
      div.innerHTML=`
      <div class="col">
      <div class="card">
        <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${drink.strDrink}</h5>
          <p class="card-text">${drink.strInstructions.slice(0,100)}</p>
          <button onclick="loadDetails('${drink.idDrink}')" class="btn btn-secondary">Lode More</button>
          
        </div>
      </div>
    </div>
      `
      containerDiv.appendChild(div)
    });
    
}

const loadDetails = driinkId =>{
    detailsContainer.textContent=';'
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${driinkId}`
    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => showDetails(data.drinks[0]))
}

const showDetails = drink=>{
    console.log(drink.strDrinkThumb)

    const div = document.createElement('div')
    div.classList.add('text-center')
    div.innerHTML=`
        <img  src="${drink.strDrinkThumb}" class="card-img-top w-50 " alt="...">
        <div class="card-body">
        <h3 class="card-title">Drink Name : ${drink.strDrink}</h3>
        <h5>Drink Catagory : ${drink.strCategory}</h5>
        <p class="card-text"> Details : ${drink.strInstructions.slice(0,300)}</p>
        </div>
    `
    detailsContainer.appendChild(div)
}