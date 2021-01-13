const express = require('express');
const path = require('path');
const router = express.Router();

// mongoose model
const Letter = require('./models');

// base ural route 
router.get('/', async (req, res) => {
  await res.sendFile(path.join(__dirname, 'public/index.html'));
});

// get all letters route 
router.get('/letters/:from', async (req, res) => {
  await Letter.find({}, (err, letters) => {
    const filterdLetters = letters.filter(letter => {
      return letter.to === req.params.from;
    });
    res.status(200).json(filterdLetters);
    if (err) {
      res.status(500);
      console.error(err);
    }
  });
});

// get letters iv written
router.get('/mypen/:secret', async (req, res) => {
  console.log(req.params.secret);
  await Letter.find({}, (err, letters) => {
    const filterdLetters = letters.filter(letter => {
      return letter.secret === req.params.secret;
    });
    res.status(200).json(filterdLetters);
    if (err) {
      res.status(500);
      console.error(err);
    }
  });
});
// post route
router.post('/send', async (reg, res) => {
  const { letter, timeStamp, from, to, secret } = reg.body;

  const newLetter = new Letter({
    letter,
    timeStamp,
    from,
    to,
    secret
  });

  await newLetter.save()
    .then(() => {
      res.status(201);
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
