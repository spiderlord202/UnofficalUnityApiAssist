import fs from "fs";
import jsonpath from "jsonpath";
import naturalCompare from "string-natural-compare";
import inquirer from "inquirer";
import jsonfile from "jsonfile";
import { json } from "stream/consumers";
import path from "path";
import treeify from "treeify";
import { exit } from "process";

const logStream = fs.createWriteStream("my-log-file.txt", { flags: "a" });
let ResPaths = ["newRes"];

let blacklist = [];
let presets = [
  `

            if (
              !<Current path>.hasOwnProperty(<Suffix path>)
            ) {
              <Current path>[<Suffix path>] = {
                name: <Suffix path>,
              };
              
              if (layers.includes(<Num>)) {
                let initials = "";
                for (let l = 0; l < <Suffix path>.length; l++) {
                  if (
                    <Suffix path>.split("")[l] ==
                    <Suffix path>.split("")[l].toUpperCase()
                  ) {
                    initials += <Suffix path>.split("")[l];
                  }
                }
                <Current path>[<Suffix path>].prefix = [
                  initials,
                  CreatePrefEnd(<Suffix path>)[0],
                  <Suffix path>,
                ];
              }
            }
          `,
];
let layers = [];

logStream.write("created\n");

function CreatePrefEnd(prestr) {
  // console.log(str)
  //if (prestr == null) return ["nothing"];
  let str = "Word" + prestr;
  const words = str.match(/[A-Z][a-z]+/g);
  try {
    const sorted = words.sort(naturalCompare);

    const finalWords = [];

    for (let l = 0; l < sorted.length; l++) {
      finalWords.push({
        name: sorted[l].slice("Word".length),
        pos: str.indexOf(sorted[l]),
      });
    }

    finalWords.sort(function (a, b) {
      return a.pos - b.pos;
    });

    const pushedWords = [];

    finalWords.forEach((obj) => {
      pushedWords.push(obj.name);
    });
    return pushedWords;
  } catch {}
}
let permastop = false;
const readFile = new Promise((resolve, reject) => {
  fs.readFile("Source.json", {}, function (err, predata) {
    //console.log(predata.toString('utf-8'))
    let pathlist = JSON.parse(predata.toString("utf-8"));
    const paths = jsonpath.paths(pathlist, "$..*");
    const data = paths.map((p) => p.join(".")).filter((p) => p != "");
    function displayObj() {
      let action = inquirer
        .prompt([
          {
            type: "list",
            name: "action",
            message:
              "Cull some of the snippets (select anything and choose a global option):",
            choices: data,
          },
        ])
        .then((answers) => {
          inquirer
            .prompt([
              {
                type: "list",
                name: "action",
                message: "Choose a action:",
                choices: [
                  "tree veiw (snippits)",
                  "cull layers",
                  "tree veiw full",
                  "write tree",
                ],
              },
            ])
            .then((answers) => {
              if (answers.action == "write tree") {
                inquirer
                  .prompt([
                    {
                      name: "action",
                      message: "Where do you want it written to?",
                    },
                  ])
                  .then((awnsers) => {
                    fs.writeFile(
                      awnsers.action,
                      // @ts-ignore
                      treeify.asTree(pathlist, true),
                      function (err) {
                        if (err) {
                          console.log(err);
                        } else {
                          console.log("sucess!");
                        }
                      }
                    );
                  });
              } else if (answers.action == "tree veiw (snippits)") {
                function snippitsee() {
                  let newpathlist = pathlist.$;
                  let shuffledArray = Object.keys(newpathlist).sort(
                    () => Math.random() - 0.5
                  );
                  shuffledArray = shuffledArray.slice(0, 5);
                  let newObj = {};
                  for (let i = 0; shuffledArray.length > i; i++) {
                    newObj[shuffledArray[i]] = newpathlist[shuffledArray[i]];
                  }
                  // @ts-ignore
                  console.log(treeify.asTree(newObj, true));
                  inquirer
                    .prompt([
                      {
                        type: "list",
                        name: "action",
                        message: "Choose a action:",
                        choices: ["See another snippit", "back"],
                      },
                    ])
                    .then((answers) => {
                      if (answers.action == "See another snippit") {
                        snippitsee();
                      } else {
                        displayObj();
                      }
                    });
                }
                snippitsee();
              } else if (answers.action == "tree veiw full") {
                // @ts-ignore
                console.log(treeify.asTree(pathlist, true));
                inquirer
                  .prompt([
                    {
                      type: "list",
                      name: "action",
                      message: "Choose a action:",
                      choices: ["back"],
                    },
                  ])
                  .then((answers) => {
                    displayObj();
                  });
              } else if (answers.action == "cull layers") {
                inquirer
                  .prompt([
                    {
                      type: "list",
                      name: "action",
                      message: "Pick a method to cull layers:",
                      choices: ["Load preset", "Write preset"],
                    },
                  ])
                  .then((answers) => {
                    if (answers.action == "Load preset") {
                      inquirer
                        .prompt([
                          {
                            type: "list",
                            name: "action",
                            message: "Pick a preset:",
                            choices: ["Preset #1"],
                          },
                        ])
                        .then((answers) => {
                          // if (answers.action == "")
                          inquirer
                            .prompt([
                              {
                                type: "list",
                                name: "action",
                                message:
                                  "Do you want to veiw or load the preset:",
                                choices: ["load", "view"],
                              },
                            ])
                            .then((answers) => {
                              if (answers.action == "load") {
                                inquirer
                                  .prompt([
                                    {
                                      name: "action",
                                      message:
                                        "Confirm? (enter)",
                                    },
                                  ])
                                  .then((awnsers) => {
                                    jsonfile.readFile(
                                      "Source.json",
                                      function (err, data) {
                                        let newRes = { $: {} };
                                        const obj = data.$;

                                        const paths = jsonpath.paths(
                                          obj,
                                          "$..*"
                                        );
                                        const pathList = paths
                                          .map((p) => p.join("."))
                                          .filter((p) => p != "");

                                        for (
                                          let i = 0;
                                          i < pathList.length;
                                          i++
                                        ) {
                                          let path = pathList[i];
                                          path = path.replace(/-/g, ".");
                                          const res_obj = jsonpath.parse(path);
                                          let prevPath = "";
                                          for (
                                            let j = 0;
                                            j < res_obj.length;
                                            j++
                                          ) {
                                            let finalPath = "newRes";

                                            function runPreset() {
                                              try {
                                                eval(
                                                  "if (!blacklist.includes(res_obj[j].expression.value) && res_obj[j].expression.value != `$`) {blacklist.push(res_obj[j].expression.value);" +
                                                    presets[0]
                                                      .replace(
                                                        new RegExp(
                                                          "<Current path>",
                                                          "g"
                                                        ),
                                                        finalPath
                                                      )
                                                      .replace(
                                                        new RegExp(
                                                          "<Suffix path>",
                                                          "g"
                                                        ),
                                                        `res_obj[j].expression.value`
                                                      )
                                                      .replace(
                                                        new RegExp(
                                                          "<Num>",
                                                          "g"
                                                        ),
                                                        j.toString()
                                                      ) +
                                                    "}"
                                                );
                                              } catch (err) {
                                                //console.error(err)
                                              }
                                            }
                                            for (
                                              let k = 0;
                                              res_obj.length - 1 > k;
                                              k++
                                            ) {
                                              finalPath += `[res_obj[${k}].expression.value]`;
                                            }
                                            runPreset();
                                          }
                                        }
                                        fs.writeFile(
                                          "Source_Names.json",
                                          JSON.stringify(newRes, null, 2),
                                          function (err) {
                                            if (err) {
                                              console.log(err);
                                            } else {
                                              console.log("sucess");
                                            }
                                          }
                                        );
                                      }
                                    );
                                  });
                              } else {
                                console.log(presets[0]);
                              }
                            });
                        });
                    }
                  });
              }
            });
        });
    }
    displayObj();
  });
});

let currentkeys = [];
let selectionPath = "";
let selected = [];

let finalKeys = {};

readFile.then((todata) => {
  const jsonString = JSON.stringify(todata, null, 2);

  fs.writeFile("Source2.json", jsonString, "utf8", function (err) {
    if (err) {
      console.error("Error writing JSON to file:", err);
    } else {
      // console.log('JSON has been written to file successfully.');
    }
  });
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
              choices: currentkeys.filter(
                (e) => e !== "name" && e !== "prefix"
              ),
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
                let findPath = jsonpath
                  .paths(todata, `$..[?(@.name == '${selectionPath}')]`)[0]
                  .slice(0, -2);

                const parentPath = findPath;
                const nodes = jsonpath.nodes(
                  todata,
                  jsonpath.stringify(parentPath)
                );
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
});
