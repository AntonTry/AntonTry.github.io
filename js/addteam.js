//include("../js/App.js");



var numberOfTeams = 0;
var limit = 10;



class NewTeamInput{
    constructor(teamNumber){
        this.teamNumber = teamNumber;
    }

    addTeam(){
        var newdiv = document.createElement('div');


        var newLabel = document.createElement('label');
        newLabel.setAttribute('class', 'control-label teams');
        newLabel.innerHTML = 'Team' + this.teamNumber;
        newdiv.appendChild(newLabel);

        var inputdiv = document.createElement('div');
        inputdiv.setAttribute('class', 'input-group');

        var newinput = document.createElement('input');
        newinput.setAttribute('id', 'team' + this.teamNumber);
        newinput.setAttribute('class', 'form-control');
        newinput.setAttribute('type', 'text');
        newinput.setAttribute('name', 'team[]');
        newinput.setAttribute('placeholder', 'Team name');

        inputdiv.appendChild(newinput);

        var newspan = document.createElement('span');
        newspan.setAttribute('class', 'input-group-btn');

        var newbutton = document.createElement('button');
        newbutton.setAttribute('class', 'btn btn-primary');
        newbutton.setAttribute('type', 'button');

        var newi = document.createElement('i');
        newi.setAttribute('class', 'fa fa-trash-o');
        newi.setAttribute('aria-hidden', 'true');

        newbutton.appendChild(newi);
        newspan.appendChild(newbutton);

        inputdiv.appendChild(newspan);

        newdiv.appendChild(inputdiv);
        newdiv.addEventListener('click', deleteRow);

        document.getElementById('teams').appendChild(newdiv);
    }
}

var addButton = document.getElementById('addButton');
addButton.addEventListener('click', addInput);

var div = document.getElementById('team1');
div.addEventListener('click', deleteRow);

function deleteRow() {

    var target = event.target;
    while (target != this) {
        if (target.tagName == 'BUTTON') {
            if (numberOfTeams > 2) {
                // нашли элемент, который нас интересует!
                var div = document.getElementById('teams')
                div.removeChild(this);
                numberOfTeams--;
                reorderTeams();
                return;
            }
            else {
                alert('Minimum number of teams == 2!');
            }
        }
        target = target.parentNode;
    }

}

function reorderTeams() {

    var teams = document.getElementsByClassName('teams');
    for (i = 0; i < teams.length; i++) {
        teams[i].innerHTML = 'Team' + (i + 1);
    }

}

function addInput() {
    numberOfTeams++;
    if (numberOfTeams > limit) {
        alert("You have reached the limit of adding " + (numberOfTeams - 1) + " inputs");
        numberOfTeams--;
    }
    else {
        var newdiv = document.createElement('div');


        var newLabel = document.createElement('label');
        newLabel.setAttribute('class', 'control-label teams');
        newLabel.innerHTML = 'Team' + numberOfTeams;
        newdiv.appendChild(newLabel);

        var inputdiv = document.createElement('div');
        inputdiv.setAttribute('class', 'input-group');

        var newinput = document.createElement('input');
        newinput.setAttribute('id', 'team' + numberOfTeams);
        newinput.setAttribute('class', 'form-control');
        newinput.setAttribute('type', 'text');
        newinput.setAttribute('name', 'team[]');
        newinput.setAttribute('placeholder', 'Team name');

        inputdiv.appendChild(newinput);

        var newspan = document.createElement('span');
        newspan.setAttribute('class', 'input-group-btn');

        var newbutton = document.createElement('button');
        newbutton.setAttribute('class', 'btn btn-primary');
        newbutton.setAttribute('type', 'button');

        var newi = document.createElement('i');
        newi.setAttribute('class', 'fa fa-trash-o');
        newi.setAttribute('aria-hidden', 'true');

        newbutton.appendChild(newi);
        newspan.appendChild(newbutton);

        inputdiv.appendChild(newspan);

        newdiv.appendChild(inputdiv);
        newdiv.addEventListener('click', deleteRow);

        document.getElementById('teams').appendChild(newdiv);

       /* var newInput = new NewTeamInput(numberOfTeams);
        newInput.addTeam();*/
    }
}

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBj9d2KAMg7QmWfLCK1VwZ-jNH2LzZf65M",
    authDomain: "madheadshow-e3ad4.firebaseapp.com",
    databaseURL: "https://madheadshow-e3ad4.firebaseio.com",
    projectId: "madheadshow-e3ad4",
    storageBucket: "madheadshow-e3ad4.appspot.com",
    messagingSenderId: "564839865401"
};
firebase.initializeApp(config);

var fDB = firebase.database();



function writeUserData(userId, name) {
    fDB.ref('/teams/' + userId).set({
        name: name,
    });
}

writeUserData('teamId3', 'MyTeam3');






