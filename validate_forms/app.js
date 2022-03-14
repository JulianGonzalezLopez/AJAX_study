const $formVal = document.getElementById("form-val");
const $inputs = document.querySelectorAll("#form-val [required]");
const arrInputs = [...$inputs];
const $submitBtn = document.querySelector("#submit-val");
const $replaceDiv = document.querySelector("#replace");

document.addEventListener("submit",(e)=>{
    if(e.target === $formVal){
        e.preventDefault();
        $replaceDiv.innerHTML = '<img src="three-dots.svg" class="loaderVisible" alt=""></img>';
        fetch("https://formsubmit.co/ajax/ab72b771ef040cfbf0ea972f4c6b23ee",{
            method:"POST",
            body: new FormData(e.target)
        })
        .then(res=>res.ok ? res.json() : Promise.reject(res))
        .then((json)=>{
            console.log(json,"MIRE SU CASILLA DE CORREO");
        })
        .catch((err)=>{
            console.log(err);
        })
        .finally(()=>{
            $replaceDiv.classList.add("fade");  
            setTimeout(()=>{  
                $replaceDiv.innerHTML = 'El mensaje ha sido correctamente enviado'
                $replaceDiv.classList.remove("fade");
                setTimeout(()=>{ 
                    $replaceDiv.classList.add("fade");   
                    setTimeout(()=>{  
                        $replaceDiv.innerHTML = '<input type="submit" id="submit-val" value="Enviar">'
                        $replaceDiv.classList.remove("fade");
                    }, 2250);
                }, 500);
            }, 2250);

        })
    }
})

const daleViejo = (url) =>{



}
//arrInputs.forEach((e)=>{
/*     console.log(e);
    let span = document.createElement("span");
    let texto = e.getAttribute("title");
    span.innerText = texto;
    span.classList.add("spanStyle");
    span.id = e.getAttribute("name");
    e.insertAdjacentElement("afterend",span);
}); */