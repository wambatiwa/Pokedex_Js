const ls = JSON.parse(localStorage.getItem('caughtPoke'))
let pokedex = []
let offset = 0
let caught = ls ? ls : []
let url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`

const $dialog = document.getElementById('dialog')
const $button = document.getElementById('loadMore')
const $closeDialog = document.getElementById('close')
const $main = document.querySelector('main')

function displayDetails(details) {
  // 
  $dialog.innerHTML = ` <div class="image">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${details.id}.png" alt="" />
</div>
<div class="properties align-content-center">
  <h2 class="h2 text-center text-primary">Height:</h2>
  <p class="fs-5 h4 ">${details.height} lb</p>
  <h2 class="h2 text-center text-primary">Weight:</h2>
  <p class="fs-5 h4 ">${details.weight} ft</p>
  <button class="btn btn-primary ${caught.includes(details.name)? 'release':'catch'}" data-name ="${details.name}">${caught.includes(details.name)? 'release':'catch'}</button>
</div>${$closeDialog.outerHTML}`
  $dialog.showModal()
  $dialog.classList.add('d-flex')
}

function displayPokemons() {
  $main.innerHTML = pokedex.reduce((html,pokemon,index) => html + `<div id="${index}"  class="pokemon ${caught.includes(pokemon.name) ? 'caught' : ''}" data-id = "${parseUrl(pokemon.url)}">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${parseUrl(pokemon.url)}.png" class="img-thumbnail" alt="${pokemon.name}">
  <h2 class="h2 text-center" id="text">${caught.includes(pokemon.name)?"CAUGHT":pokemon.name}</h2>
</div>`,'') 
}

async function getPokemon(url) {
    const response = await fetch(url)
    const json = await response.json()
    const pokemons = json.results
    pokedex.push(...pokemons)
    console.log(pokedex);
    displayPokemons()
   
}

function parseUrl (url) {
    return url.substring(url.substring(0, url.length - 2).lastIndexOf('/') + 1, url.length - 1)
}

getPokemon(url)

$button.addEventListener('click', function() {
  offset = offset+20
  url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
  getPokemon(url)
})

$main.addEventListener('click', async function(e) {
  console.log(e.target);
  const property = e.target.closest('.pokemon')
  if(property) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${property.dataset.id}/`)
    const result = await res.json()
    displayDetails(result)
    console.log(property);
  }
})

$dialog.addEventListener('click', function(e) {
  if(e.target.classList.contains('ferme')) {
    $dialog.classList.remove('d-flex')
    $dialog.close()
    
  }
  if(e.target.classList.contains('catch')) {
    $dialog.classList.remove('d-flex')
    $dialog.close()
    caught.push(e.target.dataset.name)
    localStorage.setItem('caughtPoke',JSON.stringify(caught))
    displayPokemons()
  }
  if(e.target.classList.contains('release')) {
    $dialog.classList.remove('d-flex')
    $dialog.close()
    caught = caught.filter(poke => poke !== e.target.dataset.name)
    localStorage.setItem('caughtPoke',JSON.stringify(caught))
    // const index = caught.indexOf(e.target.dataset.name)
    // caught.splice(index,1)
    displayPokemons()
  }
})



