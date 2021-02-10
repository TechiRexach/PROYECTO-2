
var equipos = dataClasificacion.standings;

function clasificacionTemporada (standings){
 
for ( let i = 0; i < 20; i++){
   console.log(standings[0].table[i].position);
   console.log(standings[0].table[i].team.name);
   console.log(standings[0].table[i].team.crestUrl);
}
}
clasificacionTemporada(equipos)

function crearTabla(standings){

    let tabla = document.getElementById("tabla");

    for (let i = 0; i < 20; i++){
        const tr = document.createElement("tr");

        let escudo = document.createElement("td");
        let escudoimg = document.createElement("img");
            escudoimg.setAttribute("src", "https://crests.football-data.org/" + standings[0].table[i].team.id + ".svg");
            escudoimg.setAttribute("alt", "Escudo Equipo");
            escudoimg.style.height = "40px";
            escudo.appendChild(escudoimg);
            tr.appendChild(escudo);

        let nombreEquipo = document.createElement("td");
            nombreEquipo.textContent = standings[0].table[i].team.name;
            tr.appendChild(nombreEquipo);

        let posicionEquipo = document.createElement("td");
            posicionEquipo.textContent = standings[0].table[i].position;
            tr.appendChild(posicionEquipo);  

        tabla.appendChild(tr);
    }
}
crearTabla(equipos)