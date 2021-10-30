"stric mode"
const pokeBtn = document.querySelector("#pokeBtn");
const pokeType = document.querySelector("#pokeType");
const pokeStats = document.querySelector("#pokeStats");
const pokeAbilities = document.querySelector("#pokeAbilities");
var pokeIndex = "https://pokeapi.co/api/v2/pokemon/";
var pokemon;
var rdmNum;
var eventOn;

//Random Pokemon Index
function rdmIndex(){
	rdmNum = String(Math.floor((Math.random() * (898 - 1 + 1)) + 1));
	return pokeIndex += rdmNum;	
}
rdmIndex();


//Solicitud de Api RESTful
function callData(){
	fetch(pokeIndex)
	.then( data => data.json())
	.then( (json) => {
		pokemon = json;
		pokeCreate();
	}).catch(e => console.log(e));
}
callData();

//Mostrar en Pantalla los Datos del Pokemon
function pokeCreate(){
	let pokeName = document.querySelector("#pokeName");
	let pokeId = document.querySelector("#pokeId");
	let pokeImg = document.querySelector("#pokeImg");

	//Configurar Nombre, Id e imagen del Pokemon:
	pokeName.textContent = (pokemon.name)[0].toUpperCase() + (pokemon.name).slice(1);
	pokeId.textContent = `ID #${pokemon.id}`;
	pokeImg.setAttribute("src",pokemon.sprites.other["official-artwork"].front_default);

	//Agregar los tipos del Pokemon
	let typeTitle = document.createElement("p");
	typeTitle.textContent = "Type";
	typeTitle.setAttribute("class", "subTitles");
	pokeType.appendChild(typeTitle);

	pokemon.types.forEach((types,i)=>{
		let typeText = document.createElement("p");
		typeText.textContent = (types.type.name)[0].toUpperCase() + (types.type.name).slice(1);
		typeText.setAttribute("class", "subQuality");
		pokeType.appendChild(typeText);

	});

	//Agregar Stats del Pokemon
	let statTitle = document.createElement("p");
	statTitle.textContent = "Stats";
	statTitle.setAttribute("class", "subTitles");
	pokeStats.appendChild(statTitle);

	pokemon.stats.forEach((stats,i)=>{

		let statText = document.createElement("p");
		let statValue = document.createElement("p");
		let preText = (stats.stat.name)[0].toUpperCase() + (stats.stat.name).slice(1);
		
		statText.textContent = preText.replace(/-/," ");
		statText.setAttribute("class", "subQuality");
		statValue.textContent = stats.base_stat;
		statValue.setAttribute("class", "subValues");
		pokeStats.appendChild(statText);
		pokeStats.appendChild(statValue);

	});

	//Agregar habilidades del Pokemon
	let abilityTitle = document.createElement("p");
	abilityTitle.textContent = "Abilities";
	abilityTitle.setAttribute("class", "subTitles");
	pokeAbilities.appendChild(abilityTitle);

	pokemon.abilities.forEach((abilities,i)=>{

		let abilityText = document.createElement("p");
		let preText = (abilities.ability.name)[0].toUpperCase() + (abilities.ability.name).slice(1)
		abilityText.textContent = preText.replace(/-/," ");
		abilityText.setAttribute("class", "subQuality");
		pokeAbilities.appendChild(abilityText);

	});
	eventOn = true;
}

//Eliminar datos y llamar Nuevos datos
function newPokemon(){

	//Borrar Hijos Creados
	while(pokeType.firstChild){
		pokeType.removeChild(pokeType.firstChild);
	}
	while(pokeStats.firstChild){
		pokeStats.removeChild(pokeStats.firstChild);
	}
	while(pokeAbilities.firstChild){
		pokeAbilities.removeChild(pokeAbilities.firstChild);
	}

	pokeIndex = "https://pokeapi.co/api/v2/pokemon/";
	rdmIndex();
	callData();
}


pokeBtn.addEventListener("click", ()=>{
	if(eventOn == true){
		eventOn = false;
		newPokemon();
	}
});


//json.id X
//json.name X
//json.sprites.other.dream_world.front_default  Imagen X
//json.types[0].type.name         El tipo de Ṕokemon X
//json.abilities[0].ability.name  Habilidades X
//json.stats[].stat.name	Nombre de Estado X
//json.stats[].base_stat	Valor base de Estado X
