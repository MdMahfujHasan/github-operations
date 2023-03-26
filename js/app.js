const loadUsers = async () => {
    try {
        const url = 'https://api.github.com/users?per_page=10';
        const res = await fetch(url);
        const data = await res.json();
        displayUsers(data);
    }
    catch (error) {
        console.log(error);
    }
}

const userNames = document.getElementById('user-names');
const displayUsers = users => {
    displayFollowers(users);
    users.forEach(user => {
        console.log(user);
        const { login, avatar_url, html_url } = user;
        const h2 = document.createElement('h2');
        h2.innerText = 'Username: ' + login;
        userNames.appendChild(h2);
        const img = document.createElement('img');
        img.setAttribute('src', `${avatar_url}`);
        img.setAttribute('width', '200px');
        userNames.appendChild(img);
        const a = document.createElement('a');
        a.setAttribute('href', `${html_url}`);
        a.setAttribute('target', '_blank')
        a.innerText = `${login}'s GitHub Repository`;
        userNames.appendChild(a);
    })
}

loadUsers();

const displayFollowers = followers => {
    // console.log(followers);
    followers.forEach(async follower => {
        const url = follower.followers_url;
        const res = await fetch(url);
        const data = await res.json();
        displayFollowersImg(data[0].avatar_url);
    })
}

const followersContainer = document.getElementById('followers-container');
const displayFollowersImg = followersImg => {
    const img = document.createElement('img');
    img.setAttribute('src', `${followersImg}`);
    img.setAttribute('width', '100px');
    followersContainer.appendChild(img);
}