/*Divines what happens when the user changes to another Page*/
var app = $.sammy('#app', function () {

    /*Main Page, all existing Boxes are listed*/
    this.get('#/learnnow', function (context) {
        context.app.swap('');
        createLearnNowPage(context);
    });

    /*On this page the user can create a new Box*/
    this.get('#/createbox', function (context) {
        context.app.swap('');
        createBoxPage(context);
    });

    /*On this page the user can edit the cards of a box*/
    this.get('#/editbox/:id', function (context) {
        context.app.swap('');
        createEditBoxPage(context, this.params['id']);
    });

    /*On this page the user can create a new card inside of a Box*/
    this.get('#/createcard/:id', function (context) {
        context.app.swap('');
        createCardPage(context, this.params['id']);
    });

    /*On this page the user can study*/
    this.get('#/studying/:id', function (context) {
        context.app.swap('');
        createStudyPage(context, this.params['id']);
    });

    /*On this page the user can check his score*/
    this.get('#/score/:id', function (context) {
        context.app.swap('');
        createScorePage(context, this.params['id']);
    });


});

/*Defines the first Page to show when the app gets started*/
jQuery(function () {
    app.run('#/learnnow');
});


/*LEARN NOW PAGE*/

function createLearnNowPage(context) {
    var url = '/api/box';
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json"
    }).done(function (json) {
        context.render('/assets/html/learnnow.html', {})
            .appendTo(context.$element())
            .then(function () {

                /*Creating an empty Box: Link to Create Box Page*/
                var box = $('<div class="col-xl-3 col-md-4 col-sm-6   ">' +
                    '<div id="boxIMG0" class="card align-items-center ">' +
                    '<img id="addNewBox" class="card-img-top" src="/assets//images/box_closed_add.png" alt="Karteikarte">' +
                    '<div class="card-img-overlay"><a href="#/createbox">' +
                    '<div class="card-body card-body-box"></div></a></div></div></div>')
                $(".box").append(box);

                $("#boxIMG0").hover(function () {
                    $("#addNewBox").attr("src", "/assets//images/box_open_add.png");
                }, function () {
                    $("#addNewBox").attr("src", "/assets//images/box_closed_add.png");
                });

                /*Listing all the existing Boxes, newest First*/
                $.each(json.reverse(), function (key, value) {

                    var box = $('<div class="col-xl-3 col-md-4 col-sm-6   ">' +
                        '<div id="boxIMG' + value.id + '" class="card">' +
                        '<img id="boxchangestate' + value.id + '" class="card-img-top boxOpen" src="/assets//images/box_closed_' + value.color + '.png" alt="Karteikarte">' +
                        '<div class="card-img-overlay">' +
                        '<a class="disablelinkcss" href="#/studying/' + value.id + '">' +
                        '<div  class="card-body">' +
                        '<h4 class="card-title">' + value.title + '</h4>' +
                        '<p id="test1" class="card-text">' + value.description + '</p></div></a>' +
                        '<div class="custom-card-footer">' +
                        '<a href="#/editbox/' + value.id + ' ">' +
                        '<img  id="edit' + value.id + '" class="settingsWheel" src="/assets//images/icons/settings.svg" alt="editBox"  width="20" height="20" /></a>' +
                        '<a href="#/score/' + value.id + ' ">' +
                        '<img  id="score' + value.id + '" class="scoreImg" src="/assets//images/icons/statistic.png" alt="score"  width="20" height="20" /></a>' +
                        '<img id="deleteBox' + value.id + '" data-toggle="confirmation" class="deleteBoxIcon" src="/assets//images/icons/delete.svg" alt="deleteBox"  width="20" height="20" /></div></div></div>')
                    $(".box").append(box);

                    $("#boxIMG" + value.id).hover(function () {
                        $("#boxchangestate" + value.id).attr("src", "/assets//images/box_open_" + value.color + ".png");
                    }, function () {
                        $("#boxchangestate" + value.id).attr("src", "/assets//images/box_closed_" + value.color + ".png");
                    });

                    $("#deleteBox" + value.id).click(function () {
                        /*validateBoxDelete in validation.js*/
                        validateBoxDelete(value.id);
                        $('#testModal').modal('toggle');
                    });


                });


            })
    });


}



