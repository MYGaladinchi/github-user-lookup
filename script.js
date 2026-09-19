const searchForm = document.getElementById("searchForm");
const usernameInput = document.getElementById("usernameInput");
const resultSection = document.getElementById("result");

searchForm.addEventListener("submit", async function(event) {
  event.preventDefault();

  const username = usernameInput.value.trim();
  if (username === "") {
    return;
  }

  resultSection.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch("https://api.github.com/users/" + username);

    if (!response.ok) {
      resultSection.innerHTML = "<p class='error'>User not found. Status: " + response.status + "</p>";
      return;
    }

    const data = await response.json();
    displayUser(data);

  } catch (error) {
    resultSection.innerHTML = "<p class='error'>Something went wrong: " + error.message + "</p>";
  }
});

function displayUser(data) {
  resultSection.innerHTML = `
    <div class="user-card">
      <img src="${data.avatar_url}" alt="${data.login}'s avatar">
      <h2>${data.name || data.login}</h2>
      <p class="username">@${data.login}</p>
      <p>${data.bio || "No bio available"}</p>
      <div class="stats">
        <span><strong>${data.public_repos}</strong> Repos</span>
        <span><strong>${data.followers}</strong> Followers</span>
        <span><strong>${data.following}</strong> Following</span>
      </div>
      <a href="${data.html_url}" target="_blank" rel="noopener noreferrer">View Profile on GitHub</a>
    </div>
  `;
}
