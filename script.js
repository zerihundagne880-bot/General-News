async function fetchNews() {
    const container = document.getElementById('news-container');
    if (!container) return;

    // አዲስ የተለየ API (NewsData.io)
    const url = `https://newsdata.io/api/1/news?apikey=pub_42033626e2e5033c46e0339d39695d5686001&category=sports&language=en`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            container.innerHTML = '';
            data.results.forEach(article => {
                if (article.image_url && article.title) {
                    const newsCard = `
                        <div class="news-card">
                            <img src="${article.image_url}" alt="News">
                            <div class="content">
                                <h3>${article.title}</h3>
                                <p>${article.description ? article.description.substring(0, 100) : 'Click read more for details'}...</p>
                                <a href="${article.link}" target="_blank" class="btn">Read More</a>
                            </div>
                        </div>`;
                    container.innerHTML += newsCard;
                }
            });
        } else {
            container.innerHTML = "<p>No news found today.</p>";
        }
    } catch (error) {
        container.innerHTML = "<p>Please try again later.</p>";
    }
}
fetchNews();

