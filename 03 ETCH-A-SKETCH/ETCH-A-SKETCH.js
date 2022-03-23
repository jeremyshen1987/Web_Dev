
const container = document.querySelector('.container')

const box = document.createElement('div')
box.classList.add('box')
// box.innerHTML = 'haha'


for (i = 1; i <= 256; i++){

    container.appendChild(box.cloneNode(true))

}

function effect(){

    this.classList.add('sketching')

}

function removeClass(){

    this.classList.remove('sketching')
    
}


const boxes = document.querySelectorAll('.box')
boxes.forEach(item => item.addEventListener('mouseover', effect))


boxes.forEach(item => item.addEventListener('transitionend', removeClass))