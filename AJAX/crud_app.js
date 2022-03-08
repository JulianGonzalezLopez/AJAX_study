const $table = document.getElementById("crud-table");
const $form = document.getElementById("crud-form");
const $title = document.getElementsByClassName("crud-title");
const $template = document.getElementById("crud-template").content;
const $fragment = document.createDocumentFragment();

console.log($form)

const ajax_xhr = opt =>{
    let {url,method,sucess,error,data} = opt;
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", async ()=>{
        if(xhr.readyState !== 4){
            console.log("Not ready");
            return;
        }
        if(xhr.status >=200 && xhr.status < 300){
            let json = JSON.parse(await xhr.response);
            sucess(json);
        }
        else{
            let message =  xhr.statusText || "Ocurrio un error";
            error(message);
        }
    })
    xhr.open(method || "GET",url);
    xhr.setRequestHeader("Content-type","application/json; charset=utf-8");
    xhr.send(JSON.stringify(data));
}

const getAll = () =>{
    console.log("nashe");
    ajax_xhr({
        url:"http://localhost:3000/saiyans",
        sucess:res=>{
            console.log("RESPUESTA POSITIVA!!",res);
            res.forEach((el)=>{
                $template.querySelector(".td-nombre").textContent = el.nombre;
                $template.querySelector(".td-tecnica").textContent = el.tecnica;
                $template.querySelector(".edit").dataset.id = el.id;
                $template.querySelector(".edit").dataset.nombre = el.nombre;
                $template.querySelector(".edit").dataset.tecnica = el.tecnica;
                $template.querySelector(".delete").dataset.id = el.id;
                let $clon = document.importNode($template,true);
                $fragment.appendChild($clon);
            });
            $table.querySelector("tbody").appendChild($fragment);
            const $deleteBtn = document.getElementsByClassName("delete");
            [...$deleteBtn].forEach((e)=>{
                e.addEventListener("click",()=>{     
                    let conf = confirm(`Deseas eliminar permanentemente ${e.parentNode.parentNode.querySelector(".td-nombre").textContent}`);
                    if(conf == false){return}
                    ajax_xhr({  
                        method:"DELETE",
                        url:`http://localhost:3000/saiyans/${e.dataset.id}`,
                        sucess:(res)=>{
                            console.log(res);
                            location.reload();
                        },
                        error:(err)=>{
                            console.log(err);   
                            $form.insertAdjacentHTML("afterend",`<p>${err}</p>`)
                        },
                        data:{
                            nombre: $form.querySelector("input[name='nombre']").value,
                            tecnica:$form.querySelector("input[name='tecnica']").value
                        }   
                    })
                })
            })
            const $editBtn = document.getElementsByClassName("edit");
            [...$editBtn].forEach((e)=>{
                console.log("pingaaa");
                e.addEventListener("click",()=>{
                    console.log(document.querySelector("input[name='nombre']"));
                    document.querySelector("input[name='nombre']").value = e.dataset.nombre;
                    document.querySelector("input[name='tecnica']").value = e.dataset.tecnica;
                    document.querySelector("input[name='id']").value = e.dataset.id;
                })
            });
        },
        error:err =>{
            $table.insertAdjacentHTML("afterend", `<p>${err}</p>`)
        },
        data:null
    });

}

window.addEventListener("DOMContentLoaded",()=>{
    getAll();
    console.log("pingaaaaasdasdasd");
});


document.addEventListener("click",(e)=>{
    e.preventDefault();
    if(e.target === $form.querySelector("input[name='btn']")){

        if($form.querySelector("input[name='nombre']").value == "" || $form.querySelector("input[name='tecnica']").value == ""){
            alert("Debes completar ambos campos");
            return;
        }
        if(!$form.querySelector("input[name='id']").value){

            //CREATE---POST
            ajax_xhr({  
                method:"POST",
                url:"http://localhost:3000/saiyans",
                sucess:(res)=>{
                    console.log(res);
                    location.reload();
                },
                error:(err)=>{
                    console.log(err);
                    $form.insertAdjacentHTML("afterend",`<p>${err}</p>`)
                },
                data:{
                    nombre: $form.querySelector("input[name='nombre']").value,
                    tecnica:$form.querySelector("input[name='tecnica']").value
                }   
            })
        }
        else{
            //EDIT---PUT
            console.log("else a ocurrido");
            ajax_xhr({
                method:"PUT",
                url:`http://localhost:3000/saiyans/${$form.querySelector("input[name='id']").value}`,
                sucess:(res)=>{
                    console.log(res);
                    location.reload();
                },
                error:(err)=>{
                    console.log(err);
                    $form.insertAdjacentHTML("afterend",`<p>${err}</p>`)
                },
                data:{
                    nombre: $form.querySelector("input[name='nombre']").value,
                    tecnica:$form.querySelector("input[name='tecnica']").value
                }   
            })
        }
    }
});