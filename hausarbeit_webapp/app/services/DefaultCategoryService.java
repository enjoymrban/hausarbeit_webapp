package services;

import models.Category;

import java.util.ArrayList;
import java.util.List;

public class DefaultCategoryService implements CategoryService{
    ArrayList<Category> categories;

    public DefaultCategoryService(){
        categories = new ArrayList<Category>();
    }

    @Override
    public List<Category> get() {
        return categories;
    }

    @Override
    public boolean delete(Long id) {
        for(Category cat : categories){
            if(cat.getId()==id){
                categories.remove(cat);
                return true;
            }
        }
        return false;
    }

    @Override
    public Category update(Category updateCategory) {
        for(Category cat : categories){
            if(cat.getId()==updateCategory.getId()){
                categories.set(categories.indexOf(cat), updateCategory);
                return updateCategory;
            }
        }
        return null;
    }

    @Override
    public Category add(Category cat) {
        categories.add(cat);
        return cat;
    }

    @Override
    public Category get(Long id) {
        for(Category cat : categories){
            if(cat.getId()==id){
                return cat;
            }
        }
        return null;
    }

}
