package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.DefaultBoxService;

public class BoxController extends Controller {

    DefaultBoxService boxService;
    public BoxController(){
        boxService = new DefaultBoxService();
    }

    public Result index() {
        return ok(views.html.index.render());
    }

    public Result box(String q){
    return null;

    }

    public Result getBox(Long id){
        return null;
    }

    public Result addBox(){
        return null;

    }

    public Result updateBox(Long id){
        return null;

    }

    public Result deleteBox(Long id){
        return null;

    }




}
