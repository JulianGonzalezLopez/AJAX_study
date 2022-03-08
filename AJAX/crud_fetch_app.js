const $table = document.getElementById("crud-table");
const $form = document.getElementById("crud-form");
const $title = document.getElementsByClassName("crud-title");
const $template = document.getElementById("crud-template").content;
const $fragment = document.createDocumentFragment();

const con = async (url,options,success,error) =>{
    try{
        let res = await fetch(url,options);
        let json = await res.json();
        if(!res.ok) throw {status:res.status, statusText:res.statusText};
        success(json);
    }
    catch(err){
        error(err);
    }

}

window.addEventListener("DOMContentLoaded",con("http://localhost:3000/namekianos",{method:"GET",headers:{"Content-type":"application/json; charset=utf-8"}},(json)=>{
    [...json].forEach((el)=>{
        $template.querySelector("#td-nombre").textContent = el.nombre;
        $template.querySelector("#td-tecnica").textContent = el.tecnica;
        $template.querySelector(".edit").dataset.id = el.id;
        $template.querySelector(".edit").dataset.nombre = el.nombre;
        $template.querySelector(".edit").dataset.tecnica = el.tecnica;
        $template.querySelector(".delete").dataset.id = el.id;
        $template.querySelector(".delete").dataset.nombre = el.nombre;
        let $clon = document.importNode($template,true);
        $fragment.appendChild($clon);
    })
    $table.querySelector("tbody").appendChild($fragment);
},(err)=>{
    console.log(err.status);
}));

document.addEventListener("click",(e)=>{
    console.log(e.target);
    if(e.target.matches(".edit")){
        $form.querySelector("input[name='nombre']").value = e.target.dataset.nombre;
        $form.querySelector("input[name='tecnica']").value = e.target.dataset.tecnica;
        $form.querySelector("input[name='id']").dataset.id = e.target.dataset.id;
    }
    else if(e.target.matches(".delete")){
        console.log(e.target.dataset)
        let x = confirm(`¿Realmente deseas eliminar a ${e.target.dataset.nombre}?`);
        if (x == true){
            con(`http://localhost:3000/namekianos/${e.target.dataset.id}`,{
                method:"DELETE",
                headers:{"Content-type":"application/json; charset=utf-8"}
            },
            (json)=>{
                console.log(`Se ha eliminado ${e.target.dataset.nombre} exitosamente`);
                location.reload();
            },
            (err)=>{
                console.log(err);
            })
        }
    }
    else if(e.target.matches("input[type='submit']")){
        console.log(e.target.dataset.id)
        e.preventDefault();
        //COMPLEXION DE LOS CAMPOS
        if($form.querySelector("input[name='nombre']").value == "" || $form.querySelector("input[name='tecnica']").value == "" ){
            alert("Complete los campos primero");
            return;
        }
        //TENENCIA DE ID => MODIFICACION
        if($form.querySelector("input[name='id']").dataset.id){

            con(`http://localhost:3000/namekianos/${$form.querySelector("input[name='id']").dataset.id}`,{method:"PUT",
            headers:{"Content-type":"application/json; charset=utf-8"},
            body:JSON.stringify({
                nombre: $form.querySelector("input[name='nombre']").value,
                tecnica: $form.querySelector("input[name='tecnica']").value
            })},
            ()=>{
                location.reload();
            },
            (err)=>{
                console.log(err);
            })
        }
        //NO ID => NUEVO
        else{
            con(`http://localhost:3000/namekianos`,{method:"POST",
            headers:{
                "Content-type":"application/json; charset=utf-8"
            },
            body:JSON.stringify({
                nombre: $form.querySelector("input[name='nombre']").value,
                tecnica: $form.querySelector("input[name='tecnica']").value
            })},
            (json)=>{
                console.log(json);
                location.reload();
            },
            (err)=>{
                console.log(err);
            })
        }
    }
})

