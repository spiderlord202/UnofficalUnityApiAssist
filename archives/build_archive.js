//const readline = require('readline');
//const { spawn } = require('child_process');
import fs from 'fs';
import jsonpath from 'jsonpath';
import naturalCompare from "string-natural-compare";
import inquirer from 'inquirer';
import jsonfile from 'jsonfile';
//import vm2  from 'vm2';
//C:\Users\DuttR\unofficalunityapiassistportal\build.js

const logStream = fs.createWriteStream("my-log-file.txt", { flags: "a" });

let layers = []

logStream.write("created\n");

jsonfile.writeFile("Selecteditems.json", {"SelectionArr": []}, function (err) {
  if (err) console.error(err)
})

function CreatePrefEnd (str){
    //console.log(str)

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
    return pushedWords;
  }


 const readFile = new Promise((resolve, reject) => {
  const newRes = {};
  let exportres = {}

  fs.readFile('Source.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
   // console.log(data)

    const obj = JSON.parse(data).$;
  
    const paths = jsonpath.paths(obj, '$..*');
    const pathList = paths.map(p => p.join('.')).filter(p => p != '');
  
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
              //console.log(newRes)
            }
          } else if (j == 1) {
            if (!newRes[res_obj[j - 1].expression.value].hasOwnProperty(res_obj[j].expression.value)) {
              newRes[res_obj[j - 1].expression.value][res_obj[j].expression.value] = {};
             if (layers.includes(1)){
              let initials = ""
              for (let l = 0; l < res_obj[j].expression.value.length; l++) {
               if  (res_obj[j].expression.value.split("")[l] == res_obj[j].expression.value.split("")[l].toUpperCase()){
                initials += res_obj[j].expression.value.split("")[l]
               }
              }
              newRes[res_obj[j - 1].expression.value][res_obj[j].expression.value].prefix = [initials, CreatePrefEnd(res_obj[j].expression.value)[0], res_obj[j].expression.value]
            }
            }
          } else if (j == 2) {
            if (!newRes[res_obj[j - 2].expression.value][res_obj[j - 1].expression.value].hasOwnProperty(res_obj[j].expression.value)) {
              newRes[res_obj[j - 2].expression.value][res_obj[j - 1].expression.value][res_obj[j].expression.value] = {};
              if (layers.includes(2)){
                let initials = ""
                for (let l = 0; l < res_obj[j].expression.value.length; l++) {
                 if  (res_obj[j].expression.value.split("")[l] == res_obj[j].expression.value.split("")[l].toUpperCase()){
                  initials += res_obj[j].expression.value.split("")[l]
                 }
                }
                newRes[res_obj[j - 2].expression.value][res_obj[j - 1].expression.value][res_obj[j].expression.value].prefix = [initials, CreatePrefEnd(res_obj[j].expression.value)[0], res_obj[j].expression.value]
            }
            }
          } else if (j == 3) {
            if (!newRes[res_obj[j - 3].expression.value][res_obj[j - 2].expression.value][res_obj[j - 1].expression.value].hasOwnProperty(res_obj[j].expression.value)) {
              newRes[res_obj[j - 3].expression.value][res_obj[j - 2].expression.value][res_obj[j - 1].expression.value][res_obj[j].expression.value] = {};

              if (layers.includes(3)){
                let initials = ""

                for (let l = 0; l < res_obj[j].expression.value.length; l++) {
                 if  (res_obj[j].expression.value.split("")[l] == res_obj[j].expression.value.split("")[l].toUpperCase()){
                  initials += res_obj[j].expression.value.split("")[l]
                 }
                }
                newRes[res_obj[j - 3].expression.value][res_obj[j - 2].expression.value][res_obj[j - 1].expression.value][res_obj[j].expression.value].prefix = [initials, CreatePrefEnd(res_obj[j].expression.value)[0], res_obj[j].expression.value]
            }
            }
          } else if (j == 4) {
            if (!newRes[res_obj[j - 4].expression.value][res_obj[j - 3].expression.value][res_obj[j - 2].expression.value][res_obj[j - 1].expression.value].hasOwnProperty(res_obj[j].expression.value)) {
              newRes[res_obj[j - 4].expression.value][res_obj[j - 3].expression.value][res_obj[j - 2].expression.value][res_obj[j - 1].expression.value][res_obj[j].expression.value] = {};
              if (layers.includes(4)){
                let initials = ""
                for (let l = 0; l < res_obj[j].expression.value.length; l++) {
                 if  (res_obj[j].expression.value.split("")[l] == res_obj[j].expression.value.split("")[l].toUpperCase()){
                  initials += res_obj[j].expression.value.split("")[l]
                 }
                }
                newRes[res_obj[j - 4].expression.value][res_obj[j - 3].expression.value][res_obj[j - 2].expression.value][res_obj[j - 1].expression.value][res_obj[j].expression.value].prefix = [initials, CreatePrefEnd(res_obj[j].expression.value)[0], res_obj[j].expression.value]
            }
            }
          } else if (j == 5) {
            if (!newRes[res_obj[j - 5].expression.value][res_obj[j - 4].expression.value][res_obj[j - 3].expression.value][res_obj[j - 2].expression.value][res_obj[j - 1].expression.value].hasOwnProperty(res_obj[j].expression.value)) {
              newRes[res_obj[j - 5].expression.value][res_obj[j - 4].expression.value][res_obj[j - 3].expression.value][res_obj[j - 2].expression.value][res_obj[j - 1].expression.value][res_obj[j].expression.value] = {};
              if (layers.includes(5)){
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
        }   
      resolve(newRes)
      
      //console.log(exportres)
      } catch(error) {
        console.log(error)
      }
    }
    })
   //console.log(exportres)
    //return exportres;
})

