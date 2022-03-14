const footerTarget = document.querySelector("footer");
const headerTarget = document.querySelector("header");

let targets = [footerTarget,headerTarget];

const cargar = async (obj) =>{
    try{
        let {url, target} = obj;
        let res = await fetch(url);
        let html = await res.text();
        if(!res.ok) throw res.status;
        target.innerHTML = html;
    }
    catch(err){
        console.log(err);
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    cargar({
        url:"assets/footer.html",
        target: footerTarget
    });
    cargar({
        url:"assets/header.html",
        target: headerTarget
    });
})