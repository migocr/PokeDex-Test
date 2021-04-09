var inicio=0;
var final = 14;
var defaultTipo;
load(defaultTipo);

function filtro(tipoElegido){
    document.getElementById("cards").innerHTML="";
    var defaultTipo = tipoElegido;
    load(defaultTipo);
}



function load(defaultTipo){
    //console.log(defaultTipo);

    if (defaultTipo === undefined) {
        paginador(1);

    } else {
        enlacesPorTipo(defaultTipo,inicio,final);
    }
    
}




function paginador(y,defaultTipo){
    
    
    if (y===1) {
            document.getElementById("paginas").innerHTML="";
            document.getElementById("cards").innerHTML="";
            var inicio = 0;
            var final=inicio+14;
        }  if (y>=2) {
            document.getElementById("paginas").innerHTML="";
            document.getElementById("cards").innerHTML="";
            var inicio = (y*15)-15;
            var final=inicio+14;
            
        } 
    if (defaultTipo === undefined || defaultTipo === "undefined" ){
        enlaces(inicio,final);}   
    else{enlacesPorTipo(defaultTipo,inicio,final);}
    
    
}


function enlaces(inicio,final){


    var link ="https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1118";
    var ini = inicio;
    var li = final;

    var request = new XMLHttpRequest();
    request.open("GET", link);
    request.onreadystatechange = function() {

        if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            var datos = JSON.parse(request.responseText);           

            for (var i = ini; i <= li; i++) {
               var zelda = datos.results[i].url;

               principal(zelda);
               //console.log(zelda);   
            }

        }

    }

    request.send();

}
function enlacesPorTipo(defaultTipo,inicio,final){
    var ini =inicio;
    var fin = final;
    var tipo = defaultTipo;
    var link ="https://pokeapi.co/api/v2/type/"+tipo;

    var request = new XMLHttpRequest();
    request.open("GET", link);
    request.onreadystatechange = function() {

        if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            var datos = JSON.parse(request.responseText);
            pokemon = datos.pokemon;



            //console.log(pokemon.length);
            
            
            for (var i = ini; i <= fin; i++) {
                    var zelda = (pokemon[i].pokemon.url);
                    principal(zelda);
                    var index = i;
                }
            var conteo = pokemon.length;
            var totalPaginas = Math.ceil( conteo/15) ;
            
            
            imprimirPaginacion(totalPaginas,tipo);            

        }

    }

    request.send();

}

function imprimirPaginacion(totalPaginas,tipo,indice){
    var paginas = document.getElementById("paginas");
    document.getElementById("paginas").innerHTML="";
    var defaultTipo = tipo;
    
    if (defaultTipo==="busqueda") {
        
         console.log(indice);
         for (var numeroPagina = 1; numeroPagina < totalPaginas; numeroPagina++){
                            
                            var paginas = document.getElementById("paginas");    
                    
                           

                            paginas.innerHTML += `
                            
                           <a class="page-link" href="javascript:void(0)" style="display:inline-block;" onclick="buscador(${numeroPagina},'${indice}')" >${numeroPagina}</a>





                                     ` 

            }
    }
    else{
        for (var numeroPagina = 1; numeroPagina < totalPaginas; numeroPagina++){
                            
                            var paginas = document.getElementById("paginas");    
                            var pagina =numeroPagina;
                            paginas.innerHTML += `
                              
                           <a class="page-link" href="javascript:void(0)" style="display:inline-block;" onclick="paginador(${pagina},'${defaultTipo}')" >${pagina}</a>





                                     `                     
            }
    }
    
}


