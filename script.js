class Calculator{
    constructor(previousOpperandTextElement, currentOpperandTextElement){
        this.previousOpperandTextElement = previousOpperandTextElement
        this.currentOpperandTextElement = currentOpperandTextElement
        this.clear()
    }
    clear(){
        this.currentOpperand = ''
        this.previousOpperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOpperand = this.currentOpperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if (number === '.' && this.currentOpperand.includes('.'))
        return
        this.currentOpperand = this.currentOpperand.toString() + number.toString()
    }

    chooseOpperation(operation){
        if (this.currentOpperand === '') return
        if (this.previousOpperand !=='' ){
            this.compute()
        }
        this.operation = operation
        this.previousOpperand = this.currentOpperand
        this.currentOpperand = ''
    }

    compute(){
        let computation 
        const prev = parseFloat(this.previousOpperand)
        const current = parseFloat(this.currentOpperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
             case '÷':
                computation = prev / current
                break
            default: return
        }
        this.currentOpperand = computation
        this.operation = undefined
        this.previousOpperand = ''
    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerNumber = parseFloat(stringNumber.split('.')[0])
        const decimalNumber = (stringNumber.split('.')[1])
        let integerDisplay 
        if (isNaN(integerNumber)){
            integerDisplay = ''
        } else {
            integerDisplay = integerNumber.toLocaleString('en', {maximumFractionDigits :0})
        }
        if (decimalNumber != null){
            return `${integerDisplay}.${decimalNumber}`
        } else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOpperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOpperand)
        if (this.operation != null){
            this.previousOpperandTextElement.innerText = 
            `${ this.getDisplayNumber(this.previousOpperand)} ${this.operation}`
        } else {
            this.previousOpperandTextElement.innerText = ''
        }
    }
}




const numberButtons=document.querySelectorAll('[data-number]')
const operationButtons=document.querySelectorAll('[data-operation]')
const equalsButton=document.querySelector('[data-equals]')
const clearButton=document.querySelector('[data-clear]')
const deleteButton=document.querySelector('[data-delete]')
const previousOpperandTextElement=document.querySelector('[data-previous-opperand]')
const currentOpperandTextElement=document.querySelector('[data-current-opperand]')

const calculator = new Calculator(previousOpperandTextElement, 
    currentOpperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })

} )

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOpperation(button.innerText)
        calculator.updateDisplay()
    })

} )

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})