import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import fs from 'fs';
const PORT = 3000;
import path from 'path';
// import { fileURLToPath } from 'url';
import generateFakeData from './fake_news.js';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.url}`);
  next();
});


app.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'public/index.html'));
})

app.get('/add_news', (req, res,) => {
  res.sendFile(path.join(path.resolve(), 'public/add_news.html'));
})

app.get('/data', (req, res) => {
  const amount_of_news = req.query.amount_of_news;

  const filePath = path.join(path.resolve(), 'bd', 'news.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      res.status(500).send('Ошибка чтения файла');
      return;
    }
    try {
      const news = JSON.parse(data);
      // Определение limitedNews перед его использованием
      const limitedNews = amount_of_news ? news.slice(0, amount_of_news) : news;
      // Проверка наличия фейковых данных
      if (limitedNews.length === 0 || limitedNews.length < amount_of_news) {
        generateFakeData(amount_of_news);
      } else {
        res.json(limitedNews);
      }
      console.log('Данные получены:', amount_of_news);
    } catch (error) {
      console.error('Ошибка парсинга файла:', error);
      res.status(500).send('Ошибка парсинга файла');
    }
  });
});



app.post('/add_news', (req, res) => {
  const news = req.body;
  const filePath = path.join(path.resolve(), 'bd/news.json');
  const arr = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  news.id = arr.length + 1;
  let ImageUrl = `https://picsum.photos/200/300?random=${news.id}`;
  news.image = ImageUrl;
  arr.push(news);
  fs.writeFileSync(filePath, JSON.stringify(arr, null, 2) + '\n');
  res.sendFile(path.join(path.resolve(), 'public/index.html'));
  // res.redirect(path.join(path.resolve(), 'public/index.html'));
});



app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
