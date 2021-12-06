const boton = document.getElementById('probando')
const { v4: uuidv4 } = require('uuid');


boton.addEventListener('click',()=>{
    alert(uuidv4())
})