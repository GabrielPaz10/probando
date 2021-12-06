const boton = document.getElementById('probando')
import { v4 as uuidv4 } from 'uuid';


boton.addEventListener('click',()=>{
    alert(uuidv4())
})