$(document).ready(function(){
	
	//Quiz questions
	
	
	//Create an array that contains the quiz questions 
	var questionList;
	questionList = [new Question('What was the original purpose of caramel?', 'Depilatory', 'Condiment', 'Glue', 'Pain Reliever', 1),
	new Question('The word Tomato was once used as a slang word meaning:', 'Kitten', 'Man', 'Woman', 'Baby', 3),
	
	new Question('The first soup contained the meat of what animal:','Hippopotamus', 'Tiger', 'Chicken', 'Boar', 1),
	new Question('The most expensive coffee, Kopi Luwak, is made from the beans of coffee berries eaten by what animal:', 'Asian Elephant','Prarie Dog','Koala','Asian Palm Civet',4),
	new Question('Which fruit contains water that could be used as a substitute for blood plasma?', 'Apple','Coconut', 'Lemon', 'Watermelon', 2)]
	//Create variable that contains number of quiz questions, and another variable that stores question number;
	var questionCount = questionList.length;
	var questionNumber = 1;
	var score = 0;

	//Add question count, and question number (position in questionList Array) to HTML Document
	$('.question-count').text(questionCount);
	
	//show the first question in array;
	$(questionList[0].EL).show();
	var correctAns = questionList[0].correctChoice;
	
	$('#question').append('<button class="submit">Submit</button>');
	
	//When the submit button is pressed, hide the question, and how if answer was correct or incorrect
	$('.submit').click(function() {
		$('#question').hide();
		$('#answered').show();
		if($('p.selected').index()==correctAns){
			score = score + Math.round((100/questionCount));
			$('.percent').text(score);
			$('#answered').children('h2').text('Correct!');
		}else {
			$('#answered').children('h2').text('Incorrect :(');
		}
		//if($(questionList[questionNumber].EL).index() == questionList.length) {
		//	console.log("Works");
		//}
		console.log($(questionList[questionNumber].EL).index());
		//Hide question
		$(questionList[questionNumber-1].EL).hide();
		
	});
	$('.next-question').click(function() {
		questionNumber++;
		$(questionList[questionNumber-1].EL).show();
		correctAns = questionList[questionNumber-1].correctChoice;
		console.log('Correct Ans:'+correctAns+ " "+questionList[questionNumber-1]);
		$('#question').show();
		$('#answered').hide();
		$('#question-number').text(questionNumber);
		
	});
	//Answer Choices
	$('p').click(function(){
		$(this).toggleClass('selected');
		$(this).siblings().removeClass();
		console.log($(this).index());
	});

	function Question(questionAsked, ch1, ch2, ch3, ch4, correctAnsNum) {
		this.choices = [ch1, ch2, ch3, ch4];
		this.questionAsked = questionAsked;
		this.correctChoice = correctAnsNum-1;
		this.EL = document.createElement('div');
		$(this.EL).addClass("question-item");
		this.init = function () {
			$('#question').append(this.EL);
			$(this.EL).append('<h3>'+ this.questionAsked +'</h3>');
			this.ch = document.createElement('div');
			$(this.ch).addClass("choices");
			$(this.EL).append(this.ch);
			
			$(this.EL).hide();
				
				for (var j = 0; j < this.choices.length; j++) {
				$(this.ch).append('<p>'+ this.choices[j] + '</p>');
				}
		}
		this.init();
	}
});