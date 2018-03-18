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
        return null;
    }

    @Override
    public boolean delete(Long id) {
        return false;
    }

    @Override
    public Category update(Category updatedBook) {
        return null;
    }

    @Override
    public Category add(Category book) {
        return null;
    }
}
