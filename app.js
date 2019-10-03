const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Food = require('./models/food');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(
    'mongodb://test:testtest1@ds329668.mlab.com:29668/restaurant',
    { useNewUrlParser: true }
);

let foods = [
    {
        id: 1,
        name: 'Pizza'
    },
    {
        id: 2,
        name: 'Pasta'
    },
    {
        id: 3,
        name: 'Steak'
    },
    {
        id: 4,
        name: 'New food'
    }
];

app.get('/foods', async (req, res) => {
    const foods = await Food.find({});
    res.json(foods);
});

app.post('/foods', async (req, res) => {
    const { name } = req.body;

    // foods.push({ id, name });
    await Food.create({ name });

    res.send({ success: true });
});

app.get('/foods/:id', async (req, res) => {
    const { id } = req.params;

    // const food = foods.find(food => {
    //     return id == food.id;
    // });

    const food = await Food.findById(id);

    res.send(food);
});

app.delete('/foods/:id', async (req, res) => {
    const { id } = req.params;
    // foods = foods.filter(food => {
    //     return id != food.id;
    // });

    await Food.deleteOne({ _id: id });

    res.send({ success: true });
});

app.patch('/foods/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    // foods = foods.map(food => {
    //     return id == food.id ? { ...food, name } : food;
    // });

    await Food.updateOne({ _id: id }, { name: name });
    res.send({ success: true });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
