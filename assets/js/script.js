//Mostrar todos los Digimon con su imagen, nombre y nivel.
//Función que inyectará los datos obtenidos de la API al html
function htmlInjection(digimon) {
    //Capturar el elemento en donde inyectaré los datos
    var elemento = document.getElementById("contenido");
    //Desestructuración, creo las constantes que guardarán los datos.
    const {img, name, level } = digimon;
    //Variable con la estructura html a inyectar
    var info = `
    <div class= "col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
    <div class="card text-center mx-auto" style="width: 15rem">
        <img src="${img}" class="card-img-top" alt="">
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><b>Nombre:</b> ${name}</li>
            <li class="list-group-item"><b>Nivel:</b> ${level}</li>
        </ul>
  </div>
  </div>
    ` 
    //inyección de la variable info en el html
    elemento.innerHTML += info;
}  
//Función asíncrona para obtener los datos
async function getData(){
    //Si se cumple la promesa se ejecuta el código dentro de try
    try{
        //Se guarda fetch en la variable promise. Una función asíncrona siempre va acompañada de await.
        var promise = await fetch("https://digimon-api.vercel.app/api/digimon");
        //Se guarda el método json en una variable
        var resultado = await promise.json();
        //Se muestra por consola los datos obtenidos
        console.log(resultado);
        for (let i = 0; i < resultado.length; i++) {
            htmlInjection(resultado[i]);
            
        }
        //Si no se cumple la promesa se ejecuta el código dentro de catch
    }catch(error){
        //Se imprime el error
        console.log(error)
    }
}
//Se ejecuta la función que obtiene los datos
getData();


//Ingresar un digimon en la barra de busqueda y obtener su info.
//Función que obtiene los datos de la API
function getData2(){
    //Capturar el elemento en donde inyectaré los datos
    var digimon = document.getElementById("buscarDigimon").value;
    fetch(`https://digimon-api.vercel.app/api/digimon/name/${digimon}`)
    .then(response => response.json())
    .then(data => {
        cardInyection(data[0]);
    })
}
//Función que inyectará los datos al html
function cardInyection(digimon){
    var card = `
    <div class= "col-12">
    <div class="card text-center mx-auto m-5" style="width: 15rem">
        <img src="${digimon.img}" class="card-img-top" alt="">
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><b>Nombre:</b> ${digimon.name}</li>
            <li class="list-group-item"><b>Nivel:</b> ${digimon.level}</li>
        </ul>
  </div>
  </div>
    ` 
    //Se inyecta la variable card al html
    document.getElementById("contenido").innerHTML = card;
}
//Evento submit, que muestra el digimon ingresado en el buscador
document.getElementById("formBuscador").addEventListener("submit", function(event){
    event.preventDefault();
    getData2();
})