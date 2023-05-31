import fs from "fs";
import jsonpath from "jsonpath";
import naturalCompare from "string-natural-compare";
import inquirer from "inquirer";
// @ts-ignore
// @ts-ignore
import jsonfile from "jsonfile";
// @ts-ignore
// @ts-ignore
import { json } from "stream/consumers";
// @ts-ignore
// @ts-ignore
import path from "path";
//var treeify = require('treeify');
import treeify from "treeify";
//current_obj[selected[selected.length - 1]]

const logStream = fs.createWriteStream("my-log-file.txt", { flags: "a" });

// @ts-ignore
// @ts-ignore
let layers = [];

logStream.write("created\n");

// @ts-ignore
// @ts-ignore
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
    //let wordsToPush = pushedWords
    //.splice(0, 1)
    //wordsToPush[0] == wordsToPush[0].substring(0, "Word".length)
    // console.log(wordsToPush[0])
    return pushedWords;
  } catch {}
}

// @ts-ignore
// @ts-ignore
const readFile = new Promise((resolve, reject) => {
  // @ts-ignore
  // @ts-ignore
  fs.readFile("Source.json", {}, function (err, predata) {
    //console.log(predata.toString('utf-8'))
    let pathlist = JSON.parse(predata.toString("utf-8"));
    const paths = jsonpath.paths(pathlist, "$..*");
    const data = paths.map((p) => p.join(".")).filter((p) => p != "");
    function displayObj() {
      // @ts-ignore
      // @ts-ignore
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
        // @ts-ignore
        // @ts-ignore
        .then((answers) => {
          inquirer
            .prompt([
              {
                type: "list",
                name: "action",
                message: "Choose a action:",
                choices: ["tree veiw full", "cull layers"],
              },
            ])
            .then((answers) => {
              if (answers.action == "tree veiw full") {
                let page = 0;
                let ChoosenOptions = [];
                function pageSelect(exclusiveOrInclusive){
                let newpathlist = pathlist.$;
                let slicedArray = null;
                let shuffledArray = null;
                if (exclusiveOrInclusive == false){
                slicedArray = Object.keys(newpathlist).sort(
                  () => Math.random() - 0.5
                );
                slicedArray = slicedArray.filter( function( e ) {
                   return ChoosenOptions.indexOf( e ) < 0;
                } );
                // @ts-ignore
                // @ts-ignore
                 shuffledArray = slicedArray.slice(0, 10);
              } else {
                // @ts-ignore
                shuffledArray = ChoosenOptions.slice(0, ChoosenOptions.length-10)
              }
                //console.log(shuffledArray.length)
                let newObj = {};
                // @ts-ignore
                for (let i = 0; shuffledArray.length > i; i++) {
                  //console.log(newpathlist.Object)
                  // @ts-ignore
                  newObj[shuffledArray[i]] = newpathlist[shuffledArray[i]];
                }
                console.log(
                  // @ts-ignore
                  treeify.asTree(newObj, true) + "\n" + `           page ${page}`
                );
                inquirer
                  .prompt([
                    {
                      type: "list",
                      name: "action",
                      message: "Select a action",
                      choices: ["back", "next"],
                    },
                  ])
                  .then((answers) => {
                    if (answers.action == "next"){
                    ChoosenOptions = ChoosenOptions.concat(shuffledArray);
                    page = page + 1;
                    pageSelect(false);
                    } else {
                      page = page - 1
                      pageSelect(true);
                    }
                  });
                }
                pageSelect(false)
              }
            });
        });
    }
    displayObj();
  });

  //try {
  //   const newRes = {};
  //   let exportres = {};

  //   fs.readFile("Source.json", "utf8", (err, data) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     // console.log(data)

  //     const obj = JSON.parse(data).$;

  //     const paths = jsonpath.paths(obj, "$..*");
  //     const pathList = paths.map((p) => p.join(".")).filter((p) => p != "");
  // //console.log(lastChildPaths)
  //     //console.log(pathList)
  //     for (let i = 0; i < pathList.length; i++) {
  //       try {
  //         let path = pathList[i];
  //         path = path.replace(/-/g, ".");
  //         const res_obj = jsonpath.parse(path);
  //         let prevPath = "";
  //         for (let j = 0; j < res_obj.length; j++) {

  //           //work here
  //         }

  //         //console.log(newRes)
  //         resolve(newRes);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   });
  //} catch (err){
  //if (err.substring(0, "TypeError: Cannot read properties of undefined (reading '0')".length) != "TypeError: Cannot read properties of undefined (reading '0')"){
  //console.error(err)
  //}
  //}
});

let currentkeys = [];
//let selectedAllin = false;
let selectionPath = "";
let selected = [];

let finalKeys = {};
// @ts-ignore
// @ts-ignore
let a = {};
// @ts-ignore
// @ts-ignore
let b = {};

//let allInvoked = {};
//let selectionInvoked = {};
//let veiwInvoke = {};

//let finalObj = {};
//let testObj = {};

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
            // @ts-ignore
            // @ts-ignore
            function (error) {}
          );
        }

        // @ts-ignore
        // @ts-ignore
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
        // @ts-ignore
        // @ts-ignore
        await new Promise(function (resolve, reject) {
          function resolution() {
            resolve();
          }
          // @ts-ignore
          // @ts-ignore
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
                  // @ts-ignore
                  // @ts-ignore
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
                  // @ts-ignore
                  // @ts-ignore
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