let selectedText = (selection) => {
	return `[SELECTED (check to unselect): ${selection}]`;
}

////node C:\Users\DuttR\unofficalunityapiassistportal\build.js
let iteration = 0;
let selections = 0;
let purelyaddedselect = 0;
//let SelectedSafekeepNew = [];

let path = [];

readFile
  .then((seedata) => {
    
    function objselect(keys){
  //jsonfile.writeFile(file, obj, function (err) {
    //    if (err) console.error(err)
      //})
    //  logStream.write(`${Object.keys(keys)}\n`);
  let promt = inquirer
  .prompt([
    {
      type: "checkbox",
      name: "selectedItem",
      message: "Select an item:",
      choices: keys,
    },
    {
      type: 'list',
      name: 'action',
      message: 'Select an action:',
      choices: ['Select', 'view', 'Select and veiw', 'Back', 'Quit'],
    },
  ])
  .then((answers) => {
    let i = 0;














    let pathNum = ['','[path[0]]','[path[0]][path[1]]','[path[0]][path[1]][path[2]]','[path[0]][path[1]][path[2]][path[3]]','[path[0]][path[1]][path[2]][path[3]][path[4]]'][iteration]
		let code = ` 
		try {
    if (answers.action === "view"){
			if (Object.keys(answers.selectedItem).length > 0 && Object.keys(${"seedata"+pathNum+"[answers.selectedItem]"}).length > 0){ 
		objselect(Object.keys(${"seedata"+pathNum+"[answers.selectedItem]"}))
		path.push(answers.selectedItem[i])
			} else {
        objselect(Object.keys(seedata${pathNum}));
        //? '[0]' : '' || ''
        iteration -= 1
      }
		 } else {
      jsonfile.readFile("Selecteditems.json")
      .then(obj => {
      let workingObj = obj;
    //  if (!workingObj.hasOwnProperty("SelectionArr")){
      //  workingObj.SelectionArr = []
      //}
     // logStream.write(answers.selectedItem[i]) 
			objselect(Object.keys(seedata${pathNum}).map(
				(item) => 
				{
					//logStream.write("ITEM: " + item) 
					//workingObj.build = []
					
					//workingObj.build.push(item)
				//	jsonfile.writeFile("Selecteditems.json", workingObj, function (err) {
					//	if (err) console.error(err)
					//})
          if (item == answers.selectedItem[i] && workingObj.SelectionArr.indexOf(item) > -1)
						  {
                workingObj.SelectionArr.splice(workingObj.SelectionArr.indexOf(item))
                workingObj.thisRan = {}
                jsonfile.writeFile("Selecteditems.json", workingObj, function (err) {
                  if (err) console.error(err)
                })
								return item;
              }
          else if (item == answers.selectedItem[i]) 
          {
                workingObj.SelectionArr.push(item)
                jsonfile.writeFile("Selecteditems.json", workingObj, function (err) {
                  if (err) console.error(err)
                })
               // SelectedSafekeepNew.push(item)
                  return selectedText(item);
            } else if (workingObj.SelectionArr.indexOf(item) != -1){
              return selectedText(item);
            } else {  
                return item; 
            }

					}
						));
			iteration -= 1
          })
          .catch(error => console.error(error))
  		}
		} catch (error){
			logStream.write("ERROR: " + error) 
		//	workingObj.error = "Error: "+error
		//	jsonfile.writeFile("Selecteditems.json", workingObj, function (err) {
			//	if (err) console.error(err)
			//})
		}
			`
		eval(code);
    iteration += 1;
		//			//node C:\Users\DuttR\unofficalunityapiassistportal\build.js
  })
  .catch((error) => {
    console.log("An error occurred:", error);
  });
  
}
objselect(Object.keys(seedata))
})

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