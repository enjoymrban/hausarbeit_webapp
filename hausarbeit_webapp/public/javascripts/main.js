var app = $.sammy('#app', function() { // definiert neue Sammy application und bindet diese an #app

    this.get('#/books', function(context) { // neue route
        context.app.swap('boxes.html'); // ersetzt den Inhalt vom app Element mit ''
        books(context);
    });


    this.get('/#/bestseller', function(context) {
        context.app.swap('');
        context.render('/assets/html/bestseller.html', {}) // lädt die HTML Datei und fügt den Inhalt dem #app Element an
            .appendTo(context.$element());
    });
});