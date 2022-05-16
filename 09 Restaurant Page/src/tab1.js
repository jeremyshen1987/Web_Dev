
const myName = () => {

    const container = document.querySelector('#content')

    const h1 = document.createElement('h1')
    h1.textContent = 'Contact us '
    container.append(h1)

    return container
}

export default myName;
