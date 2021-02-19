var local = dataPartidos.matches;

function crearTabla(partidos){

    let tabla = document.getElementById("tabla");

    for (let i = 0; i < partidos.length; i++){
        const tr = document.createElement("tr");
        tr.classList.add("rows")
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
crearTabla(local);


let search = document.getElementById("botonEnviar");
search.addEventListener("click", function(event){
    event.preventDefault();
    filtros(local);
})


function filtros(partidos){

let textoEscrito = document.getElementById("textoBuscador").value;
console.log(textoEscrito);

let botonSeleccion = document.querySelector("input[name=estadoPartido]:checked");
console.log(botonSeleccion)


if(textoEscrito == ""){
    alert("Por favor, ingresa el nombre de un equipo")
    console.log(partidos);
return partidos;
}

let nuevaArrayConDatosFiltrados = partidos.filter(element =>{
    return  textoEscrito == element.homeTeam.name || textoEscrito == element.awayTeam.name;
})

// let prueba = [nuevaArrayConDatosFiltrados].includes(textoEscrito);
// console.log(prueba)
// textoEscrito.includes(nuevaArrayConDatosFiltrados);


if(botonSeleccion == null){
    alert("Por favor, selecciona una opción")
    console.log(nuevaArrayConDatosFiltrados)
    return nuevaArrayConDatosFiltrados;
    }

let filtradoTotal = nuevaArrayConDatosFiltrados.filter(partidoFiltrado =>{
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


function esconderTabla(table) {
    var input, filter, table, tr, td, i, textoEscrito;

    input = document.getElementById("textoBuscador");

    filter = input.value.toUpperCase();

    table = document.getElementById("tabla");

    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
          textoEscrito = td.textContent || td.innerText;
            if (textoEscrito.indexOf(filter) > -1) {
            tr[i].style.display = "";
            } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
esconderTabla(local)



//(para que lo mande a algun lado)
console.log(filtradoTotal)
crearTabla(filtradoTotal);

}

