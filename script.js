const searchEl = document.querySelector('.searchbox')
const div = document.querySelector('.users-list');
let usersList;
let loading = true;
// showUsers(usersList);
// fetchData();

searchEl.addEventListener('keyup', (e) => {
    let searcTerm = e.target.value;
    filterUsers(searcTerm);
});

async function fetchData() {
    if (loading) {
        div.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i>`;
    }
    
    const res =  await fetch('https://randomuser.me/api?results=50');
    const { results } = await res.json();
    if (results) {
        loading = false;
        div.innerHTML = '';
    }
    // clear result
    showUsers(results);
    usersList = results;
}

function filterUsers(searcTerm) {

    div.innerHTML = '';

    let filteredUsers = usersList.filter(user => {
        return user.name.first.toLowerCase().indexOf(searcTerm.toLowerCase()) !== -1 || user.name.last.toLowerCase().indexOf(searcTerm.toLowerCase()) !== -1 || user.location.city.toLowerCase().indexOf(searcTerm.toLowerCase()) !== -1;
    });

    showUsers(filteredUsers);

}

function showUsers(users) {
    users.forEach(user => displayUser(user));
}


function displayUser(data) {
    let li = document.createElement('li');
    li.innerHTML = `
    <img
        src="${data.picture.large}"
        alt="${data.name.first}"
    />
    <div class="user-info">
        <h4>${data.name.first + " " + data.name.last}</h4>
        <p>${data.location.city + ", " + data.location.country}</p>
    </div>
    
    `;

    div.appendChild(li);
}