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
            crearTabla(data);

            let search = document.getElementById("botonEnviar");
            search.addEventListener("click", function(event){
                event.preventDefault();
                filtros(data);
                })
        }).catch(error =>{
                console.log(error);
                alert("ERROR al cargar datos");
          })
}
hacerFetch()

function crearTabla(data){

    let partidos = data;


    let tabla = document.getElementById("tabla");
    tabla.innerHTML = "";

    for (let i = 0; i < partidos.length; i++){

        const tr = document.createElement("tr");
        tr.style.backgroundColor = "#c9b0a1";

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

        let datosPartidos = [
            escudoimg,
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


function filtros(partidos){

let desplegable = document.getElementById("select");

let indiceSelecionado = desplegable.selectedIndex; //posicion en el desplegable, empieza en 0

let opcionSeleccionada = desplegable.options[indiceSelecionado]; //id de equipo

let equipoSelecionado = opcionSeleccionada.text; //texto coincide, preguntar por como se hace con ID

let textoEscrito = equipoSelecionado;

let botonSeleccion = document.querySelector("input[name=estadoPartido]:checked");

let avisoTexto = document.getElementById("alertaTexto");

let avisoEstado = document.getElementById("alertaEstado");

if(textoEscrito == "EQUIPOS"){
    avisoTexto.style.display = "block";
    crearTabla(partidos);
    return;
}

let nuevaArrayConDatosFiltrados = partidos.filter(element =>{
    avisoTexto.style.display = "none";
    return  textoEscrito == element.homeTeam.name || textoEscrito == element.awayTeam.name;
})

if(botonSeleccion == null){

    avisoEstado.style.display = "block";

    crearTabla(nuevaArrayConDatosFiltrados);

    return nuevaArrayConDatosFiltrados;
}

let filtradoTotal = nuevaArrayConDatosFiltrados.filter(partidoFiltrado =>{

    avisoEstado.style.display = "none";

    if (partidoFiltrado.score.winner == "DRAW" && botonSeleccion.value == "Empatado"){
        return  true;
    }

    if (partidoFiltrado.score.winner == null && botonSeleccion.value == "Pendiente"){
        return  true;
    }

    if (botonSeleccion.value == "Ganado"){
       if (textoEscrito == partidoFiltrado.homeTeam.name && partidoFiltrado.score.winner == "HOME_TEAM"){
           return true;
       }
        if (textoEscrito == partidoFiltrado.awayTeam.name && partidoFiltrado.score.winner == "AWAY_TEAM"){
            return true;
        }
    }

    if (botonSeleccion.value == "Perdido"){
        if (textoEscrito == partidoFiltrado.homeTeam.name && partidoFiltrado.score.winner == "AWAY_TEAM"){
            return true;
        }
         if (textoEscrito == partidoFiltrado.awayTeam.name && partidoFiltrado.score.winner == "HOME_TEAM"){
             return true;
         }
    }

})

//(para que lo mande a algun lado)

crearTabla(filtradoTotal);

}