/*Removes all cards inside of a box*/
function removeCardsInBox(boxId) {

    $.ajax({
        url: '/api/card',
        type: "GET",
        dataType: "json"
    }).done(function (json) {

        $.each(json, function (key, value) {
            if (value.box.id == boxId) {
                var url = '/api/card/' + value.id;
                $.ajax({
                    url: url,
                    type: "DELETE",
                    success: function (msg) {

                    },

                    error: function (errormessage) {
                        alert("not deleted");
                    }
                })
            }
        });
        deleteBox(boxId);
    })
}

/*Deletes a box*/
function deleteBox(boxId) {

    var url = '/api/box/' + boxId;
    $.ajax({
        url: url,
        type: "DELETE",
        success: function (msg) {
            location.reload();
        },

        error: function (errormessage) {
            alert("Box could not be deleted, try again!");
        }
    })

}


/* CREATE BOX PAGE*/
function createBoxPage(context) {
    context.render('/assets/html/createbox.html', {})
        .appendTo(context.$element())
        .then(function () {
            $('#createboxbutton').click(function () {
                createBox();

            });

        });
}

/*Creates a Box*/
function createBox() {
    /*Checks whether the form is filled correctly
    * validateBoxForm in validation.js*/
    if (validateBoxForm()) {
        var name = $("#boxname").val();
        var description = $("#boxdescription").val();

        /*Chooses the color of the box randomly*/
        var colorCase = Math.floor(Math.random() * 4);
        var boxColor = "";
        switch (colorCase) {
            case 0:
                boxColor = "orange";
                break;
            case 1:
                boxColor = "blue";
                break;
            case 2:
                boxColor = "red";
                break;
            case 3:
                boxColor = "green";
                break;
            default:
                boxColor = "orange";
                break;
        }
        var postJson = {
            title: name,
            description: description,
            color: boxColor
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
}




/*EDIT BOX PAGE*/
function createEditBoxPage(context, id) {
    var url = '/api/category';
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json"
    }).done(function (jsonCat) {

        var url = '/api/card';
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json"
        }).done(function (jsonCard) {
            context.render('/assets/html/editbox.html', {})
                .appendTo(context.$element())
                .then(function () {
                    // Add empty card
                    var createCard = $('<div class="col-xl-4 col-md-6  align-items-stretch ">' +
                        '<div class="card align-items-center ">' +
                        '<img class="card-img-top" src="/assets//images/card.png" alt="Karteikarte">' +
                        '<div class="card-img-overlay"><a href="#/createcard/' + id + '">' +
                        '<div class="card-body ">' +
                        '<img src="/assets//images/icons/add.svg" alt="addCard"  width="80" height="80" >' +
                        '</div></a></a></div></div>')
                    $(".cards").append(createCard);

                    $.each(jsonCard, function (key, value) {

                        //Add card if it matches the Box Id
                        if (value.box.id == id) {
                            var card = $('<div class="col-xl-4 col-md-6   align-items-stretch ">' +
                                '<div class="card ">' +
                                '<img class="card-img-top" src="/assets//images/card.png" alt="Karteikarte">' +
                                '<div class="card-img-overlay">' +
                                '<div class="custom-card-header">' +
                                '<select class="form-control" id="selectcategory' + value.id + '" size="1"></select>' +
                                '<img id="deleteCard' + value.id + '" class="deleteCross" src="/assets//images/icons/delete_cross.png">' +
                                '</div>' +
                                '<div class="card-body">' +
                                '<form id="updateCardForm' + value.id + '"><div class="form-group">' +
                                '<input id="updatequestion' + value.id + '" maxlength="64" class="card-question form-control" value="' + value.question + '" placeholder="Frage"></div>' +
                                '<div class="form-group">' +
                                '<input id="updateanswer' + value.id + '" maxlength="64" class="card-answer form-control" value="' + value.answer + '" placeholder="Antwort"></div>' +
                                '<button id="updatecardbutton' + value.id + '" type="submit" class="btn btn-primary">Speichern</button>' +

                                '</form></div></div>');

                            $(".cards").append(card);

                            //Add Category selection
                            $.each(jsonCat, function (key, cat) {

                                var catList = $('<option value="' + cat.id + '">' + cat.title + '</option>')
                                $("#selectcategory" + value.id).append(catList);
                                if (cat.id == value.category.id) {
                                    document.getElementById("selectcategory" + value.id).selectedIndex = cat.id - 1;
                                }
                            });


                            $("#deleteCard" + value.id).click(function () {
                                deleteCard(value.id);
                            });

                            $("#updatecardbutton" + value.id).click(function () {
                                updateCard(value.id);
                            });
                        }
                    });


                });


        });
    });

}

