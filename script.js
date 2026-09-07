document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Fetch latest release from GitHub to dynamically update download links
    fetch('https://api.github.com/repos/mohammad-sheikh-shahinur-rahman/BanglaHost-Website/releases/latest')
        .then(response => response.json())
        .then(data => {
            if (data && data.assets) {
                const exeAsset = data.assets.find(a => a.name.endsWith('.exe'));
                if (exeAsset) {
                    document.querySelectorAll('.download-exe-btn').forEach(btn => {
                        btn.href = exeAsset.browser_download_url;
                    });
                }
            }
        })
        .catch(err => console.error('Error fetching latest release:', err));
});
