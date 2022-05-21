
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
        setName, setDesc, setDueDate, setPriority, 
    }

}

function newTask(){

    console.log('submitted')

    const name = document.querySelector('#taskName').value
    const description = document.querySelector('#Description').value
    const due_date = document.querySelector('#dueDate').value
    const priority = document.querySelector('#priority').value

    display_task_DOM(name, description, due_date, priority)

    const newTask = toDo(name, description, due_date, priority)
    append_to_project_list(newTask)


    addTask_container.classList.remove('active')

}

function display_task_DOM(name, description, due_date, priority){

    const main = document.querySelector('.main')
    const wrapper = document.createElement('div')
    const task_name = document.createElement('span')
    const task_description = document.createElement('div')
    const task_due_date = document.createElement('span')
    const task_priority = document.createElement('span')
    const line_break = document.createElement('hr')

    console.log(due_date)

    task_name.textContent = name
    task_description.textContent = description
    task_due_date.textContent = `Due ${due_date.slice(5)}`
    task_priority.textContent = `Priority ${priority}`

    wrapper.classList.add('wrapper')
    task_name.classList.add('list_header')
    task_description.classList.add('list_body')

    del_btn = document.createElement('button')
    del_btn.classList.add('close_button')
    del_btn.style.color = '#EC994B'
    del_btn.innerHTML = '&times;'
    del_btn.onclick = function(){
  
        console.log(projects.current_project())

        title = this.parentElement.firstChild.textContent

        const all_projects = projects.show_projects()

        all_projects.forEach((project) => {

            if (project.name() == projects.current_project()){

                const tasks = project.show_tasks()
                const new_list = tasks.filter(task => task.getName() !== title)

                project.update_tasks(new_list)

            }
        })

    this.parentElement.remove()
  
    };

    wrapper.append(task_name, task_priority, task_due_date, del_btn, line_break, task_description)

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

const individual_project = (name) => {
    
    const _project_name = name
    let _task_list = []

    return {

        name: () => {
            return _project_name
        },

        task_to_project: function(task){
            _task_list.push(task)
        },

        update_tasks: function(new_list){
            _task_list = new_list
        },

        show_tasks: function(){
            return _task_list
        }

    }
    
}



function createProject_DOM(name){
    
    const btn_project_add = document.querySelector('.btn_project_add')
    const project_tab = document.createElement('button')
    project_tab.classList.add('project')
    project_tab.textContent = name
    project_tab.type = 'button'
    project_tab.onclick = function(){
       
    
        clear_lists()

        projects.setProject(this.textContent)

        console.log(projects.current_project())
        projects.show_projects().forEach((project) => {

            if (project.name() == projects.current_project()){
                console.log('found project')
                project.show_tasks().forEach((task) => {
                    display_task_DOM(task.getName(), task.getDesc(), task.getDueDate(), task.getPriority())
                })
            }
        } )

    }

    btn_project_add.insertAdjacentElement('beforebegin', project_tab)
    
    const new_project = individual_project(name)
    projects.add_Project(new_project)
    
    console.log(projects.show_projects())
    
}

function btn_new_project(){

    project_name = prompt('Project Name: ')
    if(project_name == '' || project_name == null){return}

    createProject_DOM(project_name)
}


createProject_DOM('Default')
createProject_DOM('Web_Dev')



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

    const btn_newTask = document.querySelector('.newTask')
    
    btn_newTask.addEventListener('click', () => newTask(), {once:true})


}

function closeForm(){

    addTask_container.classList.remove('active')
}


function clear_lists(){
    const lists = document.querySelector('.main')
    lists.innerHTML = ''
}

///////////////////////////////////////////////////



