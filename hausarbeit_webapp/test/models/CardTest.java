package models;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class CardTest {


    @Test
    public void testCard() {
        Box box = new Box();
        Category category = new Category();
        Card card = new Card();


        box.setTitle("TestTitleBox");
        box.setDescription("TestDescriptionBox");
        box.setColor("green");

        category.setTitle("TestCategoryTitle");

        card.setQuestion("TestQuestion");
        card.setAnswer("TestAnswer");
        card.setnTries(5);
        card.setnCorrect(0);
        card.setBox(box);
        card.setCategory(category);


        assertEquals("TestQuestion", card.getQuestion());
        assertEquals("TestAnswer", card.getAnswer());
        assertEquals(5, card.getnTries());
        assertEquals(0, card.getnCorrect());
        assertEquals("TestTitleBox", card.getBox().getTitle());
        assertEquals("TestCategoryTitle", card.getCategory().getTitle());


    }
}


