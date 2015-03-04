$(document).ready(function(){
	
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
	var selectedChoice;

	//Add question count, and question number (position in questionList Array) to HTML Document
	$('.question-count').text(questionCount);
	
	//show the first question in array;
	$(questionList[0].EL).show();
	var correctAns = questionList[0].correctChoice;
	//Add submit button
	$('#question').append('<button class="submit">Submit</button>');
	
	//Answer Choices
	$('p').click(function(){
		$(this).toggleClass('selected');
		$(this).siblings().removeClass();
		
		selectedChoice = $(this).index();
		//console.log('Index of Selection: '+ $(this).index());
		//console.log('Index of p.selected: '+ selectedChoice);
	});
	
	//When the submit button is pressed, hide the question, and how if answer was correct or incorrect
	$('.submit').click(function() {
		$('#question').hide();
		$('#answered').show();
		if(selectedChoice == correctAns){
			score = score + Math.round((100/questionCount));
			$('.percent').text(score);
			$('#answered').children('h2').text('Correct!');
		}else {
			$('#answered').children('h2').text('Incorrect :(');
		}
		if(questionNumber == questionList.length) {
			$('.next-question').hide();
			$('#answered').append('<h3>Thanks for playing </h3>')
		}
		
		//Hide current question
		$(questionList[questionNumber-1].EL).hide();
		
	});
	$('.next-question').click(function() {
		questionNumber++;
		$(questionList[questionNumber-1].EL).show();
		correctAns = questionList[questionNumber-1].correctChoice;
		console.log('Correct Ans: '+ correctAns);
		$('#question').show();
		$('#answered').hide();
		$('#question-number').text(questionNumber);
		
	});
	$('.reset').click(function() {
		$(questionList[questionNumber-1].EL).hide();
		score = 0;
		questionNumber = 1;
		correctAns = questionList[questionNumber-1].correctChoice
		$('#question-number').text(questionNumber);
		$('.percent').text(score);
		$(questionList[questionNumber-1].EL).show();
		$('p').removeClass();
		$('#question').show();
		$('#answered').hide();
		$('#answered h3').hide();
		$('.next-question').show();

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