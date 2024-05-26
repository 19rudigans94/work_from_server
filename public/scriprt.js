const loadNewsBtn = document.querySelector('#loadNewsBtn');


document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/data', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                renderNews(data);
            }
        } else {
            console.error('Ошибка при получении данных с сервера:', response.statusText);
        }
    } catch (error) {
        console.error('Ошибка при получении данных с сервера:', error);
    }
});


async function renderNewsFromServer(amount_of_news) {
    try {
        const response = await fetch(`http://localhost:3000/data?amount_of_news=${amount_of_news}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        const data = await response.json();
        renderNews(data);
    } catch (error) {
        console.error('Ошибка при получении данных с сервера:', error);
        throw error;
    }
}


function renderNews(data) {
    const main = document.querySelector('.news-list');
    main.innerHTML = '';
    data.forEach(newsItem => {
        const newsElement = document.createElement('div');
        newsElement.classList.add('news');
        newsElement.innerHTML = `
            <img src="${newsItem.image}" alt="Random Image">
            <div class="news-content">
                <h2>${newsItem.title}</h2>
                <p>${newsItem.content}</p>
                <p class="timestamp">${newsItem.timestamp}</p>
            </div>
        `;
        main.appendChild(newsElement);
    });
}


loadNewsBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const amount_of_news = document.getElementById('newsCount').value;
    await renderNewsFromServer(amount_of_news);
});