document.addEventListener('DOMContentLoaded', () => {
    addNewsForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const addNewsForm = document.getElementById('add-news-form');

        const formData = new FormData(addNewsForm);
        try {
            const response = await fetch('/add_news', {
                method: 'POST',
                body: formData
            });
            const data = await response.text();
        } catch (error) {
            console.error('Ошибка отправки формы:', error);
        }
    });
});


