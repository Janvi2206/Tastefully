const fs = require('fs');

const readFile = (filePath) => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([])); //if the filepath doesn't exists then it create an empty JSON array
    }

    const data = fs.readFileSync(filePath, 'utf-8');
    
    // Handle empty or invalid JSON
    try {
        return JSON.parse(data); //attempts to convert the json string into javeScript object
    } catch (err) {
        return []; // Return an empty array if JSON parsing fails
    }
};

const writeFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); //converts the JavaScript object into JSON string format
};

module.exports = { readFile, writeFile };
