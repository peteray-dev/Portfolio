const { Router } = require('express');
const express = require('express');
const { createContact } = require('../controller/contact.controller');

const router = express.Router();

router.post('/', createContact);

module.exports = router;
