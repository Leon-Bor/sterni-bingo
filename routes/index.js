var express = require('express');
var router = express.Router();
const { exec } = require('child_process');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);
const Schema = require('validate');

const bingoSchema = new Schema({
  korken: {
    type: Array,
    each: { type: String, length: { min: 0, max: 2 } },
    length: { min: 0, max: 500 },
  },

  fields: {
    type: Array,
    each: {
      type: Array,
      length: { min: 0, max: 5 },
      each: { type: Array, length: { min: 0, max: 5 }, each: { type: String, length: { min: 0, max: 2 } } },
    },
    length: { min: 0, max: 50 },
  },
  name: {
    type: String,
    length: { max: 31 },
  },
  lastUpdate: {
    type: Number,
    length: { max: 14 },
  },
  saufLink: {
    type: String,
    length: { max: 40 },
  },
  archiveBingoNumbers: {
    type: Array,
    each: { type: Array, each: { type: String, length: { min: 0, max: 2 } }, length: { min: 0, max: 5 } },
    length: { min: 0, max: 500 },
  },
  archiveFields: {
    type: Array,
    each: {
      type: Array,
      length: { min: 0, max: 5 },
      each: { type: Array, length: { min: 0, max: 5 }, each: { type: String, length: { min: 0, max: 2 } } },
    },
    length: { min: 0, max: 50 },
  },
});

// Set some defaults (required if your JSON file is empty)
db.defaults({ bingos: {} }).write();

/* GET home page. */
router.get('/uuid/:saufLink', function (req, res, next) {
  try {
    const { saufLink } = req.params;

    const bingo = db.get(`bingos.${saufLink}`).value();

    res.json(bingo);
  } catch (error) {
    console.log(error);
  }
});

router.post('/uuid/:saufLink', async (req, res, next) => {
  try {
    const { saufLink } = req.params;
    const { lastUpdate, fields, korken, archiveBingoNumbers, archiveFields, name } = req.body;

    const bingo = db.get(`bingos.${saufLink}`).value();
    const currentTime = new Date().getTime();

    const [error] = bingoSchema.validate({ fields, korken, lastUpdate: currentTime });

    if (!error) {
      if (bingo && bingo.lastUpdate && lastUpdate) {
        if (bingo.lastUpdate > lastUpdate) {
          res.json({ status: 200, reload: true });
        } else {
          await db.set(`bingos.${saufLink}`, { fields, korken, archiveBingoNumbers, archiveFields, name, lastUpdate: currentTime }).write();
          res.json({ status: 200, reload: false, currentTime });
        }
      } else {
        await db.set(`bingos.${saufLink}`, { fields, korken, archiveBingoNumbers, archiveFields, name, lastUpdate: currentTime }).write();
        res.json({ status: 200, reload: false, currentTime });
      }
    } else {
      res.json({ status: 666, reload: true });
    }
  } catch (error) {
    console.log(error);
  }
});

/* GET home page. */
router.get('/build12345678909876543212345678', function (req, res, next) {
  try {
    const command = `sudo git pull && sudo npm i && sudo pm2 restart sterni-bingo`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      resolved();
    });

    res.json(true);
  } catch (error) {
    console.log(error);
  }
});

/* GET home page. */
router.get('/see-data', async (req, res, next) => {
  try {
    const data = db.get(`bingos`).value();

    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
