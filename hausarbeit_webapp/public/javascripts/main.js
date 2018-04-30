var app = $.sammy('#app', function() {
    this.get('#/learnnow', function(context) {
        context.app.swap('');
        learnnow(context);
    });

    this.get('#/createbox', function(context) {
        context.app.swap('');
        createbox(context);


    });
     this.get('#/editbox', function(context) {
         context.app.swap('');
         editbox(context);
     });
});


jQuery(function() {
    app.run('#/learnnow');
});


function learnnow(context) {
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

                    var card = $('<div class="col-xl-3 col-md-4 col-sm-6 d-flex align-items-stretch "><div class="card"><div class="card-body"><h4 class="card-title">'+value.title+'</h4><p class="card-text">'+value.description+'</p></div><div class="custom-card-footer"><a href="#/editbox"><img src="/assets//images/icons/settings.svg" alt="editBox"  width="35" height="35" /></a></div></div>')
                    $(".box" ).append(card);


                });
                var createCard = $('<div class="col-xl-3 col-md-4 col-sm-6 d-flex align-items-stretch "><div class="card align-items-center"><a href="#/createbox"><div class="card-body "><img src="/assets//images/icons/add.svg" alt="addBox"  width="80" height="80" /></div></a></div></div>')
                $(".box" ).append(createCard);

            });
    });
}

function createbox(context){
    context.render('/assets/html/createbox.html', {})
        .appendTo(context.$element())

}


function editbox() {
    context.render('/assets/html/editbox.html', {})
        .appendTo(context.$element())

}