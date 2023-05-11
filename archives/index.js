const fs = require('fs');
const jsonpath = require('jsonpath');
const naturalCompare = require("string-natural-compare");

function CreatePrefEnd (str){
  const words = str.match(/[A-Z][a-z]+/g);
  const sorted = words.sort(naturalCompare);
  const finalWords = [];
  
  for (let l = 0; l < sorted.length; l++) {
    finalWords.push({ name: sorted[l], pos: str.indexOf(sorted[l]) });
  }
  
  finalWords.sort(function(a, b) {
    return a.pos - b.pos;
  });
  
  const pushedWords = [];
  
  finalWords.forEach(obj => {
    pushedWords.push(obj.name);
  });
  //console.log(pushedWords)
  return pushedWords;
  //console.log(pushedWords);
}

fs.readFile('testing2classArr.json', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const obj = JSON.parse(data).$;
  const newRes = {};

  const paths = jsonpath.paths(obj, '$..*');
  const pathList = paths.map(p => p.join('.')).filter(p => p !== '');

  for (let i = 0; i < pathList.length; i++) {
    try {
      let path = pathList[i];
      path = path.replace(/-/g, '.');
      const res_obj = jsonpath.parse(path);
      let prevPath = '';
      for (let j = 0; j < res_obj.length; j++) {
        if (j == 0) {
          if (!newRes.hasOwnProperty(res_obj[j].expression.value)) {
            newRes[res_obj[j].expression.value] = {};
          }} else if (j == 1) {
          if (!newRes[res_obj[j - 1].expression.value].hasOwnProperty(res_obj[j].expression.value)) {
            newRes[res_obj[j - 1].expression.value][res_obj[j].expression.value] = {};
           /*
            let initials = ""
            for (let l = 0; l < res_obj[j].expression.value.length; l++) {
             if  (res_obj[j].expression.value.split("")[l] == res_obj[j].expression.value.split("")[l].toUpperCase()){
              initials += res_obj[j].expression.value.split("")[l]
             }
            }
            newRes[res_obj[j - 1].expression.value][res_obj[j].expression.value].prefix = [initials, CreatePrefEnd(res_obj[j].expression.value)[0], res_obj[j].expression.value]
           */
          }
        } else if (j == 2) {
          if (!newRes[res_obj[j - 2].expression.value][res_obj[j - 1].expression.value].hasOwnProperty(res_obj[j].expression.value)) {
            newRes[res_obj[j - 2].expression.value][res_obj[j - 1].expression.value][res_obj[j].expression.value] = {};
              let initials = ""
              for (let l = 0; l < res_obj[j].expression.value.length; l++) {
               if  (res_obj[j].expression.value.split("")[l] == res_obj[j].expression.value.split("")[l].toUpperCase()){
                initials += res_obj[j].expression.value.split("")[l]
               }
              }
              newRes[res_obj[j - 2].expression.value][res_obj[j - 1].expression.value][res_obj[j].expression.value].prefix = [initials, CreatePrefEnd(res_obj[j].expression.value)[0], res_obj[j].expression.value]
          }
        } else if (j == 3) {
          if (!newRes[res_obj[j - 3].expression.value][res_obj[j - 2].expression.value][res_obj[j - 1].expression.value].hasOwnProperty(res_obj[j].expression.value)) {
            newRes[res_obj[j - 3].expression.value][res_obj[j - 2].expression.value][res_obj[j - 1].expression.value][res_obj[j].expression.value] = {};
              let initials = ""
              for (let l = 0; l < res_obj[j].expression.value.length; l++) {
               if  (res_obj[j].expression.value.split("")[l] == res_obj[j].expression.value.split("")[l].toUpperCase()){
                initials += res_obj[j].expression.value.split("")[l]
               }
              }
              newRes[res_obj[j - 3].expression.value][res_obj[j - 2].expression.value][res_obj[j - 1].expression.value][res_obj[j].expression.value].prefix = [initials, CreatePrefEnd(res_obj[j].expression.value)[0], res_obj[j].expression.value]
          }
        } else if (j == 4) {
          if (!newRes[res_obj[j - 4].expression.value][res_obj[j - 3].expression.value][res_obj[j - 2].expression.value][res_obj[j - 1].expression.value].hasOwnProperty(res_obj[j].expression.value)) {
            newRes[res_obj[j - 4].expression.value][res_obj[j - 3].expression.value][res_obj[j - 2].expression.value][res_obj[j - 1].expression.value][res_obj[j].expression.value] = {};
              let initials = ""
              for (let l = 0; l < res_obj[j].expression.value.length; l++) {
               if  (res_obj[j].expression.value.split("")[l] == res_obj[j].expression.value.split("")[l].toUpperCase()){
                initials += res_obj[j].expression.value.split("")[l]
               }
              }
              newRes[res_obj[j - 4].expression.value][res_obj[j - 3].expression.value][res_obj[j - 2].expression.value][res_obj[j - 1].expression.value][res_obj[j].expression.value].prefix = [initials, CreatePrefEnd(res_obj[j].expression.value)[0], res_obj[j].expression.value]
          }
        } else if (j == 5) {
          if (!newRes[res_obj[j - 5].expression.value][res_obj[j - 4].expression.value][res_obj[j - 3].expression.value][res_obj[j - 2].expression.value][res_obj[j - 1].expression.value].hasOwnProperty(res_obj[j].expression.value)) {
            newRes[res_obj[j - 5].expression.value][res_obj[j - 4].expression.value][res_obj[j - 3].expression.value][res_obj[j - 2].expression.value][res_obj[j - 1].expression.value][res_obj[j].expression.value] = {};
              let initials = ""
              for (let l = 0; l < res_obj[j].expression.value.length; l++) {
               if  (res_obj[j].expression.value.split("")[l] == res_obj[j].expression.value.split("")[l].toUpperCase()){
                initials += res_obj[j].expression.value.split("")[l]
               }
              }
              newRes[res_obj[j - 5].expression.value][res_obj[j - 4].expression.value][res_obj[j - 3].expression.value][res_obj[j - 2].expression.value][res_obj[j - 1].expression.value][res_obj[j].expression.value].prefix = [initials, CreatePrefEnd(res_obj[j].expression.value)[0], res_obj[j].expression.value]
          }
        }
      }

    } catch(error) {
     // console.log(error)
    }
  }
  
  fs.writeFile('output2.json', JSON.stringify(newRes, null, 2), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
});