package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.BoxService;
import play.mvc.BodyParser;
import models.Box;

import javax.inject.Inject;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;

import play.libs.concurrent.HttpExecutionContext;


public class BoxController extends Controller {

    private final BoxService boxService;
    private final HttpExecutionContext ec;

    @Inject
    public BoxController(BoxService boxService, HttpExecutionContext ec) {

        this.boxService = boxService;
        this.ec = ec;
    }


    public CompletionStage<Result> box() {
        return boxService.get().thenApplyAsync(personStream -> {
            return ok(Json.toJson(personStream.collect(Collectors.toList())));
        }, ec.current());

    }

    public CompletionStage<Result> getBox(Long id) {

        return boxService.get(id).thenApplyAsync(box -> {
            return ok(Json.toJson(box));
        }, ec.current());
    }

    @BodyParser.Of(BodyParser.Json.class)
    public CompletionStage<Result> addBox() {
        final JsonNode jsonRequest = request().body().asJson();
        final Box boxToAdd = Json.fromJson(jsonRequest, Box.class);

        return boxService.add(boxToAdd).thenApplyAsync(box -> {
            return ok(Json.toJson(box));
        }, ec.current());

    }

    @BodyParser.Of(BodyParser.Json.class)
    public CompletionStage<Result> updateBox(Long id) {
        final JsonNode jsonRequest = request().body().asJson();
        final Box boxToUpdate = Json.fromJson(jsonRequest, Box.class);

        boxToUpdate.setId(id);

        return boxService.update(boxToUpdate).thenApplyAsync(box -> {
            return ok(Json.toJson(box));
        }, ec.current());


    }

    public CompletionStage<Result> deleteBox(Long id) {
        return boxService.delete(id).thenApplyAsync(removed -> {
            return removed ? ok() : internalServerError();
        }, ec.current());


    }


}
