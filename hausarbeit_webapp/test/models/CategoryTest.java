package models;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class CategoryTest {

    @Test
    public void testCategory(){
        Category category = new Category();

        category.setTitle("TestCategoryTitle");
        assertEquals("TestCategoryTitle", category.getTitle());

    }
}
