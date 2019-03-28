$(document).ready(function () {



    //VARIABLES 
    //__________________________________________

    //Create an array to hold questions in Object Array
    var Questions = [{
        //Question 1:
        question: "What is the name of the actress that stars as Wonder Woman?",
        answerList: ["Gal Gadot", "Amy Adams", "Hayley Atwell", "Elizabeth Olsen"],
        answer: 0
    }, {
        //Question 2:
        question: " Which member of the Justice League has the power of the speed force?",
        answerList: ["The Flash", "Aquaman", "Wonder Woman", "Batman"],
        answer: 0
    }, {
        //Question 3:
        question: "Oliver Queen is the alter ego of what hero?",
        answerList: ["Green Arrow", "Green Lantern", "Batman", "The Flash"],
        answer: 0
    }, {
        //Question 4:
        question: "Of the following heroes, which one is also a member of a royal family?",
        answerList: ["Aquaman", "The Flash", "Batman", "Cyborg"],
        answer: 0
    }, {
        //Question 5:
        question: "Where is Wonder Woman originally from?",
        answerList: ["Themyscira", "Gotham City", "Central City", "Venus"],
        answer: 0
    }, {
        //Question 6: 
        question: "What is Superman's dayjob?",
        answerList: ["Reporter", "Coach", "Fisherman", "Police Man"],
        answer: 0
    }, {
        //Question 7: 
        question: "Batman's sidekick, Robin, grew up to be who?",
        answerList: ["Nightwing", "Ra's al Ghul", "Green Lantern", "The Joker"],
        answer: 0
    }, {
        //Question 8: 
        question: "What sport did Cyborg play in high school?",
        answerList: ["Football", "Soccer", "Volleyball", "Baseball"],
        answer: 0
    }, {
        //Question 9:
        question: "Where was Clark Kent raised?",
        answerList: ["Kansas", "Gotham City", "New York City", "Atlanta"],
        answer: 0
    }, {
        //Question 10:
        question: "Wonder Woman adopted the role of whom after his death?",
        answerList: ["Aries","Cheetah", "Doomsday", "Deathstroke"],
        answer: 0
    }, {
        //Question 11:
        question: "What is Supergirl's alter ego?",
        answerList: ["Kara Zor-El", "Melissa Benoist", "Laura Vandervoort", "Helen Slater"],
        answer: 0
    }, {
        //Question 12:
        question: "What is Batman also commonly referred to as?",
        answerList: ["The Dark Knight", "Scarlet Speedster", "Man of Steel", "The Archer"],
        answer: 0
    }, {
        //Question 13:
        question: "Who is Billy Batson?",
        answerList: ["Shazam", "The Flash", "Green Lantern", "Hawkman"],
        answer: 0
    }, {
        //Question 14:
        question: "Which of these is an ability that Superman possesses?",
        answerList: ["Heat vision", "Telepathy", "Invisibility", "Elasticity"],
        answer: 0
    }, {
        //Question 15:
        question: "What is Batman's super power?",
        answerList: ["He's rich", "Flight", "Invulnerability", "Super Strength"],
        answer: 0
    }, {
        //Question 16:
        question: "What is the name of Wonder Woman's sidekick, Wonder Girl's alter ego?",
        answerList: ["Donna Troy", "Diana Prince", "Barbara Gordon", "Kara Danvers"],
        answer: 0
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
        incorrect: " Sorry, wrong answer!",
        endTime: "TIME'S UP!",
        finished: "Game Over"
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
        sec = 10;
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
            setTimeout(scoreBoard, 1000)
        } else {
            //otherwise, display next question 
            currentQuestion++;
            setTimeout(newQuestion, 2000);
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
        $('#startAgainBtn').html('Start Over?');
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