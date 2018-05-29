/* STUDY PAGE*/

var actCardNbr = null;
var cardArray;
var actCard;

var nRight=0;
var nWrong=0;

var answerWrong = false;

function createStudyPage(context, id) {
    actCardNbr =-1;
    cardArray = new Array();
    nRight=0;
    nWrong=0;
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
                    }
                });
                if(cardArray.length==0){
                    window.location="#/editbox/"+id;
                    return;
                }
                $('#checkBtn').click(function () {
                    checkAnswer();
                });
                nextQuestion();
            });

    });
}

function nextQuestion(){
    //Build the new question on screen
    if(actCardNbr<cardArray.length-1){
        actCardNbr++;
        console.log("Actual Card: "+actCardNbr);
        actCard = cardArray[actCardNbr];
        console.log(actCard);
        $('#questNbr').html("Frage "+(actCardNbr+1)+" von "+cardArray.length+":"); //Set: Frage X von XX:
        $('#question').html(actCard.question); //Set Question
        $('#answer').val('').focus(); //reset answer

    }else{
        console.log("No more cards, send you to score page");
        window.location = '#/score/'+actCard.box.id;
        return;
    }
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
            nRight++;
            setQuestionRight(true);
            $("#answer").addClass("valid").prop('disabled', true);
            setTimeout(function () {                //green user feedback for 1.5s, then next question
                $("#answer").removeClass("valid").prop('disabled', false);
                nextQuestion();
            }, 1500);
        } else {
            nWrong++;
            setQuestionRight(false);
            $("#answer").addClass("invalid").val('').attr("placeholder", actCard.answer).prop('disabled', true);
            $("#checkBtn").html("Nächste Frage");
            answerWrong = true;
        }
    }
}

function setQuestionRight(wasRight){    //wasRight is boolean: true->right, false->wrong

    if(wasRight) {
        actCard.nTries++;
        actCard.nCorrect++;
    }else{
        actCard.nTries++;
    }
    console.log('Updatet Card: ');
    console.log(actCard);

    //Do the actual PUT to the server
    $.ajax({
        type: 'PUT',
        url: '/api/card/' + actCard.id,
        data: JSON.stringify(actCard),
        contentType: "application/json",
        dataType: 'json',
        success: function (msg) {
            console.log('Card updatet with nTries and nCorrect succesfully');
        },
        error: function (errormessage) {
            console.log('Error: Card couldnt be updatet with nTries and nCorrect');
        }
    });
}



/* SCORE PAGE*/
function createScorePage(context, id) {
    context.render('/assets/html/score.html', {})
        .appendTo(context.$element())
        .then(function () {
            $("#rightAnsweredNow").html(nRight);
            $("#wrongAnsweredNow").html(nWrong);
            var percent = parseInt(100/(nRight+nWrong)*nRight); //calculates percent wright answered
            $("#nowProgress").css("width", percent+"%").html(percent+"%");
            countWrightWrongTotal(id);
            $('#againBtn').click(function () {
                window.location = '#/studying/'+id;
                return;
            });
            //deactivate div "Diese Lernsession" if not learned in this session or its the wrong box
            if(actCardNbr==null || actCard.box.id != id){
                $('#thisSession').hide();
            }
        });
}
var totalRight;
var totalWrong;
var title;

function countWrightWrongTotal(id){
    totalRight=0;
    totalWrong=0;
    var url = '/api/card';
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json"
    }).done(function (json) {
        $.each(json, function (key, value) {
            if (value.box.id == id) {
                totalRight+=value.nCorrect;
                totalWrong+=(value.nTries-value.nCorrect);
                $("#rightAnsweredAllTime").html(totalRight);
                $("#wrongAnsweredAllTime").html(totalWrong);
                $("#wrongAnsweredAllTime").html(totalWrong);
                var percent = parseInt(100/(totalRight+totalWrong)*totalRight); //calculates percent wright answered
                $("#allTimeProgress").css("width", percent+"%").html(percent+"%");
                title= value.box.title;
            };
            $("#auswTitle").html("Auswertung "+title); //sets title on score page
        });
    });
}

/* ABOUT PAGE*/
function createAboutPage(context){
    //Create the page
}
