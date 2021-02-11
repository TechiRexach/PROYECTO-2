
var equipos = dataClasificacion.standings;


// function clasificacionTemporada (standings){
 
//     let arrayTable = standings[0].table;

// for ( let i = 0; i < arrayTable.length; i++){
//     console.log(standings[0].table[i].position);
//     console.log(standings[0].table[i].team.name);
//     console.log(standings[0].table[i].team.crestUrl);
//     console.log(standings[0].table[1].playedGames);
// }
// }
// clasificacionTemporada(equipos)


function crearTabla(standings){
    
    let arrayTable = standings[0].table;

    let tabla = document.getElementById("tabla");

    for (let i = 0; i < arrayTable.length; i++){
        const tr = document.createElement("tr");
        tr.style.backgroundColor = "lightgrey";

        let escudoimg = document.createElement("img");
            escudoimg.classList.add("imgteam1clasificacion");
            escudoimg.setAttribute("src", "https://crests.football-data.org/" + standings[0].table[i].team.id + ".svg");
            escudoimg.setAttribute("alt", "Escudo Equipo");

        let infoTabla = standings[0].table[i];

        let datosTabla = [escudoimg, 
            infoTabla.team.name, 
            infoTabla.position,
            infoTabla.playedGames,
            infoTabla.won,
            infoTabla.lost,
            infoTabla.draw,
            infoTabla.form];

        for (let j = 0; j < datosTabla.length; j++){
            const td = document.createElement("td");
            td.append(datosTabla[j]);
            tr.appendChild(td);
            tabla.appendChild(tr);
        }  
    }
}

crearTabla(equipos)