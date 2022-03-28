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


const screenLwr = document.querySelector('.screenLwr')
const screenUpr = document.querySelector('.screenUppr')

const Num_Buttons = document.querySelectorAll('.numbers')
const Operator_Buttons = document.querySelectorAll('.operators')

const Clear_Button = document.querySelector('.clear')
const Delete_Button = document.querySelector('.delete')

 


let Num1
let Num2
let First_Operator
let Second_Operator

let OperatorReady = false
let ClearScreen = false

function AddNum(Num){

    console.log('run')

    if(Num == '.' && screenLwr.textContent.includes('.')){
        return
    }

    if(ClearScreen){
        screenLwr.textContent = ''
        ClearScreen = false
    }

    screenLwr.textContent += Num

    

}

function GetOperator(Operator){

    if(ClearScreen){
        First_Operator = Operator
        screenUpr.textContent = screenLwr.textContent + First_Operator
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
        ClearScreen = true
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

    if(OperatorReady = true) return
    removed = screenLwr.textContent.slice(0,-1)
    screenLwr.textContent = removed

}


function keyEvent(e){

    key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    console.log(key)
    if(Number.isInteger(parseInt(key.textContent))){
        console.log('kyedown running addNum')
        AddNum(key.textContent)
        return
    }
    if(key.textContent == '.') {
        AddNum('.'); 
        return
    }
    if(key.textContent == 'C'){
        clear()
        return
    }
    if(key.textContent == 'BKSP'){
        backspace()
        return
    }
    if(key.textContent == '=' || key.textContent == '+' || key.textContent == '-' || key.textContent == '*' || key.textContent == '/'){
        GetOperator(key.textContent)
        return
    }

}



Num_Buttons.forEach( button => {
    button.addEventListener('click', ()=> AddNum(button.textContent))
})

Operator_Buttons.forEach( button => {
    button.addEventListener('click', ()=> GetOperator(button.textContent))
})

Clear_Button.addEventListener('click', clear)
Delete_Button.addEventListener('click', backspace)


window.addEventListener('keydown',(e) => keyEvent(e))