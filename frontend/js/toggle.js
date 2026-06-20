var users=[
    {
        "name": "John Doe",
        "gender": "male",
        "image": "../images/john.png"
    },
    {
        "name": "Jane doe",
        "gender": "female",
        "image": "../images/jane.png"
    } 
]

var curId = 0;
function toggle() {
    //toggle curId between 0 and 1
    curId = (curId + 1) % 2;
    //toggle the rendered user details
    
    //image
    var user=users[ curId];
    document.getElementById("user-img").src = user.image;
    //name
    document.getElementById("user-name").innerText = user.name;
    //gender
    document.getElementById("user-gender").innerText = user.gender;   

}