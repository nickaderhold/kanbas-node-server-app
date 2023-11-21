const assignment = {
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
};

const todos = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: false },
    { id: 3, title: "Task 3", completed: false },
    { id: 4, title: "Task 4", completed: false },
    { id: 5, title: "Task 5", completed: true },
    { id: 6, title: "Task 6", completed: true },
];

const Lab5 = (app) => {
    // Update a todo item
    app.put("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            return res.status(404).send('Todo not found');
        }
        Object.assign(todo, req.body);
        res.sendStatus(200);
    });

    // Delete a todo item
    app.delete("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const index = todos.findIndex((t) => t.id === parseInt(id));
        if (index === -1) {
            return res.status(404).send('Todo not found');
        }
        todos.splice(index, 1);
        res.sendStatus(200);
    });

    // Create a new todo item
    app.post("/a5/todos", (req, res) => {
        const newTodo = {
            ...req.body,
            id: new Date().getTime(),
        };
        todos.push(newTodo);
        res.json(newTodo);
    });

    // Retrieve all todos or filtered by completion status
    app.get("/a5/todos", (req, res) => {
        const { completed } = req.query;
        if (completed !== undefined) {
            const completedStatus = completed === 'true';
            const filteredTodos = todos.filter((t) => t.completed === completedStatus);
            res.json(filteredTodos);
            return;
        }
        res.json(todos);
    });

    // Retrieve a specific todo item by ID
    app.get("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            return res.status(404).send('Todo not found');
        }
        res.json(todo);
    });

    // Assignment-related endpoints
    app.get("/a5/assignment", (req, res) => {
        res.json(assignment);
    });

    app.get("/a5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });

    // Welcome message
    app.get("/a5/welcome", (req, res) => {
        res.send("Welcome to Assignment 5");
    });

    // Calculator operations
    app.get("/a5/calculator", (req, res) => {
        const { a, b, operation } = req.query;
        let result = 0;
        switch (operation) {
            case "add":
                result = parseInt(a) + parseInt(b);
                break;
            case "subtract":
                result = parseInt(a) - parseInt(b);
                break;
            default:
                result = "Invalid operation";
        }
        res.send(result.toString());
    });
};

export default Lab5;