/*Function to delete  a card*/
function deleteCard(cardId) {
    var url = '/api/card/' + cardId;
    $.ajax({
        url: url,
        type: "DELETE",
        success: function (msg) {
            location.reload();
        },

        error: function (errormessage) {
            alert("Card with the Id:" + errormessage.id + " not deleted");
        }
    });

}

/*Funtion to update a Card*/
function updateCard(cardId) {
    /*Check whether the form is filled out correctly
    * validateUpdateCardForm in validation.js*/
    if (validateUpdateCardForm(cardId)) {

        $.ajax({
            url: '/api/card/' + cardId,
            type: "GET",
            dataType: "json"
        }).done(function (json) {
            var question = $("#updatequestion" + cardId).val();
            var answer = $("#updateanswer" + cardId).val();
            var option = $("#selectcategory" + cardId).val();
            var postJson = {
                question: question,
                answer: answer,
                nTries: json.nTries,
                nCorrect: json.nCorrect,
                category: {
                    id: option
                },
                box: {
                    id: json.box.id

                }
            };


            $.ajax({

                type: 'PUT',
                url: '/api/card/' + cardId,
                data: JSON.stringify(postJson),
                contentType: "application/json",
                dataType: 'json',
                success: function (msg) {
                    window.location = '#/editbox/' + json.box.id;

                },
                error: function (errormessage) {
                    alert("card wasn't updated");

                }
            });

        });
    }
}




/* CREATE CARD PAGE*/
function createCardPage(context, boxid) {

    var url = '/api/category';
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json"
    }).done(function (json) {
        context.render('/assets/html/createcard.html', {})
            .appendTo(context.$element())
            .then(function () {
                $.each(json, function (key, category) {
                    var option = $('<option value="' + category.id + '">' + category.title + '</option>')
                    $("#selectcategory").append(option);

                });
            })

            .then(function () {
                $('#createcardtitle').html("Karte zu Lernkartei " + boxid + " hinzufügen");
                $('#createcardbutton').click(function () {
                    createCard(boxid);

                });
                /*The Button that gets triggered by ENTER, not visible in HTML */
                $('#defaultSubmit').click(function () {
                    createCard(boxid);
                });

                $('#addcategorybutton').click(function () {
                    createCategory(boxid);
                });

            })

    });

}

/*Function to create a new category */
function createCategory(boxId) {
    /*Check whether the form is filled out correctly
    * validateCategoryForm in validation.js*/
    if (validateCategoryForm()) {
        var categoryTitle = $("#newcategory").val();
        var postJson = {
            title: categoryTitle
        };

        $.ajax({

            type: 'POST',
            url: '/api/category',
            data: JSON.stringify(postJson),
            contentType: "application/json",
            dataType: 'json',
            success: function (msg) {
                window.location = '#/createcard/' + boxId;
            },
            error: function (errormessage) {
                alert("No new category was created!");

            }
        });


    }
}



/*Function to create a card*/
function createCard(boxId) {
    /*Checking whether the card form is filled out correctly
    * validateCardForm in validation.js*/
    if (validateCardForm()) {
        var question = $("#cardquestion").val();
        var answer = $("#cardanswer").val();
        var categoryId = $("#selectcategory").val();
        var postJson = {
            question: question,
            answer: answer,
            nTries: 0,
            nCorrect: 0,
            category: {
                id: categoryId,
            },
            box: {
                id: boxId
            }
        };

        $.ajax({

            type: 'POST',
            url: '/api/card',
            data: JSON.stringify(postJson),
            contentType: "application/json",
            dataType: 'json',
            success: function (msg) {
                window.location = '#/editbox/' + boxId;
            },
            error: function (errormessage) {
                alert("No new card was created!");

            }
        });
    }

}




