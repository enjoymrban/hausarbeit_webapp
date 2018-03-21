package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.Card;
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
        if(q == null){
            JsonNode json = Json.toJson(cardService.get());
            return ok(json);
        }else {
            return notFound("Card not found");
        }
    }

    public Result getCard(Long id){
        Card c = cardService.get(id);
        if(c==null){
            return notFound("requested Card not found");
        }else{
            return ok(Json.toJson(c));
        }
    }

    public Result addCard(){
        final JsonNode jsonRequest = request().body().asJson();
        final Card c = Json.fromJson(jsonRequest, Card.class);
        cardService.add(c);

        return ok(Json.toJson(c));
    }

    public Result updateCard(Long id){
        final JsonNode jsonRequest = request().body().asJson();
        final Card c = Json.fromJson(jsonRequest, Card.class);
        cardService.update(c);

        return ok(Json.toJson(c));

    }

    public Result deleteCard(Long id){
        if(cardService.delete(id)){
            return ok("Card with id: "+id+" deleted successfully");
        }else{
            return notFound("Not able to delete Card. Card with id: "+id+" not found.");
        }
    }




}
