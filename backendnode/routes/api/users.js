const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

function generateAccessToken(email) {
  return jwt.sign(email, "shhh", { expiresIn: '1800s' });
}

function authenticateToken(req, res) {
  jwt.verify(token, "shhh" , (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user
  })
}
// @route GET api/users
// @description Get all users
router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
});

// @route GET api/users/id/:id
// @description Get single user by id
router.get('/id/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ nouserfound: 'No User found' }));
});

router.get('/email/:email', (req, res) => {
  User.findOne({email: req.params.email})
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ nouserfound: 'No User found with email' }));
  });
  

// @route POST api/users
// @description add/save user
router.post('/', (req, res) => {
  User.create(req.body)
    .then(user => res.json({ msg: 'User added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this user' }));
});

// @route api/user/:id
// @description Update user
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route DELETE api/users/id/:id
// @description Delete user by id
// @access Public
router.delete('/id/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, req.body)
    .then(user => res.json({ mgs: 'User entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a user' }));
});

// @route LOGIN
router.post('/login', (req,res) => {
  User.findOne({email: req.body.email})
  .then(user => {
    // gera o token
    const token = generateAccessToken({ email: req.body.email });
    if (user != null){
      if(req.body.email == user.email && req.body.password == user.password){
          User.findByIdAndUpdate(user.id, {"session_id": token})
          .then(user => {
            res.json(token);
            console.log("Logged")
          })
          
      }
      else{
          res.send({"result":'Invalid username or password'});
      }
    }
    else{
      res.send({"result":"Invalid username or password-"})
    }
  }
  )
})

// @route LOGOUT
router.post('/logout',(req,res) => {
  const token = req.body.token;
  if (!token) {
		res.status(401).end();
	}
  var payload;
  try {
		// Parse the JWT string and store the result in `payload`.
		// Note that we are passing the key in this method as well. This method will throw an error
		// if the token is invalid (if it has expired according to the expiry time we set on sign in),
		// or if the signature does not match
		payload = jwt.verify(token, "shhh")
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			// if the error thrown is because the JWT is unauthorized, return a 401 error
			res.status(401).end()
		}
		// otherwise, return a bad request error
		res.status(400).end()
	}
  res.status(200)
  });

// @route get auth
router.post('/auth', (req, res) => {
  const token = req.body.token;
  if (!token) {
		res.status(401).end();
	}
  var payload;
  try {
		// Parse the JWT string and store the result in `payload`.
		// Note that we are passing the key in this method as well. This method will throw an error
		// if the token is invalid (if it has expired according to the expiry time we set on sign in),
		// or if the signature does not match
		payload = jwt.verify(token, "shhh")
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			// if the error thrown is because the JWT is unauthorized, return a 401 error
			res.status(401).end()
		}
		// otherwise, return a bad request error
		res.status(400).end()
	}

  console.log(payload.email);
  console.log("/////");
  User.findOne({email: payload.email})
  .then(user => {
    if (user != null){
      console.log(user);
      res.json(user)
    }
    else{
      res.send({"result":"failure"})
    }
  }
  )  
  .catch(err => res.status(404).json({ nouserfound: 'No User found with session' }))

  }); 

module.exports = router;