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
                    var card = $('<div class="col-md-4"><div class="card"><div class="card-body"><h4 class="card-title">'+value.title+'</h4><p class="card-text">'+value.description+'</p></div></div>')
                    $(".box" ).append(card);

                });
                var createCard = $('<div class="col-md-4"><div class="card"><div class="card-body"><img src="@routes.Assets.at("/images/test1.png")" width="28" height="22" /></div></div>')
                $(".box" ).append(createCard);

            });
    });
}