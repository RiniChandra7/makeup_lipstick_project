// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const swatchesRepository = require('../repositories/swatchesRepository');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) {
        return cb(err, null);
      }
      cb(null, uploadPath);
    });
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

router.get('/', async (req, res) => {
  try {
    const swatches = await swatchesRepository.getAllSwatches();
    res.json(swatches);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const swatches = await swatchesRepository.getSwatchesById(id);
    if (!swatches) {
      res.status(404).json({ error: 'Swatches not found' });
    } else {
      res.json(swatches);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', upload.single('pic'), async (req, res) => {
  const swatchData = req.body;
  //console.log(swatchData);
  console.log(req.file);
  if (req.file) {
    swatchData.pic = req.file.filename;
  }
  console.log(swatchData);
  try {
    const createdSwatch = await swatchesRepository.createSwatches(swatchData);
    res.status(201).json(createdSwatch);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const swatchData = req.body;
    try {
      const updatedSwatch = await swatchesRepository.updateSwatch(id, swatchData);
      if (!updatedSwatch) {
        res.status(404).json({ error: 'Swatches not found' });
      } else {
        res.json(updatedSwatch);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedSwatch = await swatchesRepository.deleteSwatch(id);
      if (!deletedSwatch) {
        res.status(404).json({ error: 'Swatches not found' });
      } else {
        res.json({ message: 'Swatches deleted' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
