var inicio = 0;
var final = 14;
var defaultTipo;
//cargamos la funcion load para cargar los datos
load(defaultTipo);


//funcion load carga los datos
//defaulTipo - undefined o definido por los botones de tipos
//si defaultTipo esta indefinido:
//  - inicia el paginador en 1 para cargar los primeros 15 registros
//  -el total de paginas es 75 equivalente a lo necesario para los 1118 registro / 15
//  -limpiamos de existir el divPaginaActual
//  -imprimimos en divTotalPaginas en total de paginas y en divPaginaActual la pagina actual del total
//  
//si defaultTipo esta definido:
//  -borramos el contenido deldiv cards
//  -ejecutamos la funcion enlacesPorTipo y le pasamos la variable defaultTipo, inicio y final.
function load(defaultTipo) {
    //console.log(defaultTipo);



    backgroundRandom();
    if (defaultTipo === undefined) {
        paginador(1);

        var totalPaginas = 75;
        var pagina = 1;
        document.getElementById("divPaginaActual").innerHTML = "";
        divTotalPaginas.innerHTML += `<p>Paginas: ${totalPaginas}</p>`;
        divPaginaActual.innerHTML += `<p id="paginaActual">${pagina}/${totalPaginas}</p>`;
        imprimirBotones(totalPaginas);
        subtitulo.innerHTML += `<p id="pSub" >Home</p> `

    } else {
        showLoader();
        document.getElementById("cards").innerHTML = "";
        enlacesPorTipo(defaultTipo, inicio, final);
    }

}



//esta funcion calcula en donde comienza y termina un arreglo de datos a mostrar de acuerdo al numero de pagina
//var y - numero de pagina
// inicio, final - determinan donde inicia y termina el array de ids para las consultas
//borramos el divPaginaActual y reimprimimos nuevamente para refrescar el valor de y
//si pagina actual (y) es igual a 1 siempre iniciara en 0 y terminara en 14 el array de ids
//si pagina actual (y) es mayor o igual a 2 inicio sera igual a (y * 15) - 15 y final a inicio +14
//si no hemos definido un defaultTipo se ejecuta la funcion enlaces
//si existe un valor en defaultTipo se ejecuta la funcion enlacesPorTipo
function paginador(y, defaultTipo) {

    document.getElementById("divPaginaActual").innerHTML = "";
    //divTotalPaginas.innerHTML += `<p>Paginas: ${totalPaginas}</p>`;
    divPaginaActual.innerHTML += `<p id="paginaActual">${y}/75</p>`;
    if (y === 1) {
        document.getElementById("paginas").innerHTML = "";
        document.getElementById("cards").innerHTML = "";
        var inicio = 0;
        var final = inicio + 14;

    }
    if (y >= 2) {
        document.getElementById("paginas").innerHTML = "";
        document.getElementById("cards").innerHTML = "";
        var inicio = (y * 15) - 15;
        var final = inicio + 14;


    }
    if (defaultTipo === undefined || defaultTipo === "undefined") {
        enlaces(inicio, final);
        imprimirBotones(75)
    } else {
        enlacesPorTipo(defaultTipo, inicio, final, y);

    }



}

//esta funcion se encarga de generar los enlaces de la pagina principal
//esta funcion es exclusiva para los datos mostrados en la pagina principal
//inicio y final - determinan donde inicia y termina el array de ids para las consultas
//link - enlace a pokeapi con el array de nombres y urls de los datos a mostrar
//realizamos un XMLHttpRequest para pedir el array de datos necesario
//for i=ini hasta que i sea menor o igual a li (limite/final) y mientras i sea menor al total de registros (1118):
//  -guardamos el array de urls en la variable enlace
//  -ejecuta la funcion principal pasandole la url a consultar (enlace)
//imprimimos paginacion con el total de paginas
function enlaces(inicio, final) {

    showLoader();
    var link = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1118";
    var ini = inicio;
    var li = final;

    var request = new XMLHttpRequest();
    request.open("GET", link);
    request.onreadystatechange = function() {

        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            var datos = JSON.parse(request.responseText);

            for (var i = ini; i <= li; i++) {

                //console.log(enlace);
                if (i < 1118) {
                    var enlace = datos.results[i].url;
                    principal(enlace);
                }
            }
            imprimirPaginacion(75);

        }

    }

    request.send();

}

//esta funcion filtra por tipo los enlaces para las consultas a mostrar
//defaultTipo - string seleccionado por el usuario en los botones de tipos
//inicio y final - determina el inicio y fin de los datos a mostrar (15 por pagina)
//y - pagina actual, sirve de referencia para la paginacion, si no existe y sera igual a 1

