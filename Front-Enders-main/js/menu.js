const checkbox = document.querySelector('#botao')
const menu1 = document.querySelector('.menu1')
const menu2 = document.querySelector('.menu2')
const lista = document.querySelector('#menu-lateral')

checkbox.addEventListener('click', () => {
    if(checkbox.checked){
        menu1.style.display = 'none'
        menu2.style.display = 'block'
        lista.classList.add('abrir')
    }else{
        menu1.style.display = 'block'
        menu2.style.display = 'none'
        lista.classList.remove('abrir')
    }
})