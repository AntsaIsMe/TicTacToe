var cases = [...document.querySelectorAll(".tac")];
let alertBox = document.querySelector("#alerte");
let replay = document.querySelector(".replay")
var x = []
var o = []
var tour = document.querySelector(".tour")

const victoire = [[0,1,2], [3,4,5], [6,7,8], 
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]]
class Point {
    constructor(filled = false, pos = -1, elem = null, player = 0) { 
        this.filled = filled;
        this.pos = pos;
        this.elem = elem;
        this.player = player;//player 1or 2
    }

    createElem(parentEl, forme, player) {
        // check if it is filled :=)
        if (this.filled) {
            console.log("This point is already filled.");
            return false; //the code stop here if its already filled
        }

        let pointeur;
        pointeur = document.createElement("div");
        if (forme === "x") {
            pointeur.textContent = "X";
            pointeur.classList.add(forme);
            x.push(this.pos)
        } else {
            pointeur.textContent = "";
            o.push(this.pos)
            pointeur.classList.add(forme);
        }
        parentEl.appendChild(pointeur);
        this.filled = true;
        this.elem = parentEl; 
        this.player = player
        return true;
    }
}


let caseTab = []; //contain all clicked cases

for (let i = 0; i < cases.length; i++) {
    const cas = cases[i];
    cas.onclick = () => {
        console.log(caseTab)
        // Check if the clicked case is already occupied in caseTab
        const isOccupied = caseTab.some(point => point.pos === i); //some check if at least one of the elem in the table complete the condition
        //console.log(caseTab)

        if (isOccupied) {
            console.log("Cette case est déjà occupée !");
            return;
        }

        let point = new Point(false, i, cas); // Create a new Point with its position and element
        
        let formToCreate = alterne()
        //console.log(formToCreate)
        
        // formToCreate = [class, player]

        if(check()){
            return   
        }
        if (point.createElem(cas, formToCreate[0], formToCreate[1])) { // Only proceed if createElem was successful
            caseTab.push(point);
            check()
        }
    };
}

// alterne les o et x
function alterne() {
    if (caseTab.length % 2 === 0 ) {
        alertBox.textContent = "Player 2's turn (X)"
        return ["o"]
    } else {
        alertBox.textContent = "Player 1's turn (O)"
        return ["x"]
    }
}



// check if there is a winner
function check() {
    let valTo = false;
    if (caseTab.length >= 5 && caseTab.length< 9) {
        x = x.sort(); o = o.sort()
        
        if (winFunc(o)) {
            alertBox.textContent = "O a gagné"
            valTo = true
        }
        else if (winFunc(x)){
           alertBox.textContent ="X a gagné"
           valTo = true
        }
        
    }
    else if(caseTab.length >= 9){
        if (winFunc(o)) {
            alertBox.textContent ="O a win"
            valTo = true
        }
        else if (winFunc(x)){
            alertBox.textContent ="X a win"
            valTo = true
        }
        else{
            alertBox.textContent ="Tie"
        }
    }
    return valTo;
}

function winFunc(x) {
    const winSt = victoire.some(comb => comb.every(poss => x.includes(poss)))
    return winSt
}

function reboot(){
    x = []
    o = []
    caseTab = []
    for (let i = 0; i < cases.length; i++) {
        const caseN = cases[i];
        caseN.classList.remove("x", "o")
        caseN.textContent = ''
        alertBox.textContent = ''
    }
}



