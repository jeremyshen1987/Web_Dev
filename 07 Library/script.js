
let library = []

const book =function (title, author, page, read) {
    this.title = title
    this.author = author
    this.read = read ? "you read this book" : "You didn't read or finished the book"
    this.page = page
    this.info = function (){
      console.log(`hey, ${this.read},bookname is ${title}, author is ${author} and have ${this.page} pages`) 
    }
    
}
  

console.log('js loaded')

const form = document.getElementById('add_book')

form.addEventListener('submit', (e) => get_book_info(e))

function get_book_info(e){

    e.preventDefault()

    console.log('run')

    const title = document.getElementById('title')
    const author = document.getElementById('author')
    const page = document.getElementById('page')
    const read = document.getElementById('read')

    // console.log(author.value)
    // console.log(page.value)
    // console.log(read.value)

    // const new_book = title.value
    const new_book = new book(title.value, author.value, page.value, read.value)

    console.log(new_book.page)

    library.push(new_book)

    console.log(library)
    
    
}


// <label for="author">Author: <input type="text" id="author"></label>
// <label for="title">Title: <input type="text" id="title"></label>
// <label for="page">Numer of pages:  <input type="text" id="page"></label>
// <label for="read">I have read the book <input type="checkbox" id="read"></label>