
const projects = function(){

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

        setProject: function(project){
            _current_project = project
        },

    }

}



function createProject_DOM(name){
    
    const sidebar = document.querySelector('.sidebar')
    const button = document.createElement('button')
    button.classList.add('project')
    button.textContent = name
    button.type = 'button'
    button.onclick = function(){
        console.log('hi')
    }

    sidebar.append(button)

    
    
    const new_project =  createProject(name)
    projects.add_Project(new_project)
    
}

const createProject = (name) => {
    
    
    let task_list = []

    return {
        task_to_project: function(task){
            task_list.push(task)
        },

        show_tasks: function() {
            return task_list
        }

    }
    
}


createProject_DOM('Default')




