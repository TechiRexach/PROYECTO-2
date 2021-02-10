var local = dataPartidos.matches;

function equiposYResultados(partidos){
    


    for (let i = 0; i < partidos.length; i++){
        console.log(partidos[i].homeTeam.name);
        console.log(partidos[i].awayTeam.name);
        console.log(partidos[i].score.fullTime.homeTeam, " - ", partidos[i].score.fullTime.awayTeam);
        console.log(partidos[i].utcDate);

    }
}
equiposYResultados(local);

function crearTabla(partidos){

    let tabla = document.getElementById("tabla");

    

    for (let i = 0; i < partidos.length; i++){
        const tr = document.createElement("tr");
        tr.style.backgroundColor = "lightgrey";

        let tdteam1 = document.createElement("td");
            tdteam1.classList.add("estiloteam");
            tdteam1.textContent = partidos[i].homeTeam.name;
            let escudoimg = document.createElement("img");
                escudoimg.classList.add("imgteam1");
                escudoimg.setAttribute("src", "https://crests.football-data.org/" + partidos[i].homeTeam.id + ".svg");
                escudoimg.setAttribute("alt", "Escudo Equipo");       
            tdteam1.appendChild(escudoimg);
            tr.appendChild(tdteam1);

        let tdResult = document.createElement("td");
            tdResult.textContent = partidos[i].score.fullTime.homeTeam + " - " + partidos[i].score.fullTime.awayTeam;
            tdResult.style.textAlign = "center";
            tr.appendChild(tdResult);
            

        let tdteam2 = document.createElement("td");
            tdteam2.classList.add("estiloteam");
            tdteam2.textContent = partidos[i].awayTeam.name;
            let escudoimg2 = document.createElement("img");
                escudoimg2.classList.add("imgteam2");
                escudoimg2.setAttribute("src", "https://crests.football-data.org/" + partidos[i].awayTeam.id + ".svg");
                escudoimg2.setAttribute("alt", "Escudo Equipo");     
            tdteam2.appendChild(escudoimg2);
            tr.appendChild(tdteam2);  

        let fecha = new Date (partidos[i].utcDate);

        let tdfecha = document.createElement("td");
            tdfecha.textContent = fecha.toLocaleString();
            tdfecha.style.textAlign = "center";
            tr.appendChild(tdfecha);  

        tabla.appendChild(tr);
    }
}
crearTabla(local)

