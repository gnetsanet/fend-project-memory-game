/*
 * Create a list that holds all of your cards
 */

function exit() {
	var exitElements = document.querySelectorAll('.modalexit');
	exitElements.forEach(function(e) {
		    e.addEventListener("click",() =>{
		    	togglemodal();
		    });
	});
}

function replay() {
	document.querySelector('.modalreplay').addEventListener('click',() => {
    	resetGame();
    	togglemodal();
    	shuffleDeckHTML(); // Shuffle deck if replaying
	}); 

}

function addStarsToModal(){
	const star = document.getElementsByClassName('stars')[0].innerHTML
	document.getElementsByClassName('modalstars')[0].innerHTML = `Stars - ${star}`;
}

function ratePlayer(moves) {
	if(moves===24) {
		// document.getElementsByClassName('fa-star')[2].style.display='none';
		document.getElementsByClassName('fa-star')[2].classList.add('fa-star-o');
	} else if(moves===32) {
		// document.getElementsByClassName('fa-star')[1].style.display='none';
		document.getElementsByClassName('fa-star')[1].classList.add('fa-star-o');
	} else if(moves===40){
		document.getElementsByClassName('fa-star')[0].classList.add('fa-star-o');
	}
}

function formatTimer(seconds) {
	
	if(seconds<10) {
		return `Time - 0:0${seconds}`
	}
	else if(seconds<=60) {
		return `Time - 0:${seconds}`
	}
	else {
		overAminute = seconds%60;
		if(overAminute < 10) {
			return `Time - ${Math.floor(seconds/60)}:0${overAminute}`;
		} else {
			return `Time - ${Math.floor(seconds/60)}:${overAminute}`;
		}
	}
}

function shuffleDeckHTML() {

	const faList = [];
	for (let i=0; i<document.getElementsByClassName('card').length; i++) {
		faList.push(document.getElementsByClassName('card')[i].innerHTML);
	}
	shuffle(faList);

	for (let i=0; i<document.getElementsByClassName('card').length; i++) {
		document.getElementsByClassName('card')[i].innerHTML=faList[i];
	}
}

function resetGame() {
	const cards = document.getElementsByClassName('card');
	const moveElement = document.getElementsByClassName('moves');
	
	//User may choose to reset game after a single click or after flipping a single card
	for (let c of cards) {
		c.classList.remove('match','show', 'open');
	}

	moves = 0
	moveElement[0].innerText = moves;
	clearInterval(startTimer);
	document.querySelector('.timer').innerHTML = formatTimer(0);
	clickCounter = 0;
	timer = 0;

	// Reset stars before replaying
	const stars = document.querySelectorAll('.fa-star-o');
	for(let i of stars){
		i.classList.remove('fa-star-o');
	}
}

function togglemodal(){
	const modal = document.querySelector('.modal__background');
	modal.classList.toggle('hide');
}

function updateTime() { 
	timer++;
	// document.querySelector('.timer').innerHTML = `Time ${timer}` ;
	document.querySelector('.timer').innerHTML = formatTimer(timer);
}


togglemodal();
shuffleDeckHTML(); //Deck should be reshuffled on browser reload

clickedCards = []
moves = 0

let refresh = document.getElementsByClassName('fa-repeat');

refresh[0].addEventListener('click', function() { 
	resetGame();
	shuffleDeckHTML();
});
// setting a global variable for Timer 
let timer = 0;

let clickCounter = 0;

let startTimer;

function clickHandler() {

	const deck = document.querySelector(".deck");

	deck.addEventListener('click', function (e) {
	  	const target = e.target

	  	clickCounter++;

	  	if(clickCounter==1) { startTimer = setInterval( updateTime, 1000);}
	  	
	  	let flippedCards = document.getElementsByClassName('show','open');

	  	if (target.classList.contains('card') && flippedCards.length < 2 ) {
	    	target.classList.add('show');
	    	target.classList.add('open'); 

	    	matches = document.getElementsByClassName('match');

	  //   	if(matches.length==16) {
			// 	alert("Congratulations!");
			// }

	    	if (!clickedCards.includes(target)) {
	    		clickedCards.push(target);
	    		moves = moves + 1;
	    		const moveElement = document.getElementsByClassName('moves');
	    		moveElement[0].innerText = moves;
	    		ratePlayer(moves);
	    	}

			if (matches.length < 16 ) {
				if(clickedCards.length == 2) {

					if(clickedCards[0].children[0].classList[1]==clickedCards[1].children[0].classList[1]) {
						clickedCards[0].classList.add('match');
						clickedCards[1].classList.add('match');
						clickedCards[0].classList.remove('show', 'open');
						clickedCards[1].classList.remove('show', 'open');
						clickedCards = []
						// matches = document.getElementsByClassName('match');

				    	function congratulate() {
				    		if(matches.length==16) {
								//alert("Congratulations!");
								clearInterval(startTimer);
								const a = document.querySelector('.modalmoves');
								a.innerHTML = `Moves - ${moves}`;
								const b = document.querySelector('.modaltime');
								// b.innerHTML = `Time - ${timer}`
								b.innerHTML = formatTimer(timer);
								addStarsToModal();
								togglemodal();
								shuffleDeckHTML();
							}
						}
						setTimeout(congratulate, 500);
					} else {
							function flipCards() { 
								console.log(clickedCards);
								clickedCards[0].classList.remove('open','show');
								clickedCards[1].classList.remove('open','show');
								clickedCards = []
						}
						setTimeout(flipCards, 500)
					}
				}
				console.log(matches.length);

			}
		}
	});
}

clickHandler();
replay();
exit();
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
