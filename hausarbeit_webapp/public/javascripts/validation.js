/*Ensures that the box is empty*/
function validateBoxDelete(boxId) {

    $("#boxdeletevalidated").unbind().click(function () {
        removeCardsInBox(boxId);

    });
}

/*Validation of the Box Form
* name and description must have at least 3 symbols*/
function validateBoxForm() {
    var name = $("#boxname").val().length;
    var description = $("#boxdescription").val().length;

    if (name < 3 || description < 3) {
        $(".notValidated-Feedback").show();
        if (name < 3) {
            $("#boxname").addClass("invalid").val('').attr("placeholder", "min. 3 Zeichen");
        } else {
            $("#boxname").removeClass("invalid").addClass("valid").attr("placeholder", "Name");


        }
        if (description < 3) {
            $("#boxdescription").addClass("invalid").val('').attr("placeholder", "min. 3 Zeichen");
        } else {
            $("#boxdescription").removeClass("invalid").addClass("valid").attr("placeholder", "Beschreibung");
        }
        return false;
    } else {
        return true;
    }


}

/*Validation of the updateCard form.
* question and answer must have at least 3 symbols*/
function validateUpdateCardForm(cardId) {
    var question = $("#updatequestion" + cardId).val().length;
    var answer = $("#updateanswer" + cardId).val().length;


    if (question < 3 || answer < 3) {

        if (question < 3) {
            $("#updatequestion" + cardId).removeClass("valid").addClass("invalid").val('').attr("placeholder", "min. 3 Zeichen");
        } else {
            $("#updatequestion" + cardId).removeClass("invalid").addClass("valid").attr("placeholder", "Frage");


        }
        if (answer < 3) {
            $("#updateanswer" + cardId).removeClass("valid").addClass("invalid").val('').attr("placeholder", "min. 3 Zeichen");
        } else {
            $("#updateanswer" + cardId).removeClass("invalid").addClass("valid").attr("placeholder", "Antwort");
        }
        return false;
    } else {
        $("#updatequestion" + cardId).removeClass("invalid").addClass("valid");
        $("#updateanswer" + cardId).removeClass("invalid").addClass("valid");
        return true;
    }


}

/*Validation of the category form.
* the category name must have at least 1 symbol*/
function validateCategoryForm() {
    var newCategory = $("#newcategory").val().length;


    if (newCategory < 1) {

        $("#newcategory").removeClass("valid").addClass("invalid").val('').attr("placeholder", "min. 1 Zeichen");
        return false;
    } else {
        $("#newcategory").removeClass("invalid").addClass("valid").attr("placeholder", "neue Kategorie");
        return true
    }


}

/*Validation of the card form.
* question and answer must have at least 3 symbols*/
function validateCardForm() {


    var question = $("#cardquestion").val().length;
    var answer = $("#cardanswer").val().length;

    if (question < 3 || answer < 3) {

        if (question < 3) {
            $("#cardquestion").removeClass("valid").addClass("invalid").val('').attr("placeholder", "min. 3 Zeichen");
        } else {
            $("#cardquestion").removeClass("invalid").addClass("valid").attr("placeholder", "grün");


        }
        if (answer < 3) {
            $("#cardanswer").removeClass("valid").addClass("invalid").val('').attr("placeholder", "min. 3 Zeichen");
        } else {
            $("#cardanswer").removeClass("invalid").addClass("valid").attr("placeholder", "green");
        }
        return false;
    } else {
        $("#cardquestion").removeClass("invalid").addClass("valid");
        $("#cardanswer").removeClass("invalid").addClass("valid");
        return true;
    }


}