function principal(zelda){
    
    var link =zelda;
    var request = new XMLHttpRequest();
    request.open("GET", link,false);
    request.onreadystatechange = function() {

        if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            var datos = JSON.parse(request.responseText);
            var id = datos.id;
            //var habilidad = datos.abilities[0].ability.name;
            //var habilidadOculta= datos.abilities[1].ability.name
            // HP = datos.stats[0].base_stat;
            // ataque = datos.stats[1].base_stat;
            // defensa = datos.stats[2].base_stat;
            // especial attack = datos.stats[3].base_stat;
            // éspecial defensa = datos.stats[4].base_stat;
            // speed = datos.stats[5].base_stat;
            //console.log(habilidad);
            console.log(datos.stats);
            
            var img = datos.sprites.other.dream_world.front_default;
                    if (img == null) {
                        var imagen = datos.sprites.front_default;
                        //console.log("la imagen es nula");
                    } else { var imagen =img;}



                    if (datos.types.length > 1) {
                        var tipo1 = datos.types[0].type.name;
                        var tipo2 = datos.types[1].type.name;
                        var concaTipos = tipo1 + ", " + tipo2;
                    } else {
                        var concaTipos = datos.types[0].type.name;
                        var tipo1 = datos.types[0].type.name;
                    }

            if (tipo1 === "grass"){ var cardColor = "linear-gradient(to right top, #12360b, #185c0f, #1a8511, #16b00f, #02de08)";}             
                    else if (tipo1 === "fire"){ var cardColor = "linear-gradient(to right top, #d96800, #db5805, #dd470d, #de3016, #de021e)";}               
                    else if (tipo1 === "water"){ var cardColor = "linear-gradient(to right top, #00c1ea, #00a7d6, #008dc0, #0073a9, #045b91)"; } 
                    else if (tipo1 === "bug") {var cardColor="linear-gradient(to right top, #00d928, #4dd81d, #6cd615, #84d410, #98d211)";}
                    else if (tipo1 === "normal") {var cardColor="linear-gradient(to right top, #234a52, #37545b, #4a5e64, #5b686d, #6c7275)"}
                    else if (tipo1 === "flying") {var cardColor=" linear-gradient(to right top, #0090ff, #2ba0f6, #55aeeb, #7cb9df, #a1c3d4)"}
                    else if (tipo1 === "poison") {var cardColor=" linear-gradient(to right top, #6055e9, #553fba, #462b8d, #341864, #21083e)"}
                    else if (tipo1 === "ground") {var cardColor="linear-gradient(to right top, #504d11, #57521b, #5e5725, #655c2e, #6b6137)"}
                    else if (tipo1 === "ghost") {var cardColor="linear-gradient(to right top, #4b6ab3, #4555a0, #403f8c, #3c2978, #381062)"}
                    else if (tipo1 === "steel") {var cardColor="linear-gradient(to right top, #5a8fa3, #4a7f97, #3b708b, #2c607e, #1e5172)"}
                    else if (tipo1 === "electric") {var cardColor="linear-gradient(to right top, #ffff24, #e4e41e, #c9c918, #afaf13, #96960d)"}
                    else if (tipo1 === "ice") {var cardColor="linear-gradient(to right top, #4cd1c0, #2ec9ce, #24c0d9, #3ab6de, #57aade)"}
                    else if (tipo1 === "psychic") {var cardColor="linear-gradient(to right top, #ff6676, #fd628a, #f7629e, #ec65b1, #dd6bc3)"}
                    else if (tipo1 === "dragon") {var cardColor=" linear-gradient(to right top, #1d6dbb, #467eca, #6390da, #7da2e9, #96b5f9)"}
                    else if (tipo1 === "dark") {var cardColor="linear-gradient(to right top, #545163, #413e4c, #2e2b36, #1c1a21, #07030c)"}
                    else if (tipo1 === "fairy") {var cardColor="linear-gradient(to right top, #ff24f0, #fc51f4, #fa6df8, #f784fa, #f598fb)";}
                    else if (tipo1 === "fighting") {var cardColor="linear-gradient(to right top, #e74a50, #e85159, #e85862, #e85e6b, #e76573)";}
                    else if (tipo1==="rock") {var cardColor="linear-gradient(to right top, #84744b, #958459, #a69568, #b7a677, #c9b787)";}
                    else {var cardColor = "card text-white bg-info mb-3";}
            cards.innerHTML += `
                         
                    
                       <figure class="card card--electric">
                          <div class="card__image-container">
                            <img src="${imagen}" alt="Eevee" class="card__image">   
                          </div>
                          
                          <figcaption class="card__caption">
                            <h1 class="card__name">${datos.name}</h1>

                            <h3 class="card__type">
                              ${datos.types[0].type.name}
                            </h3>

                            <table class="card__stats">
                              <tbody><tr>
                                <th>HP</th>
                                <td>${datos.stats[0].base_stat}</td>
                              </tr>
                              <tr>
                                <th>Attack</th>
                                <td>${datos.stats[1].base_stat}</td>
                              </tr>
                              
                              <tr>
                                <th>Defense</th>
                                <td>${datos.stats[2].base_stat}</td>
                              </tr>

                              <tr>
                                <th>Special Attack</th>
                                <td>${datos.stats[3].base_stat}</td>
                              </tr>
                              <tr>
                                <th>Special Defense</th>
                                <td>${datos.stats[4].base_stat}</td>
                              </tr>
                              <tr>
                                <th>Speed</th>  
                                <td>${datos.stats[5].base_stat}</td>
                              </tr>
                            </tbody></table>
                            
                            <div class="card__abilities">
                              <h4 class="card__ability">
                                <span class="card__label">Ability</span>
                                ${datos.abilities[0].ability.name}
                              </h4>
                              <h4 class="card__ability">
                                <span class="card__label">Hidden Ability</span>
                                 ${datos.abilities[1].ability.name}
                              </h4>
                            </div>
                          </figcaption>
                        </figure>
                        




                         `
                    
                    
        }
        imprimirPaginacion(76);
    }
    request.send();

}


