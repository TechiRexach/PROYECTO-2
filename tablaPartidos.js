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
            
            let partidos = data.matches;

            llamarEventListener(partidos);
            
            crearTabla(partidos);

            crearDesplegable(partidos);

            crearDesplegableJornadas(partidos);


        }).catch(error =>{
                console.log(error);
                alert("ERROR al cargar datos");
          })
}
hacerFetch()

function llamarEventListener(partidos){

    let searchEquipo = document.getElementById("botonEnviar");
    searchEquipo.addEventListener("click", function(event){
        event.preventDefault();
        filtros(partidos);
        })

    let searchJornada = document.getElementById("botonEnviarJornadas");
    searchJornada.addEventListener("click", function(event){
        event.preventDefault();
        filtroJornadas(partidos);   
        })

    let reset = document.getElementById("botonReset");
    reset.addEventListener("click", function(event){
        event.preventDefault();
        document.getElementById("desplegable").value = 0;
        document.querySelector("input[name=estadoPartido]").value = null;
        crearTabla(partidos);
        })

    let resetJornadas = document.getElementById("botonResetJornadas");
    resetJornadas.addEventListener("click", function(event){
        event.preventDefault();
        document.getElementById("desplegableJornadas").value = 0;
        crearTabla(partidos);
        })
}

function crearTabla(partidos, equipoDesplegable){

    let tabla = document.getElementById("tabla");
    tabla.innerHTML = "";

    for (let i = 0; i < partidos.length; i++){

        const tr = document.createElement("tr");
        tr.style.backgroundColor = "#a3b18a";

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

        let equipoLocal = document.createElement("p");
            equipoLocal.innerHTML = partidos[i].homeTeam.name;
            if (partidos[i].homeTeam.name == equipoDesplegable){
                equipoLocal.classList.add("negrita")
            }

        let equipoVisitante = document.createElement("p");
            equipoVisitante.innerHTML = partidos[i].awayTeam.name;
            if (partidos[i].awayTeam.name == equipoDesplegable){
                equipoVisitante.classList.add("negrita")
            }

        let jornadas = partidos[i].matchday;

        let datosPartidos = [
            escudoimg,
            equipoLocal, 
            resultados,
            equipoVisitante, 
            escudoimg2,
            fecha.toLocaleString(),
            jornadas
        ]

        for (let j = 0; j < datosPartidos.length; j++){
            const td = document.createElement("td");
            td.append(datosPartidos[j]);
            tr.appendChild(td);
            tabla.appendChild(tr);  
        }
    }
}

function filtros(partidos){

    let equipoDesplegable = document.getElementById("desplegable");

    let equipoSeleccionado = equipoDesplegable.options[equipoDesplegable.selectedIndex].text;

    let botonSeleccion = document.querySelector("input[name=estadoPartido]:checked");

    let avisoTexto = document.getElementById("alertaTexto");

    let avisoEstado = document.getElementById("alertaEstado");

    if(equipoSeleccionado == "EQUIPOS"){
        avisoTexto.style.display = "block";
        crearTabla(partidos);
        return;
    }

    let nuevaArrayConDatosFiltrados = partidos.filter(element =>{
        avisoTexto.style.display = "none";
        return  equipoSeleccionado == element.homeTeam.name || equipoSeleccionado == element.awayTeam.name;
    })
console.log(nuevaArrayConDatosFiltrados)

    if(botonSeleccion == null){
        // avisoEstado.style.display = "block";
        crearTabla(nuevaArrayConDatosFiltrados, equipoSeleccionado);
        return nuevaArrayConDatosFiltrados;
    }

    let filtradoTotal = nuevaArrayConDatosFiltrados.filter(partidoFiltrado =>{

        avisoEstado.style.display = "none";

        // if (botonSeleccion.value == null){

        //     if (equipoSeleccionado == partidoFiltrado.homeTeam.name){
        //     return true;
        // }
        //     if (equipoSeleccionado == partidoFiltrado.awayTeam.name){
        //         return true;
        //     }
        // }

        if (partidoFiltrado.score.winner == "DRAW" && botonSeleccion.value == "Empatado"){
            return  true;
        }

        if (partidoFiltrado.score.winner == null && botonSeleccion.value == "Pendiente"){
            return  true;
        }

        if (botonSeleccion.value == "Ganado"){
            if (equipoSeleccionado == partidoFiltrado.homeTeam.name && partidoFiltrado.score.winner == "HOME_TEAM"){
            return true;
        }
            if (equipoSeleccionado == partidoFiltrado.awayTeam.name && partidoFiltrado.score.winner == "AWAY_TEAM"){
                return true;
            }
        }

        if (botonSeleccion.value == "Perdido"){
            if (equipoSeleccionado == partidoFiltrado.homeTeam.name && partidoFiltrado.score.winner == "AWAY_TEAM"){
                return true;
            }
            if (equipoSeleccionado == partidoFiltrado.awayTeam.name && partidoFiltrado.score.winner == "HOME_TEAM"){
                return true;
            }
        } 
    })

    //cambiar de sitio//

    crearTabla(filtradoTotal, equipoSeleccionado)

}

