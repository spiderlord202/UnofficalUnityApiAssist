//const readline = require('readline');
//const { spawn } = require('child_process');
import fs from "fs";
import jsonpath from "jsonpath";
import naturalCompare from "string-natural-compare";
import inquirer from "inquirer";
import jsonfile from "jsonfile";
import { toJSON, fromJSON } from "flatted";
import { resolve } from "path";
import { rejects } from "assert";
//import vm2  from 'vm2';
//C:\Users\DuttR\unofficalunityapiassistportal\build.js

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

        //console.log(exportres)
      } catch (error) {
        console.log(error);
      }
    }
  });
  //console.log(exportres)
  //return exportres;
});

let path = [];

jsonfile.readFile("Source.json", "utf-8", function (err, seedata) {
  function objselect(selected, obj) {
    return new Promise(function (resolve, reject) {
      let currentkeys = Object.keys(obj);
      let user = inquirer.prompt([
        {
          type: "checkbox",
          name: "selectedItem",
          message: "Select an item:",
          choices: obj.keys,
        },
      ]).then((answers) => {
        if (selected.indexOf(answers.selectedItem[0]) > -1) {
          selected.push(answers.selectedItem[0]);
        } else {
          selected.splice(selected.indexOf(answers.selectedItem[0]), 1);
        }
        resolve(); // Resolve the promise when the selection is done
      });
    });
  }

  let selected = [];
  let current_obj = seedata;
  async function Run() {
    while (current_obj instanceof Object) {
      await new Promise((resolve, rejects) => {
      let action = inquirer.prompt([
        {
          type: "list",
          name: "action",
          message: "Select an action:",
          choices: ["Select", "view", "Select and view", "Back", "Quit"],
        },
      ]).then(async (answers) => {
        if (answers.action == "select") {
           objselect(selected, current_obj).then(() => resolve())
        } else if (answers.action == "view") {
          current_obj = current_obj[selected[0]];
          resolve()
        }
        });
      })
    }
  }
  Run();
});


/*
rl.question('Enter the build path: ', (buildPath) => {

        fs.writeFile('snippit_build.json', JSON.stringify(newRes, null, 2), (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        });
});
*/

/*
  const child = spawn('node', [buildPath]);

  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    rl.close();
  });
  */
