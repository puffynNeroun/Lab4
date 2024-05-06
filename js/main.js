const fetchUsersBtn = document.querySelector(".btn");
const userList = document.querySelector(".user-list");
const inputField = document.getElementById('inputField');

inputField.addEventListener('input', function () {
    const inputValue = parseInt(inputField.value);
    if (!isNaN(inputValue)) {
        renderCount(inputValue);
    }
});

fetchUsersBtn.addEventListener("click", () => {
    const inputValue = parseInt(inputField.value);
    if (!isNaN(inputValue)) {
        fetchUsers(inputValue)
            .then((users) => renderUsers(users))
            .catch((error) => console.log(error));
    } else {
        console.log("Invalid input");
    }
});

function fetchUsers(count) {
    return fetch(`https://jsonplaceholder.typicode.com/users?_limit=${count}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
}

function renderUsers(users) {
    userList.innerHTML = "";
    const markup = users
        .map((user) => {
            return `<li>
          <p><b>Name</b>: ${user.name}</p>
          <p><b>Email</b>: ${user.email}</p>
          <p><b>Company</b>: ${user.company.name}</p>
        </li>`;
        })
        .join("");
    userList.insertAdjacentHTML("beforeend", markup);
}

function renderCount(count) {
    userList.innerHTML = "";
}
// =========================================
async function fetchData() {
    const response = await fetch('https://663761f9288fedf693802ae2.mockapi.io/LAB4');
    const data = await response.json();
    return data;
}

async function showAll(filter) {
    const dataList = document.getElementById('dataList');
    dataList.innerHTML = ''; // Очистка списку

    const data = await fetchData();

    data.forEach((item) => {
        if (filter === undefined || item.completed === filter) {
            const li = document.createElement('li');
            li.textContent = `ID: ${item.id}, Title: ${item.title}, Completed: ${item.completed}`;

            // Створення кнопки "Видалити" для кожного елементу
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Видалити';
            deleteButton.className = 'deleteButton';
            deleteButton.onclick = async () => {
                const response = await fetch(`https://663761f9288fedf693802ae2.mockapi.io/LAB4/${item.id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    alert('Дані успішно видалені!');
                    showAll(filter);
                } else {
                    alert('Сталася помилка під час видалення даних.');
                }
            };

            li.appendChild(deleteButton);

            dataList.appendChild(li);
        }
    });
}

async function addData() {
    const form = document.getElementById('dataForm');
    const formData = new FormData(form);
    const title = formData.get('title');
    const completed = formData.get('truth') === 'true';

    const response = await fetch('https://663761f9288fedf693802ae2.mockapi.io/LAB4', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            completed: completed
        })
    });

    if (response.ok) {
        alert('Дані успішно відправлені!');
        window.location.reload();
    } else {
        alert('Сталася помилка під час відправлення даних.');
    }
}










