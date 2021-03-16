const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')

const allClearButton = document.querySelector('[data-all-clear]')
const signchangerButton = document.querySelector('[data-sign-changer]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')

const previousText = document.querySelector('[data-previous-operand]')
const currentText = document.querySelector('[data-current-operand]')

const themeLight = document.querySelector('.theme-sun-icon')
const themeDark = document.querySelector('.theme-moon-icon')
const body = document.body

let disNum = ''
let firstNumber = ''
let secondNumber = ''
let result = null
let lastOperation = ''
let haveDot = false

//fires when number clicked
numberButtons.forEach((number) => {
    number.addEventListener('click', (e) => {
        if (e.target.innerText === '.') {
            console.log('. clicked')

            if (haveDot) {
                console.log('yes we have . before')
                return
            } else {
                console.log('this is the first time that i can see .')
                if (!firstNumber) {
                    firstNumber = '0'
                    console.log('first number', firstNumber)
                }
                haveDot = true
            }
        }
        firstNumber += e.target.innerText
        currentText.innerText = `${firstNumber}`
    })
})

// fires when operation buttons clicked
operationButtons.forEach((operation) => {
    operation.addEventListener('click', (e) => {
        haveDot = false
        lastOperation = e.target.innerText
        secondNumber = firstNumber
        previousText.innerText = `${secondNumber} ${lastOperation}`
        firstNumber = ''
    })
})

//fires when equal button clicked
equalsButton.addEventListener('click', () => {
    let num1 = parseFloat(firstNumber)
    let num2 = parseFloat(secondNumber)
    switch (lastOperation) {
        case '+':
            result = num2 + num1
            break
        case '-':
            result = num2 - num1
            break
        case 'X':
            result = num2 * num1
            break
        case '/':
            result = num2 / num1
            break
        case '%':
            result = num2 % num1
            break
    }
    console.log(result)

    previousText.innerText = `${secondNumber} ${lastOperation} ${firstNumber}`
    secondNumber = result
    firstNumber = result
    currentText.innerText = result
})
// Delete All
allClearButton.addEventListener('click', () => {
    deleteAll()
})
// Sign Changer
signchangerButton.addEventListener('click', () => {
    firstNumber = -firstNumber
    currentText.innerText = firstNumber
})

// Delete only one number
deleteButton.addEventListener('click', () => {
    deleteNumber()
})

const deleteNumber = () => {
    firstNumber = firstNumber.slice(0, -1)
    if (!firstNumber) firstNumber = '0'
    currentText.innerText = firstNumber
}

const deleteAll = () => {
    firstNumber = ''
    secondNumber = ''
    lastOperation = ''
    previousText.innerText = ``
    currentText.innerText = `0`
}

window.addEventListener('keydown', (e) => {
    if (
        e.key == '0' ||
        e.key == '1' ||
        e.key == '2' ||
        e.key == '3' ||
        e.key == '4' ||
        e.key == '5' ||
        e.key == '6' ||
        e.key == '7' ||
        e.key == '8' ||
        e.key == '9'

        // e.key == 'Backspace' ||
        // e.key == 'Delete' ||
        // e.key == 'Enter'
    ) {
        numberButtons.forEach((button) => {
            if (button.innerText == e.key) {
                button.click()
            }
        })
    } else if (e.key == '+' || e.key == '-' || e.key == '/' || e.key == '%') {
        operationButtons.forEach((operationbtn) => {
            if (operationbtn.innerText == e.key) {
                operationbtn.click()
            }
        })
    } else if (e.key == '*') {
        operationButtons[2].click()
    } else if (e.key == 'Backspace') {
        deleteNumber()
    } else if (e.key == 'Delete') {
        deleteAll()
    } else if (e.key == 'Enter') {
        equalsButton.click()
    }
})

themeLight.addEventListener('click', (btn) => {
    themeDark.classList.remove('active')
    themeLight.classList.add('active')
    body.classList.remove('theme-dark')
    body.classList.add('theme-light')
})
themeDark.addEventListener('click', (btn) => {
    themeLight.classList.remove('active')
    themeDark.classList.add('active')
    body.classList.remove('theme-light')
    body.classList.add('theme-dark')
})