function buscador(pagina,indice){
    
    var pokeNames = indice;
    if (pokeNames === undefined) {
        var link ="https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1118";
        var limite = 1118;
        busqueda = document.getElementById("busqueda").value;
        document.getElementById("cards").innerHTML="";
        
        var request = new XMLHttpRequest();
        request.open("GET", link,false);
        request.onreadystatechange = function() {
            if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                var datos = JSON.parse(request.responseText);
                //pendiente contador de elementos para paginacion de buscador
                var counter=0;
                let resultadosBusqueda = [];          
                for (var i = 0; i <= limite; i++) {
                   var names = datos.results[i].name;
                   
                   var final = names.includes(busqueda);
                   
                   if (final == true){
                    var zelda = "https://pokeapi.co/api/v2/pokemon/" + names;
                    counter++;
                    var indice = i;
                    //console.log(indice);
                    resultadosBusqueda.push(names);
                    
                    if (counter <= 15 ) {
                       principal(zelda);
                      
                       
                      
                    } else{
                       
                        
                    }

                    
                    document.getElementById("paginas").innerHTML="";
                    
                   }
                   if (i >= 1117) {
                    
                    // console.log("pause " + indice);
                    var totalPaginas =(Math.ceil(counter/15)+1);
                    //console.log("Resultados "+resultadosBusqueda); 
                    imprimirPaginacion(totalPaginas,"busqueda",resultadosBusqueda);
                   }
                   
                }

                
                        
            }
        }
        request.send();
    } 
    else{
        
        var arrayPokes = pokeNames.split(",");
        console.log(arrayPokes);
        document.getElementById("cards").innerHTML="";
        document.getElementById("paginas").innerHTML="";
        if (pagina <= 1) {
            var ini = 0;
            if (arrayPokes.length>14) {
                var fin = 14;
            }
            if (arrayPokes.length <= 14){
                var fin = arrayPokes.length-1;
            }
        }
        if (pagina >= 2 ) {
            var ini = (pagina*15)-15;
            var fin = (pagina*15)-1;
        }
        for (var i = ini; i <= fin; i++) {
                var zelda = "https://pokeapi.co/api/v2/pokemon/" + arrayPokes[i];
                principal(zelda);
            }
            var totalPaginas = (Math.ceil(arrayPokes.length/15))+1;
            imprimirPaginacion(totalPaginas,"busqueda",arrayPokes);
            
    }
    
    
    
    
}

function imprimirDatos(id,nombre,concaTipos,imagen){
    document.getElementById('id01').style.display='block';
    console.log(imagen);
    informacion.innerHTML += `
                        <p>${nombre}</p>
                        <p>${id}</p>
                        

                         `
}



