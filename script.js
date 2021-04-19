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
        subtitulo.innerHTML +=`<p id="pSub" >Home</p> `
        var totalPaginas = 75;
        var pagina = 1;
        document.getElementById("divPaginaActual").innerHTML="";
        divTotalPaginas.innerHTML += `<p>Paginas: ${totalPaginas}</p>`;
        divPaginaActual.innerHTML += `<p id="paginaActual">${pagina}/${totalPaginas}</p>`;
        imprimirBotones(totalPaginas);

    } else {
        enlacesPorTipo(defaultTipo,inicio,final);
    }
    
}




function paginador(y,defaultTipo){
    
    document.getElementById("divPaginaActual").innerHTML="";
    //divTotalPaginas.innerHTML += `<p>Paginas: ${totalPaginas}</p>`;
    divPaginaActual.innerHTML += `<p id="paginaActual">${y}/75</p>`;
    if (y===1) {
            document.getElementById("paginas").innerHTML="";
            document.getElementById("cards").innerHTML="";
            var inicio = 0;
            var final=inicio+14;
            
        }  
    if (y>=2) {
            document.getElementById("paginas").innerHTML="";
            document.getElementById("cards").innerHTML="";
            var inicio = (y*15)-15;
            var final=inicio+14;
            
            
        } 
    if (defaultTipo === undefined || defaultTipo === "undefined" ){
        enlaces(inicio,final);
        imprimirBotones(75)
    }

    else{
        enlacesPorTipo(defaultTipo,inicio,final,y);
        
    }
    
    
    
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
function enlacesPorTipo(defaultTipo,inicio,final,y){
    document.getElementById("divPaginaActual").innerHTML="";
    document.getElementById("divTotalPaginas").innerHTML="";
    document.getElementById("subtitulo").innerHTML="";
    var paginaActual = y;
    if (paginaActual === undefined) {
                var paginaActual= 1;
            }
    console.log(paginaActual);
    var ini =inicio;
    var fin = final;
    var tipo = defaultTipo;
    var link ="https://pokeapi.co/api/v2/type/"+tipo;

    subtitulo.innerHTML +=`<p id="pSub" >Tipo: ${tipo}</p> `

    
    

    var request = new XMLHttpRequest();
    request.open("GET", link);
    request.onreadystatechange = function() {

        if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            var datos = JSON.parse(request.responseText);
            pokemon = datos.pokemon;


            var conteo = pokemon.length;
            var totalPaginas = Math.ceil( conteo/15);
            

            divPaginaActual.innerHTML += `<p id="paginaActual">${paginaActual}/${totalPaginas}</p>`;

            

           
           
            
            
            for (var i = ini; i <= fin; i++) {
                    var zelda = (pokemon[i].pokemon.url);
                    principal(zelda);
                     //en caso de estar en la ultima pagina
                     if (paginaActual === totalPaginas) {
                        //obtenemos la posicion del ultimo dato del array
                        var final =(fin - (15-(conteo%15)));
                        //paramos la ejecucion al llegar al ultimo dato
                        if (i===final) {
                            break;
                        }

                    } 
                }
            

            
           
            
            
            imprimirPaginacion(totalPaginas,tipo);
            
            divTotalPaginas.innerHTML += `<p>Paginas: ${totalPaginas}</p>`;
            imprimirBotones(totalPaginas);          
            
            


        }

    }

    request.send();

}

function imprimirBotones(totalPaginas){

    var pA = document.getElementById("paginaActual");
    var pAout = pA.outerHTML;
    var paginaActual = pAout.slice(21, -6);
    newPaginaActual = paginaActual.replace('/', ''); 
    paginaActual = newPaginaActual;
    console.log("pagina actual " + newPaginaActual);
    //console.log(totalPaginas);

    if (paginaActual == totalPaginas) {
        document.getElementById("botonR").innerHTML="";
    } else {
        document.getElementById("botonR").innerHTML="";
        botonR.innerHTML += `<button onclick="recorrerPagina('right')" href="#">&raquo;</button>`
    }
    if (paginaActual == 1) {
        document.getElementById("botonL").innerHTML="";
    } else{
        document.getElementById("botonL").innerHTML="";
        botonL.innerHTML += `<button onclick="recorrerPagina('left')"  href="#">&raquo;</button>`
    }
    

    
    
    
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
                            
                           <a class="pagination-item" href="javascript:void(0)" style="display:inline-block;" onclick="buscador(${numeroPagina},'${indice}')" >${numeroPagina}</a>





                                     ` 

            }
    }
    else{
        for (var numeroPagina = 0; numeroPagina < totalPaginas; numeroPagina++){
                            
                               
                            var pagina =numeroPagina+1;
                            paginas.innerHTML += `
                              
                           <a class="page-link" href="javascript:void(0)" style="display:inline-block;" onclick="paginador(${pagina},'${defaultTipo}')" >${pagina}</a>





                                     `                     
            }
    }
    
}

function recorrerPagina(side){
    //obtenemos el subtitulo para verificar si es una busqueda, filtro o no
    var p = document.getElementById("pSub");
    //obtenemos el dato de la pagina actual, lo pasamos, lo pasamos a una variable y lo cortamos para quedarnos con el numero
    var pA = document.getElementById("paginaActual");
    var pAout = pA.outerHTML;
    var paginaActual = pAout.slice(21, -6);
    var subtitulo = p.outerHTML;
    newPaginaActual = paginaActual.replace('/', ''); 
    var paginaActual = newPaginaActual;
    console.log("pagina actual "+newPaginaActual);
    //falta imprimir paginacion en filtro de tipos
   
    if(p.outerHTML === '<p id="pSub">Busqueda:</p>'){

        if (side==="right") {
             
             var pagina = (+paginaActual + 1);
             //console.log(pagina);
             buscador(pagina,undefined,"right");
        }
        else if (side==="left") {
             var pagina = (+paginaActual - 1);
             //console.log(pagina);
             buscador(pagina,undefined,"left");
        }
        
    }
    else if (subtitulo.includes('<p id="pSub">Tipo:')) {
        var defaultTipo = subtitulo.slice(19, -4);
        console.log("es por tipo");
        if (side==="right") {
             
             var pagina = (+paginaActual + 1);

        }
        else if (side==="left") {
             var pagina = (+paginaActual - 1);
        }
        console.log(defaultTipo);
        paginador(pagina,defaultTipo);
    }
    else{
        if (side==="right") {
             
             var pagina = (+paginaActual + 1);

        }
        else if (side==="left") {
             var pagina = (+paginaActual - 1);
        }
        paginador(pagina);
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
            //console.log(datos.stats);
            
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
                         
                    
                        <div class="pokemon" style="background:${cardColor};">
                            <div class="img-container">
                            <img src="${imagen}" alt="${datos.name}">
                            </div>
                            <div class="info">
                                <span class="number">${datos.id}</span>
                                <h3 class="name">${datos.name}</h3>
                                <small class="type">Type: <span>${datos.types[0].type.name}</span></small>
                            </div>
                        </div>
                        
                         `
                    
                    
        }
        imprimirPaginacion(75);
        
    }
    request.send();

}


