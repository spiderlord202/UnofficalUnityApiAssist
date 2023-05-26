import fs from "fs";
import jsonpath from "jsonpath";
import naturalCompare from "string-natural-compare";
import inquirer from "inquirer";
import jsonfile from "jsonfile";
import { json } from "stream/consumers";
//current_obj[selected[selected.length - 1]]

const logStream = fs.createWriteStream("my-log-file.txt", { flags: "a" });

let layers = [];

logStream.write("created\n");

jsonfile.writeFile("Selecteditems.json", { SelectionArr: [] }, function (err) {
  if (err) console.error(err);
});

function CreatePrefEnd(str) {
  //console.log(str)

  const words = str.match(/[A-Z][a-z]+/g);
  const sorted = words.sort(naturalCompare);
  const finalWords = [];

  for (let l = 0; l < sorted.length; l++) {
    finalWords.push({ name: sorted[l], pos: str.indexOf(sorted[l]) });
  }

  finalWords.sort(function (a, b) {
    return a.pos - b.pos;
  });

  const pushedWords = [];

  finalWords.forEach((obj) => {
    pushedWords.push(obj.name);
  });
  return pushedWords;
}

const readFile = new Promise((resolve, reject) => {
  let newRes = {};
  let exportres = {};

  fs.readFile("Source.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // console.log(data)
//ee
    const obj = JSON.parse(data).$;

    const paths = jsonpath.paths(obj, "$..*");
    const pathList = paths.map((p) => p.join(".")).filter((p) => p != "");

    for (let i = 0; i < pathList.length; i++) {
      try {
        let path = pathList[i];
        path = path.replace(/-/g, ".");
        const res_obj = jsonpath.parse(path);
        let prevPath = "";
        for (let j = 0; j < res_obj.length; j++) {

          //work here
          /*
              let findPath = jsonpath.paths(
                  todata,
                  `$..[?(@.name == '${selectionPath}')]`
                )[0].slice(0, -2)
               
                const parentPath = findPath;
                const nodes = jsonpath.nodes(todata, jsonpath.stringify(parentPath));
                current_obj = nodes[0].value;
                resolution();
          */
              //  console.log(res_obj)
              //console.log(path)
              //function Recurse(){



                /*
              let toDom = {}
              for (let k = res_obj.length-1; k != -1; k--){
                let parentPath = 
                jsonpath.paths(
                  newRes,
                  `$..[?(@.name == '${res_obj[k].expression.value}')]`
                )[0]
                if (parentPath == undefined){
                  newRes[res_obj[k].expression.value] = {}
                 // k++
                  continue;
                }
               // console.log(parentPath)
                const nodes = jsonpath.nodes(newRes, jsonpath.stringify(parentPath))[0].value;
                //console.log(nodes)
                if (k == res_obj.length-1){
                if (!nodes.hasOwnProperty(res_obj[j].expression.value)){
                  toDom[res_obj[j].expression.value] = {}
                } else {
                  toDom[jsonpath.parse(nodes).expression.value] = {}
                  toDom[jsonpath.parse(nodes).expression.value][res_obj[j].expression.value]
                  delete res_obj[j].expression.value;
                }
              }
            }
            newRes = {...newRes, ...toDom}
            console.log(newRes)
            */
            //}
            //  jsonpath.nodes(newRes, jsonpath.stringify(findPath))[0].value.hasOwnProperty(res_obj[j].expression.value)

           else if (j == 1) {
            if (
              !newRes[res_obj[j - 1].expression.value].hasOwnProperty(
                res_obj[j].expression.value
              )
            ) {
              newRes[res_obj[j - 1].expression.value][
                res_obj[j].expression.value
              ] = { name: res_obj[j].expression.value };
              if (layers.includes(1)) {
                let initials = "";
                for (let l = 0; l < res_obj[j].expression.value.length; l++) {
                  if (
                    res_obj[j].expression.value.split("")[l] ==
                    res_obj[j].expression.value.split("")[l].toUpperCase()
                  ) {
                    initials += res_obj[j].expression.value.split("")[l];
                  }
                }
                newRes[res_obj[j - 1].expression.value][
                  res_obj[j].expression.value
                ].prefix = [
                  initials,
                  CreatePrefEnd(res_obj[j].expression.value)[0],
                  res_obj[j].expression.value,
                ];
              }
            }
          } else if (j == 2) {
            if (
              !newRes[res_obj[j - 2].expression.value][
                res_obj[j - 1].expression.value
              ].hasOwnProperty(res_obj[j].expression.value)
            ) {
              newRes[res_obj[j - 2].expression.value][
                res_obj[j - 1].expression.value
              ][res_obj[j].expression.value] = {
                name: res_obj[j].expression.value,
              };
              if (layers.includes(2)) {
                let initials = "";
                for (let l = 0; l < res_obj[j].expression.value.length; l++) {
                  if (
                    res_obj[j].expression.value.split("")[l] ==
                    res_obj[j].expression.value.split("")[l].toUpperCase()
                  ) {
                    initials += res_obj[j].expression.value.split("")[l];
                  }
                }
                newRes[res_obj[j - 2].expression.value][
                  res_obj[j - 1].expression.value
                ][res_obj[j].expression.value].prefix = [
                  initials,
                  CreatePrefEnd(res_obj[j].expression.value)[0],
                  res_obj[j].expression.value,
                ];
              }
            }
          } else if (j == 3) {
            if (
              !newRes[res_obj[j - 3].expression.value][
                res_obj[j - 2].expression.value
              ][res_obj[j - 1].expression.value].hasOwnProperty(
                res_obj[j].expression.value
              )
            ) {
              newRes[res_obj[j - 3].expression.value][
                res_obj[j - 2].expression.value
              ][res_obj[j - 1].expression.value][res_obj[j].expression.value] =
                { name: res_obj[j].expression.value };
              if (layers.includes(3)) {
                let initials = "";

                for (let l = 0; l < res_obj[j].expression.value.length; l++) {
                  if (
                    res_obj[j].expression.value.split("")[l] ==
                    res_obj[j].expression.value.split("")[l].toUpperCase()
                  ) {
                    initials += res_obj[j].expression.value.split("")[l];
                  }
                }
                newRes[res_obj[j - 3].expression.value][
                  res_obj[j - 2].expression.value
                ][res_obj[j - 1].expression.value][
                  res_obj[j].expression.value
                ].prefix = [
                  initials,
                  CreatePrefEnd(res_obj[j].expression.value)[0],
                  res_obj[j].expression.value,
                ];
              }
            }
          } else if (j == 4) {
            if (
              !newRes[res_obj[j - 4].expression.value][
                res_obj[j - 3].expression.value
              ][res_obj[j - 2].expression.value][
                res_obj[j - 1].expression.value
              ].hasOwnProperty(res_obj[j].expression.value)
            ) {
              newRes[res_obj[j - 4].expression.value][
                res_obj[j - 3].expression.value
              ][res_obj[j - 2].expression.value][
                res_obj[j - 1].expression.value
              ][res_obj[j].expression.value] = {
                name: res_obj[j].expression.value,
              };
              if (layers.includes(4)) {
                let initials = "";
                for (let l = 0; l < res_obj[j].expression.value.length; l++) {
                  if (
                    res_obj[j].expression.value.split("")[l] ==
                    res_obj[j].expression.value.split("")[l].toUpperCase()
                  ) {
                    initials += res_obj[j].expression.value.split("")[l];
                  }
                }
                newRes[res_obj[j - 4].expression.value][
                  res_obj[j - 3].expression.value
                ][res_obj[j - 2].expression.value][
                  res_obj[j - 1].expression.value
                ][res_obj[j].expression.value].prefix = [
                  initials,
                  CreatePrefEnd(res_obj[j].expression.value)[0],
                  res_obj[j].expression.value,
                ];
              }
            }
          } else if (j == 5) {
            if (
              !newRes[res_obj[j - 5].expression.value][
                res_obj[j - 4].expression.value
              ][res_obj[j - 3].expression.value][
                res_obj[j - 2].expression.value
              ][res_obj[j - 1].expression.value].hasOwnProperty(
                res_obj[j].expression.value
              )
            ) {
              newRes[res_obj[j - 5].expression.value][
                res_obj[j - 4].expression.value
              ][res_obj[j - 3].expression.value][
                res_obj[j - 2].expression.value
              ][res_obj[j - 1].expression.value][res_obj[j].expression.value] =
                { name: res_obj[j].expression.value };
              if (layers.includes(5)) {
                let initials = "";
                for (let l = 0; l < res_obj[j].expression.value.length; l++) {
                  if (
                    res_obj[j].expression.value.split("")[l] ==
                    res_obj[j].expression.value.split("")[l].toUpperCase()
                  ) {
                    initials += res_obj[j].expression.value.split("")[l];
                  }
                }
                newRes[res_obj[j - 5].expression.value][
                  res_obj[j - 4].expression.value
                ][res_obj[j - 3].expression.value][
                  res_obj[j - 2].expression.value
                ][res_obj[j - 1].expression.value][
                  res_obj[j].expression.value
                ].prefix = [
                  initials,
                  CreatePrefEnd(res_obj[j].expression.value)[0],
                  res_obj[j].expression.value,
                ];
              }
            }
          }

          

        }
        resolve(newRes);
      } catch (error) {
        console.log(error);
      }
    }
  });
});

