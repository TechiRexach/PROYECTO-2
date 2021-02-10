
var equipos = dataClasificacion.standings;


function clasificacionTemporada (standings){
 
    let arrayTable = standings[0].table;

for ( let i = 0; i < arrayTable.length; i++){
    console.log(standings[0].table[i].position);
    console.log(standings[0].table[i].team.name);
    console.log(standings[0].table[i].team.crestUrl);
    console.log(standings[0].table[1].playedGames);
}
}
clasificacionTemporada(equipos)

function crearTabla(standings){
    
    let arrayTable = standings[0].table;

    let tabla = document.getElementById("tabla");
        
    for (let i = 0; i < arrayTable.length; i++){
        const tr = document.createElement("tr");
        tr.style.backgroundColor = "lightgrey";

        let escudo = document.createElement("td");
            escudo.classList.add("tdescudo");
        let escudoimg = document.createElement("img");
            escudoimg.classList.add("imgteam1");
            escudoimg.setAttribute("src", "https://crests.football-data.org/" + standings[0].table[i].team.id + ".svg");
            escudoimg.setAttribute("alt", "Escudo Equipo");
            escudo.appendChild(escudoimg);
            tr.appendChild(escudo);

        let nombreEquipo = document.createElement("td");
            nombreEquipo.textContent = standings[0].table[i].team.name;
            nombreEquipo.style.textAlign = "center";
            nombreEquipo.style.width = "200px";
            tr.appendChild(nombreEquipo);

        let posicionEquipo = document.createElement("td");
            posicionEquipo.textContent = standings[0].table[i].position;
            posicionEquipo.style.textAlign = "center";
            tr.appendChild(posicionEquipo);  

        let partidosJugados = document.createElement("td");
            partidosJugados.textContent = standings[0].table[1].playedGames;
            partidosJugados.style.textAlign = "center";
            tr.appendChild(partidosJugados); 

        tabla.appendChild(tr);
    }
}
crearTabla(equipos)