function buscador(pagina,indice,accion){
    //console.log(accion);
    document.getElementById("subtitulo").innerHTML="<p id='pSub' >Busqueda:</p>";
    //document.getElementById("botonL").innerHTML="";
    //document.getElementById("botonR").innerHTML="";
    //botonL.innerHTML += `<button onclick="recorrerPagina('left')"  href="#">&raquo;</button>`
    //botonR.innerHTML += `<button onclick="recorrerPagina('right')" href="#">&raquo;</button>`


    var pokeNames = indice;
    if (pokeNames === undefined) {
        var link ="https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1118";
        var limite = 1118;
        busqueda = document.getElementById("busqueda").value;
        document.getElementById("cards").innerHTML="";
        document.getElementById("botonL").innerHTML="";
        
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
                        if (accion === undefined) {
                            principal(zelda);
                            console.log("pagina indefinida");

                        }  
                    }

                    
                    document.getElementById("paginas").innerHTML="";
                    
                   }
                   if (i >= 1117) {
                     if (accion === "right" || accion === "left") {
                            //console.log("pagina mayor a " + pagina);
                            buscador(pagina,resultadosBusqueda,"buttonSide");
                            //console.log(resultadosBusqueda);
                            
                        }
                        else if (accion) {}{
                            
                        }
                    
                    // console.log("pause " + indice);
                    var totalPaginas =(Math.ceil(counter/15)+1);
                    //console.log("Resultados "+resultadosBusqueda); 
                    imprimirPaginacion(totalPaginas,"busqueda",resultadosBusqueda);


                    //subtituloPaginas.innerHTML += `<p>Paginas: ${totalPaginas-1} </p> <p>Pagina <p id="paginaActual">1</p>/${totalPaginas-1}</p>`;
                    if ((totalPaginas-1)==1) {
                        document.getElementById("botonR").innerHTML="";
                    }
                    if (accion === undefined) {
                        document.getElementById("divTotalPaginas").innerHTML="";
                        document.getElementById("divPaginaActual").innerHTML="";
                        divTotalPaginas.innerHTML += `<p>Paginas: ${totalPaginas-1}</p>`;
                        divPaginaActual.innerHTML += `<p id="paginaActual">1/${totalPaginas-1}</p>`;
                    }
                    let totPag = totalPaginas-1;
                    imprimirBotones(totPag);
                    

                   }
                   
                }

                
                        
            }
        }
        request.send();
    } 
    else{
        console.log("paaagina: "+pagina)

        if (accion === "buttonSide") {
            var arrayPokes = pokeNames;

        } else {
            var arrayPokes = pokeNames.split(",");
        }
        
        
        console.log(arrayPokes);
        document.getElementById("cards").innerHTML="";
        document.getElementById("paginas").innerHTML="";
        document.getElementById("divTotalPaginas").innerHTML="";
        document.getElementById("divPaginaActual").innerHTML="";
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
        var totalPaginas = (Math.ceil(arrayPokes.length/15))+1;
        console.log(totalPaginas + " total paginas")
        console.log(pagina + "  pagina")
        if (pagina === (totalPaginas-1)){
            console.log("se borra el boton")
            document.getElementById("botonR").innerHTML="";
        } else{
            //borramos de existir y reimprimimos el boton derecho
            document.getElementById("botonR").innerHTML="";
            botonR.innerHTML += `<button onclick="recorrerPagina('right')" href="#">&raquo;</button>`;

        }
        if (pagina === totalPaginas) {
            var ini = (pagina*15)-30;
            var fin = (pagina*15)-16;
             console.log("se pása del limite")
        }
        
        for (var i = ini; i <= fin; i++) {
                var zelda = "https://pokeapi.co/api/v2/pokemon/" + arrayPokes[i];
                principal(zelda);
            }

        
            
            imprimirPaginacion(totalPaginas,"busqueda",arrayPokes);
            
            
            divTotalPaginas.innerHTML += `<p>Paginas: ${totalPaginas-1}</p>`;

            divPaginaActual.innerHTML += `<p id="paginaActual">${pagina}/${totalPaginas-1}</p>`;
            var totalPaginas = totalPaginas - 1;
            imprimirBotones(totalPaginas);
    }
    
    
    
    
}




