// script.js - Global News Engine

// 1. የዜና ምንጩን ለመክፈት የሚያገለግል ልዩ ቁልፍ (API KEY)
const API_KEY = '7444e7725ca54f52b7c1c429e08d3177';

// 2. ዜናውን ከኢንተርኔት የሚጎትተው ዋና ተግባር
async function fetchNews() {
    const container = document.getElementById('news-container');
    
    // በገጹ ላይ የዜና ማስቀመጫ ቦታ ከሌለ (ለምሳሌ About ገጽ ላይ) ስራውን ያቆማል
    if (!container) return;

    let path = window.location.pathname;
    let url;

    // 3. ገጹን በመለየት ትክክለኛውን የዜና ዘርፍ መምረጥ
    
    // ስፖርት ገጽ ከሆነ - የእግር ኳስ ዜናዎችን (Football/Soccer) እንዲፈልግ
    if (path.includes('sport.html')) {
        url = `https://newsapi.org/v2/everything?q=football+OR+soccer+OR+premierleague&language=en&sortBy=publishedAt&apiKey=${API_KEY}`;
    } 
    // የቴክኖሎጂ ገጽ ከሆነ
    else if (path.includes('tech.html')) {
        url = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${API_KEY}`;
    } 
    // የፖለቲካ ገጽ ከሆነ
    else if (path.includes('politics.html')) {
        url = `https://newsapi.org/v2/top-headlines?country=us&category=politics&apiKey=${API_KEY}`;
    } 
    // ለዋናው ገጽ (Home) - አጠቃላይ አለም አቀፍ ዜናዎች
    else {
        url = `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${API_KEY}`;
    }

    try {
        // 4. መረጃውን ከ NewsAPI መውሰድ
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.articles && data.articles.length > 0) {
            container.innerHTML = ''; // "Loading" የሚለውን ጽሁፍ ለማጥፋት
            
            // 5. እያንዳንዱን ዜና ወደ HTML ካርድ መቀየር
            data.articles.forEach(article => {
                // ምስልና ርዕስ ያላቸውን ዜናዎች ብቻ ለይቶ ያወጣል
                if (article.urlToImage && article.title) {
                    const newsCard = `
                        <div class="news-card">
                            <img src="${article.urlToImage}" alt="News Image">
                            <div class="content">
                                <h3>${article.title}</h3>
                                <p>${article.description || 'Visit the website for more details.'}</p>
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
        // 6. ኢንተርኔት ከሌለ ወይም ስህተት ከተፈጠረ የሚወጣ መልእክት
        console.error("Error fetching news:", error);
        container.innerHTML = "<p style='text-align:center;'>Failed to load news. Please check your internet connection.</p>";
    }
}

// 7. ገጹ እንደተከፈተ ስራውን እንዲጀምር መጥራት
fetchNews();
