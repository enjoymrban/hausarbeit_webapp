package controllers;

import com.fasterxml.jackson.databind.JsonNode;
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
    return null;


    }

    public Result addCategory(){
        return null;


    }

    public Result updateCategory(Long id){
        return null;


    }

    public Result deleteCategory(Long id){
        return null;

    }


}
