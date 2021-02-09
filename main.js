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
        let tdteam1 = document.createElement("td");
            tdteam1.textContent = partidos[i].homeTeam.name;
            tr.appendChild(tdteam1);
        let tdResult = document.createElement("td");
            tdResult.textContent = partidos[i].score.fullTime.homeTeam + " - " + partidos[i].score.fullTime.awayTeam;
            tr.appendChild(tdResult);
        let tdteam2 = document.createElement("td");
            tdteam2.textContent = partidos[i].awayTeam.name;
            tr.appendChild(tdteam2);    
        tabla.appendChild(tr);
    }
}
crearTabla(local)
