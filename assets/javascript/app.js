$(document).ready(function () {



    //VARIABLES 
    //__________________________________________

    //Create an array to hold questions in Object Array
    var Questions = [{
        //Question 1:
        question: "What is the name of the actress that stars as Wonder Woman?",
        answerList: ["Hayley Atwell", "Amy Adams", "Gal Gadot", "Elizabeth Olsen"],
        answer: 2,
        image: "./assets/images/ww1.gif"
    }, {
        //Question 2:
        question: " The Flash often battles which foe?",
        answerList: ["The Joker", "Vibe", "Lobo", "Reverse Flash"],
        answer: 3,
        image: "./assets/images/TheFlash.gif"
    }, {
        //Question 3:
        question: "What is the Green Arrow's real name?",
        answerList: ["Oliver Queen", "Barry Allen", "Thomas Wayne", "Harrison Wells"],
        answer: 0,
        image: "./assets/images/GA.gif"
    }, {
        //Question 4:
        question: "Aquaman is a member of the Royal family by way of whom?",
        answerList: ["His Father", "His Girlfriend", "His Mother", "He isn't a royal"],
        answer: 2,
        image: "./assets/images/Aquaman.gif"
    }, {
        //Question 5:
        question: "Where is Wonder Woman originally from?",
        answerList: ["Themyscira", "Gotham City", "Central City", "Venus"],
        answer: 0,
        image:"./assets/images/ww4.gif"
    }, {
        //Question 6: 
        question: "What is Superman's dayjob?",
        answerList: ["Coach", "Reporter", "Fisherman", "Police Man"],
        answer: 1,
        image:"./assets/images/Supes3.gif"
    }, {
        //Question 7: 
        question: "Batman's sidekick, Robin, grew up to be who?",
        answerList: ["Green Lantern", "Ra's al Ghul", "Nightwing", "The Joker"],
        answer: 2,
        image: "./assets/images/Robin.gif"
    }, {
        //Question 8: 
        question: "Cyborg was a football star named what?",
        answerList: ["Victor Stone", "Oscar Stone", "Henry Stone", "Alfred Stone"],
        answer: 0,
        image: "./assets/images/Cyborg.gif"
    }, {
        //Question 9:
        question: "Where was Clark Kent raised?",
        answerList: ["Georgia", "Gotham City", "New York City", "Kansas"],
        answer: 3,
        image: "./assets/images/Supes2.gif"
    }, {
        //Question 10:
        question: "Wonder Woman adopted the role of whom after his death?",
        answerList: ["Doomsday","Cheetah", "Aries", "Deathstroke"],
        answer: 2,
        image: "./assets/images/ww5.gif"
    }, {
        //Question 11:
        question: "What is Supergirl's alter ego?",
        answerList: ["Laura Vandervoort", "Melissa Benoist", "Kara Zor-El", "Helen Slater"],
        answer: 2,
        image: "./assets/images/Supergirl.gif"
    }, {
        //Question 12:
        question: "What is Batman also commonly referred to as?",
        answerList: ["The Archer", "Scarlet Speedster", "Man of Steel", "The Dark Knight"],
        answer: 3,
        image: "./assets/images/Batman2.gif"
    }, {
        //Question 13:
        question: "Shazam is how old?",
        answerList: ["23", "15", "34", "42"],
        answer: 1,
        image: "./assets/images/Shazam.gif"
    }, {
        //Question 14:
        question: "Which of these is an ability that Superman possesses?",
        answerList: ["Freeze Breath", "Telepathy", "Invisibility", "Elasticity"],
        answer: 0,
        image: "./assets/images/Supes1.gif"
    }, {
        //Question 15:
        question: "What is Batman's super power?",
        answerList: ["Invulnerability", "Flight", "World Class Detective", "Super Strength"],
        answer: 2,
        image: "./assets/images/Batman3.gif"
    }, {
        //Question 16:
        question: "What is the name of Wonder Woman's sidekick, Wonder Girl's alter ego?",
        answerList: ["Diana Prince", "Donna Troy", "Barbara Gordon", "Kara Danvers"],
        answer: 1,
        image: "./assets/images/DT2.gif"
    }]


    //Win counters 
    var correctChoices = 0;
    var wrongChoices = 0;

    //current question to store from loop
    var currentQuestion = 0;

    //holds input from user
    var unanswered = 0;
    var answered = 0;
    var userSelect = 0;

    //timer variables
    var sec = 0;
    var time = 0;

    //messages for new screen after answer result 
    var messages = {
        correct: "Well done, nailed it!",
        incorrect: "Sorry, wrong answer!",
        endTime: "Time's Up!",
        finished: "Game Over!"
    }

    //FUNCTIONS 
    //__________________________________________

    //Starting the game function, call to reset later 
    function startGame() {
        //clear html
        $('#finalMessage').empty();
        $('#correctAnswers').empty();
        $('#wrongAnswers').empty();
        $('#unanswered').empty();
        //clear counter
        currentQuestion = 0;
        correctChoices = 0;
        WrongChoices = 0;
        unanswered = 0;
        //call to generate first question 
        newQuestion()
    }

    //Counter
    function countDown() {
        //seconds per question
        sec = 12;
        $('#timer').html('<h3> Time Left: ' + sec + '</h3>');
        answered = true;
        //sets timer to go down
        time = setInterval(showCountdDown, 1000);
    }


    function showCountdDown() {
        //seconds countdown
        sec--;
        $('#timer').html('<h3>Time Left: ' + sec + '</h3>');
        //if seconds left is less than 1, then clear timer as player ran out of time 
        if (sec < 1) {
            clearInterval(time);
            answered = false;
            //also displays answerPage function, to let player know they ran out of time for the question
            answerPage()
        }
    }


    //New Question function 
    function newQuestion() {
        $('#message').empty();
        $('#correctedAnswer').empty();
        answered = true;
        var img = $('<img id="image">');
        $("img").hide();
        img.attr("src", Questions[currentQuestion].image);
        img.appendTo("#image");

        //sets up new question
        $('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + Questions.length);
        $('.question').html('<h2>' + Questions[currentQuestion].question + '</h2>');
        for (var i = 0; i < 4; i++) {
            var choices = $('<div>');
            choices.text(Questions[currentQuestion].answerList[i]);
            choices.attr({ 'data-index': i });
            choices.addClass('thisChoice');
            $('.answerList').append(choices);
        }
        //timer
        countDown();

        //clicking an answer will pause the time and setup answerPage
        $('.thisChoice').on('click', function () {
            userSelect = $(this).data('index');
            clearInterval(time);
            answerPage()
        });
    }

    //Answer Page
    function answerPage() {
        //Clears question page
        $('#currentQuestion').empty();
        $('.thisChoice').empty();
        $('.question').empty();

        //holds the place for answer
        var rightAnswerText = Questions[currentQuestion].answerList[Questions[currentQuestion].answer];
        //correct answer place in array
        var rightAnswerIndex = Questions[currentQuestion].answer;

        //checks to see correct, wrong, or unanswered
        //if player chooses the right answer 
        if ((userSelect == rightAnswerIndex) && (answered == true)) {
            //then wins increase by one
            correctChoices++;
            //and the correct message displays on new screen
            $('#message').html(messages.correct);
            //if player chooses wrong answer
        } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
            //wrong answer count goes up by one
            wrongChoices++;
            $('#message').html(messages.incorrect);
            //correct answer displays
            $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        } else {
            //if player does not choose one before the timer runs out
            unanswered++;
            $('#message').html(messages.endTime);
            $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
            answered = true;
        }
        //once the last question is complete display scoreboard
        if (currentQuestion == (Questions.length - 1)) {
            setTimeout(scoreBoard, 1500)
        } else {
            //otherwise, display next question 
            currentQuestion++;
            setTimeout(newQuestion, 1500);
        }
    }
    //scoreboard at the end of the game
    function scoreBoard() {
        //clear the timer, and correctedAnswer 
        $('#timer').empty();
        $('#message').empty();
        $('#correctedAnswer').empty();

        //display message 
        $('#finalMessage').html(messages.finished);
        //final counter results
        $('#correctAnswers').html("Correct Answers: " + correctChoices);
        $('#wrongAnswers').html("Wrong Answers: " + wrongChoices);
        $('#unanswered').html("Unanswered: " + unanswered);
        //reset game 
        $('#startAgainBtn').addClass('reset');
        $('#startAgainBtn').show();
        $('#startAgainBtn').html('Try again!');
    }


    //PROCESS
    //___________________________________________

    //start button 
    $('#startBtn').on('click', function () {
        $(this).hide();
        startGame();
    });
    //reset button
    $('#startAgainBtn').on('click', function () {
        $(this).hide();
        startGame();
    });

});