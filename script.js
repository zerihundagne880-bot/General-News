const API_KEY = '9c2871e99006fe13a24acda0c16db520';

async function fetchNews() {
    const container = document.getElementById('news-container');
    if (!container) return;

    let path = window.location.pathname;
    let url;

    if (path.includes('sport.html')) {
        url = `https://gnews.io/api/v4/search?q="Premier League" OR "La Liga" OR "Football"&lang=en&max=10&apikey=${API_KEY}`;
    } else if (path.includes('tech.html')) {
        url = `https://gnews.io/api/v4/top-headlines?category=technology&lang=en&apikey=${API_KEY}`;
    } else if (path.includes('politics.html')) {
        url = `https://gnews.io/api/v4/top-headlines?category=world&lang=en&apikey=${API_KEY}`;
    } else {
        url = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&max=10&apikey=${API_KEY}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.articles && data.articles.length > 0) {
            container.innerHTML = ''; 
            data.articles.forEach(article => {
                if (article.image && article.title) {
                    const newsCard = `
                        <div class="news-card">
                            <img src="${article.image}" alt="News">
                            <div class="content">
                                <h3>${article.title}</h3>
                                <p>${article.description || 'Visit site for more details.'}</p>
                                <a href="${article.url}" target="_blank" class="btn">Read More</a>
                            </div>
                        </div>
                    `;
                    container.innerHTML += newsCard;
                }
            });
        } else {
            container.innerHTML = "<p style='text-align:center;'>No news found at the moment.</p>";
        }
    } catch (error) {
        container.innerHTML = "<p style='text-align:center;'>Failed to load news. (API Error)</p>";
    }
}

fetchNews();

