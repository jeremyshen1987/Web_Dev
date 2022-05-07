
let library = []
counter = 0

const book =function (title, author, page, read) {

  this.title = title
  this.author = author
  this.read = read ? "you read this book" : "You didn't read or finished the book"
  this.page = page
  this.id = counter

  counter++
    
}
  

console.log('js loaded')

const form = document.getElementById('add_book')

form.addEventListener('submit', (e) => get_book_info(e))

function get_book_info(e){

  e.preventDefault()


  const title = document.getElementById('title')
  const author = document.getElementById('author')
  const page = document.getElementById('page')
  const read = document.getElementById('read')



  const new_book = new book(title.value, author.value, page.value, read.value)

  library.push(new_book)


  const books = document.querySelector('.books')
  const div = document.createElement('div')

  div.classList.add('single_book',`uid${counter}`)

  div_title = document.createElement('div')
  div_author = document.createElement('div')
  div_page = document.createElement('div')
  div_read = document.createElement('div')

  del_btn = document.createElement('button')
  del_btn.innerHTML = 'Remove'
  del_btn.onclick = function(){

    this.parentElement.remove()
    alert(this.parentElement.classList)

  };

  books.append(div)
  div.append(div_title, div_author, div_page, div_read, del_btn)
  div_title.textContent = title.value
  div_author.textContent = author.value
  div_page.textContent = page.value
  div_read.textContent = read.checked ? 'Read? Yes' : 'Read? Not Yet'
  
  close_form()

}


function open_form(){

  document.querySelector('.form_popup').style.display = 'block'

}

function close_form(){
  document.querySelector('.form_popup').style.display = 'none'
}