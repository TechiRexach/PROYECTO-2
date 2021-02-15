var local = dataPartidos.matches;

// function equiposYResultados(partidos){
    


//     for (let i = 0; i < partidos.length; i++){
//         console.log(partidos[i].homeTeam.name);
//         console.log(partidos[i].awayTeam.name);
//         console.log(partidos[i].score.fullTime.homeTeam, " - ", partidos[i].score.fullTime.awayTeam);
//         console.log(partidos[i].utcDate);

//     }
// }
// equiposYResultados(local);

function crearTabla(partidos){

    let tabla = document.getElementById("tabla");

    for (let i = 0; i < partidos.length; i++){
        const tr = document.createElement("tr");
        tr.style.backgroundColor = "lightgrey";

        let escudoimg = document.createElement("img");
            escudoimg.classList.add("imgteam1partidos");
            escudoimg.setAttribute("src", "https://crests.football-data.org/" + partidos[i].homeTeam.id + ".svg");
            escudoimg.setAttribute("alt", "Escudo Equipo");   

        let escudoimg2 = document.createElement("img");
            escudoimg2.classList.add("imgteam2partidos");
            escudoimg2.setAttribute("src", "https://crests.football-data.org/" + partidos[i].awayTeam.id + ".svg");
            escudoimg2.setAttribute("alt", "Escudo Equipo");  

        let fecha = new Date (partidos[i].utcDate);

        let resultados = partidos[i].score.fullTime.homeTeam + " - " + partidos[i].score.fullTime.awayTeam;
            if (resultados === "null - null"){
                resultados = "Pendiente";
            }
            else{
                resultados.textContent = partidos[i].score.fullTime.homeTeam + " - " + partidos[i].score.fullTime.awayTeam;
            }
            
        let datosPartidos = [escudoimg,
            partidos[i].homeTeam.name, 
            resultados,
            partidos[i].awayTeam.name, 
            escudoimg2,
            fecha.toLocaleString(),
            ]

            for (let j = 0; j < datosPartidos.length; j++){
                const td = document.createElement("td");
                td.append(datosPartidos[j]);
                tr.appendChild(td);
                tabla.appendChild(tr);   
        }
    }
}
crearTabla(local);
