
//   var equipos = dataClasificacion.standings;

function hacerFetch(){
    fetch("https://api.football-data.org/v2/competitions/2014/standings", {
        method: "GET",
        headers: {
            "X-Auth-Token": "fc034140b74241a9aeebc6de63d5af32"
        }
        })
            .then(response => {
                console.log(response)
                if(response.ok){
                return response.json();
                }
            }).then(data => {
                // let prueba = data.standings[0].table
                // console.log(prueba)
                crearTabla(data);
        
            })
        
    
        // function cargaDatosApiClasificacion(clasificacion){
        //     console.log(clasificacion)
        // }
    
    }
    hacerFetch()
        
    
    
    function crearTabla(data){
        
        let arrayTable = data.standings[0].table;
        console.log(arrayTable)
    
        let tabla = document.getElementById("tabla");
    
        for (let i = 0; i < arrayTable.length; i++){
            const tr = document.createElement("tr");
            tr.style.backgroundColor = "lightgrey";
    
            let escudoimg = document.createElement("img");
                escudoimg.classList.add("imgteam1clasificacion");
                escudoimg.setAttribute("src", "https://crests.football-data.org/" + arrayTable[i].team.id + ".svg");
                escudoimg.setAttribute("alt", "Escudo Equipo");
    
            let infoTabla = arrayTable[i];
    
            let partido1 = arrayTable[i].form;
                partido1=partido1.replace(/D/g," 🟡 ");
                partido1=partido1.replace(/W/g," 🟢 ");
                partido1=partido1.replace(/L/g," 🔴 ");
                partido1=partido1.replace(/,/g,"");
    
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
    
    
    