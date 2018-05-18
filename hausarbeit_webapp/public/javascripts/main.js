var app = $.sammy('#app', function () {
    this.get('#/learnnow', function (context) {
        context.app.swap('');
        createLearnNowPage(context);
    });

    this.get('#/createbox', function (context) {
        context.app.swap('');
        createBoxPage(context);
    });

    this.get('#/editbox/:id', function (context) {
        context.app.swap('');
        createEditBoxPage(context, this.params['id']);
    });
    this.get('#/createcard/:id', function (context) {
        context.app.swap('');
        createCardPage(context, this.params['id']);
    });

    this.get('#/studying/:id', function (context) {
        context.app.swap('');
        createStudyPage(context, this.params['id']);
    });


});


jQuery(function () {
    app.run('#/learnnow');
});


/*function loadAllBoxes() {
    var url = '/api/box';
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        timeout: 3000
    });
}

function createLearnNowPage2(context) {
    loadAllBoxes()
        .done(function (json) {
            context.render('/assets/html/learnnow.html', {})
                .appendTo(context.$element())
                .then(function () {
                    $.each(json, function (key, value) {
                        var box = $('<div class="col-xl-3 col-md-4 col-sm-6   "><div id="boxIMG' + value.id + '" class="card card-box  "><a href="#/studying/' + value.id + '"><img id="boxchangestate' + value.id + '" class="card-img-top boxOpen" src="/assets//images/box_closed_' + value.color + '.png" alt="Karteikarte"></a><div class="card-img-overlay"><div class="card-body card-body-box"><h4 class="card-title">' + value.title + '</h4><p class="card-text">' + value.description + '</p></div><div class="custom-card-footer"><a href="#/editbox/' + value.id + ' "><img id="edit' + value.id + '" class="settingsWheel" src="/assets//images/icons/settings.svg" alt="editBox"  width="20" height="20" /></a><img id="delete' + value.id + '" data-toggle="confirmation" class="deleteBoxIcon" src="/assets//images/icons/delete.svg" alt="deleteBox"  width="20" height="20" /></div></div></div>')
                        $(".box").append(box);

                        $("#boxIMG" + value.id).hover(function () {
                            $("#boxchangestate" + value.id).attr("src", "/assets//images/box_open_" + value.color + ".png");
                        }, function () {
                            $("#boxchangestate" + value.id).attr("src", "/assets//images/box_closed_" + value.color + ".png");
                        });

                        $("#delete" + value.id).click(function () {
                            deleteBox(value.id);

                        });


                    });
                    var box = $('<div class="col-xl-3 col-md-4 col-sm-6   "><div id="boxIMG0" class="card card-box align-items-center "><img id="addNewBox" class="card-img-top" src="/assets//images/box_closed_add.png" alt="Karteikarte"><div class="card-img-overlay"><a href="#/createbox"><div class="card-body card-body-box"></div></a></div></div></div>')
                    $(".box").append(box);

                    $("#boxIMG0").hover(function () {
                        $("#addNewBox").attr("src", "/assets//images/box_open_add.png");
                    }, function () {
                        $("#addNewBox").attr("src", "/assets//images/box_closed_add.png");
                    });

                });


        });
}*/


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
                        '<img id="deleteBox' + value.id + '" data-toggle="confirmation" class="deleteBoxIcon" src="/assets//images/icons/delete.svg" alt="deleteBox"  width="20" height="20" /></div></div></div>')
                    $(".box").append(box);

                    $("#boxIMG" + value.id).hover(function () {
                        $("#boxchangestate" + value.id).attr("src", "/assets//images/box_open_" + value.color + ".png");
                    }, function () {
                        $("#boxchangestate" + value.id).attr("src", "/assets//images/box_closed_" + value.color + ".png");
                    });

                    $("#deleteBox" + value.id).click(function () {
                        validateBoxDelete(value.id);
                        $('#testModal').modal('toggle');
                    });


                });


            })
    });


}

function validateBoxDelete(boxId) {


    $("#boxdeletevalidated").unbind().click(function () {
        removeCardsInBox(boxId);

    });
}

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
        })
        deleteBox(boxId);
    })
}

