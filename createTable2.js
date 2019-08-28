const fs = require('fs');
// JSON data
const data = require('./data2.json');
// Build paths
const { buildPathHtml } = require('./buildPaths');

/**
 * Take an object which has the following model
 * @param {Object} item
 * @model
 * {
 *   "invoiceId": `Number`,
 *   "createdDate": `String`,
 *   "dueDate": `String`,
 *   "address": `String`,
 *   "companyName": `String`,
 *   "invoiceName": `String`,
 *   "price": `Number`,
 * }
 *
 * @returns {String}
 */
const createRow = (item) => `
  <tr>
    <td>${item.projectName}</td>
    <td>${item.cucumberOptions}</td>
  </tr>
`;

/**
 * @description Generates an `html` table with all the table rows
 * @param {String} rows
 * @returns {String}
 */
const createTable = (rows) => `
  <table>
    <tr>
        <th>Project Name</td>
        <th>Cucumber Options</td>
    </tr>
    ${rows}
  </table>
`;

/**
 * @description Generate an `html` page with a populated table
 * @param {String} table
 * @returns {String}
 */
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

/**
 * @description this method takes in a path as a string & returns true/false
 * as to if the specified file path exists in the system or not.
 * @param {String} filePath
 * @returns {Boolean}
 */
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

    const htmls = []
    /* generate rows */
    const rows = data.map(createRow).join('');

    /* generate table */
    const table = createTable(rows);

    /* generate html */
    const html = createHtml(table);
    const html2 = createHtml(table);



    htmls.push(html, html2);


    /* write the generated html to file */
    fs.writeFileSync(buildPathHtml, htmls);
    console.log('Succesfully created an HTML table');
} catch (error) {
    console.log('Error generating table', error);
}