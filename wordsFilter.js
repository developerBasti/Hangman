
function wordsFilter(){
	newWords = new Array();
	for(i=0;i<words.length;i++){
		let choice = words[i];
		let capitalLetter = /[A-Z]/.test(choice);
		if(capitalLetter === true && choice.length <= 10){
			newWords.push(choice);
		}
	}
	return newWords;
}