function backgroundPorTipo(defaultTipo) {
    //console.log(defaultTipo);

    switch (defaultTipo) {
        case 'grass':
            var backgroundColor = "radial-gradient(circle, rgba(222,253,224,1) 0%, rgba(90,181,96,1) 100%)";
            return backgroundColor
            break;
        case 'fire':
            var backgroundColor = "radial-gradient(circle, rgba(253,223,223,1) 0%, rgba(233,127,70,1) 100%)";
            return backgroundColor
            break;
        case 'water':
            var backgroundColor = "radial-gradient(circle, rgba(222,243,253,1) 0%, rgba(57,140,180,1) 100%)";
            return backgroundColor
            break;
        case 'bug':
            var backgroundColor = "radial-gradient(circle, rgba(248,213,163,1) 0%, rgba(164,218,115,1) 100%)";
            return backgroundColor
            break;
        case 'normal':
            var backgroundColor = "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(222,215,215,1) 100%)";
            return backgroundColor
            break;
        case 'flying':
            var backgroundColor = "radial-gradient(circle, rgba(245,245,245,1) 0%, rgba(202,232,248,1) 100%)";
            return backgroundColor
            break;
        case 'poison':
            var backgroundColor = "radial-gradient(circle, rgba(192,147,206,1) 0%, rgba(147,0,192,1) 100%)";
            return backgroundColor
            break;
        case 'normal':
            var backgroundColor = "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(222,215,215,1) 100%)";
            return backgroundColor
            break;
        case 'ground':
            var backgroundColor = "radial-gradient(circle, rgba(244,231,218,1) 0%, rgba(142,109,76,1) 100%)";;
            return backgroundColor
            break;
        case 'ghost':
            var backgroundColor = "radial-gradient(circle, rgba(185,163,208,1) 0%, rgba(119,82,159,1) 100%)";
            return backgroundColor
            break;
        case 'steel':
            var backgroundColor = "radial-gradient(circle, rgba(211,211,211,1) 0%, rgba(53,53,53,1) 100%)";
            return backgroundColor
            break;
        case 'electric':
            var backgroundColor = "radial-gradient(circle, rgba(247,239,200,1) 0%, rgba(251,209,0,1) 100%)";
            return backgroundColor
            break;
        case 'ice':
            var backgroundColor = "radial-gradient(circle, rgba(233,246,244,1) 0%, rgba(119,208,196,1) 100%)";
            return backgroundColor
            break;
        case 'psychic':
            var backgroundColor = "radial-gradient(circle, rgba(231,196,239,1) 0%, rgba(101,44,102,1) 100%)";
            return backgroundColor
            break;
        case 'dragon':
            var backgroundColor = "radial-gradient(circle, rgba(151,179,230,1) 0%, rgba(0,29,82,1) 100%)";
            return backgroundColor
            break;
        case 'dark':
            var backgroundColor = "radial-gradient(circle, rgba(124,124,124,1) 0%, rgba(68,63,77,1) 100%)";
            return backgroundColor
            break;
        case 'fairy':
            var backgroundColor = "radial-gradient(circle, rgba(252,234,255,1) 0%, rgba(236,178,245,1) 100%)";
            return backgroundColor
            break;
        case 'fighting':
            var backgroundColor = "radial-gradient(circle, rgba(230,224,212,1) 0%, rgba(239,145,145,1) 100%)";
            return backgroundColor
            break;
        case 'rock':
            var backgroundColor = "radial-gradient(circle, rgba(213,213,212,1) 0%, rgba(139,139,132,1) 100%)";
            return backgroundColor
            break;

        default:
            //console.log('background por defecto');
    }




}

function enlacesPorTipo(defaultTipo, inicio, final, y) {
    showLoader();
    document.getElementById("divPaginaActual").innerHTML = "";
    document.getElementById("divTotalPaginas").innerHTML = "";
    document.getElementById("subtitulo").innerHTML = "";
    var paginaActual = y;
    if (paginaActual === undefined) {
        var paginaActual = 1;
    }
    //console.log(paginaActual);
    var ini = inicio;
    var fin = final;
    var tipo = defaultTipo;
    var link = "https://pokeapi.co/api/v2/type/" + tipo;

    var body = document.getElementById("body");
    body.style.background = backgroundPorTipo(defaultTipo);
    //console.log("fondo: " + backgroundPorTipo(defaultTipo));

    backgroundPorTipo(defaultTipo);




    subtitulo.innerHTML += `<p id="pSub" >Type: ${tipo}</p> `

    var request = new XMLHttpRequest();
    request.open("GET", link);
    request.onreadystatechange = function() {

        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            var datos = JSON.parse(request.responseText);
            pokemon = datos.pokemon;


            var conteo = pokemon.length;
            document.getElementById("subtitulo").innerHTML = "";
            var tipoMayus = tipo.charAt(0).toUpperCase() + tipo.slice(1);
            subtitulo.innerHTML += `<p>${conteo} Results for&nbsp;</p><p id="pSub" >${tipoMayus} type </p>
                <img class="img-types-filter" src="img/types/${tipo}.png" alt="${tipo} type">
            `
            var totalPaginas = Math.ceil(conteo / 15);


            divPaginaActual.innerHTML += `<p id="paginaActual">${paginaActual}/${totalPaginas}</p>`;




            for (var i = ini; i <= fin; i++) {
                var enlace = (pokemon[i].pokemon.url);
                principal(enlace);
                //en caso de estar en la ultima pagina
                if (paginaActual === totalPaginas) {
                    //obtenemos la posicion del ultimo dato del array
                    var final = (fin - (15 - (conteo % 15)));
                    //paramos la ejecucion al llegar al ultimo dato
                    if (i === final) {
                        break;
                    }

                }
            }




            imprimirPaginacion(totalPaginas, tipo);

            divTotalPaginas.innerHTML += `<p>Paginas: ${totalPaginas}</p>`;
            imprimirBotones(totalPaginas);




        }

    }

    request.send();

}


//esta funcion imprime los botones de la paginacion
//totalPaginas - define el total de botones y paginas a mostrar
function imprimirBotones(totalPaginas) {

    var pA = document.getElementById("paginaActual");
    var pAout = pA.outerHTML;
    var paginaActual = pAout.slice(21, -6);
    newPaginaActual = paginaActual.replace('/', '');
    paginaActual = newPaginaActual;
    // //console.log("pagina actual " + newPaginaActual);
    //console.log(totalPaginas);

    if (paginaActual == totalPaginas) {
        document.getElementById("botonR").innerHTML = "";
    } else {
        document.getElementById("botonR").innerHTML = "";
        botonR.innerHTML += `<button class="entypo-right-open" onclick="recorrerPagina('right')" href="#"></button>`
    }
    if (paginaActual == 1) {
        document.getElementById("botonL").innerHTML = "";
    } else {
        document.getElementById("botonL").innerHTML = "";
        botonL.innerHTML += `<button class="entypo-left-open" onclick="recorrerPagina('left')"  href="#"></button>`
    }
    if (totalPaginas == 0) {
        document.getElementById("botonL").innerHTML = "";
        document.getElementById("botonR").innerHTML = "";
    }




}
var pageMap = [];

