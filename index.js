const express = require('express');
const app = express();
const db = require('./models');
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ 
    extended: true }));

app.listen(port, () => {
    console.log(`Server is running on port 3000`);
})

db.sequelize.sync()
.then((result) => {
    app.listen(3000, () => {
        console.log('Server started');
    });
})
.catch((err) => {
    console.log(err);
});

app.post('/komiks', async (req, res) => {
    const data = req.body;
    try {
        const komik = await db.Komik.create(data);
        res.send(komik);
    } catch (err) {
        res.send(err);
    }
});

app.get('/komiks', async (req, res) => {
    try {
        const komiks = await db.Komik.findAll();
        res.send(komiks);
    } catch (err) {
        res.send(err);
    }
});

app.put('/komiks/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).send({ message: 'Komik not found' });
        }

        await komik.update(data);
        res.send({ message: 'Komik updated successfully', komik });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/komiks/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).send({ message: 'Komik not found' });
        }

        await komik.destroy();
        res.send({ message: 'Komik deleted successfully' });
    } catch (err) {
        res.status(500).send(err);
    }
});


          