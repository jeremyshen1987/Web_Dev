function add(a,b){
    return a + b
}

function sub(a,b){
    return a - b
}

function multiply(a,b){
    return a * b
}

function divide(a,b){
    return a / b
}


screenLwr = document.querySelector('.screenLwr')
screenUpr = document.querySelector('.screenUppr')
Num_Buttons = document.querySelectorAll('.numbers')
Operator_Buttons = document.querySelectorAll('.operators')

let Num1
let Num2
let First_Operator
let Second_Operator

OperatorReady = false
ClearScreen = false

function AddNum(Num){

    console.log('run')

    if(ClearScreen){
        screenLwr.textContent = ''
        ClearScreen = false
    }

    screenLwr.textContent += Num

    

}

function GetOperator(Operator){

    if(ClearScreen){
        return
    }
    
    if(OperatorReady){

        Assessment(Operator)

    }

    if(Operator != '='){
        First_Operator = Operator
        OperatorReady = true
    }


    
    Num1 = parseFloat(screenLwr.textContent)
    ClearScreen = true
    console.log('end of GetOperator')

}

function Assessment(Operator){

    console.log('Assessment')
    Num2 = parseFloat(screenLwr.textContent)
    Second_Operator = Operator

    screenLwr.textContent = Cal_Result(Num1,Num2,First_Operator)
    screenUpr.textContent = `${Num1} ${First_Operator} ${Num2} ${Second_Operator}`

    Num1 = screenLwr.textContent
    Num2 = undefined
    

    
}


function Cal_Result(num1, num2, operator){

    switch(operator){
        case "+":
            return add(num1,num2)
        
        case "-":
            return sub(num1,num2)

        
        case "*":
            return multiply(num1,num2)
        
        case "/":
            return add(num1,num2)
        
        case "=":
            return divide(num1,num2)
        

    }

}




Num_Buttons.forEach( button => {
    button.addEventListener('click', ()=> AddNum(button.textContent))
})

Operator_Buttons.forEach( button => {
    button.addEventListener('click', ()=> GetOperator(button.textContent))
})
