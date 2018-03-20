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

        return boxes;
    }

    @Override
    public boolean delete(Long id) {

        for(Box box : boxes){
            if(box.getId()==id){
                boxes.remove(box);
                return true;
            }
        }
        return false;
    }

    @Override
    public Box update(Box updatedBox) {
        for(Box box : boxes){
            if(box.getId()==updatedBox.getId()){
                boxes.set(boxes.indexOf(box), updatedBox);
                return updatedBox;
            }
        }
        return null;
    }

    @Override
    public Box add(Box box) {
        boxes.add(box);
        return box;
    }

    @Override
    public Box get(Long id) {
        for(Box box : boxes){
            if(box.getId()==id){
                return box;
            }
        }
        return null;
    }
}
