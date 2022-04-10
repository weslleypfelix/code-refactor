const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const Customers = [];

function verifyIfExistsAccountCPF(req, res, next) {
  const { cpf } = req.headers;
  const customer = Customers.find((customer) => {
    if (customer.cpf === cpf) {
      return true;
    }
  });
  if (!customer) {
    return res.status(400).json({ error: "Costumer not found" });
  }
  req.weslley = customer;
  return next();
}


app.post("/account", (req, res) => {
  const { cpf, name } = req.body;
  const id = uuidv4();

  const customerAlreadyExists = Customers.some((customer) => {
    if (customer.cpf === cpf) {
      return true;
    }
  });

  if (customerAlreadyExists) {
    return res.status(400).json({ error: "customer already exists!" });
  }

  Customers.push({
    cpf,
    name,
    id,
    statement: [],
  });
  console.log("customers: ", Customers);
  return res.status(201).send();
});

app.get("/statement", verifyIfExistsAccountCPF,  (req, res) => {
  const { weslley } = req;
  return res.json(weslley.statement);
});

app.get("/statement/date", verifyIfExistsAccountCPF,  (req, res) => {
  const { weslley } = req;
  const { date } = req.query;

  const dateFormat = new Date(date + " 00:00");
  const statement = weslley.statement.filter((statement) => statement.created_at.toDateString() === new Date(dateFormat).toDateString());

  return res.json(statement);
});

app.post("/deposit", verifyIfExistsAccountCPF, (req, res) => {
  const { description, amount } = req.body;

  const { weslley } = req;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "Credit"
  };

  weslley.statement.push(statementOperation); 
  return res.status(201).send();

})

app.put("/account", verifyIfExistsAccountCPF, (req, res) => {
  const { name } = req.body;
  const { weslley } = req;

  weslley.name = name;

  return res.status(201).send();
})

app.get("/account",verifyIfExistsAccountCPF,  (req, res) => {
  const { weslley } = req;

  return res.json(weslley);
})

app.listen(3000, verifyIfExistsAccountCPF, () => {
  console.log("Running Server ..! 🔥 🔥 ");
});
