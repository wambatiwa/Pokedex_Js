let pokedex = []
let offset = 0
let indexes = []
const $dialog = document.getElementById('dialog')
const $button = document.getElementById('loadMore')
const $closeDialog = document.getElementById('close')
let url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
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
  <button class="btn btn-primary catch">Catch</button>
</div>${$closeDialog.outerHTML}`
  $dialog.showModal()
  $dialog.classList.add('d-flex')
}
async function getPokemon(url) {
    const response = await fetch(url)
    const json = await response.json()
    const pokemons = json.results
    pokedex.push(...pokemons)
    console.log(pokedex);
    $main.innerHTML = pokedex.reduce((html,pokemon,index) => html + `<div id="${index}"  class="pokemon" data-id = "${parseUrl(pokemon.url)}">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${parseUrl(pokemon.url)}.png" class="img-thumbnail" alt="${pokemon.name}">
    <h2 class="h2 text-center">${pokemon.name}</h2>
  </div>`,'') 
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
  const property = e.target.closest('.pokemon')
  if(property) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${property.dataset.id}/`)
    indexes.push(property.dataset.id)
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
  // if(e.target.classList.contains('catch')) {
  //   $dialog.classList.remove('d-flex')
  //   $dialog.close()
  //   console.log(property.id);
  // }
})





