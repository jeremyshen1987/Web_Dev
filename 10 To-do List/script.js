
const task_factory = (name, description, due_date, priority) => {

    const getName = ()=> name;
    const getDesc = ()=> description;
    const getDueDate = ()=> due_date;
    const getPriority = ()=> priority;

    const setName = (new_name)=> name = new_name;
    const setDesc = (new_description)=> description = new_description
    const setDueDate = (new_DueDate)=> due_date = new_DueDate
    const setPriority = (new_priority)=> priority = new_priority
    
    return{
        getName, getDesc, getDueDate, getPriority,
        setName, setDesc, setDueDate, setPriority, 
    }

}

function submit_newTask(){

    const name = document.querySelector('#taskName').value
    const description = document.querySelector('#Description').value
    const due_date = document.querySelector('#dueDate').value
    const priority = document.querySelector('#priority').value

    const unique_task_name = get_task(name)

    if(unique_task_name){
        alert('Task name must be unique')
        return
    }

    display_task_DOM(name, description, due_date, priority)

    const newTask = task_factory(name, description, due_date, priority)
    append_task_to_project(newTask)


    addTask_container.classList.remove('active')

}

function submit_editTask(){

    task_item.setName(edit_taskName.value)
    task_item.setDesc(edit_Description.value)
    task_item.setDueDate(edit_dueDate.value)
    task_item.setPriority(parseInt(edit_priority.value))

    closeForm()

    const btn_project = document.querySelector(`[data-key="${projects.current_project()}"]`)
    btn_project.click()

}

function editTask(e){
    
    button = e.target
    task_name = button.parentElement.firstChild.textContent
    task_item = get_task(task_name)

    editTask_container.classList.add('active')

    edit_taskName = document.querySelector('#edit_taskName') 
    edit_Description = document.querySelector('#edit_Description')
    edit_dueDate = document.querySelector('#edit_dueDate')
    edit_priority = document.querySelector('#edit_priority')


    edit_taskName.value = task_item.getName()
    edit_Description.value = task_item.getDesc()
    edit_dueDate.value = task_item.getDueDate()
    edit_priority.value = task_item.getPriority()

    edit_taskName.addEventListener('input', (e) => {edit_taskName.value = e.target.value})
    edit_Description.addEventListener('input', (e) => {edit_Description.value = e.target.value})
    edit_dueDate.addEventListener('change', (e) => { edit_dueDate.value = e.target.value})
    edit_priority.addEventListener('change', (e) => {edit_priority.value = e.target.value})

    const btn_submit_editTask = document.querySelector('.edit_task')

    btn_submit_editTask.onclick = () => submit_editTask(task_item, edit_taskName, edit_Description, edit_dueDate, edit_priority)

}

function display_task_DOM(name, description, due_date, priority){

    const main = document.querySelector('.main')
    const wrapper = document.createElement('div')
    const task_name = document.createElement('span')
    const task_description = document.createElement('div')
    const task_due_date = document.createElement('span')
    const task_priority = document.createElement('span')
    const line_break = document.createElement('hr')

    task_name.textContent = name
    task_description.textContent = description
    task_due_date.textContent = `Due ${due_date.slice(5)}`
    task_priority.textContent = `Priority ${priority}`

    wrapper.classList.add('wrapper')
    task_name.classList.add('list_header')
    task_description.classList.add('list_body')

    edit_btn = document.createElement('button')
    edit_btn.classList.add('edit_button')
    edit_btn.style.color = '#519872'
    edit_btn.innerHTML = '&equiv;'
    edit_btn.onclick = (e)=> editTask(e)

    del_btn = document.createElement('button')
    del_btn.classList.add('close_button')
    del_btn.style.color = '#EC994B'
    del_btn.innerHTML = '&times;'
    del_btn.onclick = function(){
  
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

    wrapper.append(task_name, task_priority, task_due_date, edit_btn, del_btn, line_break, task_description)

    main.append(wrapper)
}

function append_task_to_project (newTask){


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
    project_tab.dataset.key = name
    project_tab.textContent = name
    project_tab.type = 'button'
    project_tab.onclick = function(){

        clear_task_list()

        projects.setProject(this.dataset.key)
        projects.show_projects().forEach((project) => {
    
            if (project.name() == projects.current_project()){
                project.show_tasks().forEach((task) => {
                    display_task_DOM(task.getName(), task.getDesc(), task.getDueDate(), task.getPriority())
                })
            }
        } )


        const binding = this
        css_add_border(binding)
    }

    btn_project_add.insertAdjacentElement('beforebegin', project_tab)


    const btn_remove_project = document.createElement('button')
    btn_remove_project.innerHTML = '&times;'
    btn_remove_project.classList.add('btn_remove_project')
    project_tab.append(btn_remove_project)
    btn_remove_project.onclick = () => remove_project(project_tab)
    

    const new_project = individual_project(name)
    projects.add_Project(new_project)
    
}

function btn_new_project(){

    project_name = prompt('Project Name: ')
    if(project_name == '' || project_name == null){return}
    
    const arr_projects_names = projects.show_projects().map(project => project.name())
    if(arr_projects_names.includes(project_name)){alert('Project name must be unique'); return}  

    createProject_DOM(project_name)

}



function get_task(task_name){

    arr_projects_name = projects.show_projects().map(el => el.name())
    project_id = arr_projects_name.indexOf(projects.current_project())
    project = projects.show_projects()[project_id]

    arr_tasks_name = project.show_tasks().map(el => el.getName())
    task_id = arr_tasks_name.indexOf(task_name)

    task = project.show_tasks()[task_id]

    return task
}

createProject_DOM('Default')
createProject_DOM('Web_Dev')
display_task_DOM('Coding', 'Type of events in eventlistener, DOM style object', '2022-05-22', 5)
display_task_DOM('Grocery Run', 'Salmon, Kale, Greek yogurt, Okra', '2022-05-22', 4)

task_1 = task_factory('Coding', 'Type of events in eventlistener, DOM style object', '2022-05-22', 5)
task_2 = task_factory('Grocery Run', 'Salmon, Kale, Greek yogurt, Okra', '2022-05-22', 4)
append_task_to_project(task_1)
append_task_to_project(task_2)
////////////////////////////////////////////////

const btn_addTask = document.querySelector('[data-target]')
const btn_close_addTask = document.querySelector('[data-close-btn]')
const btn_close_editTask = document.querySelector('[data-close-edit-btn]')

const addTask_container = document.querySelector('.addTask_container')
const editTask_container = document.querySelector('.editTask_container')


btn_addTask.addEventListener('click', ()=>{
 
    form_add_task(addTask_container)

})

btn_close_addTask.addEventListener('click', ()=>{

    closeForm()

})

btn_close_editTask.addEventListener('click', ()=>{

    closeForm() 
})



function form_add_task(addTask_container){

    addTask_container.classList.add('active')

    const btn_newTask = document.querySelector('.newTask')
    btn_newTask.onclick = ()=> submit_newTask()
    
}

function closeForm(){

    addTask_container.classList.remove('active')
    editTask_container.classList.remove('active')
}


function clear_task_list(){

    const lists = document.querySelector('.main')
    lists.innerHTML = ''
}

function remove_project(project_tab){

    project_name = project_tab.dataset.key
    projects.remove_Project(project_name)

    project_tab.remove()
    
    
}


function css_add_border(binding){

    const project_buttons = Array.from(document.querySelectorAll('.project'))
    project_buttons.forEach(button => button.classList.remove('green_border') )

    
    binding.classList.add('green_border')
}