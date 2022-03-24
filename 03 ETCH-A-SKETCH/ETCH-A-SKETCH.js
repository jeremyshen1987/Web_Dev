
const container = document.querySelector('.container')

const box = document.createElement('div')
box.classList.add('box')
// box.innerHTML = 'haha'


function createBoxes(Box_Num){

    for (i = 0; i < Box_Num; i++){

        container.appendChild(box.cloneNode(true))
    
    }

}

createBoxes(256)


function draw(){

    this.classList.add('sketching')

}

function erase(){

    this.classList.remove('sketching')

}


const boxes = document.querySelectorAll('.box')
boxes.forEach(item => item.addEventListener('mouseover', draw))

boxes.forEach(item => item.addEventListener('transitionend', erase))



function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}


function Modify_Box_Num(Num_Boxes_Side){


    removeElementsByClass('box')


    Boxes_Total = Math.pow(Num_Boxes_Side,2)
    
    Area_Per_Box = 640000 / Boxes_Total
    
    Width_Box = Math.pow(Area_Per_Box,0.5)

    
    createBoxes(Boxes_Total)

    
    new_boxes = document.querySelectorAll('.box')

    
    for(i = 0; i < Boxes_Total; i++){

        new_boxes[i].style.flex = '1 1 auto'
        new_boxes[i].style.width = `${Width_Box}px`
        new_boxes[i].style.height = `${Width_Box}px`
    
    }

    new_boxes.forEach(item => item.addEventListener('mouseover', draw))

    new_boxes.forEach(item => item.addEventListener('transitionend', erase))



}





