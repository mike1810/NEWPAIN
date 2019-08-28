const fs = require('fs');
// Build paths
const {buildPathHtml} = require('./buildPaths');

function createRow(item) {
    var tableBody = "";
    for(var a in obj) {
        for(var b in obj.flowsToRun){
            tableBody+='<br>FLOW STEP ' + (Number(b)+1) + '<br><table><tr><th>Project Name</td><th>Cucumber Options</td></tr>';
            for(var c in obj.flowsToRun[b].flowSteps){
                tableBody += `<tr>
                <td>${item.flowsToRun[b].flowSteps[c].projectName}</td>
                <td>${item.flowsToRun[b].flowSteps[c].cucumberOptions}</td>
                </tr>`
            }
            tableBody+='<br></table>'
        }
    }
    return tableBody;
}

const createHtml = (table) => `
  <html>
    <head>
      <style>
        table {
          width: 100%;
        }
        tr {
          text-align: left;
          border: 1px solid black;
        }
        th, td {
          padding: 15px;
        }
        tr:nth-child(odd) {
          background: #CCC
        }
        tr:nth-child(even) {
          background: #FFF
        }
        .no-content {
          background-color: red;
        }
      </style>
    </head>
    <body>
      ${table}
    </body>
  </html>
`;

const doesFileExist = (filePath) => {
    try {
        fs.statSync(filePath); // get information of the specified file path.
        return true;
    } catch (error) {
        return false;
    }
};

try {
    /* Check if the file for `html` build exists in system or not */
    if (doesFileExist(buildPathHtml)) {
        console.log('Deleting old build file');
        /* If the file exists delete the file from system */
        fs.unlinkSync(buildPathHtml);
    }


    let data = fs.readFileSync('inputJson.json', 'utf8');
    obj = JSON.parse(data);

    const rows = createRow(obj)
    const html = createHtml(rows);

    fs.writeFileSync(buildPathHtml, html);
    console.log('Succesfully created an HTML table');
} catch (error) {
    console.log('Error generating table', error);
}