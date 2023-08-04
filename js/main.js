const pokemonList = document.getElementById("pokemonList");
const loadMore = document.getElementById("loadMore");
const maxRecords = 151;
const limit = 9;
let offset = 0;

// Converte a lista de Pokemons em uma lista HTML
function convertPokemonToLi(pokemon) {
  return `
      <li class="pokemon ${pokemon.mainType}">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>

          <div class="detail">
              <ol class="types">
                  ${pokemon.types
                    .map(
                      (mainType) =>
                        `<li class="type ${mainType}">${mainType}</li>`
                    )
                    .join("")}
              </ol>

              <img src="${pokemon.image}"
                   alt="${pokemon.name}">
          </div>
      </li>
  `;
}

// Carrega os primeiros pokemons da página
function loadPokemons(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemons(offset, limit);

// Carrega mais Pokemons ao apertar o botão "more"
loadMore.addEventListener("click", () => {
  offset += limit;

  // Limita a lista aos Pokemons da 1 geração, removendo o botão
  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadMore.parentElement.removeChild(loadMore);
  } else {
    loadPokemons;
  }

  loadPokemons(offset, limit);
});
