const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configurer le dossier dist pour servir les fichiers de production
const publicPath = path.join(__dirname, '..', 'Client', 'client', 'dist');
app.use(express.static(publicPath));

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Ajouter une tâche
app.post('/api/todos', (req, res) => {
    const { text } = req.body;
    const newTodo = { id: id++, text, etat: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Récupérer toutes les tâches
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// Modifier une tâche
app.put('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const { text, etat } = req.body;
    const todo = todos.find(t => t.id === parseInt(id));
    if (todo) {
        todo.text = text !== undefined ? text : todo.text;
        todo.etat = etat !== undefined ? etat : todo.etat;
        res.json(todo);
    } else {
        res.status(404).send('Tâche non trouvée');
    }
});

// Supprimer une tâche
app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(t => t.id === parseInt(id));
    if (index !== -1) {
        const deletedTodo = todos.splice(index, 1);
        res.json(deletedTodo);
    } else {
        res.status(404).send('Tâche non trouvée');
    }
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
