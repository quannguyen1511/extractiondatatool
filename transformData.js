var db = require("./db");
var fs = require("fs"),
  xml2js = require("xml2js");
var diseaseController = require("./controllers/disease.controller");
const promiseWrapper = require("./utils/promise.util");
const config = require("./config");
const translate = require('translate');
const _ = require('lodash');
translate.engine = 'yandex';
translate.key = config._translate_key;

var parser = new xml2js.Parser();

fs.readFile(__dirname + "/data/HumanDO_v231.owl", async function (err, data) {
  console.log("Begin transform data");
  var start = new Date();
  try {
    var result = await promiseWrapper(parser, parser.parseString, data);
    var arr = result["rdf:RDF"]["owl:Class"];
    for (var i = 0, len = arr.length; i < len; i++) {
      var element = arr[i];
      var DiseaseId = element['$']['rdf:about'].split("/").pop();
      var ParentDiseaseId = element["rdfs:subClassOf"] ? element["rdfs:subClassOf"][0]['$']['rdf:resource'].split("/").pop() : null;
      var LabelEn = element["rdfs:label"][0]["_"];
      var LabelVn = await translate(LabelEn, { to: 'vi' });
      var Iao = element["obo:IAO_0000115"] ? element["obo:IAO_0000115"][0]["_"] : null;
      var InfoDiseaseEn = Iao ? Iao.replace(/_/g, " ") : null;
      var InfoDisease = InfoDiseaseEn ? await translate(InfoDiseaseEn, { to: 'vi' }) : null;
      var Symptom = getSymptom(Iao) ? await translate(getSymptom(Iao), { to: 'vi' }) : null;
      console.log(i)
      console.log(DiseaseId)
      var request = { DiseaseId, LabelEn, LabelVn, InfoDisease, Symptom, ParentDiseaseId };
      let x = await promiseWrapper(diseaseController, diseaseController.createDisease, request);
      if (i + 1 == arr.length) {
        console.log("End of transform data");
        var end = new Date() - start;
        console.log(`Execution time: ${end}ms`)
        console.log('Press any key to exit');
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', process.exit.bind(process, 0));
      }
    }
  } catch (e) { console.log('ERROR:', e) }
});

function getSymptom(s) {
  if (!s) return null;
  s = s.replace(/_/g, ' ');
  let keys = ["results in", "has material basis in", "transmitted by", "has symptom",
    "complicated by", "composed of", "derived from", "inheres in", "is a", "located in",
    "occurs with", "part of", "realized by", "realized by supression with",
    "results in formation of", "caused by", "involves", "derives from"];
  keys.forEach(key => {
    let RegExpKey = new RegExp(key, 'g');
    s = s.replace(RegExpKey, "key_in_here");
  });
  let arr = s.split("key_in_here");
  arr.shift();
  let key2 = [' and ', '\\.', ' or ', ' that ', ' which '];
  let result = arr.join(" ");
  key2.forEach(key => {
    let RegExpKey = new RegExp(key, 'g');
    result = result.replace(RegExpKey, ' ');
  });
  return result;
}
