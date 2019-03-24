var mongoose = require("mongoose");
var Schema = mongoose.Schema; //dinh nghia 1 kieu cau truc cho mongo

var symptomSchema = new Schema({
    SymptomVn: {
        type: String
    },
    SymptomEn: {
        type: String
    },
    Rank: {
        type: Number
    }
});
var symptom = mongoose.model("symptom", symptomSchema);
module.exports = symptom;
