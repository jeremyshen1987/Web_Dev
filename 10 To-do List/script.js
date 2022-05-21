// let projects = []

const toDo = (name, description, due_date, priority, project = 'Default') => {

    const getName = ()=> name;
    const getDesc = ()=> description;
    const getDueDate = ()=> due_date;
    const getPriority = ()=> priority;
    const getID = ()=> database.show_tasks().length
    const getProject = ()=> project

    const setName = (new_name)=> name = new_name;
    const setDesc = (new_description)=> description = new_description
    const setDueDate = (new_DueDate)=> description = new_DueDate
    const setPriority = (new_priority)=> description = new_priority
    const setProject = (new_project) => project = new_project
    
    return{
        getName, getDesc, getDueDate, getPriority, getID, getProject,
        setName, setDesc, setDueDate, setPriority, setProject
    }

}

function newTask(database){

    console.log('submitted')

    const name = document.querySelector('#taskName').value
    const description = document.querySelector('#Description').value
    const due_date = document.querySelector('#dueDate').value
    const priority = document.querySelector('#priority').value

    append_div(name, description)

    const newTask = toDo(name, description, due_date, priority)
    append_to_project_list(newTask)


    addTask_container.classList.remove('active')

}

function append_div(name, description){

    const main = document.querySelector('.main')
    const wrapper = document.createElement('div')
    const list_header = document.createElement('div')
    const list_body = document.createElement('div')

    list_header.textContent = name
    list_body.textContent = description

    list_header.classList.add('list_header')
    list_body.classList.add('list_body')

    del_btn = document.createElement('button')
    del_btn.innerHTML = 'Remove'
    del_btn.onclick = function(){
  
      this.parentElement.remove()
      
  
    };

    wrapper.append(list_header,list_body, del_btn)

    main.append(wrapper)
}

function append_to_project_list (newTask){


    projects.show_projects().forEach((project) => {

        if (project.name() == projects.current_project()){
            project.task_to_project(newTask)
        }

    } )

}


////////////////////////////////////////////////


const projects = (function(){

    let _projects = []
    let _current_project = 'Default'
    

    return {
        add_Project: function(project){
            _projects.push(project)
        },

        remove_Project: function(project){
            _projects.splice(_projects.indexOf(project), 1)   
        },

        show_projects: function(){
            return _projects
        },

        current_project: () => {
            return _current_project
        },

        setProject: function(project){
            _current_project = project
        },

    }

})()



function createProject_DOM(name){
    
    const sidebar = document.querySelector('.sidebar')
    const button = document.createElement('button')
    button.classList.add('project')
    button.textContent = name
    button.type = 'button'
    button.onclick = function(){
        console.log('hi')
        projects.setProject(name)
        clear_lists()
    }

    sidebar.append(button)

    
    
    const new_project =  createProject(name)
    projects.add_Project(new_project)
    
    console.log(projects.show_projects())
    
}

const createProject = (name) => {
    
    const project_name = name
    let task_list = []

    return {

        name: () => {
            return project_name
        },

        task_to_project: function(task){
            task_list.push(task)
        },

        show_tasks: function() {
            return task_list
        }

    }
    
}


createProject_DOM('Default')
createProject_DOM('xcom')





////////////////////////////////////////////////

const btn_addTask = document.querySelector('[data-target]')
const btn_close_addTask = document.querySelector('[data-close-btn]')

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


}

function closeForm(){

    addTask_container.classList.remove('active')

}


function clear_lists(){
    const lists = document.querySelector('.main')
    lists.innerHTML = ''
}

///////////////////////////////////////////////////



