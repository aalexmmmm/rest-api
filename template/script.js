
document.addEventListener("DOMContentLoaded", () =>{
    
    const users = document.querySelector('#users'),
          main = document.querySelector('.main');

    // вывод сотрудников
    fetch('http://127.0.0.1/api/employees')
        .then(res =>{

            if(res.ok){

                return res.json()

            }

            throw new Error('Ошибка при добавлении сотрудника')

        }).then(data =>{
            
            const html = data.data.map(userLine)

            users.insertAdjacentHTML('beforeend', html.join(' '))


        }).catch(error => {

            console.warn(error.message)

        })


    // делегирование
    main.addEventListener('click', (e) => {

        const target = e.target,
              parent = target.closest('.user')
        
        // просмотр подробной информации о сотруднике
        if(parent){

            e.preventDefault()

            const id = parent.dataset.id
        
            fetch(`http://127.0.0.1/api/employees/${id}`)
                .then(res => {

                    if(res.ok){

                        return res.json()
        
                    }

                    throw new Error('Ошибка при просмотре подробной информации о сотруднике')

                }).then(data => {

                    const userHtml = userOne(data.data)
                    
                    document.body.insertAdjacentHTML('beforeend', userHtml)

                }).catch(error => {

                    console.warn(error.message)
        
                })
            
        }

        // закрывает модальное окно
        if(target.classList.contains('btn-close')){

            target.closest('.modal').remove()
            
        }

    })

    // шаблон для вывода сотрудника
    function userLine({age,email,experience,id,mean_salary,name,photo}) {
        return `
            <tr data-id=${id} class='user'>
                <td>${email}</td>
                <td>${name}</td>
                <td>${age}</td>
                <td>${experience}</td>
                <td><img src="http://127.0.0.1/uploads/${photo}" alt="${name}" width="30"></td>
                <td>${mean_salary}</td>
            </tr>
        `
    }

    // шаблон для вывода сотрудника подробно
    function userOne({age,email,experience,mean_salary,name,photo}) {
        return `
        <div class="modal show" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        
                        <img class="card-castom" src="http://127.0.0.1/uploads/${photo}" width="100%" height="225" alt="">

                        <p class="card-text">ФИО: ${name}</p>
                        <p class="card-text">Email: ${email}</p>
                        <p class="card-text">Возраст: ${age}</p>
                        <p class="card-text">Стаж: ${experience}</p>
                        <p class="card-text">Средняя з/п: ${mean_salary}</p>

                    </div>
                </div>
            </div>
        </div>
        `
    }



    
})