function imprimirPaginacion(totalPaginas, tipo, indice) {
    var paginas = document.getElementById("paginas");
    document.getElementById("paginas").innerHTML = "";
    var defaultTipo = tipo;
    var pA = document.getElementById("paginaActual");
    var pAout = pA.outerHTML;
    var paginaActual = pAout.slice(21, -6);
    newPaginaActual = paginaActual.replace('/', '');
    //console.log("imprimir paginacion PA " + newPaginaActual);

    pageMap.push(+newPaginaActual);
    //console.log(pageMap + " : mapa de pagina")

    if (totalPaginas > 15) {
        if (newPaginaActual >= 8 && newPaginaActual < (totalPaginas - 7) && totalPaginas > 15) {
            var inicio = +newPaginaActual - 8;
            var fin = inicio + 15;
        } else if (newPaginaActual >= 8 && newPaginaActual >= (totalPaginas - 8)) {
            var fin = totalPaginas;
            var inicio = totalPaginas - 15
        } else if (newPaginaActual < 8) {
            var inicio = 0;
            var fin = inicio + 15;
        }
    } else {
        var inicio = 0
        var fin = totalPaginas;
    }




    if (defaultTipo == "busqueda") {

        //console.log(indice);
        for (var numeroPagina = inicio; numeroPagina < (fin - 1); numeroPagina++) {
            var pagina = numeroPagina + 1;
            if (pagina == newPaginaActual) {

                paginas.innerHTML += `
                            
                           <a class="page-link" style="background:#06060682;" onclick="buscador(${pagina},'${indice}')" >${pagina}</a>

                                     `
            } else {
                paginas.innerHTML += `
                            
                           <a class="page-link" onclick="buscador(${pagina},'${indice}')" >${pagina}</a>

                                     `
            }

        }
    }

    if (defaultTipo == "filtroGeneracion") {
        for (var numeroPagina = inicio; numeroPagina < fin; numeroPagina++) {
            var pagina = numeroPagina + 1;
            if (pagina == newPaginaActual) {
                paginas.innerHTML +=
                    `<a class="page-link" style="background:#06060682;" onclick="filtroGeneracion('${indice}',${pagina})" >${pagina}</a> `
            } else {
                paginas.innerHTML +=
                    `<a class="page-link" onclick="filtroGeneracion('${indice}',${pagina})" >${pagina}</a> `

            }

        }
    }

    if (defaultTipo == "filtroGeneracionMEGA") {
        for (var numeroPagina = inicio; numeroPagina < fin; numeroPagina++) {
            var pagina = numeroPagina + 1;
            if (pagina == newPaginaActual) {
                paginas.innerHTML +=
                    `<a class="page-link" style="background:#06060682;" onclick="filtroGeneracion('mega',${pagina},'undefined','${indice}')" >${pagina}</a> `
            } else {
                paginas.innerHTML +=
                    `<a class="page-link" onclick="filtroGeneracion('mega',${pagina},'undefined','${indice}')" >${pagina}</a> `

            }

        }
    }


    if (defaultTipo == undefined || defaultTipo == "grass" || defaultTipo == "normal" || defaultTipo == "bug" || defaultTipo == "dark" || defaultTipo == "steel" || defaultTipo == "water" || defaultTipo == "fire" || defaultTipo == "rock" || defaultTipo == "dragon" || defaultTipo == "electric" || defaultTipo == "fairy" || defaultTipo == "fighting" || defaultTipo == "poison" || defaultTipo == "flying" || defaultTipo == "ground" || defaultTipo == "psychic" || defaultTipo == "ice" || defaultTipo == "ghost") {
        for (var numeroPagina = inicio; numeroPagina < fin; numeroPagina++) {
            var pagina = numeroPagina + 1;
            if (pagina == newPaginaActual) {
                paginas.innerHTML +=
                    `<a class="page-link" style="background:#06060682;" onclick="paginador(${pagina},'${defaultTipo}')" >${pagina}</a> `
            } else {
                paginas.innerHTML +=
                    `<a class="page-link" onclick="paginador(${pagina},'${defaultTipo}')" >${pagina}</a> `

            }

        }
    }

}

function recorrerPagina(side) {
    //obtenemos el subtitulo para verificar si es una busqueda, filtro o no
    var p = document.getElementById("pSub");
    //obtenemos el dato de la pagina actual, lo pasamos, lo pasamos a una variable y lo cortamos para quedarnos con el numero
    var pA = document.getElementById("paginaActual");
    var pAout = pA.outerHTML;
    var paginaActual = pAout.slice(21, -6);
    var subtitulo = p.outerHTML;
    newPaginaActual = paginaActual.replace('/', '');
    var paginaActual = newPaginaActual;
    //console.log("pagina actual " + newPaginaActual);
    //falta imprimir paginacion en filtro de tipos

    var stringSub = p.outerHTML.includes("Search Results:");
    //console.log(stringSub);

    if (stringSub == true) {

        if (side === "right") {

            var pagina = (+paginaActual + 1);
            //console.log(pagina);
            buscador(pagina, undefined, "right");
        } else if (side === "left") {
            var pagina = (+paginaActual - 1);
            //console.log(pagina);
            buscador(pagina, undefined, "left");
        }

    } else if (subtitulo.includes('type')) {
        var tipo = subtitulo.slice(13, -10);

        var defaultTipo = tipo.toLowerCase();
        //console.log("es por tipo");
        if (side === "right") {

            var pagina = (+paginaActual + 1);

        } else if (side === "left") {
            var pagina = (+paginaActual - 1);
        }
        //console.log(defaultTipo);
        paginador(pagina, defaultTipo);
    } else if (subtitulo.includes('region</p>')) {
        if (side === "right") {
            var pagina = (+paginaActual + 1);
            //console.log(pagina);
            filtroGeneracion(undefined, pagina, side);
        } else if (side === "left") {
            var pagina = (+paginaActual - 1);
            //console.log(pagina);
            filtroGeneracion(undefined, pagina, side);
        }

    } else if (subtitulo.includes('MEGA EVOLUTIONS')) {
        if (side === "right") {
            var pagina = (+paginaActual + 1);
            filtroGeneracion("mega", pagina);
        } else if (side === "left") {
            var pagina = (+paginaActual - 1);
            //console.log(pagina);
            filtroGeneracion("mega", pagina);
        }
    } else {
        if (side === "right") {

            var pagina = (+paginaActual + 1);

        } else if (side === "left") {
            var pagina = (+paginaActual - 1);
        }
        paginador(pagina);
    }

}


