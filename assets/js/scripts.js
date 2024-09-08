function mdconvert() {
    var md = window.markdownit();
    var div = document.getElementsByClassName('markdown');
    for(var i = 0; i < div.length; i++) {
      var content = div[i].innerHTML;
      document.getElementsByClassName('markdown')[i].innerHTML = md.render(content);
    }
  }



// Function to generate profile images
function generateProfileImages() {
    const profileContainer = document.getElementById('profile-container');
    profileImages.forEach(profile => {
        const profileItem = document.createElement('div');
        profileItem.className = 'profile-item';
        profileItem.innerHTML = `
            <img src="${profile.src}" alt="${profile.caption}" class="profile-image">
            <p class="profile-caption">${profile.caption}</p>
        `;
        profileContainer.appendChild(profileItem);
    });
}


;

document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);

    darkModeToggle.addEventListener('click', () => {
        if (html.getAttribute('data-theme') === 'dark') {
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
        console.log('Dark mode toggled:', html.getAttribute('data-theme') === 'dark');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('templates/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            initDarkMode();
        });

    function initDarkMode() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        const html = document.documentElement;

        // Check for saved theme preference or default to light mode
        const currentTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', currentTheme);

        darkModeToggle.addEventListener('click', () => {
            if (html.getAttribute('data-theme') === 'dark') {
                html.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                html.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
            console.log('Dark mode toggled:', html.getAttribute('data-theme') === 'dark');
        });
    }
});