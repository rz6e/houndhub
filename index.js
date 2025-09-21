let pokemon;

document.getElementById("submitSearch").onclick = function() {
    pokemon = document.getElementById("textSearch").value.toLowerCase();
    pokemon = pokemon.charAt(0).toUpperCase() + pokemon.slice(1)

    console.log(pokemon)

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

            const heading = document.getElementsByName(key)[0];
            if (!heading) continue;

            heading.innerHTML = `${uppers[key]}: ` + ` <span>&nbsp;${value}</span>`;

        }
    });

    let ismythical = false

    fetch("./legendaries.json")
    .then(res => res.json())
    .then(data => {
        let list;

        for (let d of data) {
            if (d[pokemon]) {
            
                const heading = document.getElementsByName("classification")[0];
                if (!heading) continue;

                heading.innerHTML = `Classification: ` + ` <span id="legendary">&nbsp;LEGENDARY</span>`;

                ismythical = true
            }

            else {
                ismythical = false
            }
        }

        if (!list) {
            console.log("No match found");
            return;
        }
    });

    fetch("./mythicals.json")
    .then(res => res.json())
    .then(data => {
        let list;

        for (let d of data) {
            if (d[pokemon]) {

                const heading = document.getElementsByName("classification")[0];
                if (!heading) continue;

                heading.innerHTML = `Classification: ` + ` <span id="mythical">&nbsp;MYTHICAL</span>`;

            }

            else{
                if (document.getElementsByName("classification")[0].innerHTML != "Classification: " && !ismythical) {
                document.getElementsByName("classification")[0].innerHTML = "Classification: "
                }
            }
        }

        if (!list) {
            console.log("No match found");
            return;
        }
    });
    

    async function fetchData(){

        try{

            const pokemonName = pokemon.toLowerCase();
            
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
