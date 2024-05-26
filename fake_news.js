import { time } from 'console';
import express from 'express';
import faker from 'faker';
import fs from 'fs';
const app = express();
import dayjs from 'dayjs';

function generateFakeData(amount_of_news) {
    const fakeData = [];

    for (let i = 0; i < amount_of_news; i++) {
        const timestamp = faker.date.past().toISOString();
        const date = dayjs(timestamp).format('DD/MM/YYYY');
        let id = i;
        const news = {
            id: id,
            title: faker.lorem.sentence(),
            image: `https://picsum.photos/200/300?random=${i}`,
            content: faker.lorem.paragraphs(),
            timestamp: date
        };
        fakeData.push(news);
    }

    fs.writeFileSync('bd/news.json', JSON.stringify(fakeData, null, 2) + '\n');
}


export default generateFakeData;