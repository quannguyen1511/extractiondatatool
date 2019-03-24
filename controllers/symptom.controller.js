var Symptom = require("../models/symptom.model");

const createSymptom = async (request, callback) => {
    Symptom.find({SymptomEn: request.SymptomEn}).exec((err, symp) => {
        if (symp) {
            callback(null, {});
        } else {
            var newSymptom = new Symptom({
                SymptomVn: request.SymptomVn,
                SymptomEn: request.SymptomEn,
                Rank: 0
            });
            newSymptom.save((err, response) => {
                callback(err, response)
            })
        }
    })
}

const getData = (request) => {
    return new Promise((resolve, reject) => {
        Symptom.find({}).exec(function (err, Symptoms) {
            if (err) {
                reject(err);
            } else {
                resolve(Symptoms);
            }
        });
    });
}



module.exports = {
    createSymptom: createSymptom,
    getData: getData,
};