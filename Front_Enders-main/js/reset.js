let button = document.querySelector('.btn')
let msg = document.querySelector('#mensagem')
let email = document.querySelector('.form-control')
let form = document.querySelector('#form').addEventListener("click", function(event){
event.preventDefault()
});

button.addEventListener('click', clicar)

function clicar() {
if (!email.value ==''){
msg.style.color = '#ffffff'
msg.style.fontSize = '12px'
msg.style.border = 'solid 1px #7fffd4'
msg.innerHTML=`Enviado! Você recebera um link em seu e-mail com as instruções para redefinir sua senha.`
email.value = ""
} else if (email.value ==''){
window.alert('Email não pode ficar em branco!')
}
}



