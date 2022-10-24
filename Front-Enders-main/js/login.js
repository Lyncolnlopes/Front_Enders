const form = document.querySelector('#form')
const botao = document.querySelector('#botao-continuar')

botao.addEventListener('click', () => {
    alert('Login realizado com sucesso!')
    form.reset()
})