package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.DefaultBoxService;
import models.Box;

public class BoxController extends Controller {

    DefaultBoxService boxService;
    public BoxController(){
        boxService = new DefaultBoxService();
    }

    public Result index() {
        return ok(views.html.index.render());
    }

    public Result box(String q){
        if(q==null){
            JsonNode json = Json.toJson(boxService.get());
            return ok(json);
        }
        return notFound("boxList not found");

    }

    public Result getBox(Long id){

        Box box = boxService.get(id);
        if(box==null){
            return notFound("requested box not found");
        }else{
            return ok(Json.toJson(box));
        }
    }

    public Result addBox(){
        final JsonNode jsonRequest = request().body().asJson();
        final Box box = Json.fromJson(jsonRequest, Box.class);
        boxService.add(box);

        return ok(Json.toJson(box));

    }

    public Result updateBox(Long id){
        final JsonNode jsonRequest = request().body().asJson();
        final Box box = Json.fromJson(jsonRequest, Box.class);
        boxService.update(box);

        return ok(Json.toJson(box));

    }

    public Result deleteBox(Long id){
        if(boxService.delete(id)){
            return ok("Box with id: "+id+" deleted successfully");
        }else{
            return notFound("Box with id: "+id+" not found");
        }


    }




}