function principal(enlace) {

    var link = enlace;
    var request = new XMLHttpRequest();
    request.open("GET", link, false);
    request.onreadystatechange = function() {

        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            var datos = JSON.parse(request.responseText);
            var id = datos.id;
            var habilidad = datos.abilities[0].ability.name;

            if (datos.hasOwnProperty('datos.abilities[1].ability.name')) {
                var habilidadOculta = datos.abilities[1].ability.name;
            } else {
                var habilidadOculta = "---"
            }

            var HP = datos.stats[0].base_stat;
            var ataque = datos.stats[1].base_stat;
            var defensa = datos.stats[2].base_stat;
            var specialAttack = datos.stats[3].base_stat;
            var specialDeffense = datos.stats[4].base_stat;
            var speed = datos.stats[5].base_stat;
            var base_experience = datos.base_experience;
            var altura = datos.height;
            var numeroPokedex = datos.id;
            var peso = datos.weight;
            //console.log(base_experience);
            //console.log(datos.stats);

            console.log(datos.sprites.other["official-artwork"].front_default);
            var img = datos.sprites.other.dream_world.front_default;
            if (img == null) {
                var imagen = datos.sprites.other["official-artwork"].front_default;
                //console.log("la imagen es nula");
            } else {
                var imagen = img;
            }



            if (datos.types.length > 1) {
                var tipo1 = datos.types[0].type.name;
                var tipo2 = datos.types[1].type.name;
                var concaTipos = tipo1 + "," + tipo2;
                var concaTiposIMG = "<img class='cardTypes' src='img/types/" + tipo1 + ".png' alt='" + tipo1 + "' >" + "<img class='cardTypes' src='img/types/" + tipo2 + ".png' alt='" + tipo2 + "' >";
            } else {
                var concaTipos = datos.types[0].type.name;
                var tipo1 = datos.types[0].type.name;
                var concaTiposIMG = "<img class='cardTypes' src='img/types/" + tipo1 + ".png' alt='" + tipo1 + "' >";
            }

            if (tipo1 === "grass") {
                var cardColor = "radial-gradient(circle, rgba(222,253,224,1) 0%, rgba(90,181,96,1) 100%)";
            } else if (tipo1 === "fire") {
                var cardColor = "radial-gradient(circle, rgba(253,223,223,1) 0%, rgba(233,127,70,1) 100%)";
            } else if (tipo1 === "water") {
                var cardColor = "radial-gradient(circle, rgba(222,243,253,1) 0%, rgba(57,140,180,1) 100%)";
            } else if (tipo1 === "bug") {
                var cardColor = "radial-gradient(circle, rgba(248,213,163,1) 0%, rgba(164,218,115,1) 100%);";
            } else if (tipo1 === "normal") {
                var cardColor = "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(222,215,215,1) 100%);"
            } else if (tipo1 === "flying") {
                var cardColor = "radial-gradient(circle, rgba(245,245,245,1) 0%, rgba(202,232,248,1) 100%);"
            } else if (tipo1 === "poison") {
                var cardColor = "radial-gradient(circle, rgba(192,147,206,1) 0%, rgba(147,0,192,1) 100%);"
            } else if (tipo1 === "ground") {
                var cardColor = "radial-gradient(circle, rgba(244,231,218,1) 0%, rgba(142,109,76,1) 100%);"
            } else if (tipo1 === "ghost") {
                var cardColor = "radial-gradient(circle, rgba(185,163,208,1) 0%, rgba(119,82,159,1) 100%);"
            } else if (tipo1 === "steel") {
                var cardColor = "radial-gradient(circle, rgba(211,211,211,1) 0%, rgba(53,53,53,1) 100%);"
            } else if (tipo1 === "electric") {
                var cardColor = "radial-gradient(circle, rgba(247,239,200,1) 0%, rgba(251,209,0,1) 100%);"
            } else if (tipo1 === "ice") {
                var cardColor = "radial-gradient(circle, rgba(233,246,244,1) 0%, rgba(119,208,196,1) 100%);"
            } else if (tipo1 === "psychic") {
                var cardColor = "radial-gradient(circle, rgba(231,196,239,1) 0%, rgba(101,44,102,1) 100%);"
            } else if (tipo1 === "dragon") {
                var cardColor = "radial-gradient(circle, rgba(151,179,230,1) 0%, rgba(0,29,82,1) 100%);"
            } else if (tipo1 === "dark") {
                var cardColor = "radial-gradient(circle, rgba(124,124,124,1) 0%, rgba(68,63,77,1) 100%);"
            } else if (tipo1 === "fairy") {
                var cardColor = "radial-gradient(circle, rgba(252,234,255,1) 0%, rgba(236,178,245,1) 100%);";
            } else if (tipo1 === "fighting") {
                var cardColor = "radial-gradient(circle, rgba(230,224,212,1) 0%, rgba(239,145,145,1) 100%);";
            } else if (tipo1 === "rock") {
                var cardColor = "radial-gradient(circle, rgba(213,213,212,1) 0%, rgba(139,139,132,1) 100%);";
            } else {
                var cardColor = "card text-white bg-info mb-3";
            }




            var number = "number";
            //if poke id entra al rango de las formas alternas
            if (datos.id > 10000 && datos.id < 10033 || datos.id >= 10091 && datos.id < 10094 || datos.id >= 10077 && datos.id < 10079 || datos.id == 10086 || datos.id >= 10100 && datos.id < 10186) {
                var numPoke = "<i class='fas fa-certificate'></i>";
                var form = "alterna";
            }
            //mega evoluciones
            else if (datos.id >= 10033 && datos.id < 10077 || datos.id == 10079 || datos.id >= 10087 && datos.id < 10091) {
                var numPoke = "<img src='img/gen/mega.png'/> ";
                var number = "numberMEGA";
                var form = "mega";
            }
            //formas de pikachu
            else if (datos.id >= 10080 && datos.id < 10086 || datos.id >= 10094 && datos.id < 10100 || datos.id == 10148) {
                var numPoke = "<img src='img/pikachu.png'/>";
                var form = "pika";
            }
            //gigamax
            else if (datos.id >= 10186 && datos.id < 10094 || datos.id >= 10101 && datos.id < 10148 || datos.id >= 10149) {
                var numPoke = "<img src='img/gmax.png'/>";
                var form = "gmax";
            }
            //normal 
            else {
                var numPoke = datos.id;
                var form = "normal";
            }
            var nombrePoke = datos.name.replace("-", " ");
            cards.innerHTML += `
                         
                    
                        <div class="pokemon" onclick="imprimirDatos(${datos.id},'${datos.name}','${concaTipos}','${imagen}','${HP}','${ataque}','${defensa}','${specialAttack}','${specialDeffense}','${speed}','${base_experience}','${altura}','${numeroPokedex}','${peso}','${cardColor}','${form}')" style="background:${cardColor};">
                            <div class="img-container">
                            <img  src="${imagen}" alt="${datos.name}">
                            </div>
                            <div class="info">
                                <span class="${number}">${numPoke}</span>
                                <h3 class="name">${nombrePoke}</h3>
                                <small class="type"><span>${concaTiposIMG}</span></small>
                            </div>
                        </div>
                        
                         `


        } else {
            //console.log("enlace invalido");
        }
    }

    request.send();
    closeLoader();

}



