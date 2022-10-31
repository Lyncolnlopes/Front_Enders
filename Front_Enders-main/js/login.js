class Validator {
    constructor(){
        this.validations = [
            'data-required',
            'data-email-validation',
            'data-min-length',
            'data-max-length',
        ]
    }

    validate(form){
        let currentValidations = document.querySelectorAll('#form .error-validation')

        if(currentValidations.length > 0){
            this.cleanValidations(currentValidations)
        }

        let inputs = form.getElementsByTagName('input')
        let inputsArray = [...inputs]

        inputsArray.forEach((input) => {
            for(let i = 0; this.validations.length > i; i++){

                if(input.getAttribute(this.validations[i]) != null){

                    let method = this.validations[i].replace('data-', '').replace('-', '')
                    let value = input.getAttribute(this.validations[i])

                    this[method](input, value)
                }
            }
        }, this)
    }

    required(input){
        let inputValue = input.value

        if(inputValue === ''){
            let errorMessage = `Esse campo é obrigatório!`

            this.printMessage(input, errorMessage)
        }
    }
    emailvalidation(input){
        let re = /\S+@\S+\.\S+/
        let email = input.value

        let errorMessage = `Insira um e-mail no padrão exemplo@email.com`

        if(!re.test(email)){
            this.printMessage(input, errorMessage)
        }
    }
    minlength(input, minValue){
        let inputLength = input.value.length

        let errorMessage = `O campo precisa ter  pelo menos ${minValue} caracteres!`

        if(inputLength < minValue){
            this.printMessage(input, errorMessage)
        }
    }
    maxlength(input, maxValue){
        let inputLength = input.value.length

        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres!`

        if(inputLength > maxValue){
            this.printMessage(input, errorMessage)
        }
    }
    
    printMessage(input, msg){
        let errorQty = input.parentNode.querySelector('.error-validation')

        if(errorQty === null){
            let template = document.querySelector('.error-validation').cloneNode(true)

            template.textContent = msg

            let inputParent = input.parentNode

            template.classList.remove('template')
            
            inputParent.appendChild(template)
        }
    }
    cleanValidations(validations){
        validations.forEach(el => el.remove())
    }
}


let submit = document.getElementById('botao-continuar')
let validator = new Validator()

submit.addEventListener('click', function (e){
    e.preventDefault()

    validator.validate(form)
})