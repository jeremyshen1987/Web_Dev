import contact from './contact'
import menu from './menu'
import './style.css';


function component() {

  
    console.log("function running");

    const container = document.querySelector('#content')

    container.innerHTML = ''

    const h1 = document.createElement('h1')
    h1.textContent = 'About Fastfood'
    container.append(h1)


    const text_p1 = document.createElement('p')
    const text_p2 = document.createElement('p')

    text_p1.style.fontSize = '2rem'
    text_p2.style.fontSize = '2rem'


    text_p1.textContent = 'Fast food is a type of mass-produced food designed for commercial resale and with a strong priority placed on "speed of service" versus other relevant factors involved in culinary science. Fast food was created as a commercial strategy to accommodate the larger numbers of busy commuters, travelers and wage workers who often did not have the time to sit down at a public house or diner and wait for their meal. In 2018, the fast food industry was worth an estimated $570 billion globally.'
    text_p2.textContent = 'The fastest form of "fast food" consists of pre-cooked meals kept in readiness for a customer\'s arrival (Boston Market rotisserie chicken, Little Caesars pizza, etc.), with waiting time reduced to mere seconds. Other fast food outlets, primarily the hamburger outlets (McDonald\'s, Burger King, etc.) use mass-produced pre-prepared ingredients (bagged buns and condiments, frozen beef patties, vegetables which are prewashed, pre-sliced, or both; etc.) but the hamburgers and french fries are always cooked fresh (or at least relatively recently) and assembled "to order" (like at a diner).'
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

home_btn.onclick = function(){component(), remove_highlight(), this.classList.add('lime')}
menu_btn.onclick = function(){ menu(), remove_highlight(), this.classList.add('lime') }
contact_btn.onclick = function(){ contact(), remove_highlight(), this.classList.add('lime') }

