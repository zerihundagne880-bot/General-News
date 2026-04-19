
const API_KEY = '9c2871e99006fe13a24acda0c16db520';

async function fetchNews() {
    const container = document.getElementById('news-container');
    if (!container) return;

    let path = window.location.pathname;
    let category = 'sports'; // ለጊዜው በቀጥታ ስፖርት እናድርገው

    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&apikey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.errors) {
            container.innerHTML = `<p style='text-align:center;'>API Error: ${data.errors[0]}</p>`;
            return;
        }

        if (data.articles && data.articles.length > 0) {
            container.innerHTML = '';
            data.articles.forEach(article => {
                const newsCard = `
                    <div class="news-card">
                        <img src="${article.image}" alt="News Image">
                        <div class="content">
                            <h3>${article.title}</h3>
                            <p>${article.description || ''}</p>
                            <a href="${article.url}" target="_blank" class="btn">Read More</a>
                        </div>
                    </div>`;
                container.innerHTML += newsCard;
            });
        } else {
            container.innerHTML = "<p style='text-align:center;'>No news articles found.</p>";
        }
    } catch (error) {
        container.innerHTML = `<p style='text-align:center;'>Error: ${error.message}</p>`;
    }
}
fetchNews();

