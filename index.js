let pokemon;

document.getElementById("submitSearch").onclick = function() {
    pokemon = document.getElementById("textSearch").value;
    console.log(pokemon);

    uppers = {
        "pack":"Pack",
        "spawn":"Spawn",
        "rarity":"Rarity",
        "time":"Time",
        "weather":"Weather",
        "context":"Context",
        "condition":"Condition",
        "forms":"Forms"
    }

    fetch("./lists.json")
    .then(res => res.json())
    .then(data => {
        let list;

        for (let d of data) {
            if (d[pokemon]) {
                list = d[pokemon];
            }
        }

        if (!list) {
            console.log("No match found");
            return;
        }

        for (let [key, value] of Object.entries(list)) {
            console.log(key, value);

            const heading = document.getElementsByName(key)[0];
            if (!heading) continue;

            // Option 1: use innerHTML
            heading.innerHTML = `${uppers[key]}: ` + ` <span>&nbsp;${value}</span>`;

        }
    });

    

    async function fetchData(){

        try{

            const pokemonName = pokemon.toLowerCase();

            console.log(pokemonName)
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

            if(!response.ok){
                throw new Error("Could not fetch resource");
            }

            const data = await response.json();
            const pokemonSprite = data.sprites.front_default;
            const imgElement = document.getElementById("mainImage");

            imgElement.src = pokemonSprite;
            imgElement.style.display = "block";
        }
        catch(error){
            console.error(error);
        }
    }

    fetchData()
};
