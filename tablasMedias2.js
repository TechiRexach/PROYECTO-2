
var arrayPartidos = dataPartidos.matches;


calcularEstadisticas2(arrayPartidos)

function calcularEstadisticas2(partidos){
    
    let estadisticas2 = [];
    
    for (let i = 0; i < partidos.length; i++){

        let partidoStatus = partidos[i].status;
        if (partidoStatus !== "FINISHED"){
    
        }
        else {
            
            let idEquipoAway = partidos[i].awayTeam.id;
            

            let golesMarcadosPorEquipoHome = partidos[i].score.fullTime.homeTeam;
            
           
            let nombreEquipoAway = partidos[i].awayTeam.name;

            
            let equipoEncontradoAway;

            for (let k = 0; k < estadisticas2.length; k++){
                if (idEquipoAway == estadisticas2[k].id){
                    equipoEncontradoAway = estadisticas2[k];
                }
            }
        
            if (equipoEncontradoAway == undefined){
                estadisticas2.push({
                    id: idEquipoAway,
                    name: nombreEquipoAway,
                    goals: golesMarcadosPorEquipoHome,
                    matches: 1,
                })
            }
            
            else {
                equipoEncontradoAway.goals = equipoEncontradoAway.goals + golesMarcadosPorEquipoHome;
                equipoEncontradoAway.matches = equipoEncontradoAway.matches + 1;
            }
       
        }
        estadisticas2.sort((a, b) => a.goals - b.goals)

        
    }
        let top5_2 = estadisticas2.slice(0, 5)
        console.log(top5_2)
        console.log(estadisticas2)

        crearTabla2(top5_2)
}


function crearTabla2(top5_2){

    let crearTabla2 = document.getElementById("tabla2");

    for (let i = 0; i < top5_2.length; i++){
        const tr = document.createElement("tr");

        let equipos = top5_2[i].id;
        console.log(equipos)  

        let escudoimg2 = document.createElement("img");
            escudoimg2.classList.add("imgteam1clasificacion");
            escudoimg2.setAttribute("src", "https://crests.football-data.org/" + equipos + ".svg");
            escudoimg2.setAttribute("alt", "Escudo Equipo");

        let datosTabla2 = [
            escudoimg2,
            top5_2[i].name,
            top5_2[i].goals,
            top5_2[i].matches,
        ]
console.log(datosTabla2)
       
            for (let j = 0; j < datosTabla2.length; j++){
                const td = document.createElement("td");
                td.append(datosTabla2[j]);
                tr.appendChild(td);
                crearTabla2.appendChild(tr);   
        }
    }

}
