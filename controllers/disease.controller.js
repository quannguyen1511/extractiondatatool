var Disease = require("./../models/disease.model");

const createDisease = (request, callback) => {
    var newDisease = new Disease({
        DiseaseId: request.DiseaseId,
        LabelEn: request.LabelEn,
        LabelVn: request.LabelVn,
        InfoDisease: request.InfoDisease,
        Symptom: request.Symptom == 'null ' || request.Symptom == '' || request.Symptom == ' '? null : request.Symptom,
        ParentDiseaseId: request.ParentDiseaseId,
        Rank: 0
    });
    newDisease.save((err, response) => {
        callback(err, response)
    })
}

const getData = () => {
    return new Promise((resolve, reject) => {
        Disease.find({}).exec(function (err, diseases) {
            if (err) {
                reject(err);
            } else {
                resolve(diseases);
            }
        });
    });
}



module.exports = {
    createDisease: createDisease,
    getData: getData,
};