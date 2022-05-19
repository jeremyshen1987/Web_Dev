let lists = []

const toDo = (name, description, due_date, priority) => {
    const getName = ()=> name;
    const getDesc = ()=> description;
    const getDueDate = ()=> due_date;
    const getPriority = ()=> priority;

    const setName = (new_name)=> name = new_name;
    const setDesc = (new_description)=> description = new_description
    const setDueDate = (new_DueDate)=> description = new_DueDate
    const setPriority = (new_priority)=> description = new_priority
    
    return{
        getName, getDesc, getDueDate, getPriority,
        setName, setDesc, setDueDate, setPriority
    }

}

function newTask(e){

    console.log('submitted')
    e.preventDefault()

    const name = document.querySelector('#taskName')
    const description = document.querySelector('#Description')
    const due_date = document.querySelector('#dueDate')
    const priority = document.querySelector('#priority')

    const newTask = toDo(name.value, description.value, due_date.value, priority.value)
    lists.push(newTask)

    addTask_container.classList.remove('active')
}



////////////////////////////////////////////////

const btn_addTask = document.querySelector('[data-target]')
const btn_close_addTask = document.querySelector('[data-close-btn]')
// const overlay = document.getElementById('overlay')

const addTask_container = document.querySelector('.addTask_container')

btn_addTask.addEventListener('click', ()=>{

    console.log('open')
    
    openForm(addTask_container)

})

btn_close_addTask.addEventListener('click', ()=>{

    console.log('close')
    closeForm(addTask_container)

})

function openForm(addTask_container){
    addTask_container.classList.add('active')

    console.log('open form')

    const btn_newTask = document.querySelector('.newTask')
    
    console.log(btn_newTask)

    btn_newTask.addEventListener('click', (e) => newTask(e))
    // overlay.classList.add('active')
}

function closeForm(){

    addTask_container.classList.remove('active')
    // overlay.classList.remove('active')
}

///////////////////////////////////////////////////



