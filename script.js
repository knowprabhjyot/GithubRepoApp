const USERS_API_URL = 'https://api.github.com/search/users?q=';


async function getUsersByKeyword(event) {
    event.preventDefault();

    const userNameTyped = document.getElementById('userNameInput').value;
    // However we need the keyword ?
    const users = await fetch(USERS_API_URL + userNameTyped);
    const userInJson = await users.json();

    console.log(userInJson);
} 