//tecla enter en buscador
var inputBusqueda = document.getElementById("busqueda");
inputBusqueda.addEventListener("keyup", async function(event) {


    if (event.keyCode === 13) {
        await showLoader();
        buscador(undefined, undefined, 'buscar');

    }
});

var btnBusqueda = document.getElementById("buscar");
btnBusqueda.addEventListener("click", async function(event) {

    await showLoader();
    buscador(undefined, undefined, 'buscar');
});




function buscador(pagina, indice, accion) {

    //console.log(accion);
    document.getElementById("subtitulo").innerHTML = "<p id='pSub' >Search Results: </p>";

    //document.getElementById("botonR").innerHTML="";
    //botonL.innerHTML += `<button onclick="recorrerPagina('left')"  href="#">&raquo;</button>`
    //botonR.innerHTML += `<button onclick="recorrerPagina('right')" href="#">&raquo;</button>`



    var pokeNames = indice;
    if (pokeNames === undefined) {
        var link = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1118";
        var limite = 1118;
        busquedaBruta = document.getElementById("busqueda").value;
        var busqueda = busquedaBruta.toLowerCase();
        //console.log("termino de busqueda " + busqueda);
        document.getElementById("cards").innerHTML = "";
        document.getElementById("botonL").innerHTML = "";

        var request = new XMLHttpRequest();
        request.open("GET", link, false);
        request.onreadystatechange = function() {
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                var datos = JSON.parse(request.responseText);
                //pendiente contador de elementos para paginacion de buscador
                var counter = 0;
                let resultadosBusqueda = [];
                for (var i = 0; i <= limite; i++) {
                    var names = datos.results[i].name;

                    var final = names.includes(busqueda);

                    if (final == true) {
                        var enlace = "https://pokeapi.co/api/v2/pokemon/" + names;
                        counter++;
                        var indice = i;
                        //console.log(indice);
                        resultadosBusqueda.push(names);

                        if (counter <= 15) {

                            if (accion === undefined || accion == "buscar") {
                                principal(enlace);
                                //console.log("pagina indefinida");

                            }
                        }


                        document.getElementById("paginas").innerHTML = "";

                    }

                    if (i >= 1117) {
                        document.getElementById("pSub").innerHTML += counter;

                        if (accion === "right" || accion === "left") {
                            //console.log("pagina mayor a " + pagina);
                            buscador(pagina, resultadosBusqueda, "buttonSide");
                            //console.log(resultadosBusqueda);

                        }


                        // //console.log("pause " + indice);
                        var totalPaginas = (Math.ceil(counter / 15) + 1);

                        //console.log("Resultados "+resultadosBusqueda); 



                        //subtituloPaginas.innerHTML += `<p>Paginas: ${totalPaginas-1} </p> <p>Pagina <p id="paginaActual">1</p>/${totalPaginas-1}</p>`;
                        if (totalPaginas == 1) {
                            cards.innerHTML += `<img src="img/notFound.png"><h2 style="color: #717171;">No search results found</h2>`;
                            document.getElementById("divPaginaActual").innerHTML = "";
                            divPaginaActual.innerHTML += `<p id="paginaActual">0/0`;
                            closeLoader();
                        }
                        if ((totalPaginas - 1) == 1) {
                            document.getElementById("botonR").innerHTML = "";

                        }
                        if (accion == "buscar" && totalPaginas > 1) {
                            document.getElementById("divTotalPaginas").innerHTML = "";
                            document.getElementById("divPaginaActual").innerHTML = "";
                            divTotalPaginas.innerHTML += `<p>Paginas: ${totalPaginas-1}</p>`;
                            divPaginaActual.innerHTML += `<p id="paginaActual">1/${totalPaginas-1}</p>`;

                        }

                        imprimirPaginacion(totalPaginas, "busqueda", resultadosBusqueda);
                        let totPag = totalPaginas - 1;
                        imprimirBotones(totPag);



                    }

                }



            }
        }
        request.send();
    } else {



        if (accion === "buttonSide") {
            var arrayPokes = pokeNames;

        } else {
            var arrayPokes = pokeNames.split(",");
        }


        //console.log(arrayPokes);
        document.getElementById("pSub").innerHTML += arrayPokes.length;
        document.getElementById("cards").innerHTML = "";
        document.getElementById("paginas").innerHTML = "";
        document.getElementById("divTotalPaginas").innerHTML = "";
        document.getElementById("divPaginaActual").innerHTML = "";
        if (pagina <= 1) {
            var ini = 0;
            if (arrayPokes.length > 14) {
                var fin = 14;
            }
            if (arrayPokes.length <= 14) {
                var fin = arrayPokes.length - 1;
            }
        }
        if (pagina >= 2) {
            var ini = (pagina * 15) - 15;
            var fin = (pagina * 15) - 1;
        }
        var totalPaginas = (Math.ceil(arrayPokes.length / 15)) + 1;
        //console.log(totalPaginas + " total paginas")
        //console.log(pagina + "  pagina")
        if (pagina === (totalPaginas - 1)) {
            //console.log("se borra el boton")
            document.getElementById("botonR").innerHTML = "";
        } else {
            //borramos de existir y reimprimimos el boton derecho
            document.getElementById("botonR").innerHTML = "";
            botonR.innerHTML += `<button onclick="recorrerPagina('right')" href="#">&raquo;</button>`;

        }
        if (pagina === totalPaginas) {
            var ini = (pagina * 15) - 30;
            var fin = (pagina * 15) - 16;
            //console.log("se pása del limite")
        }

        for (var i = ini; i <= fin; i++) {
            var enlace = "https://pokeapi.co/api/v2/pokemon/" + arrayPokes[i];
            principal(enlace);
        }




        divTotalPaginas.innerHTML += `<p>Paginas: ${totalPaginas-1}</p>`;

        divPaginaActual.innerHTML += `<p id="paginaActual">${pagina}/${totalPaginas-1}</p>`;
        imprimirPaginacion(totalPaginas, "busqueda", arrayPokes);
        var totalPaginas = totalPaginas - 1;

        imprimirBotones(totalPaginas);
    }




}


