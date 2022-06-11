
const form = document.querySelector('#form');

// вешаем события отправки формы
form.addEventListener("submit", addUser)

// функция добавлние сотрудника
function addUser(e){

    e.preventDefault()

    const data = new FormData(form)

    const options = {
        method: "POST",
        body: data
    }

    fetch("http://127.0.0.1/api/employees", options)
        .then(res => {

            if(res.ok){

                alert("Сотрудник успешно добавлен")

                form.reset()
            }
            
        })

}