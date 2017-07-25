class RoundStatus extends HTMLElement{
    constructor(){
        super();
        this._updateRendering();
    }


    _updateRendering() {
        if ('content' in document.createElement('template')) {

            // Instantiate the table with the existing HTML tbody
            // and the row with the template
            var t = document.querySelector('#temp');

            let gs = new GameService(DbConnection.getConnection());
            let gameId = localStorage.getItem("gameId");
            let numberOfRounds = 5;

            let currentRound = 4;
            //ToDo

            var t2 = document.querySelector('#aTemp');
            let a = t2.content.querySelector('a');
            let classA = a.getAttribute('class');
            let roundString = a.innerHTML;

            var past = t.content.querySelector(".past");
            var current = t.content.querySelector(".current");
            var future = t.content.querySelector(".future");

            for(let i = 1; i<currentRound; i++){
                a.setAttribute('class', classA+" btn-success");
                a.innerHTML = roundString+i;
                let newA = document.importNode(t2.content, true);
                past.appendChild(newA);
            }

                a.setAttribute('class', classA+" btn-danger");
                a.innerHTML = roundString+currentRound;
                let currentA = document.importNode(t2.content, true);
                current.appendChild(currentA);

            for(let i = currentRound+1; i <= numberOfRounds; i++){
                a.setAttribute('class', classA+" btn-silver");
                a.innerHTML = roundString+i;
                let futureA = document.importNode(t2.content, true);
                future.appendChild(futureA);
            }

            var shadow = this.attachShadow({mode: 'open'});

            var panel = document.importNode(t.content, true);
            shadow.appendChild(panel);








        } else {
            // Find another way to add the rows to the table because
            // the HTML template element is not supported.
        }
    }
}

window.customElements.define('round-status', RoundStatus);