function descripcionPokemon(id, nombre, concaTiposDescripcion) {
    var link = "https://pokeapi.co/api/v2/pokemon-species/" + id + "/";
    var request = new XMLHttpRequest();
    request.open("GET", link);
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            var datos = JSON.parse(request.responseText);
            var generacion = datos.generation.name;
            //console.log("la generacion es" +generacion);

            switch (generacion) {
                case "generation-viii":
                    var descrPoke = datos.flavor_text_entries[7].flavor_text;
                    break;
                case "generation-vii":
                    var descrPoke = datos.flavor_text_entries[17].flavor_text;
                    break;
                case "generation-v":
                    var descrPoke = datos.flavor_text_entries[1].flavor_text;
                    break;
                case "generation-i":
                    var descrPoke = datos.flavor_text_entries[8].flavor_text;
                    break;
                default:
                    var descrPoke = datos.flavor_text_entries[6].flavor_text;
            }




            var nombreMayusc = nombre.charAt(0).toUpperCase() + nombre.slice(1);
            var descripcionMinusc = descrPoke.toLowerCase();
            var descripcionSinPuntos = descripcionMinusc.replaceAll('.', ',');
            var descripcionFinal = descripcionSinPuntos.charAt(0).toUpperCase() + descripcionSinPuntos.slice(1, -1);

            var descripcionCompleta = document.getElementById('descripcion');
            descripcionCompleta.innerHTML += `<p>${nombreMayusc} is a ${concaTiposDescripcion} Pokemon. ${descripcionFinal}.</p>`


        }
    }

    request.send();

}

