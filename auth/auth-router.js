const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("./auth-model");

router.post("/", (req, res) => {
  const { username, password } = req.body;
  const user = { username, password };
  res.status(200).json(user);
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const user = { username, password: hash };
    const addedUser = await Users.add(user);
    res.json(addedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const [user] = await Users.findBy({ username: req.body.username });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      req.session.user = user;
      res.json({ message: `Welcome back, ${user.username}` });
    } else {
      res.status(401).json({ message: "Bad credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
