var app = $.sammy('#app', function() {
    this.get('#/learnnow', function(context) {
        context.app.swap('');
        learnnowPage(context);
    });

    this.get('#/createbox', function(context) {
        context.app.swap('');
        createBoxPage(context);
    });

     this.get('#/editbox/:id', function(context) {
         context.app.swap('');
         editBoxPage(context, this.params['id']);
     });
    this.get('#/createcard/:id', function(context) {
        context.app.swap('');
        createCardPage(context, this.params['id']);
    });


});


jQuery(function() {
    app.run('#/learnnow');
});


function learnnowPage(context) {
    var url = '/api/box';
    $.ajax({
        url: url,
        type: "GET",
        dataType : "json"
    }).done(function(json)  {
        context.render('/assets/html/learnnow.html', {})
            .appendTo(context.$element())
            .then(function () {
                $.each(json, function(key, value) {
                    var card = $('<div class="col-xl-3 col-md-4 col-sm-6   "><div id="boxIMG'+value.id+'" class="card card-box  "><img id="boxchangestate'+value.id+'" class="card-img-top boxOpen" src="/assets//images/box_closed.png" alt="Karteikarte"><div class="card-img-overlay"><div class="card-body card-body-box"><h4 class="card-title">'+value.title+'</h4><p class="card-text">'+value.description+'</p></div><div class="custom-card-footer"><a href="#/editbox/'+value.id +' "><img id="edit'+value.id +'" class="settingsWheel" src="/assets//images/icons/settings.svg" alt="editBox"  width="20" height="20" /></a></div></div></div>')
                    $(".box" ).append(card);
                    $("#boxIMG"+value.id).hover(function(){
                        $("#boxchangestate"+value.id).attr("src","/assets//images/box_open.png");
                    }, function() {
                        $("#boxchangestate"+value.id).attr("src","/assets//images/box_closed.png");
                    });



                });
                var createCard = $('<div class="col-xl-3 col-md-4 col-sm-6   "><div class="card card-box align-items-center "><img id="boxchangestate'+0+'" class="card-img-top boxOpen" src="/assets//images/box_closed.png" alt="Karteikarte"><div class="card-img-overlay"><a href="#/createbox"><div class="card-body card-body-box"><img src="/assets//images/icons/add.svg" alt="addBox"  width="80" height="80" /></div></a></div></div></div>')
                $(".box" ).append(createCard);
            })
    });


}

function createBoxPage(context){
    context.render('/assets/html/createbox.html', {})
        .appendTo(context.$element())
        .then(function(){
            $('#createboxbutton').click(function(){
                createBox();
            });
        });

}

function createBox(){
    var name = $("#boxname").val();
    var description = $("#boxdescription").val();
    var postJson = {
        title:		    name,
        description:    description
    };

    $.ajax({

        type: 'POST',
        url: '/api/box',
        data: JSON.stringify(postJson),
        contentType: "application/json",
        dataType: 'json',
        success: function (msg) {

            window.location = '#/learnnow';
        },
        error: function (errormessage) {
            alert("No new box was created!");

        }
    });

}


function editBoxPage(context, id) {

    var url = '/api/card';
    $.ajax({
        url: url,
        type: "GET",
        dataType : "json"
    }).done(function(json)  {
        context.render('/assets/html/editbox.html', {})
            .appendTo(context.$element())
            .then(function(){
                $.each(json, function(key, value) {
                    if (value.box.id == id)
                        var card = $('<div class="col-xl-3 col-md-4 col-sm-6  align-items-stretch "><div class="card "><img class="card-img-top" src="/assets//images/card.png" alt="Karteikarte"><div class="card-img-overlay"><div class="card-body"><h4 class="card-question">' + value.question + '</h4><p class="card-answer">' + value.answer + '</p></div></div>')
                    $(".cards").append(card);

                });

                var createCard = $('<div class="col-xl-3 col-md-4 col-sm-6  align-items-stretch "><div class="card align-items-center "><img class="card-img-top" src="/assets//images/card.png" alt="Karteikarte"><div class="card-img-overlay"><a href="#/createcard/'+ id +'"><div class="card-body "><img src="/assets//images/icons/add.svg" alt="addCard"  width="80" height="80" ></div></a></a></div></div>')
                $(".cards" ).append(createCard);
            });


    });

}

function createCardPage(context, boxid){
    context.render('/assets/html/createcard.html', {})
        .appendTo(context.$element())
        .then(function(){
            $('#createcardtitle').html("Karte zu Lernkartei "+boxid+" hinzufügen");
            $('#createcardbutton').click(function(){
                createCard(boxid);
            });
        });




}

function createCard(boxid){
    var question = $("#cardquestion").val();
    var answer = $("#cardanswer").val();
    var postJson = {
        question:  question,
        answer:    answer,
        nTries:  0,
        nCorrect: 0,
        category: {
            id: 1
        },
        box:{
            id: boxid
        }
    };

    $.ajax({

        type: 'POST',
        url: '/api/card',
        data: JSON.stringify(postJson),
        contentType: "application/json",
        dataType: 'json',
        success: function (msg) {
            window.location = '#/editbox/'+boxid;
        },
        error: function (errormessage) {
            alert("No new card was created!");

        }
    });

}
