// repositories/studentRepository.js
const Swatches = require('../models/swatches');

class SwatchesRepository {
  async getAllSwatches() {
    return Swatches.find();
  }

  async getSwatchesById(id) {
    return Swatches.findById(id);
  }

  async createSwatches(swatchData) {
    const swatch = new Swatches(studentData);
    return swatch.save();
  }

  async updateSwatch(id, swatchData) {
    return Swatches.findByIdAndUpdate(id, swatchData, { new: true });
  }

  async deleteSwatch(id) {
    return Swatches.findByIdAndDelete(id);
  }
}

module.exports = new SwatchesRepository();
