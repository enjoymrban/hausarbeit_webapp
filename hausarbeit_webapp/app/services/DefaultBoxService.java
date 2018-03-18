package services;

import models.Box;
import java.util.ArrayList;
import java.util.List;



public class DefaultBoxService implements BoxService{
    ArrayList<Box> boxes;

    public DefaultBoxService(){
        boxes = new ArrayList<Box>();}


    @Override
    public List<Box> get() {
        return null;
    }

    @Override
    public boolean delete(Long id) {
        return false;
    }

    @Override
    public Box update(Box updatedBox) {
        return null;
    }

    @Override
    public Box add(Box box) {
        return null;
    }
}
