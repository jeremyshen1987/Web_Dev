let lists = []

const toDo = (name, description, due_date, priority) => {
    const getName = ()=> name;
    const getDesc = ()=> description;
    const getDueDate = ()=> due_date;
    const getPriority = ()=> priority;
    const getID = ()=> lists.length

    const setName = (new_name)=> name = new_name;
    const setDesc = (new_description)=> description = new_description
    const setDueDate = (new_DueDate)=> description = new_DueDate
    const setPriority = (new_priority)=> description = new_priority
    
    return{
        getName, getDesc, getDueDate, getPriority, getID,
        setName, setDesc, setDueDate, setPriority
    }

}

function newTask(e){

    console.log('submitted')

    const name = document.querySelector('#taskName').value
    const description = document.querySelector('#Description').value
    const due_date = document.querySelector('#dueDate').value
    const priority = document.querySelector('#priority').value

    const newTask = toDo(name, description, due_date, priority)
    lists.push(newTask)

    append_div(name, description)

    addTask_container.classList.remove('active')

}

function append_div(name, description){

    const main = document.querySelector('.main')
    const list_header = document.createElement('div')
    const list_body = document.createElement('div')

    list_header.textContent = name
    list_body.textContent = description

    list_header.classList.add('list_header')
    list_body.classList.add('list_body')

    main.append(list_header,list_body)
}



////////////////////////////////////////////////

const btn_addTask = document.querySelector('[data-target]')
const btn_close_addTask = document.querySelector('[data-close-btn]')
// const overlay = document.getElementById('overlay')

const addTask_container = document.querySelector('.addTask_container')

btn_addTask.addEventListener('click', ()=>{
 
    openForm(addTask_container)

})

btn_close_addTask.addEventListener('click', ()=>{

    closeForm(addTask_container)

})

function openForm(addTask_container){

    addTask_container.classList.add('active')

    console.log('open form')

    const btn_newTask = document.querySelector('.newTask')
    

    btn_newTask.addEventListener('click', (e) => newTask(e), {once:true})

    // btn_newTask.onclick = ()=> newTask()

    // overlay.classList.add('active')
}

function closeForm(){

    addTask_container.classList.remove('active')
    // overlay.classList.remove('active')
}

///////////////////////////////////////////////////



