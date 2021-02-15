
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

        let partido1 = standings[0].table[i].form;
            partido1=partido1.replace(/D/g," 🟡 ");
            partido1=partido1.replace(/W/g," 🟢 ");
            partido1=partido1.replace(/L/g," 🔴 ");
            partido1=partido1.replace(/,/g,"");
            console.log(partido1)

        let datosTabla = [
            infoTabla.position,
            escudoimg, 
            infoTabla.team.name, 
            infoTabla.points,
            infoTabla.won,
            infoTabla.draw,
            infoTabla.lost,
            partido1];

        for (let j = 0; j < datosTabla.length; j++){
            const td = document.createElement("td");
            td.append(datosTabla[j]);
            tr.appendChild(td);
            tabla.appendChild(tr);
        }  
    }
}

crearTabla(equipos)


        // for (let k = 0; k < partido1.length; k++){
        //     if(partido1 === "D"){
        //         partido1 = "Empate"
        //     }
        //     else if (partido1 === "W"){
        //         partido1 = "Ganado"
        //     }
        //     else{
        //         partido1 = "Perdido"
        //     }
        //     console.log(partido1)
        // }