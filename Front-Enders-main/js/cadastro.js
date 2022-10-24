const form = document.querySelector('#form')
const local = document.querySelector('#local')
const enviar = document.querySelector('#enviar')

const Ncep = document.querySelector('#Ncep')
const botaoCep = document.querySelector('#botaoCep')
const buscarInput = document.querySelector('#buscar')
const buscar = document.querySelector('.buscar')

let cepInput = document.querySelector('#cep')
let estado = document.querySelector('#estados')
let cidade = document.querySelector('#cidade')
let bairro = document.querySelector('#bairro')
let rua = document.querySelector('#rua')
let inputSenha = document.querySelector('#senha1')



//VALIDAÇÕES JS - INICIO
class validacao {
    constructor(){
        this.validacoes = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validacao',
            'data-equal'
        ]
    }

    validator(form){
        let correnteValidacoes = document.querySelectorAll('#form .erro')

        if(correnteValidacoes.length > 0){
            this.limparvalidacoes(correnteValidacoes)
        }

        let inputs = form.getElementsByTagName('input')
        let inputsArray = [...inputs]

        inputsArray.forEach((input) => {
            for(let i = 0; this.validacoes.length > i; i++){

                if(input.getAttribute(this.validacoes[i]) != null){

                    let method = this.validacoes[i].replace('data-', '').replace('-', '')
                    let value = input.getAttribute(this.validacoes[i])

                    this[method](input, value)
                }
            }
        }, this)
    }

    required(input){
        let inputValue = input.value

        if(inputValue === ''){
            let erroMsg = `Esse campo é obrigatório!`

            this.printMsg(input, erroMsg)
        }
    }
    minlength(input, minValue){
        let inputLength = input.value.length

        let erroMsg = `O campo precisa ter  pelo menos ${minValue} caracteres!`

        if(inputLength < minValue){
            this.printMsg(input, erroMsg)
        }
    }
    maxlength(input, maxValue){
        let inputLength = input.value.length

        let erroMsg = `O campo precisa ter menos que ${maxValue} caracteres!`

        if(inputLength > maxValue){
            this.printMsg(input, erroMsg)
        }
    }
    emailvalidacao(input){
        let re = /\S+@\S+\.\S+/
        let email = input.value

        let erroMsg = `Insira um e-mail no padrão exemplo@email.com`

        if(!re.test(email)){
            this.printMsg(input, erroMsg)
        }
    }
    
    printMsg(input, msg){
        let erros = input.parentNode.querySelector('.erro')

        if(erros === null){
            let template = document.querySelector('.erro').cloneNode(true)

            template.textContent = msg

            let inputParent = input.parentNode

            template.classList.remove('template')
            
            inputParent.appendChild(template)
        }
    }
    limparvalidacoes(validacoes){
        validacoes.forEach(el => el.remove())
    }
}


//VALIDAÇÕES JS - FIM


//FUNÇÕES API - INICIO
const getViaCep = async (cepInput) => {
    const viaCepURL = `https://viacep.com.br/ws/${cepInput}/json/`
    const resp = await fetch(viaCepURL)
    const data = await resp.json()
    


    if(data.erro == true){
        alert('CPF inválido, por favor digite novamente.')

        local.style.display = 'none'

        return
    }

    estado.value = data.uf
    cidade.value = data.localidade
    bairro.value = data.bairro
    rua.value = data.logradouro
}

const getViaCepEnd = async (estado, cidade, rua) => {
    const viaEndURL = `https://viacep.com.br/ws/${estado.value}/${cidade.value}/${rua.value}/json/`
    const res = await fetch(viaEndURL)
    const data = await res.json()
    
    if(data.length === 0){
        alert('Informações inválidas, digite novamente.')
    }

    cepInput.value = data[0].cep
    bairro.value = data[0].bairro

    console.log(data)       
    return
    
}
//FUNÇÕES API - FIM


//EVENTOS - INICIO
cepInput.addEventListener('keyup', e => {
    const cepValue = e.target.value
    if(cepValue.length === 8){
        getViaCep(cepValue)
        local.style.display = 'flex'
    }
    
})

Ncep.addEventListener('click', () => {
    if(Ncep.checked){
        local.style.display = 'flex'
        buscar.style.display = 'flex'
    }else{
        local.style.display = 'none'
        buscar.style.display = 'none'
    }
})



buscarInput.addEventListener('click', event => {
    event.preventDefault()
    if(estado.value === '' || cidade.value === '' || rua.value === ''){
        alert('Preencha os campos de "Estado", "Cidade" e "Rua".'
        )
    }else{
        getViaCepEnd(estado, cidade, rua)
    }
})


enviar.addEventListener('click', event => {
    event.preventDefault()

    let validar = new validacao()
    validar.validator(form) 

    /*alert(`Cadastro realizado com sucesso!`)*/
})