const API_KEY = '9c2871e99006fe13a24acda0c16db520';

async function fetchNews() {
    const container = document.getElementById('news-container');
    if (!container) return;

    // በቀጥታ ለሙከራ ያህል 'sports' እናድርገው
    const url = `https://gnews.io/api/v4/top-headlines?category=sports&lang=en&apikey=${API_KEY}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors'
        });

        if (!response.ok) {
            const errorData = await response.json();
            container.innerHTML = `<p style='text-align:center;'>API Error: ${errorData.errors ? errorData.errors[0] : response.statusText}</p>`;
            return;
        }

        const data = await response.json();
        
        if (data.articles && data.articles.length > 0) {
            container.innerHTML = '';
            data.articles.forEach(article => {
                const newsCard = `
                    <div class="news-card">
                        <img src="${article.image}" alt="News Image" style="width:100%; border-radius:8px;">
                        <div class="content" style="padding:15px;">
                            <h3 style="margin-top:0;">${article.title}</h3>
                            <p>${article.description || ''}</p>
                            <a href="${article.url}" target="_blank" class="btn" style="display:inline-block; background:red; color:white; padding:10px; text-decoration:none; border-radius:5px;">Read More</a>
                        </div>
                    </div>`;
                container.innerHTML += newsCard;
            });
        } else {
            container.innerHTML = "<p style='text-align:center;'>No news found.</p>";
        }
    } catch (error) {
        container.innerHTML = `<p style='text-align:center;'>Network Error: Please check your internet or try again later.</p>`;
    }
}
fetchNews();

