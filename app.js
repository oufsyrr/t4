document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const userList = document.getElementById('user-list');
  const prevPageButton = document.getElementById('prev-page');
  const nextPageButton = document.getElementById('next-page');

  let currentPageUrl = '/api/users'; 

  function renderUsers(users) {
    userList.innerHTML = '';
    users.forEach(user => {
      const userCard = document.createElement('div');
      userCard.classList.add('user-card');
      
      const avatar = document.createElement('img');
      avatar.src = user.avatarUrl;
      avatar.alt = user.name;
      
      const name = document.createElement('p');
      name.textContent = user.name;
      
      userCard.appendChild(avatar);
      userCard.appendChild(name);
      userList.appendChild(userCard);
    });
  }

  function updatePagination(prevPageUrl, nextPageUrl) {
    if (prevPageUrl) {
      prevPageButton.disabled = false;
      prevPageButton.onclick = () => loadUsers(prevPageUrl);
    } else {
      prevPageButton.disabled = true;
    }

    if (nextPageUrl) {
      nextPageButton.disabled = false;
      nextPageButton.onclick = () => loadUsers(nextPageUrl);
    } else {
      nextPageButton.disabled = true;
    }
  }

  async function loadUsers(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      renderUsers(data.result);
      updatePagination(data.previousPageUrl, data.nextPageUrl);
      
      currentPageUrl = url;
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  }

  function handleSearch(event) {
    const searchTerm = event.target.value;
    const searchUrl = `/api/users?searchTerm=${searchTerm}`;
    
    loadUsers(searchUrl);
  }

  searchInput.addEventListener('input', handleSearch);

  loadUsers(currentPageUrl);
});
