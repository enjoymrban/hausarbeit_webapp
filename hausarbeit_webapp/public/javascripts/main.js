var app = $.sammy('#app', function() {
    this.get('#/learnnow', function(context) {
        context.app.swap('');
        learnnow(context);
    });
    /*this.get('#/books', function(context) {
        context.app.swap('');
        books(context);
    });
    this.get('#/bestseller', function(context) {
        context.app.swap('');
        bestseller(context);
    });*/
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

                    var card = $('<div class="col-xl-3 col-md-4 col-sm-6 d-flex align-items-stretch"><div class="card"><div class="card-body"><h4 class="card-title">'+value.title+'</h4><p class="card-text">'+value.description+'</p><div class="custom-card-footer"><img src="/assets//images/icons/settings.svg" alt="addBox"  width="35" height="35" /></div></div></div>')
                    $(".box" ).append(card);


                });
                var createCard = $('<div class="col-xl-3 col-md-4 col-sm-6 d-flex align-items-stretch"><div class="card align-items-center"><div class="card-body "><img src="/assets//images/icons/add.svg" alt="addBox"  width="80" height="80" /></div></div></div>')
                $(".box" ).append(createCard);

            });
    });
}