function crearDesplegable(data){

    let partidos = data;

    let listaEquipos = [];
    
    for (let i = 0; i < partidos.length; i++){
            
        let nombreEquipo = partidos[i].awayTeam.name;

        let equiposEncontrados;

        for (let k = 0; k < listaEquipos.length; k++){
            if (nombreEquipo== listaEquipos[k].name){
                equiposEncontrados = listaEquipos[k];
            }
        }
        
        if (equiposEncontrados == undefined){
            listaEquipos.push({
                name: nombreEquipo,
            })
        }
    }

    console.log(listaEquipos)



    let objetoDesplegable = document.getElementById("desplegable");

    for(let x = 0; x < listaEquipos.length; x++){
        let opcionesDesplegable = document.createElement("option");
        let textoDesplegable = listaEquipos[x].name;
        opcionesDesplegable.innerText = textoDesplegable;
        objetoDesplegable.appendChild(opcionesDesplegable)
    }
}

function crearDesplegableJornadas(data){

    let partidos = data;

    let listaJornadas = [];
    console.log(listaJornadas)


    for (let i = 0; i < partidos.length; i++){

        let diaJornada = partidos[i].matchday;
        
        let jornadasEncontradas;

        for (let k = 0; k < listaJornadas.length; k++){
            if (diaJornada == listaJornadas[k].matchday){
                jornadasEncontradas = listaJornadas[k];
            }
        }
        
        if (jornadasEncontradas == undefined){
            listaJornadas.push({
                matchday: diaJornada,
            })
        }
    }

    let objetoDesplegableJornadas = document.getElementById("desplegableJornadas");

    for(let x = 0; x < listaJornadas.length; x++){
        let opcionesDesplegableJornada = document.createElement("option");
        let textoDesplegable = listaJornadas[x].matchday;
        opcionesDesplegableJornada.innerText = textoDesplegable;
        objetoDesplegableJornadas.appendChild(opcionesDesplegableJornada)
    }
}

function filtroJornadas(partidos){

    let avisoTexto = document.getElementById("alertaTexto");
    avisoTexto.style.display ="none";

    let avisoEstado = document.getElementById("alertaEstado");
    avisoEstado.style.display ="none";

    let jornadaDesplegable = document.getElementById("desplegableJornadas");

    let jornadaSeleccionada = jornadaDesplegable.options[jornadaDesplegable.selectedIndex].text;
    console.log(jornadaSeleccionada)

    let arrayJornadasFiltradas = partidos.filter(jornada =>{
        if(jornadaSeleccionada == jornada.matchday){
            return true
        }
    })
    console.log(arrayJornadasFiltradas)

    crearTabla(arrayJornadasFiltradas)
}

