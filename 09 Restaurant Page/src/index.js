import contact from './contact'
import menu from './menu'
import './style.css';


function component() {

  
    console.log("function running");

    const container = document.querySelector('#content')

    container.innerHTML = ''

    const h1 = document.createElement('h1')
    h1.textContent = 'Oven Roasted Brisket'
    container.append(h1)


    const text_p1 = document.createElement('p')
    const text_p2 = document.createElement('p')

    text_p1.textContent = 'Brisket is a cut of meat from the breast or lower chest of beef or veal. The beef brisket is one of the nine beef primal cuts, though the definition of the cut differs internationally. The brisket muscles include the superficial and deep pectorals. As cattle do not have collar bones, these muscles support about 60% of the body weight of standing or moving cattle. This requires a significant amount of connective tissue, so the resulting meat must be cooked correctly to tenderise it.'
    text_p2.textContent = 'According to the Random House Dictionary of the English Language, Second Edition, the term derives from the Middle English brusket which comes from the earlier Old Norse brjósk, meaning cartilage. The cut overlies the sternum, ribs, and connecting costal cartilages.'
    container.append(text_p1, text_p2)

    document.body.append(container)

}

component()


const remove_highlight = ()=> {    
    
    const btn = document.getElementsByTagName('li')

    for(let i=0; i < btn.length; i++){
        btn[i].classList.remove('lime')
    }

}


const home_btn = document.querySelector('.home')
const menu_btn = document.querySelector('.menu')
const contact_btn = document.querySelector('.contact')

home_btn.onclick = () => { component(), remove_highlight(), this.classList.add('lime')}
menu_btn.onclick = () => { menu(), remove_highlight(), this.classList.add('lime') }
contact_btn.onclick = () => { contact(), remove_highlight(), this.classList.add('lime') }