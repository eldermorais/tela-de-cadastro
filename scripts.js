const fields = document.querySelectorAll('[required]')

function validateField(field){
    
    
    function verifyErrors(){
        let foundError = false
        for (let error in field.validity){
            
            if(field.validity[error] && !field.validity.valid){
                
                foundError = error
            }
        }
        
        return foundError
        
    }
    
    function customMessage(typeError){
        const messages = {
            text: {
                valueMissing:'Por favor, preencha este campo'
            },
            email: {
                valueMissing:'Email é obrigatório',
                typeMismatch:'Por favor, preencha um email válido'
            },
            password:{
                valueMissing: "Por favor, preencha este campo"
                
            }
            
        }
        
        return messages[field.type][typeError]
    }
    
    
    function setCustomMessage(message){
        
        const spanError = field.parentNode.querySelector('span.error')
        const inputError = field.parentNode.querySelector('.input')
        
        if(message){
            
            spanError.innerHTML = message
            inputError.classList.add('red')
            
        }else{
            
            inputError.classList.remove('red')
            spanError.innerHTML = ''
            
        }
        
        
    }
    
    return function() {
        
        
        const error = verifyErrors()
        
        
        if(error){
            const message = customMessage(error)
            setCustomMessage(message)
        }else{
            setCustomMessage()
        }
        
        
    }
    
}


function customValidation(event){        
    
    
    const field = event.target
    const validation = validateField(field)
    
    validation()
    
}
for(field of fields){
    field.addEventListener('invalid', event => {
        
        event.preventDefault()
        
        customValidation(event)
    })
    field.addEventListener('invalid', customValidation)
    field.addEventListener('blur', customValidation)
}

document.querySelector('form').addEventListener("submit", prevent)
function prevent(eventB){
    console.log("enviado")
    eventB.preventDefault()
}