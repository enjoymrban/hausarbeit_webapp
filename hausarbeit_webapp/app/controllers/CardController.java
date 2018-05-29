package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.Card;
import play.libs.Json;
import play.libs.concurrent.HttpExecutionContext;
import play.mvc.BodyParser;
import play.mvc.Controller;
import play.mvc.Result;
import services.CardService;

import javax.inject.Inject;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;


public class CardController extends Controller {
    private final CardService cardService;
    private final HttpExecutionContext ec;

    @Inject
    public CardController(CardService cardService, HttpExecutionContext ec) {
        this.cardService = cardService;
        this.ec = ec;
    }


    public CompletionStage<Result> card() {
        return cardService.get().thenApplyAsync(personStream -> {
            return ok(Json.toJson(personStream.collect(Collectors.toList())));
        }, ec.current());
    }

    public CompletionStage<Result> getCard(Long id) {
        return cardService.get(id).thenApplyAsync(card -> {
            return ok(Json.toJson(card));
        }, ec.current());
    }

    @BodyParser.Of(BodyParser.Json.class)
    public CompletionStage<Result> addCard() {
        final JsonNode jsonRequest = request().body().asJson();
        final Card cardToAdd = Json.fromJson(jsonRequest, Card.class);

        return cardService.add(cardToAdd).thenApplyAsync(card -> {
            return ok(Json.toJson(card));
        }, ec.current());
    }

    public CompletionStage<Result> updateCard(Long id) {
        final JsonNode jsonRequest = request().body().asJson();
        final Card cardToUpdate = Json.fromJson(jsonRequest, Card.class);

        cardToUpdate.setId(id);

        return cardService.update(cardToUpdate).thenApplyAsync(card -> {
            return ok(Json.toJson(card));
        }, ec.current());

    }

    public CompletionStage<Result> deleteCard(Long id) {
        return cardService.delete(id).thenApplyAsync(removed -> {
            return removed ? ok() : internalServerError();
        }, ec.current());
    }


}
