console.log("index running");

const append_content = (function(){

    console.log("function running");
    const container = document.querySelector('#content')

    const h1 = document.createElement('h1')
    h1.textContent = 'Oven Roasted Brisket'
    container.append(h1)
    
    const image = document.createElement('img')
    image.src = '../src/Brisket.jpeg'
    container.append(image)


    const text_p1 = document.createElement('p')
    const text_p2 = document.createElement('p')
    
    text_p1.textContent = 'Brisket is a cut of meat from the breast or lower chest of beef or veal. The beef brisket is one of the nine beef primal cuts, though the definition of the cut differs internationally. The brisket muscles include the superficial and deep pectorals. As cattle do not have collar bones, these muscles support about 60% of the body weight of standing or moving cattle. This requires a significant amount of connective tissue, so the resulting meat must be cooked correctly to tenderise it.'
    text_p2.textContent = 'According to the Random House Dictionary of the English Language, Second Edition, the term derives from the Middle English brusket which comes from the earlier Old Norse brjósk, meaning cartilage. The cut overlies the sternum, ribs, and connecting costal cartilages.'
    container.append(text_p1)
    container.append(text_p2)
    
})()