const express = require("express");

const cartRoutes = express.Router();

cartRoutes.get("/", (req, res) => {
    res.send("itlives");
})
const cartItems = [{
        id: 0,
        product: "Shirt",
        price: 34,
        quantity: 3
    },
    {
        id: 1,
        product: "Pants",
        price: 12,
        quantity: 1
    }, {
        id: 2,
        product: "Jacket",
        price: 5,
        quantity: 1
    },
];
let nextId = 3;

cartRoutes.get("/cartItems", (req, res) => {
    res.json(cartItems);
});

cartRoutes.get("/cart-items", (req, res) => {
    // If the request has a ?name= parameter, only respond w/ matching students
    if (req.query.name) {
        let filteredCart = cartItems.filter(
            items => items.name.includes(req.query.name));
        // .json sends response as JSON
        res.json(filteredCart);
    } else {
        // else respond with ALL students.
        // .json sends response as JSON
        res.json(cartItems);
    }
});
cartRoutes.get("/cart-items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    let foundItem = cartItems.find(aItem => aItem.id === id);
    if (foundItem) {
        res.json(foundItem);
    } else {
        res.status(404);
        res.send(`no item found with id:${id}`)
    }

});

cartRoutes.post("/cart-items", (req, res) => {
    const item = req.body;
    item.id = nextId++;
    cartItems.push(item);

    res.status(201);
    res.json(item);

});
cartRoutes.put("/cart-items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = req.body;
    item.id = id;
    // Find Index by ID
    const index = cartItems.findIndex(i => i.id === id);
    // Replace at index
    cartItems.splice(index, 1, item);
    res.json(item);
});

cartRoutes.delete("/cart-items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = cartItems.findIndex(i => i.id === id);
    // If found...
    if (index !== -1) {
        cartItems.splice(index, 1);
    }
    // Set response code to 204. Send no content.
    res.sendStatus(204);
});
module.exports = cartRoutes;