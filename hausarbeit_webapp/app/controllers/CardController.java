package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.DefaultCardService;

public class CardController extends Controller {

    DefaultCardService cardService;
    public CardController(){
        cardService = new DefaultCardService();
    }

    public Result index() {
        return ok(views.html.index.render());
    }

    public Result card(String q){
    return null;

    }

    public Result getCard(Long id){
        return null;
    }

    public Result addCard(){
        return null;

    }

    public Result updateCard(Long id){
        return null;

    }

    public Result deleteCard(Long id){
        return null;

    }




}
