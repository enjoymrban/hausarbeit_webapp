package models;

import org.junit.Test;

import static org.junit.Assert.assertEquals;


public class BoxTest {

    @Test
    public void testBox(){
        Box box = new Box();

        box.setTitle("TestTitleBox");
        box.setDescription("TestDescriptionBox");
        box.setColor("green");


        assertEquals("TestTitleBox", box.getTitle());
        assertEquals("TestDescriptionBox", box.getDescription());
        assertEquals("green", box.getColor());


    }
}
