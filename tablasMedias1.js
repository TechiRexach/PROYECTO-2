
// var arrayPartidos = dataPartidos.matches;

function hacerFetch(){
    fetch("https://api.football-data.org/v2/competitions/2014/matches", {
        method: "GET",
        headers: {
            "X-Auth-Token": "fc034140b74241a9aeebc6de63d5af32"
        }
        })
        .then(response => {
            if(response.ok){
            return response.json();
            }
        }).then(data => {

            document.getElementById("loading").style.display = "none";
            data = data.matches;
            calcularEstadisticas1(data)
            }).catch(error =>{
            console.log(error);
            alert("ERROR al cargar datos");
      })
}
hacerFetch()

// 0. Crear función que va calcular las estadísticas, recibiendo como param el array de partidos


function calcularEstadisticas1(data){

    let partidos = data;
    // 1. Crear array vacía (será array de objetos)
    let estadisticas = [];
    

    // 2. Iterar por todos los partidos.
    // 3. Condición: si el partido no está acabado, no seguir y mirar siguiente partido
    
    for (let i = 0; i < partidos.length; i++){

        let partidoStatus = partidos[i].status;
        if (partidoStatus !== "FINISHED"){
    
        }
        else {

            let idEquipoHome = partidos[i].homeTeam.id;
            let idEquipoAway = partidos[i].awayTeam.id;
            

            let golesMarcadosHome = partidos[i].score.fullTime.homeTeam;
            let golesMarcadosAway = partidos[i].score.fullTime.awayTeam;
           

            let nombreEquipoHome = partidos[i].homeTeam.name;
            let nombreEquipoAway = partidos[i].awayTeam.name;

        // 4. Buscar en la array estadisticas el objeto con el mismo id que el homeTeam del partido
            let equipoEncontradoHome;

            for (let k = 0; k < estadisticas.length; k++){
                if (idEquipoHome == estadisticas[k].id){
                    equipoEncontradoHome = estadisticas[k];
                }
            }
            // console.log("existe? ", equipoEncontradoHome)

            // 5. Si el objeto buscado no existe, crearlo con estos keys: id, name, goals, matches.
            // Rellenar cada key con el valor correspondiente
            if (equipoEncontradoHome == undefined){
                estadisticas.push({
                    id: idEquipoHome,
                    name: nombreEquipoHome,
                    goals: golesMarcadosHome,
                    matches: 1,
                })
            }
             // 6. Si existe, actualizar los goles y los partidos
            else {
                equipoEncontradoHome.goals = equipoEncontradoHome.goals + golesMarcadosHome; //equipoEncontradoHome.goals += equipoEncontradoHome.goals;
                equipoEncontradoHome.matches = equipoEncontradoHome.matches + 1; //equipoEncontradoHome.matches += 1; // equipoEncontradoHome.matches++(solo si quieres sumar 1)
            }



            // 7. Hacer exactamente lo mismo a partir del punto 4, pero con awayTeam

            // 4. Buscar en la array estadisticas el objeto con el mismo id que el homeTeam del partido
            let equipoEncontradoAway;

            for (let k = 0; k < estadisticas.length; k++){
                if (idEquipoAway == estadisticas[k].id){
                    equipoEncontradoAway = estadisticas[k];
                }
            }
            // console.log("existe? ", equipoEncontradoAway)

            // 5. Si el objeto buscado no existe, crearlo con estos keys: id, name, goals, matches.
            // Rellenar cada key con el valor correspondiente
            if (equipoEncontradoAway == undefined){
                estadisticas.push({
                    id: idEquipoAway,
                    name: nombreEquipoAway,
                    goals: golesMarcadosAway,
                    matches: 1,
                })
            }
             // 6. Si existe, actualizar los goles y los partidos
            else {
                equipoEncontradoAway.goals = equipoEncontradoAway.goals + golesMarcadosAway;
                equipoEncontradoAway.matches = equipoEncontradoAway.matches + 1;
            }

        }

    }
   

    // 8. Una vez fuera del loop de partidos, iterar por el array estadisticas


    for (let k = 0; k < estadisticas.length; k++){
      
        let calculoMedia =  estadisticas[k].goals / estadisticas[k].matches;

         // 9. Añadir la key avg a cada objeto, con el valor goals/matches

        let objetoMedia = {
            avg: calculoMedia.toFixed(2)
        }

        Object.assign(estadisticas[k], objetoMedia);
        // console.log(mediaGoles)

        estadisticas.sort((a, b) => b.avg - a.avg)
    }

    // 10. Hacer console.log() para ver que todo está correcto.
    
        
        console.log(estadisticas)

        crearTabla1(estadisticas);
}

function crearTabla1(estadisticas){
    
    let estadisticasTop5 = estadisticas.slice(0, 5)
    console.log(estadisticasTop5)

    let crearTabla1 = document.getElementById("tabla1");

    for (let i = 0; i < estadisticasTop5.length; i++){
        const tr = document.createElement("tr");

        let equipos = estadisticasTop5[i].id;
        console.log(equipos)  

        let escudoimg2 = document.createElement("img");
            escudoimg2.classList.add("imgteam1clasificacion");
            escudoimg2.setAttribute("src", "https://crests.football-data.org/" + equipos + ".svg");
            escudoimg2.setAttribute("alt", "Escudo Equipo");

        let datosTabla1 = [
            escudoimg2,
            estadisticasTop5[i].name,
            estadisticasTop5[i].goals,
            estadisticasTop5[i].matches,
            estadisticasTop5[i].avg,
        ]
console.log(datosTabla1)
       
            for (let j = 0; j < datosTabla1.length; j++){
                const td = document.createElement("td");
                td.append(datosTabla1[j]);
                tr.appendChild(td);
                crearTabla1.appendChild(tr);   
        }
    }

}

