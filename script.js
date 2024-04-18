// let offset = 0;
// // let caughtPokemons = {};
// const caughtPokemons = JSON.parse(localStorage.getItem("caughtPokemons")) || {};

// const caughtText = document.createElement("p");
// caughtText.textContent = "CAUGHT";
// caughtText.classList.add("caught-text");

// function loadPokemon() {
// fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
//     .then((response) => response.json())
//     .then((data) => {
//       data.results.forEach((pokemon) => {
//         fetch(pokemon.url)
//           .then((response) => response.json())
//           .then((pokeData) => {
//             const img = document.createElement("img");
//             img.src = pokeData.sprites.other["official-artwork"].front_default;
//             img.width = 200;
//             img.height = 200;
//             img.style.margin = "10px";
//             img.classList = "pokeImg";
//             const imgDiv = document.createElement("div");
//             imgDiv.id =`pokemon-${pokeData.id}`;
//             imgDiv.appendChild(img);
//             imgDiv.className = "img-class";
//             const caughtText = document.createElement("p");
//             caughtText.textContent = "CAUGHT";
//             caughtText.classList.add("caught-text");
//             imgDiv.appendChild(caughtText);

//             if (caughtPokemons[pokeData.id]) {
//               imgDiv.classList.add("caught");
//               caughtText.style.display = "block";
//             } else {
//               caughtText.style.display = "none";
//             }

//             img.addEventListener("click", function () {
//               displayPopup(pokeData, img, !!caughtPokemons[pokeData.id]);
//               updateCaughtClass(pokeData.id);
//             });
//             const name = document.createElement("p");
//             name.textContent = pokeData.name;
//             name.classList = "h2 text-center";

//             const innerDiv = document.createElement("div");
//             innerDiv.appendChild(imgDiv);
//             innerDiv.appendChild(name);

//             const col = document.createElement("div");
//             col.className = "col-md p-3 colHover";
//             col.appendChild(innerDiv);

//             document.querySelector("#pokeContainer .row").appendChild(col);
//           });
//       });
//     });
//   offset += 20;
// }

// function updateCaughtClass(pokemonId) {
//   const imgDiv = document.getElementById(`pokemon-${pokemonId}`);
//   const caughtText = imgDiv.querySelector(".caught-text");
//   if (caughtPokemons[pokemonId]) {
//     imgDiv.classList.add("caught");
//     caughtText.style.display = "block";
//   } else {
//     imgDiv.classList.remove("caught");
//     caughtText.style.display = "none";
//   }
// }

// function displayPopup(pokeData, imgElement, isCaught, imgDiv) {
//     console.log("Is Pokemon caught:", isCaught);
//     const overlay = document.createElement("div");
//     overlay.className = "overlay";
//     document.body.appendChild(overlay);
//     const popup = document.createElement("div");
//     popup.className = "popup img-class";
  
//     const img = document.createElement("img");
//     img.src = pokeData.sprites.front_default;
//     img.addEventListener("mouseover", function () {
//       img.src = pokeData.sprites.back_default;
//       img.addEventListener("mouseout", function () {
//         img.src = pokeData.sprites.front_default;
//       });
//     });
//     img.width = 200;
//     img.height = 200;
//     popup.appendChild(img);
  
//     const name = document.createElement("h2");
//     name.textContent = pokeData.name;
//     name.classList = "text-center";
//     popup.appendChild(name);
  
//     const height = document.createElement("p");
//     height.textContent = `Height: ${pokeData.height}`;
//     popup.appendChild(height);
  
//     const weight = document.createElement("p");
//     weight.textContent = `Weight: ${pokeData.weight}`;
//     popup.appendChild(weight);
  
//     const abilities = document.createElement("p");
//     abilities.textContent = `Abilities: ${pokeData.abilities
//       .map((ability) => ability.ability.name)
//       .join(", ")}`;
//     popup.appendChild(abilities);
  
//     const buttonContainer = document.createElement("div");
//     buttonContainer.className = "button-container";
//     const exitButton = document.createElement("button");
//   exitButton.textContent = "Close";
//   exitButton.classList = "button-paper m-1";
//   exitButton.addEventListener("click", function () {
//     document.body.removeChild(popup);
//     document.body.removeChild(overlay);
//   });
//   buttonContainer.appendChild(exitButton);

//   const catchButton = document.createElement("button");
//   catchButton.textContent = isCaught ? "Release" : "Catch";
//   catchButton.className = "catch-button button-paper m-1";
//   //   const imgDiv = document.getElementById(pokemon-${pokeData.id});
//   //   const caughtText = imgDiv.querySelector(".caught-text");

//   catchButton.addEventListener("click", function () {
//     if (isCaught) {
//       delete caughtPokemons[pokeData.id];
//       catchButton.textContent = "Catch";
//       caughtText.style.display = "none";
//       catchButton.style.backgroundColor = "";
//       catchButton.style.color = "";
//     } else {
//       caughtPokemons[pokeData.id] = true;
//       catchButton.style.backgroundColor = "red";
//       catchButton.style.color = "white";
//       catchButton.textContent = "Release";
//       caughtText.style.display = "block";
//     }
//     updateCaughtClass(pokeData.id);
//     localStorage.setItem("caughtPokemons", JSON.stringify(caughtPokemons));
//     console.log("Caught Pokemons:", caughtPokemons);
//     document.body.removeChild(popup);
//     document.body.removeChild(overlay);
//   });

//   buttonContainer.appendChild(catchButton);
//   popup.appendChild(buttonContainer);

//   document.body.appendChild(popup);
// }

// loadPokemon();
// document.getElementById("loadMore").addEventListener("click", loadPokemon);  
let pokemons = []
const $main = document.querySelector('main')
async function displayPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
    const json = await response.json()
    pokemons.unshift(json.results)
    console.log(json);
    $main.innerHTML = pokemons[0].reduce((html,pokemon,index) => html + `<div class="pokemon">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${parseUrl(pokemon.url)}.png" class="img-thumbnail" alt="${pokemon.name}">
    <h2 class="h2 text-center">${pokemon.name}</h2>
  </div>`,'')
    
}
function parseUrl (url) {
    return url.substring(url.substring(0, url.length - 2).lastIndexOf('/') + 1, url.length - 1)
}

displayPokemon()