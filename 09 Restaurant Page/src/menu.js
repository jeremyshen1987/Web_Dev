import blt from './blt.jpeg'
import HP from './HP.jpg'
import salad from './salad.jpg'
import cake from './cake.jpg'

const menu = () => {

    console.log('menu')

    const container = document.querySelector('#content')

    container.innerHTML = ''

    const div_main = document.createElement('div')
    div_main.classList.add('menu_container')

    const div_item1 = document.createElement('div')
    const div_item2 = document.createElement('div')
    const div_item3 = document.createElement('div')
    const div_item4 = document.createElement('div')

    div_item1.classList.add('item_container')
    div_item2.classList.add('item_container')
    div_item3.classList.add('item_container')
    div_item4.classList.add('item_container')

    const item1_name = document.createElement('div')
    const item2_name = document.createElement('div')
    const item3_name = document.createElement('div')
    const item4_name = document.createElement('div')

    const item1_desc = document.createElement('p')
    const item2_desc = document.createElement('p')
    const item3_desc = document.createElement('p')
    const item4_desc = document.createElement('p')

    const item1_price = document.createElement('p')
    const item2_price = document.createElement('p')
    const item3_price = document.createElement('p')
    const item4_price = document.createElement('p')

    item1_name.textContent = 'BLT'
    item1_price.textContent = '$ 7.99 (1LB)'
    item1_desc.textContent = 'Bread, Bacon, lettuce, tomato, avocado '
    

    item2_name.textContent = 'Hawaiian Pizza'
    item2_price.textContent = '$ 3.99 (slice)'
    item2_desc.textContent = 'Pizza, Pineapple, Ham, Cheese, Mozzarella '

    item3_name.textContent = 'Greek Salad'
    item3_price.textContent = '$ 12.99 (340g)'
    item3_desc.textContent = 'Bell Pepper, Feta Cheese, Cucumber, Cherry Tomato '

    item4_name.textContent = 'Cheesecake'
    item4_price.textContent = '$ 2.99 (slice)'
    item4_desc.textContent = 'Sugar, Cream, Cheese, Egg, Sour Cream '

    const blt_img = new Image()
    blt_img.src = blt

    const HP_img = new Image()
    HP_img.src = HP

    const salad_img = new Image()
    salad_img.src = salad

    const cake_img = new Image()
    cake_img.src = cake

    div_item1.append(blt_img, item1_name, item1_price, item1_desc)
    div_item2.append(HP_img, item2_name, item2_price, item2_desc)
    div_item3.append(salad_img, item3_name, item3_price, item3_desc)
    div_item4.append(cake_img, item4_name, item4_price, item4_desc)

    div_main.append(div_item1, div_item2, div_item3, div_item4)
    container.append(div_main)
}

export default menu;
