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

Clear_Button = document.querySelector('.clear')
Delete_Button = document.querySelector('.delete')


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
        console.log('get first operator')

        Num1 = parseFloat(screenLwr.textContent)
        ClearScreen = true
        console.log('end of GetOperator')
        screenUpr.textContent = screenLwr.textContent + First_Operator
    } 
    else{

        First_Operator = null
        OperatorReady = false
        
        console.log('equal null set')

    }
    


}


function Assessment(Operator){

    console.log('Assessment')
    Num2 = parseFloat(screenLwr.textContent)
    Second_Operator = Operator

    screenLwr.textContent = Cal_Result(Num1,Num2,First_Operator)

    if(Operator == '='){
        screenUpr.textContent = `${Num1} ${First_Operator} ${Num2} ${Second_Operator}`
    }else{
        screenUpr.textContent = screenLwr.textContent + `${Second_Operator}`
    }

    Num1 = screenLwr.textContent
    Num2 = undefined
    OperatorReady = false
    
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
            return divide(num1,num2)
    }

}

function clear(){

    Num1 = undefined
    Num2 = undefined
    First_Operator = undefined
    Second_Operator = undefined
    OperatorReady = false
    ClearScreen = false
    screenUpr.textContent = ''
    screenLwr.textContent = ''

}

function backspace(){

    console.log('remove')
    removed = screenLwr.textContent.slice(0,-1)
    screenLwr.textContent = removed

}



Num_Buttons.forEach( button => {
    button.addEventListener('click', ()=> AddNum(button.textContent))
})

Operator_Buttons.forEach( button => {
    button.addEventListener('click', ()=> GetOperator(button.textContent))
})

Clear_Button.addEventListener('click', clear)
Delete_Button.addEventListener('click', backspace)