const express = require('express');
const app = express();
//to tell app where to find the static files (html, css, js) for the frontend
app.use(express.static("frontend"));
app.listen(3000, function() {
    console.log("App running on http://localhost:3000");
});
