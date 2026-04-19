const API_KEY = '9c2871e99006fe13a24acda0c16db520';

async function fetchNews() {
    const container = document.getElementById('news-container');

    let path = window.location.pathname;
    let category = 'general';

    if (path.includes('sport.html')) category = 'sports';
    else if (path.includes('tech.html')) category = 'technology';
    else if (path.includes('politics.html')) category = 'world';

    const url = 'https://gnews.io/api/v4/top-headlines?category=' + category + '&lang=en&country=us&max=10&apikey=' + API_KEY;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.articles && data.articles.length > 0) {
            container.innerHTML = '';
            data.articles.forEach(article => {
                if (article.image && article.title) {
                    const newsCard = '<div class="news-card"><img src="' + article.image + '" alt="News Image"><div class="content"><h3>' + article.title + '</h3><p>' + (article.description || 'Visit site for more details.') + '</p><a href="' + article.url + '" target="_blank" class="btn">Read More</a></div></div>';
                    container.innerHTML += newsCard;
                }
            });
        } else {
            container.innerHTML = "<p style='text-align:center;'>No news found at the moment.</p>";
        }
    } catch (error) {
        container.innerHTML = "<p style='text-align:center;'>Failed to load news.</p>";
    }
}
fetchNews();