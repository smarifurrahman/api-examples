const loadUser = () => {
    fetch('https://randomuser.me/api/?gender=female')
        .then(res => res.json())
        .then(data => displayUser(data))
}

const displayUser = (user) => {
    const userSection = document.getElementById('user-section');
    const userContainer = document.createElement('div');
    userContainer.classList.add('user');
    userContainer.innerHTML = `
    <img src="${user.results[0].picture.large}">
    <h3>Gender: ${user.results[0].gender} </h3>
    <h3>Name: ${user.results[0].name.title} ${user.results[0].name.first} ${user.results[0].name.last} </h3>
    <h3>Cell: ${user.results[0].cell} </h3>
    <h3>Email: ${user.results[0].email} </h3>
    <h3>Location: ${user.results[0].location.city}, ${user.results[0].location.state}, ${user.results[0].location.country} </h3>
    `;
    userSection.appendChild(userContainer);
}

loadUser();