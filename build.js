
import fs from "fs";
import jsonpath from "jsonpath";
import naturalCompare from "string-natural-compare";
import inquirer from "inquirer";
import jsonfile from "jsonfile";
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
  const newRes = {};
  let exportres = {};

  fs.readFile("Source.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // console.log(data)

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
          if (j == 0) {
            if (!newRes.hasOwnProperty(res_obj[j].expression.value)) {
              newRes[res_obj[j].expression.value] = {};
              //console.log(newRes)
            }
          } else if (j == 1) {
            if (
              !newRes[res_obj[j - 1].expression.value].hasOwnProperty(
                res_obj[j].expression.value
              )
            ) {
              newRes[res_obj[j - 1].expression.value][
                res_obj[j].expression.value
              ] = {};
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
              ][res_obj[j].expression.value] = {};
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
                {};

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
              ][res_obj[j].expression.value] = {};
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
                {};
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
let selectedObj = {}

let allInvoked = {}
let selectionInvoked = {}
let veiwInvoke = {}

readFile.then((seedata) => {
  function objselect(obj) {
    return new Promise(function (resolve, reject) {
      if (Object.keys(obj).length == 0) reject();
      currentkeys = [];
      for (let i = 0; i < Object.keys(obj).length; i++) {
        //if (selectedAllin == false){
      //for (let l = 0; l < 2; l++) {
        if (selected.indexOf(Object.keys(obj)[i]) > -1) {
         //- selectedObj[Object.keys(obj)[i]] = {}         
          currentkeys.push("selected: " + Object.keys(obj)[i]);
        } else {
          //delete selectedObj[Object.keys(obj)[i]]
          currentkeys.push(Object.keys(obj)[i]);
        }
     // }
   //   } else {
       // logStream.write("making all children selected")
     //   currentkeys.push("selected: " + Object.keys(obj)[i]);
      //}
    }
  //  selectedAllin = false;
   // logStream.write("ended selection "+selectedAllin+"\n")

      let user = inquirer
        .prompt([
          {
            type: "checkbox",
            name: "selectedItem",
            message: "Select an item:",
            choices: currentkeys,
          },
        ])
        .then((answers) => {
          let awnser = answers.selectedItem[0];
          if (
            Object.keys(obj).indexOf(awnser.substring("selected: ".length, awnser.length)) > -1
          ) {
            awnser = awnser.substring("selected: ".length, awnser.length);
          }
          selectionPath = awnser;

         // for (let l = 0; l < 2; l++) {
          if (selected.indexOf(awnser) > -1) {
            selected.splice(selected.indexOf(awnser), 1);
          } else {
            selected.push(awnser);
          }
          for (let i = 0; i < Object.keys(obj).length; i++) {
            if (selected.indexOf(Object.keys(obj)[i]) > -1) {
          selectedObj[Object.keys(obj)[i]] = {}         
        } else {
          delete selectedObj[Object.keys(obj)[i]]
        }
          }
       // }
          resolve(); // Resolve the promise here
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
              choices: ["Select", "view", "Select and view", "Back", "Quit"],
            },
          ])
          .then((answers) => {
            fs.writeFile("totalstatus.json", JSON.stringify(selectedObj), function(error) {})
            //logStream.write("selected: "+selected+"\n")
            if (answers.action == "Select") {
                fs.writeFile("selectstatus.json", JSON.stringify(selectedObj), function(error) {})
                selectionInvoked = selectedObj;
            //  logStream.write("selected before select: "+selected+"\n")
      //        if (selected.indexOf(selectionPath) > -1){
        //        selectedAllin = true;
          //      logStream.write("started selection "+selectedAllin+" : "+selectionPath+" : "+selected+"\n")
            //} 
          //  for (let l = 0; l < 2; l++) {
              objselect(current_obj).then(() => {
                resolution();
              })
            //}
            } else if (answers.action == "view") {
              fs.writeFile("statusfile.json", JSON.stringify(selectedObj), function(error) {})
              veiwInvoke = selectedObj;
              //logStream.write("selected before veiw: "+selected+"\n")
              current_obj = current_obj[selectionPath]
              //selectedAllin = true;
             // logStream.write(selected.indexOf(selectionPath)+" selected: "+selected+"\n")
              resolution();
            }
            //logStream.write(selected.indexOf(selectionPath)+" selected: "+selected+"\n")
          });
      })
      //.then(() => {
      //});
    }
  }

  Run();
});