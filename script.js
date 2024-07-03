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
  userContainer.innerHTML = '';
  
  for (let user of userArray) {
    // Generate a UI card

    const UICard = `
    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div class="flex justify-end px-4 pt-4">
    </div>
    <div class="flex flex-col items-center pb-10">
        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="${user.avatar_url}" alt="Bonnie image"/>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">${user.login}</h5>
        <div class="flex mt-4 md:mt-6 gap-4">
            <a href="${user.followers_url}" target="_blank" class="items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Followers</a>
            <a href="#" target="_blank" class="items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">Repos</a>
        </div>
    </div>
</div>

        `;
    // show the data for that particular user on that UI card

    userContainer.innerHTML += UICard;
  }
}