function deleteBox(boxId) {

    var url = '/api/box/' + boxId;
    $.ajax({
        url: url,
        type: "DELETE",
        success: function (msg) {
            location.reload();
        },

        error: function (errormessage) {
            alert("box not deleted");
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


function createBox() {
    if (validateBoxForm()) {
        var name = $("#boxname").val();
        var description = $("#boxdescription").val();
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


function validateBoxForm() {
    var name = $("#boxname").val().length;
    var description = $("#boxdescription").val().length;

    if (name < 3 || description < 3) {
        $(".notValidated-Feedback").show();
        if (name < 3) {
            $("#boxname").addClass("invalid");
        } else {
            $("#boxname").removeClass("invalid").addClass("valid");


        }
        if (description < 3) {
            $("#boxdescription").addClass("invalid");
        } else {
            $("#boxdescription").removeClass("invalid").addClass("valid");
        }
        return false;
    } else {
        return true;
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
                            if(value.box.id == id) {
                                var card = $('<div class="col-xl-4 col-md-6   align-items-stretch ">' +
                                    '<div class="card ">' +
                                    '<img class="card-img-top" src="/assets//images/card.png" alt="Karteikarte">' +
                                    '<div class="card-img-overlay">' +
                                    '<div class="custom-card-header">' +
                                    '<select class="form-control" id="selectcategory' + value.id + '" size="1"></select>' +
                                    '<img id="deleteCard\' + value.id + \'" class="deleteCross" src="/assets//images/icons/delete_cross.png">' +
                                    '</div>' +
                                    '<div class="card-body">' +
                                    '<form><div class="form-group">' +
                                    '<input id="updatequestion' + value.id + '" class="card-question form-control" value="' + value.question + '" placeholder="Frage"></div>' +
                                    '<div class="form-group">' +
                                    '<input id="updateanswer' + value.id + '" class="card-answer form-control" value="' + value.answer + '" placeholder="Antwort"></div>' +
                                    '<button id="updatecardbutton' + value.id + '" type="submit" class="btn btn-primary">Aktualisieren</button>' +
                                    '</form></div></div>')

                                $(".cards").append(card);

                                //Add Category selection
                                $.each(jsonCat, function (key, cat) {

                                    var catList = $('<option value="' + cat.id + '">' + cat.title + '</option>')
                                    $("#selectcategory" + value.id).append(catList);
                                    if (cat.id == value.category.id) {
                                        document.getElementById("selectcategory" +value.id).selectedIndex = cat.id-1;
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


function updateCard(cardId) {

    var url = '/api/card/'+cardId;
    $.ajax({
        url: url,
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
                //location.reload();
                //history.go(0);
                window.location = '#/editbox/' + json.box.id;

            },
            error: function (errormessage) {
                alert("card wasn't updated");

            }
        });

    });

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

function createCategory(boxId) {
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

function validateCategoryForm() {
    var newCategory = $("#newcategory").val().length;


    if (newCategory < 1) {

        $("#newcategory").removeClass("valid").addClass("invalid");
        return false;
    } else {
        $("#newcategory").removeClass("invalid").addClass("valid");
        return true
    }


}

function createCard(boxId) {
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

function validateCardForm() {



    var question = $("#cardquestion").val().length;
    var answer = $("#cardanswer").val().length;

    if (question < 3 || answer < 3) {
        $(".notValidated-Feedback").show();
        if (question < 3) {
            $("#cardquestion").removeClass("valid").addClass("invalid");
        } else {
            $("#cardquestion").removeClass("invalid").addClass("valid");


        }
        if (answer < 3) {
            $("#cardanswer").removeClass("valid").addClass("invalid");
        } else {
            $("#cardanswer").removeClass("invalid").addClass("valid");
        }
        return false;
    } else {
        $("#cardquestion").removeClass("invalid").addClass("valid");
        $("#cardanswer").removeClass("invalid").addClass("valid");
        return true;
    }


}


/* STUDY PAGE*/
function createStudyPage(context, boxid) {
    alert("studying box:" + boxid);
}


