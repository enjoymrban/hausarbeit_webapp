package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.Category;
import play.libs.Json;
import play.mvc.Controller;
import services.DefaultCategoryService;
import play.mvc.Result;

public class CategoryController extends Controller {

    DefaultCategoryService categoryService;
    public CategoryController(){
        categoryService = new DefaultCategoryService();
    }

    public Result index() {
        return ok(views.html.index.render());
    }

    public Result category(String q){
        if(q==null){
            JsonNode json = Json.toJson(categoryService.get());
            return ok(json);
        }
        return notFound("CategoryList not found");


    }
    public Result getCategory(Long id){
        Category cat = categoryService.get(id);
        if(cat==null){
            return notFound("requested category not found");
        }else{
            return ok(Json.toJson(cat));
        }

    }

    public Result addCategory(){
        final JsonNode jsonRequest = request().body().asJson();
        final Category cat = Json.fromJson(jsonRequest, Category.class);
        categoryService.add(cat);

        return ok(Json.toJson(cat));

    }

    public Result updateCategory(){
        final JsonNode jsonRequest = request().body().asJson();
        final Category cat = Json.fromJson(jsonRequest, Category.class);
        categoryService.update(cat);

        return ok(Json.toJson(cat));


    }

    public Result deleteCategory(Long id){
        if(categoryService.delete(id)){
            return ok("Category with id: "+id+" deleted successfully");
        }else{
            return notFound("Category with id: "+id+" not found");
        }

    }


}
