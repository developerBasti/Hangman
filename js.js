window.addEventListener("load", ()=>{


	let hangman = document.querySelector("#hangman");
	let nextBtn = document.querySelector("#nextBtn");
	let message = document.querySelector("#message");
	let userWord = new Array();
	let userWordGUI = document.querySelector("#userWord");
	let lives = 10;
	let livesGUI = document.querySelector("#lives");
	let word = new Array();
	words = wordsFilter(words);
	let min = 0;
	let max = words.length -1;
    let usedLetters = new Array();
	let letters = document.querySelectorAll(".letter");
	let status = "pending";

	function rand  (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function generateRandomWord(){
		let choice = words[rand(min, max)];
		word = [];
		userWord = [];
		for(i=0; i<choice.length; i++){
			word[i] = choice[i];
		}
	}

	function generateUserWord(){
		for(i=0; i<word.length; i++){
			userWord[i] = "_";
		}
	}

	function updateUserWordGUI(){
		userWord[0] = userWord[0].toUpperCase();
		userWordGUI.innerText = userWord.join('');
	}


	function completeWord(){
		for(i=0;i<word.length;i++){
			if(userWord[i] === "_"){
				userWord[i] = word[i];
			}
		}
		updateUserWordGUI();
	}

	function updateLivesGUI(){
		livesGUI.innerText = lives;
		hangman.setAttribute("src", "hangmanIMG/" + lives.toString() + ".png");
	}

	function removeMark(){
		let marked = document.querySelectorAll(".used");
		for(i=0;i<marked.length;i++){
			marked[i].classList.remove("used");
		}
	}

    function newGame(){
		status = "pending";
		message.innerText = "";
		generateRandomWord();
		generateUserWord();
		updateUserWordGUI();
		removeMark();
		lives = 10;
		updateLivesGUI();
		usedLetters = [];
	}

    function updateStatus(){
        if(lives === 0){
            status = "looser";
        } else{
            status = "winner";
        }
        if(status === "winner"){
            message.innerText = "Gewonnen";
        } else{
            completeWord();
            message.innerText = "Verloren";
        }
    }

    generateRandomWord();
    generateUserWord();
    updateUserWordGUI();

	for(i=0;i<letters.length;i++){

		letters[i].addEventListener("click", (e)=>{

			const pressed = e.target.innerText.toLowerCase();
            let looseCondition = lives === 0;
            let winCondition = userWord.toString().toLowerCase() === word.toString().toLowerCase();

			function replaceLetters(){
				for(i=0;i<word.length;i++){
					if(pressed === word[i] || pressed === word[i].toLowerCase()){
						userWord[i] = pressed;
					}
				}
			}

			function markPressedKey(){
				document.querySelector("#" + pressed).classList.add("used");		
			}

			function addToUsedLetters(){
					if(usedLetters.indexOf(pressed) === -1){
						usedLetters.push(pressed);
				}
			}





			if(usedLetters.indexOf(pressed) === -1 && status === "pending"){

				let hit = word.toString().toLowerCase().indexOf(pressed);

				markPressedKey();
				addToUsedLetters();

				if(hit !== -1){
					replaceLetters();
					updateUserWordGUI();
				} else {
					lives--;
					updateLivesGUI();
				}

                looseCondition = lives === 0;
                winCondition = userWord.toString().toLowerCase() === word.toString().toLowerCase();


                if(winCondition || looseCondition){
                    updateStatus();
                }


			}


		})
	}

	nextBtn.addEventListener("click", ()=>{
		newGame();
	});
});