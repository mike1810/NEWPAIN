/*
const jsonData = require(__dirname + '/inputJson.json');
console.log(jsonData);

let myJSON = JSON.stringify(jsonData)
console.log(myJSON);*/


    var myBooks = [

        {
            "projectName": "SCP",
            "cucumberOptions": "--tags @e2eProduct --tags @SCP_Create --tags @GameConcept --tags @ThemeProduct --tags @ASIA"
        },
        {
            "projectName": "CHECK_TEST_DATA_UNITY",
            "cucumberOptions": ""
        },
        {
            "projectName": "UNITY",
            "cucumberOptions": "./test/features/01SubmitMDT_BookSlot.feature"
        },
        {
            "projectName": "UNITY",
            "cucumberOptions": "./test/features/02formatQAStatusConditionallyVerified.feature"
        },
        {
            "projectName": "UNITY",
            "cucumberOptions": "./test/features/03fQAwebSignLiability.feature"
        },
        {
            "projectName": "SCP",
            "cucumberOptions": "--tags @e2eproduct --tags @submitEntitlement"
        },
        {
            "projectName": "SCP",
            "cucumberOptions": "--tags @e2eproduct --tags @submit_approve"
        }
    ]

    /*
            const jsonData = require(__dirname + '/inputJson.json');
            console.log(jsonData);

            let myJSON = JSON.stringify(jsonData)
            console.log(myJSON);

            var myBooks = [
                myJSON
            ]*/


    // EXTRACT VALUE FOR HTML HEADER.
    // ('Book ID', 'Book Name', 'Category' and 'Price')
    var col = [];
    for (var i = 0; i < myBooks.length; i++) {
        for (var key in myBooks[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < myBooks.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myBooks[i][col[j]];
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    console.log(table);
    divContainer.appendChild(table);


    var fs = require('fs');
    fs.writeFileSync("try.html", table, function (err, data){})

    /*fs.readFile('inputJson.json', table , function (err, table) {
        let obj = JSON.parse(table);
        let myJSON = JSON.stringify(obj)
        fs.writeFileSync("try.html", myJSON, function (err, data){})
    });*/
