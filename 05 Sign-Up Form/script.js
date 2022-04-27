const fname = document.getElementById('firstName')
const password = document.getElementById('password')
const c_password = document.getElementById('confirmPW')

const pw_mismatch = document.getElementById('pw_error')
const error = document.getElementById('error')

let pw_matched = false


const form = document.getElementById('info')



form.addEventListener('submit', (e) => validate(e))

c_password.addEventListener('input',updateValue)

function validate(e){

    if (pw_matched == false) {
        e.preventDefault()
    }
    

}

function updateValue(e){

    if (password.value === e.target.value){
        pw_mismatch.style.color = 'green'
        pw_mismatch.innerText = 'Password Match'
        pw_matched = true
    }

    else {
        pw_mismatch.style.color = 'red'
        pw_mismatch.innerText = 'Password do not match!'
        pw_matched = false
    }

}