var mongoose = require("mongoose");
var Schema = mongoose.Schema; //dinh nghia 1 kieu cau truc cho mongo

var diseaseSchema = new Schema({
  DiseaseId: {
    type: String
  },
  ParentDiseaseId: {
    type: String
  },
  LabelVn: {
    type: String
  },
  LabelEn: {
    type: String
  },
  InfoDisease: {
    type: String
  },
  Symptom: {
    type: String
  },
  Rank: {
    type: Number
  }
});
var disease = mongoose.model("disease", diseaseSchema);
module.exports = disease;
