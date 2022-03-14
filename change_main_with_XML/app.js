const cambiarMain = () =>{
    const $main = document.querySelector("main");

    const getHTML = (options) =>{
        let {url, success, error} = options;
        let xhr = new XMLHttpRequest;
        xhr.addEventListener("readystatechange",()=>{
            if(xhr.readyState == 4){
                if(xhr.status >= 200 && xhr.status <= 300){
                    let html = xhr.responseText;
                    success(html);
                }
            }
            else{
                let message = xhr.statusText || "Ocurrio un error";
                error(message);
            }
        })
        xhr.open("GET",url);
        xhr.setRequestHeader("Content-type","text/html;charset=u}utf-8");
        xhr.send();
    }
    document.addEventListener("DOMContentLoaded",()=>{
        getHTML({
            url:"assets/home.html",
            success:html=>$main.innerHTML = html,
            error:err=>$main.innerHTML = `<h1>${err}</h1>`
        })
    })
    document.addEventListener("click",(e)=>{
        if(e.target.matches(".menu a")){
            e.preventDefault();
            getHTML({
                url: e.target.href,
                success:html=>$main.innerHTML = html,
                error:err=>$main.innerHTML = `<h1>${err}</h1>`
                
            })
        }
    })
}

cambiarMain();