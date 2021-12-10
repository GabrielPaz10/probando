const ejecutaar = document.getElementById('ejecutar')



ejecutaar.addEventListener('click',()=>{
    const entrada=(<HTMLInputElement>document.getElementById("entrada")).value
    alert(entrada)
    alert(typeof(entrada))
    
    
})