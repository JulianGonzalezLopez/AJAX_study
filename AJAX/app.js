//EXPLICACION DE COMO USAR AJAX
(()=>{
    console.log(1);
    //Se instancia un objeto XML...
    const xhr = new XMLHttpRequest()
    //Se crea un fragmento para evitar el reflow continuo a la hora de trabajarlo
    const $fragment = document.createDocumentFragment();
    const $ol = document.getElementById("xhr-ol");
    let placeholder = document.createElement("img");
    placeholder.classList.add("rotar");
    placeholder.src = "krilin.jfif";
    try{
        $ol.appendChild(placeholder);
    }
    catch(e){
        console.log(e);
    }
    console.log("???")
    //Agregarle los eventos que vamos a manipular en la peticion
    //este evento va a "pasar" por los 4 estados de una petición (aparte del uninitialized) loading, loaded, interactive, complete. Así que el codigo se va a ejecutar 4 veces
    xhr.addEventListener("readystatechange",()=>{
        //Se usa esta validación para evitar ejecutar codigo antes de que el readyState sea complete
        //EVITANDO que se repita el codigo cuando no nos interesa
        if(!xhr.readyState == 4) return
        //Con esto solo ejecutamos codigo
         
        //caso <300: si tuvimos una respuesta positiva
        //caso <400: si tuvimos una respuesta positiva o una redireccion
        if(xhr.status >=200 && xhr.status < 300){
            console.log(typeof xhr.response);
            console.log(xhr.response);
            console.log(xhr.responseText)
            let auxResponse = JSON.parse(xhr.response);
            console.log(auxResponse);
            auxResponse.forEach(e => {
                let auxLi = document.createElement("li");
                let auxNombre = document.createElement("p");
                auxNombre.textContent = `Hi, my name is ${e.username}, you can contact me at ${e.website} or ${e.phone}`;
                auxLi.appendChild(auxNombre);
                $fragment.appendChild(auxLi);
            });
            $ol.appendChild($fragment);
        }
        else{
            let message = xhr.statusText || "Ocurrio un error";
            $ol.innerHTML = `Error ${xhr.status}: ${message}`;
        }
    })
    //Abrir la peticion estableciendo el metodo que se va a usar y el recurso/endpoint
    xhr.open("get","https://jsonplaceholder.typicode.com/users");
    //Enviar la peticion
    xhr.send();
})();

(()=>{
    console.log(2);

    const $fragment = document.createDocumentFragment();
    const $ol = document.getElementById("fetch-ol");
    //Para hacer lo mismo solo llamamos al metodo fetch con la direccion a la que va a conectar/pedir datos 
    //y un objeto options, pero funciona sin este por defecto (podemos cambiar el metodo, la cabecera y el course)
    //Esto ultimo seria como el declarar el xhr.open("get", URL)
    //TRABAJA CON PROMESAS
    fetch("https://jsonplaceholder.typicode.com/users")
    //Resultante de fetch
    .then((res)=>{
        //La respuesta viene en el body, siendo ReadableStream
        console.log(res);
        //Si la respuesta en su prop Ok es verdadera, devolve res.json(), sino, rechazala y anda a catch
        return res.ok ? res.json() : Promise.reject();
    })
    .then((json)=>{
        console.log(typeof json);
        json.forEach(e => {
            let auxLi = document.createElement("li");
            let auxNombre = document.createElement("p");
            auxNombre.textContent = `Hi, my name is ${e.username}, you can contact me at ${e.website} or ${e.phone}`;
            auxLi.appendChild(auxNombre);
            $fragment.appendChild(auxLi);
        });
        $ol.appendChild($fragment);
    })
    //Errores en el fetch
    .catch((err)=>{
        console.log(err);
        let message = err.statusText || "Ocurrio un error";
        $ol.innerHTML = `Error ${err.status}: ${message}`;
    })
    //PARA REALIZAR SI O SI (ej sacar un placeholder de pantalla)
    .finally(()=>{
        console.log("esto se ejecuta si o si");
    })
})();

(()=>{
    console.log(3);
    
    const $fragment = document.createDocumentFragment();
    const $ol = document.getElementById("fetch-await-ol");

    async function getData(){
        try{
            let response = await fetch("https://jsonplaceholder.typicode.com/users");
            let json = await response.json();
            console.log(json);
            json.forEach((e)=>{
                let auxLi = document.createElement("li");
                let auxNombre = document.createElement("p");
                auxNombre.textContent = `Hi, my name is ${e.username}, you can contact me at ${e.website} or ${e.phone}`;
                auxLi.appendChild(auxNombre);
                $fragment.appendChild(auxLi);
            })
            $ol.appendChild($fragment);
            console.log("nashee")
        }
        catch(err){
            console.log(`ERROR: ${err}`);
        }
    }
    getData();
})();


(()=>{
    const $fragment = document.createDocumentFragment();
    const $ol = document.getElementById("axios-ol");


    axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res)=>{
        res.data.forEach((e)=>{
            let auxLi = document.createElement("li");
            let auxNombre = document.createElement("p");
            auxNombre.textContent = `Hi, my name is ${e.username}, you can contact me at ${e.website} or ${e.phone}`;
            auxLi.appendChild(auxNombre);
            $fragment.appendChild(auxLi);
        })
        $ol.appendChild($fragment);
        console.log("nashee")
    })
    .catch((err)=>{
        console.log(err);
    })
    .finally(()=>{
        console.log("Me llevo a tu wacha");
    })

})();


(()=>{
    const $fragment = document.createDocumentFragment();
    const $ol = document.getElementById("axios-async-ol");
    async function getData(){
        try{
            let res = await axios.get("https://jsonplaceholder.typicode.com/users");
            let data = await res.data;
            data.forEach((e)=>{
                let auxLi = document.createElement("li");
                let auxNombre = document.createElement("p");
                auxNombre.textContent = `Hi, my name is ${e.username}, you can contact me at ${e.website} or ${e.phone}`;
                auxLi.appendChild(auxNombre);
                $fragment.appendChild(auxLi);
            })
            $ol.appendChild($fragment); 
            console.log("nashee")
        }
        catch(e){
            console.log(e.response.status);    
        }
        finally{
            console.log("y no tengo un sope");
        }
    }
    getData();
})();

(()=>{

})