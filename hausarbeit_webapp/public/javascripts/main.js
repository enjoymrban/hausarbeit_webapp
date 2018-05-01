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
                    var card = $('<div class="col-xl-3 col-md-4 col-sm-6 d-flex align-items-stretch "><div class="card"><div class="card-body"><h4 class="card-title">'+value.title+'</h4><p class="card-text">'+value.description+'</p></div><div class="custom-card-footer"><a href="#/editbox/'+value.id +' "><img id="edit'+value.id +'" src="/assets//images/icons/settings.svg" alt="editBox"  width="35" height="35" /></a></div></div>')
                    $(".box" ).append(card);



                });
                var createCard = $('<div class="col-xl-3 col-md-4 col-sm-6 d-flex align-items-stretch "><div class="card align-items-center"><a href="#/createbox"><div class="card-body "><img src="/assets//images/icons/add.svg" alt="addBox"  width="80" height="80" /></div></a></div></div>')
                $(".box" ).append(createCard);

            });
    });
}

function createBoxPage(context){
    context.render('/assets/html/createbox.html', {})
        .appendTo(context.$element())

    $( document ).ready(function() {
        $('#test1').click(function(){
            createBox();
        });
    });
}

function createBox(){
    alert('jakdkd');
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
                        var card = $('<div class="col-xl-3 col-md-4 col-sm-6 d-flex align-items-stretch "><div class="card"><div class="card-body"><h4 class="card-title">' + value.question + '</h4><p class="card-text">' + value.answer + '</p></div><div class="custom-card-footer"></div></div>')
                    $(".cards").append(card);

                });
            });


    });

}