let currentkeys = [];
//let selectedAllin = false;
let selectionPath = "";
let selected = [];

let finalKeys = {};
let a = {};
let b = {};

//let allInvoked = {};
//let selectionInvoked = {};
//let veiwInvoke = {};

//let finalObj = {};
//let testObj = {};

readFile.then((todata) => {
  function overrun(seedata) {
    function objselect(obj) {
      return new Promise(function (resolve, reject) {
        if (Object.keys(obj).length == 0) reject();
        currentkeys = [];

        for (let i = 0; i < Object.keys(obj).length; i++) {
          if (selected.indexOf(Object.keys(obj)[i]) > -1) {
            currentkeys.push("selected: " + Object.keys(obj)[i]);
            finalKeys[Object.keys(obj)[i]] = {};
          } else {
            currentkeys.push(Object.keys(obj)[i]);
            delete finalKeys[Object.keys(obj)[i]];
          }
          
            fs.writeFile(
                "finalObj.json",
                JSON.stringify(finalKeys, null, 2),
                function (error) {}
            );
        }

        let user = inquirer
          .prompt([
            {
              type: "checkbox",
              name: "selectedItem",
              message: "Select an item:",
              choices: currentkeys.filter(e => e !== 'name')
            },
          ])
          .then((answers) => {
            let IsSelected = null;
            let awnser = answers.selectedItem[0];
            if (
              Object.keys(obj).indexOf(
                awnser.substring("selected: ".length, awnser.length)
              ) > -1
            ) {
              awnser = awnser.substring("selected: ".length, awnser.length);
            } else {
            }
            selectionPath = awnser;

            // for (let l = 0; l < 2; l++) {
            if (selected.indexOf(awnser) > -1) {
              selected.splice(selected.indexOf(awnser), 1);
              // delete selectedObj[awnser]
            } else {
              // selectedObj[awnser] = {}
              IsSelected = true;
              selected.push(awnser);
            }
            let returnObj = {};
            returnObj.content = awnser;
            returnObj.IsSelected = IsSelected;
            resolve(returnObj); // Resolve the promise here
          });
      });
    }

    let current_obj = seedata;
    async function Run() {
      while (current_obj instanceof Object) {
        await new Promise(function (resolve, reject) {
          function resolution() {
            resolve();
          }
          let action = inquirer
            .prompt([
              {
                type: "list",
                name: "action",
                message: "Select an action:",
                choices: [
                  "Select",
                  "view",
                  "Select and view",
                  "Back",
                  "Quit",
                  "Finished",
                ],
              },
            ])
            .then((answers) => {
              if (answers.action === "Select") {
                // finalKeys = current_obj
                objselect(current_obj)
                  .then((answer) => {
                    return resolution();
                  })
                  .catch((error) => {
                    // Handle any errors in objselect()
                    console.error(error);
                    resolution();
                  });
              } else if (answers.action === "view") {
                current_obj = current_obj[selectionPath];
                resolution();
              } else if (answers.action === "Select and view") {
                objselect(current_obj)
                  .then((answer) => {
                    return resolution();
                  })
                  .catch((error) => {
                    // Handle any errors in objselect()
                    console.error(error);
                    resolution();
                  });
                current_obj = current_obj[selectionPath];
              } else if (answers.action === "Back") {
                // let jsonToPath = {...todata}
                let findPath = jsonpath.paths(
                  todata,
                  `$..[?(@.name == '${selectionPath}')]`
                )[0].slice(0, -2)
               
                const parentPath = findPath;
                const nodes = jsonpath.nodes(todata, jsonpath.stringify(parentPath));
                current_obj = nodes[0].value;
                resolution();
              } else if (answers.action === "Finished") {

              } 
            });
        });
      }
    }
    Run();
  }
  overrun(todata);
  /*
              fs.writeFile("statusfile.json", JSON.stringify(a, null, 2), function (error) {});
            fs.writeFile("selectedstatus.json", JSON.stringify(b, null, 2), function (error) {});
            const combinedObj = { ...a, ...b };
            for (const prop in b) {
              if (a.hasOwnProperty(prop)){
                delete combinedObj[prop]
              }
            }
  */
  //fs.writeFile("totalObj.json", "", function (error) {});
  //fs.writeFile("testObj.json", "", function (error) {});
  fs.writeFile("finalObj.json", "", function (error) {});
  // fs.writeFile("statusfile.json", "", function (error) {});
  // fs.writeFile("selectstatus.json", "", function (error) {});
  //fs.writeFile("totalstatus.json", "", function (error) {});
});
