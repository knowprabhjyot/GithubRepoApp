const USERS_API_URL = "https://api.github.com/search/users?q=";

async function getUsersByKeyword(event) {
  event.preventDefault();

  const userNameTyped = document.getElementById("userNameInput").value;
  // However we need the keyword ?
  const users = await fetch(USERS_API_URL + userNameTyped);
  const { items } = await users.json();

  generateUserCards(items);
}

function generateUserCards(userArray) {
  const userContainer = document.getElementById("user-container");
  userContainer.innerHTML = "";

  for (let user of userArray) {
    // Generate a UI card

    const UICard = `
    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div class="flex justify-end px-4 pt-4">
    </div>
    <div class="flex flex-col items-center pb-10">
        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="${
          user.avatar_url
        }" alt="Bonnie image"/>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">${
          user.login
        }</h5>
        <div class="flex mt-4 md:mt-6 gap-4">
            <a onclick=getFollowers(${JSON.stringify(
              user.login
            )}) class="items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Followers</a>
            <a onclick=getRepos(${JSON.stringify(
              user.login
            )}) class="items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">Repos</a>
        </div>

     <div id="user_${user.login}" class="grid grid-cols-4 gap-4">
     </div>

     <div id="user_${user.login}_repo">
     </div>
    </div>
</div>
        `;
    // show the data for that particular user on that UI card

    userContainer.innerHTML += UICard;
  }
}

async function getFollowers(user) {
  const FOLLOWERS_URL = `https://api.github.com/users/${user}/followers`;

  const followers = await fetch(FOLLOWERS_URL);
  const followersInJson = await followers.json();
  const userCardRepo = document.getElementById(`user_${user}_repo`);

  const userCard = document.getElementById(`user_${user}`);
  userCardRepo.innerHTML = "";

  for (let follower of followersInJson) {
    const img = `<img class="rounded-full" width="30px" src="${follower.avatar_url}">`;
    userCard.innerHTML += img;
  }

}

async function getRepos(user) {
    const REPOS_URL = `https://api.github.com/users/${user}/repos`;
    const repos = await fetch(REPOS_URL);
    const reposInJson = await repos.json();

    const userCardRepo = document.getElementById(`user_${user}_repo`);
    const userCard = document.getElementById(`user_${user}`);

    userCard.innerHTML = '';

    for (let repos of reposInJson) {
      const a = `<a href="${repos.html_url}" target="_blank">${repos.full_name}</a><br>`;
      userCardRepo.innerHTML += a;
    }

}