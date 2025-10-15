// Fetch and display user profiles
async function fetchUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const users = await response.json();
    displayUserList(users);

  } catch (error) {
    console.error('Fetch Error:', error);
    const userList = document.getElementById('userList');
    userList.textContent = 'Failed to load user data. Please try again later.';
  }
}

// Display list of user names
function displayUserList(users) {
  const userList = document.getElementById('userList');
  userList.innerHTML = ''; // Clear old list

  users.forEach(user => {
    const userContainer = document.createElement('div');
    userContainer.classList.add('user-container');

    const userElement = document.createElement('div');
    userElement.textContent = user.name;
    userElement.classList.add('user-item');

    // Create a hidden div for details
    const userDetails = document.createElement('div');
    userDetails.classList.add('user-details');
    userDetails.style.display = 'none'; // Hide by default

    // Click handler: toggle visibility
    userElement.addEventListener('click', () => {
      const allDetails = document.querySelectorAll('.user-details');
      allDetails.forEach(detail => detail.style.display = 'none'); // hide others

      userDetails.innerHTML = `
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      `;
      userDetails.style.display = 'block'; // show this one
    });

    userContainer.appendChild(userElement);
    userContainer.appendChild(userDetails);
    userList.appendChild(userContainer);
  });
}

// Initial fetch
fetchUsers();