function imprimirDatos(id, nombre, concaTipos, imagen, HP, ataque, defensa, specialAttack, specialDeffense, speed, base_experience, altura, numeroPokedex, peso, cardColor, form) {
    //console.log(form);
    if (form == "alterna") {
        var numeroPokedex = "<i class='fas fa-certificate'></i>";
    } else if (form == "mega") {
        var numeroPokedex = "<img src='img/gen/mega.png'/> ";
    } else if (form == "pika") {
        var numeroPokedex = "<img src='img/pikachu.png'/>"
    } else if (form == "gmax") {
        var numeroPokedex = "<img src='img/gmax.png'/>"
    } else {

    }


    var tipos = concaTipos.split(',');
    //console.log(tipos);
    document.getElementById("info").innerHTML = "";
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("closeModal")[0];
    modal.style.display = "block";

    //boton cerrar modal
    span.onclick = function() {
        //console.log("click en boton");
        modal.style.display = "none";
    }

    //cerrar modal si se hace click fuera de el
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }




    if (tipos.length > 1) {
        var tipo1 = tipos[0];
        var tipo2 = tipos[1];
        var concaTiposIMG = "<img  id='imgTipoModal' class='cardTypes' src='img/types/" + tipo1 + ".png' alt='" + tipo1 + "' >" + "<img id='imgTipoModal2'class='cardTypes' src='img/types/" + tipo2 + ".png' alt='" + tipo2 + "' >";
        var concaTiposDescripcion = "dual-type " + tipo1 + "/" + tipo2;
        //console.log(concaTiposIMG);
    } else {
        var tipo1 = tipos[0];
        var concaTiposIMG = "<img id='imgTipoModal' class='cardTypes' src='img/types/" + tipo1 + ".png' alt='" + tipo1 + "' >";
        //console.log(concaTiposIMG);
        var concaTiposDescripcion = tipo1 + " type";
    }

    var porAtaque = (ataque / 260) * 100;
    var porHP = (HP / 260) * 100;
    var porDefensa = (defensa / 260) * 100;
    var porSpecialAttack = (specialAttack / 260) * 100;
    var porSpecialDefense = (specialDeffense / 260) * 100;
    var porSpeed = (speed / 260) * 100;

    var barColorRed = "linear-gradient(97deg, rgb(239 20 20 / 53%) 0%, rgb(255 0 0 / 60%) 100%)";
    var barColorYellow = "linear-gradient(97deg, rgb(226 255 0 / 52%) 0%, rgb(167 171 0 / 58%) 100%)";
    var barColorGreen = "linear-gradient(97deg, rgb(29 202 81 / 71%) 0%, rgb(24 144 0 / 67%) 100%)";
    var barColorBlue = "linear-gradient(97deg, rgb(14 92 189 / 58%) 0%, rgb(2 57 105 / 67%) 100%)";

    if (porAtaque < 25) {
        var atackBarColor = barColorRed;
    } else if (porAtaque >= 25 && porAtaque <= 40) {
        var atackBarColor = barColorYellow;
    } else if (porAtaque > 40 && porAtaque <= 70) {
        var atackBarColor = barColorGreen;
    } else if (porAtaque > 70) {
        var atackBarColor = barColorBlue;
    }

    if (porHP < 25) {
        var hpBarColor = barColorRed;
    } else if (porHP >= 25 && porHP <= 40) {
        var hpBarColor = barColorYellow;
    } else if (porHP > 40 && porHP <= 70) {
        var hpBarColor = barColorGreen;
    } else if (porHP > 70) {
        var hpBarColor = barColorBlue;
    }

    if (porDefensa < 25) {
        var defensaBarColor = barColorRed;
    } else if (porDefensa >= 25 && porDefensa <= 40) {
        var defensaBarColor = barColorYellow;
    } else if (porDefensa > 40 && porDefensa <= 70) {
        var defensaBarColor = barColorGreen;
    } else if (porDefensa > 70) {
        var defensaBarColor = barColorBlue;
    }

    if (porSpecialAttack < 25) {
        var specialAtackBarColor = barColorRed;
    } else if (porSpecialAttack >= 25 && porSpecialAttack <= 40) {
        var specialAtackBarColor = barColorYellow;
    } else if (porSpecialAttack > 40 && porSpecialAttack <= 70) {
        var specialAtackBarColor = barColorGreen;
    } else if (porSpecialAttack > 70) {
        var specialAtackBarColor = barColorBlue;
    }

    if (porSpecialDefense < 25) {
        var specialDefenseBarColor = barColorRed;
    } else if (porSpecialDefense >= 25 && porSpecialDefense <= 40) {
        var specialDefenseBarColor = barColorYellow;
    } else if (porSpecialDefense > 40 && porSpecialDefense <= 70) {
        var specialDefenseBarColor = barColorGreen;
    } else if (porSpecialDefense > 70) {
        var specialDefenseBarColor = barColorBlue;
    }

    if (porSpeed < 25) {
        var speedBarColor = barColorRed;
    } else if (porSpeed >= 25 && porSpeed <= 40) {
        var speedBarColor = barColorYellow;
    } else if (porSpeed > 40 && porSpeed <= 70) {
        var speedBarColor = barColorGreen;
    } else if (porSpeed > 70) {
        var speedBarColor = barColorBlue;
    }

    var height = altura / 10;
    var weight = peso / 10;




    info.innerHTML += `

                        
                    <div style="background: ${cardColor}; border-radius:30px;box-shadow: 3px 1px 20px 6px rgb(100 100 100" >
                        <div class="modalDataContainer">
                            
                            <div class="img-container">
                                <div class="imagen">
                                    <img class="infoModalPokeIMG" src="${imagen}" alt="nombre">
                                    
                                </div>
                            <p class="numberP">${numeroPokedex}</p>
                            <p class="infoblock_title">${nombre}</p>
                            <small class="typesModal"><span>${concaTiposIMG}</span></small>
                            

                            </div>
                            <div class="descripcion" id="descripcion">
                                
                            </div>
                            <div class="infoblock">

                                <div class="statsBars">

                                    <p class="infoblock_p_stats" ><i class="fas fa-heart"></i> HP</p>
                                    <div class="statBar">
                                        <div class="statBarColored" style="width:${porHP}%;background: ${hpBarColor};"><p class ="statsBarText">${HP}</p>
                                        </div>
                                    </div>
                                </div>
                                

                                <div class="statsBars" >
                                    <p class="infoblock_p_stats" ><i class="fas fa-fist-raised"></i> Atack</p>
                                    <div class="statBar">
                                        <div class="statBarColored" style="width:${porAtaque}%;background:${atackBarColor};"><p class ="statsBarText">${ataque}</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="statsBars" >
                                    <p class="infoblock_p_stats" ><i class="fas fa-shield-alt"></i> Defense</p>
                                    <div class="statBar">
                                        <div class="statBarColored" style="width:${porDefensa}%; background: ${defensaBarColor};"><p class="statsBarText">${defensa}</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="statsBars" >
                                    <p class="infoblock_p_stats" ><i class="fab fa-battle-net"></i> Special Atack </p>
                                    <div class="statBar">
                                        <div class="statBarColored" style="width:${porSpecialAttack}%; background: ${specialAtackBarColor};"><p class ="statsBarText">${specialAttack}</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="statsBars" >
                                    <p class="infoblock_p_stats" ><i class="fas fa-hand-sparkles"></i> Special Defense </p>
                                    <div class="statBar">
                                        <div class="statBarColored" style="width:${porSpecialDefense}%; background: ${specialDefenseBarColor};"><p class ="statsBarText">${specialDeffense}</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="statsBars" >
                                    <p class="infoblock_p_stats" ><i class="fas fa-tachometer-alt"></i> Speed</p>
                                    <div class="statBar">
                                        <div class="statBarColored" style=" width:${porSpeed}%; background: ${speedBarColor};"><p class ="statsBarText">${speed}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            
                            <div class="infoblock_footer">
                                <p>Base XP: ${base_experience}</p>
                                <p>Weight: ${weight} kg</p>
                                <p>Height: ${height} mts</p>
                            </div>
                        </div>
                    </div>
                       
                        
                        

                         `
    descripcionPokemon(id, nombre, concaTiposDescripcion)

    var miniaturaTypes = document.getElementById("imgTipoModal");

    miniaturaTypes.addEventListener("click", async function(event) {
        var tipo = miniaturaTypes.alt;

        load(tipo);
        modal.style.display = "none";
    });
    var miniaturaTypes2 = document.getElementById("imgTipoModal2");

    miniaturaTypes2.addEventListener("click", async function(event) {
        var tipo = miniaturaTypes2.alt;

        load(tipo);
        modal.style.display = "none";
    });
}



function generaciones() {
    generacionesBlock.style.display = 'block';
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        generacionesBlock.style.display = "none";
    }

}

var gen = [];
var indiceGen = [];

