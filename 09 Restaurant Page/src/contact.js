import icon from './map.jpg'

const contact = () => {

    console.log('contact')

    const container = document.querySelector('#content')

    container.innerHTML = ''

    const h1 = document.createElement('h1')
    h1.textContent = 'Contact Us'

    const h2 = document.createElement('h2')
    h2.textContent = 'Tel: 123-456-7890'

    const h3 = document.createElement('h2')
    h3.textContent = 'Address: 1 Main St, Toronto,ON'

    const image = new Image(600, 400)
    image.classList.add = 'map'
    image.src = icon


    container.append(image, h1, h2, h3)


}

export default contact;
