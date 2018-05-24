/* STUDY PAGE*/

var actCardNbr;
var cardArray;
var actCard;

var answerWrong = false;

function createStudyPage(context, id) {
    actCardNbr =-1;
    cardArray = new Array();
    var url = '/api/card';
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json"
    }).done(function (json) {
        context.render('/assets/html/study.html', {})
            .appendTo(context.$element())
            .then(function () {
                $.each(json, function (key, value) {
                    if (value.box.id == id) {
                        cardArray.push(value);
                    };
                });
                $('#checkBtn').click(function () {
                    checkAnswer();
                });
                nextQuestion();
            });

    });
}

function nextQuestion(){

    console.log("Array lenght: "+cardArray.length);


    //Build the new question on screen
    if(actCardNbr<cardArray.length-1){
        actCardNbr++;
        console.log("Actual Card: "+actCardNbr);
    }else{
        console.log("No more cards, send you to score page");
        window.location = '#/score/'+actCard.box.id;
        return;
    }
    actCard = cardArray[actCardNbr];
    console.log(actCard);

    $('#question').html(actCard.question); //Set Question
    $('#answer').val(''); //reset answer

};

function checkAnswer(){
    var usrAnswer = $('#answer').val(); //get the user Answer
    if(answerWrong){              //Check if its not the first try, give nxt question
        answerWrong=false;
        $("#answer").removeClass("invalid").attr("placeholder", "");
        $("#answer").prop('disabled', false);
        $("#checkBtn").html("Antwort prüfen");
        nextQuestion();
    }else {
        if (actCard.answer == usrAnswer) {    //check if answer is right
            $("#answer").addClass("valid");
            $("#answer").prop('disabled', true);
            setTimeout(function () {                //green user feedback for 1.7s, then next question
                $("#answer").removeClass("valid");
                $("#answer").prop('disabled', false);
                nextQuestion();
            }, 1700);

        } else {
            $("#answer").addClass("invalid").val('').attr("placeholder", actCard.answer);
            $("#answer").prop('disabled', true);
            $("#checkBtn").html("Nächste Frage");
            answerWrong = true;
        }
    }
}


/* SCORE PAGE*/
function createScorePage(context, id) {
    actCardNbr =-1;
    cardArray = new Array();
    var url = '/api/card';
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json"
    }).done(function (json) {
        context.render('/assets/html/score.html', {})
            .appendTo(context.$element())
            .then(function () {
                $.each(json, function (key, value) {
                    if (value.box.id == id) {
                        cardArray.push(value);
                    };
                });
                $('#checkBtn').click(function () {
                    checkAnswer();
                });
                nextQuestion();
            });

    });
}