function filtroGeneracion(generacion, pagina, side, indice) {
    showLoader();
    document.getElementById("subtitulo").innerHTML = "";
    document.getElementById("cards").innerHTML = "";



    if (side == "right" || side == "left") {

        var genCount = gen.length - 1;

        var generacion = gen[genCount];



        //console.log("side no es null "+generacion);
    }

    if (pagina == undefined || pagina == 1) {
        var inicio = 0
        var fin = 14;
    }
    if (pagina >= 1) {
        var inicio = (pagina * 15) - 15;
        var fin = inicio + 14;
    }
    //console.log(pagina);
    if (generacion == "Unknown") {
        //console.log("desconocido ");
        for (var i = 808; i < 810; i++) {
            var link = "https://pokeapi.co/api/v2/pokemon/" + i;
            principal(link);
        }
        paginas.innerHTML = '';
        imprimirBotones(1)
        subtitulo.innerHTML = "";
        subtitulo.innerHTML += `<p id="pSub" >2 results of Unknown Pokemon</p>`;
        document.getElementById("divPaginaActual").innerHTML = "";
        document.getElementById("divTotalPaginas").innerHTML = "";
        divTotalPaginas.innerHTML += `<p>Paginas: 1</p>`;
        divPaginaActual.innerHTML += `<p id="paginaActual">1/1</p>`;
    }
    if (generacion == "mega") {
        var pokeLinks = indiceGen;


        if (pagina == undefined) {
            var inicio = 10132;
            var final = 10193;
            var contador = 0;
            for (var i = inicio; i <= final; i++) {
                var link = "https://pokeapi.co/api/v2/pokemon-form/" + i;
                var request = new XMLHttpRequest();
                request.open("GET", link, false);
                request.onreadystatechange = function() {
                    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                        var datos = JSON.parse(request.responseText);
                        var forma = datos.form_name;
                        var enlace = datos.pokemon.url;
                        if (forma == "mega" && contador < 15) {
                            contador++;
                            principal(enlace);
                            //console.log(contador);
                            indiceGen.push(enlace);
                        } else if (forma == "mega" && contador >= 15) {
                            indiceGen.push(enlace);
                        }
                        subtitulo.innerHTML = "";
                        subtitulo.innerHTML += `<p id="pSub" >${indiceGen.length} results of MEGA EVOLUTIONS</p>`;
                        var totalPaginas = (Math.ceil(indiceGen.length / 15));
                        document.getElementById("divPaginaActual").innerHTML = "";
                        document.getElementById("divTotalPaginas").innerHTML = "";
                        divTotalPaginas.innerHTML += `<p>Paginas: ${totalPaginas}</p>`;
                        divPaginaActual.innerHTML += `<p id="paginaActual">1/${totalPaginas}</p>`;
                        imprimirPaginacion(totalPaginas, "filtroGeneracionMEGA", indiceGen);
                        imprimirBotones(totalPaginas);
                    }

                }
                request.send();

            }

        } else if (pagina >= 1) {

            for (var i = inicio; i <= fin; i++) {
                if (i < pokeLinks.length) {
                    principal(pokeLinks[i]);
                }
            }
            var totalPaginas = (Math.ceil(pokeLinks.length / 15));
            subtitulo.innerHTML += `<p id="pSub" >${pokeLinks.length} results of MEGA EVOLUTIONS</p>`;
            document.getElementById("divPaginaActual").innerHTML = "";
            document.getElementById("divTotalPaginas").innerHTML = "";
            divTotalPaginas.innerHTML += `<p>Paginas: ${totalPaginas}</p>`;
            divPaginaActual.innerHTML += `<p id="paginaActual">${pagina}/${totalPaginas}</p>`;
            imprimirPaginacion(totalPaginas, "filtroGeneracionMEGA", pokeLinks);
            imprimirBotones(totalPaginas);

        }



    } else {




        var link = "https://pokeapi.co/api/v2/generation/" + generacion + "/";
        var request = new XMLHttpRequest();
        request.open("GET", link);
        request.onreadystatechange = function() {
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                var datos = JSON.parse(request.responseText);

                var count = datos.pokemon_species.length;
                var totalPaginas = (Math.ceil(count / 15));
                //console.log("cantidad de data " + count);

                subtitulo.innerHTML += `<p id="pSub" >${count} results from the ${datos.main_region.name} region</p>`;


                document.getElementById("divPaginaActual").innerHTML = "";
                document.getElementById("divTotalPaginas").innerHTML = "";
                divTotalPaginas.innerHTML += `<p>Paginas: ${totalPaginas}</p>`;
                divPaginaActual.innerHTML += `<p id="paginaActual">${pagina}/${totalPaginas}</p>`;


                if (fin > (count - 1)) {
                    if (inicio == (count)) {
                        var enlace = "https://pokeapi.co/api/v2/pokemon/" + fin;
                        principal(enlace);



                    } else {
                        var final = count - 1;
                        //console.log("el final se pasa y es" + final);
                    }

                    //console.log("es mayor y se sale final "+final);
                } else {
                    var final = fin;
                }



                //console.log(inicio+" inicio y final " +final)
                for (var i = inicio; i <= final; i++) {

                    var pokeId = datos.pokemon_species[i].url;
                    var id = pokeId.slice(42);

                    var enlace = "https://pokeapi.co/api/v2/pokemon/" + id;

                    principal(enlace);
                }
                imprimirPaginacion(totalPaginas, "filtroGeneracion", generacion);
                imprimirBotones(totalPaginas);



            }
        }
        gen.push(generacion);

        request.send();
    }
}



function closeLoader() {
    var modalLoading = document.getElementById("modalLoading");
    modalLoading.style.display = "none";
}


function showLoader() {
    return new Promise(function(resolve, reject) {
        var modalLoading = document.getElementById("modalLoading");
        modalLoading.style.display = 'block';
        //console.log("si entra");
        setTimeout(resolve, 2000);
    })
}

function backgroundRandom() {
    var background = [
        "background:linear-gradient(to right, #D4D3DD, #EFEFBB)",
        "background:linear-gradient(to right, #a9a2e4, #94fdc3)",
        "background:linear-gradient(to right, #6ad495db, #bc94fd)"
    ];
    var body = document.getElementById("body");
    var fondo = background[2];
    body.style.background = fondo;

    //console.log(fondo);


}

var menuSection = document.querySelectorAll('.header-menu-tab');
var iconMenu = document.querySelectorAll('.icon');

//console.log(menuSection.length);
//console.log(iconMenu.length);

for (var i = 0; i < menuSection.length; i++) {
    menuSection[i].addEventListener("mouseover", function() {
        //console.log(this.toString());
        if (this.toString().includes('#gen')) {
            iconMenu[2].style.color = "#d4b743";
        } else if (this.toString().includes('#types')) {
            iconMenu[1].style.color = "#d4b743";
        } else {
            iconMenu[0].style.color = "#d4b743";
        }


    })
    menuSection[i].addEventListener("mouseout", function() {
        //console.log(this.toString());
        if (this.toString().includes('#gen')) {
            iconMenu[2].style.color = "#9099b7";
        } else if (this.toString().includes('#types')) {
            iconMenu[1].style.color = "#9099b7";
        } else {
            iconMenu[0].style.color = "#9099b7";
        }


    })
}