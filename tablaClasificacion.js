function hacerFetch(){
    fetch("https://api.football-data.org/v2/competitions/2014/standings", {
        method: "GET",
        headers: {
            "X-Auth-Token": "fc034140b74241a9aeebc6de63d5af32"
            }
        }).then(response => {
            console.log(response)
            if(response.ok){
            return response.json();
            }
        }).then(data => {
            document.getElementById("loading").style.display = "none";
            crearTabla(data);
        }).catch(error => {
            console.log(error);
            alert("ERROR al cargar datos");
        })
}
hacerFetch()
        
function crearTabla(data){
        
    let arrayTable = data.standings[0].table;
        console.log(arrayTable)
    
    let tabla = document.getElementById("tabla");
    
    for (let i = 0; i < arrayTable.length; i++){
        
        const tr = document.createElement("tr");
        tr.style.backgroundColor = "#c9b0a1";
    
        let escudoimg = document.createElement("img");
            escudoimg.classList.add("imgteam1clasificacion");
            escudoimg.setAttribute("src", "https://crests.football-data.org/" + arrayTable[i].team.id + ".svg");
            escudoimg.setAttribute("alt", "Escudo Equipo");
    
        let infoTabla = arrayTable[i];
    
        let ultimosPartidos = arrayTable[i].form;
            ultimosPartidos=ultimosPartidos.replace(/d/gi," 🟡 ");
            ultimosPartidos=ultimosPartidos.replace(/W/g," 🟢 ");
            ultimosPartidos=ultimosPartidos.replace(/L/g," 🔴 ");
            ultimosPartidos=ultimosPartidos.replace(/,/g,"");
    
        let datosTabla = [
            infoTabla.position,
            escudoimg, 
            infoTabla.team.name, 
            infoTabla.points,
            infoTabla.won,
            infoTabla.draw,
            infoTabla.lost,
            infoTabla.goalsFor,
            infoTabla.goalsAgainst,
            infoTabla.goalDifference,
            ultimosPartidos];
    
        for (let j = 0; j < datosTabla.length; j++){
            const td = document.createElement("td");
            td.append(datosTabla[j]);
            tr.appendChild(td);
            tabla.appendChild(tr);
        }  
    }
}
    
    
    