const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// VIEW OR HTML
app.get("/");

app.get("/account");

app.get("/account/edit", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/accountEdit.html"));
});

app.get("/orders");

app.get("/orders/:orderId");

// API OR JSON

const arrayOfUsers = [];
// READ
app.get("/api/account", (req, res) => {
  res.json(arrayOfUsers);
});

app.get("/api/account/:id", (req, res) => {
  for (let i = 0; i < arrayOfUsers.length; i++) {
    if (arrayOfUsers[i].id === JSON.parse(req.params.id)) {
      return res.json(arrayOfUsers[i]);
    }
  }
  res.json("Error: No user found");
});
// CREATE
app.post("/api/account", (req, res) => {
  console.log(req.body);
  arrayOfUsers.push(req.body);
  res.json(arrayOfUsers);
});
// UPDATE
app.put("/api/account", (req, res) => {
  console.log(req.body);
  for (let i = 0; i < arrayOfUsers.length; i++) {
    if (arrayOfUsers[i].id === JSON.parse(req.body.id)) {
      arrayOfUsers[i].email = req.body.email;
      arrayOfUsers[i].password = req.body.password;
    }
  }
  res.json(arrayOfUsers);
});
// DELETE
app.delete("/api/account/:id", (req, res) => {
  for (let i = 0; i < arrayOfUsers.length; i++) {
    if (arrayOfUsers[i].id === JSON.parse(req.params.id)) {
      // Slice the user from the array
    }
  }
});

app.get("/api/products");

app.get("/api/cart");

app.get("/api/orders");


app.listen(PORT, () => {
  console.log(`Running on http://localhost${PORT}`);
});
