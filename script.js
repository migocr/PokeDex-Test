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
               
               //console.log(zelda);
               if (i < 1118) {
                var zelda = datos.results[i].url;
                principal(zelda);
               }   
            }
            imprimirPaginacion(75);

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
var pageMap = [];
function imprimirPaginacion(totalPaginas,tipo,indice){
    var paginas = document.getElementById("paginas");
    document.getElementById("paginas").innerHTML="";
    var defaultTipo = tipo;
    var pA = document.getElementById("paginaActual");
    var pAout = pA.outerHTML;
    var paginaActual = pAout.slice(21, -6);
    newPaginaActual = paginaActual.replace('/', ''); 
    console.log("imprimir paginacion PA " +newPaginaActual);
    
    pageMap.push(+newPaginaActual);
    console.log(pageMap+" : mapa de pagina")

    if (totalPaginas > 13) {
        if (newPaginaActual >= 8 && newPaginaActual < (totalPaginas-7) && totalPaginas>13) {
            var inicio = +newPaginaActual-7;
            var fin = inicio + 13;
        }
        else if (newPaginaActual >= 8 && newPaginaActual >= (totalPaginas-7)) {
            var fin = totalPaginas;
            var inicio = totalPaginas-13
        }
        else if (newPaginaActual < 8) {
            var inicio = 0;
            var fin= inicio+13;
        }      
    }
    else {
        var inicio = 0
        var fin = totalPaginas;
    }

    
    


   
    

    
    if (defaultTipo==="busqueda") {
        
         //console.log(indice);
         for (var numeroPagina = 1; numeroPagina < totalPaginas; numeroPagina++){
                if (numeroPagina == newPaginaActual) {
                    paginas.innerHTML += `
                            
                           <a class="pagination-item" href="javascript:void(0)" style="display:inline-block; background-color:blue;" onclick="buscador(${numeroPagina},'${indice}')" >${numeroPagina}</a>

                                     `
                } else{
                    paginas.innerHTML += `
                            
                           <a class="pagination-item" href="javascript:void(0)" style="display:inline-block;" onclick="buscador(${numeroPagina},'${indice}')" >${numeroPagina}</a>

                                     `
                }
                            
            }
    }
    else{
        for (var numeroPagina = inicio; numeroPagina < fin; numeroPagina++){
            var pagina =numeroPagina+1;
            if (pagina == newPaginaActual) {
                paginas.innerHTML += 
                `<a class="page-link" href="javascript:void(0)" style="display:inline-block; background-color:blue;" onclick="paginador(${pagina},'${defaultTipo}')" >${pagina}</a> `
            } else{
                paginas.innerHTML += 
                `<a class="page-link" href="javascript:void(0)" style="display:inline-block;" onclick="paginador(${pagina},'${defaultTipo}')" >${pagina}</a> ` 

            }
                                                               
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
            var habilidad = datos.abilities[0].ability.name;

            if(datos.hasOwnProperty('datos.abilities[1].ability.name')){
                var habilidadOculta= datos.abilities[1].ability.name;
            } else{
                var habilidadOculta= "---"
            }
            
            var HP = datos.stats[0].base_stat;
            var ataque = datos.stats[1].base_stat;
            var defensa = datos.stats[2].base_stat;
            var specialAttack = datos.stats[3].base_stat;
            var specialDeffense = datos.stats[4].base_stat;
            var speed = datos.stats[5].base_stat;
            var base_experience = datos.base_experience;
            var altura = datos.height; 
            var numeroPokedex = datos.order;
            var peso = datos.weight;
            //console.log(base_experience);
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

            if (tipo1 === "grass"){ var cardColor = "radial-gradient(circle, rgba(222,253,224,1) 0%, rgba(90,181,96,1) 100%);";}             
                    else if (tipo1 === "fire"){ var cardColor = "radial-gradient(circle, rgba(253,223,223,1) 0%, rgba(233,127,70,1) 100%);";}               
                    else if (tipo1 === "water"){ var cardColor = "radial-gradient(circle, rgba(222,243,253,1) 0%, rgba(57,140,180,1) 100%);"; } 
                    else if (tipo1 === "bug") {var cardColor="radial-gradient(circle, rgba(248,213,163,1) 0%, rgba(164,218,115,1) 100%);";}
                    else if (tipo1 === "normal") {var cardColor="radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(222,215,215,1) 100%);"}
                    else if (tipo1 === "flying") {var cardColor="radial-gradient(circle, rgba(245,245,245,1) 0%, rgba(202,232,248,1) 100%);"}
                    else if (tipo1 === "poison") {var cardColor="radial-gradient(circle, rgba(192,147,206,1) 0%, rgba(147,0,192,1) 100%);"}
                    else if (tipo1 === "ground") {var cardColor="radial-gradient(circle, rgba(244,231,218,1) 0%, rgba(142,109,76,1) 100%);"}
                    else if (tipo1 === "ghost") {var cardColor="radial-gradient(circle, rgba(185,163,208,1) 0%, rgba(119,82,159,1) 100%);"}
                    else if (tipo1 === "steel") {var cardColor="radial-gradient(circle, rgba(211,211,211,1) 0%, rgba(53,53,53,1) 100%);"}
                    else if (tipo1 === "electric") {var cardColor="radial-gradient(circle, rgba(247,239,200,1) 0%, rgba(251,209,0,1) 100%);"}
                    else if (tipo1 === "ice") {var cardColor="radial-gradient(circle, rgba(233,246,244,1) 0%, rgba(119,208,196,1) 100%);"}
                    else if (tipo1 === "psychic") {var cardColor="radial-gradient(circle, rgba(231,196,239,1) 0%, rgba(101,44,102,1) 100%);"}
                    else if (tipo1 === "dragon") {var cardColor="radial-gradient(circle, rgba(151,179,230,1) 0%, rgba(0,29,82,1) 100%);"}
                    else if (tipo1 === "dark") {var cardColor="radial-gradient(circle, rgba(124,124,124,1) 0%, rgba(68,63,77,1) 100%);"}
                    else if (tipo1 === "fairy") {var cardColor="radial-gradient(circle, rgba(252,234,255,1) 0%, rgba(236,178,245,1) 100%);";}
                    else if (tipo1 === "fighting") {var cardColor="radial-gradient(circle, rgba(230,224,212,1) 0%, rgba(239,145,145,1) 100%);";}
                    else if (tipo1==="rock") {var cardColor="radial-gradient(circle, rgba(213,213,212,1) 0%, rgba(139,139,132,1) 100%);";}
                    else {var cardColor = "card text-white bg-info mb-3";}
            cards.innerHTML += `
                         
                    
                        <div class="pokemon" onclick="imprimirDatos(${datos.id},'${datos.name}','${concaTipos}','${imagen}')" style="background:${cardColor};">
                            <div class="img-container">
                            <img src="${imagen}" alt="${datos.name}">
                            </div>
                            <div class="info">
                                <span class="number">${datos.id}</span>
                                <h3 class="name">${datos.name}</h3>
                                <small class="type">Type: <span>${concaTipos}</span></small>
                            </div>
                        </div>
                        
                         `
                    
                    
        }
        else {
            
        }
        
        
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
        console.log("termino de busqueda "+ busqueda);
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

        
            
            
            
            
            divTotalPaginas.innerHTML += `<p>Paginas: ${totalPaginas-1}</p>`;

            divPaginaActual.innerHTML += `<p id="paginaActual">${pagina}/${totalPaginas-1}</p>`;
            imprimirPaginacion(totalPaginas,"busqueda",arrayPokes);
            var totalPaginas = totalPaginas - 1;

            imprimirBotones(totalPaginas);
    }
    
    
    
    
}

function imprimirDatos(id,nombre,concaTipos,imagen){
    document.getElementById("informacion").innerHTML="";
    document.getElementById('id01').style.display='block';
    console.log(imagen);
    informacion.innerHTML += `
                        <p>${nombre}</p>
                        <p>${id}</p>
                        

                         `
}




