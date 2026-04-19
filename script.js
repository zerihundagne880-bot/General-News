async function fetchNews() {
    const container = document.getElementById('news-container');
    if (!container) return;

    // ፍለጋውን ቀለል አድርገን 'top news' ብቻ እንዲያመጣ እናድርገው
    const url = `https://newsdata.io/api/1/news?apikey=pub_42033626e2e5033c46e0339d39695d5686001&q=football`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            container.innerHTML = '';
            data.results.forEach(article => {
                // ምስል የሌላቸውን ዜናዎችም እንዲያሳይ 'article.image_url || default_image' እንጠቀም
                const imageUrl = article.image_url || 'https://via.placeholder.com/300x200?text=News';
                const newsCard = `
                    <div class="news-card" style="margin-bottom:20px; border:1px solid #ddd; padding:10px;">
                        <img src="${imageUrl}" alt="News" style="width:100%;">
                        <div class="content">
                            <h3>${article.title}</h3>
                            <a href="${article.link}" target="_blank" class="btn">Read More</a>
                        </div>
                    </div>`;
                container.innerHTML += newsCard;
            });
        } else {
            container.innerHTML = "<p style='text-align:center;'>No news found today. Try again later.</p>";
        }
    } catch (error) {
        container.innerHTML = "<p style='text-align:center;'>Please try again later.</p>";
    }
}
fetchNews();

