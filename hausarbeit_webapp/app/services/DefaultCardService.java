package services;

import models.Card;

import java.util.ArrayList;
import java.util.List;

public class DefaultCardService implements CardService{
ArrayList<Card> cards;

public DefaultCardService(){
    cards = new ArrayList<Card>();
}

    @Override
    public List<Card> get() {
        return cards;
    }

    @Override
    public boolean delete(Long id) {
        for(Card c : cards){
            if(c.getId()==id){
                cards.remove(c);
                return true;
            }
        }
        return false;
    }

    @Override
    public Card update(Card updatedCard) {
        for(Card c : cards){
            if(c.getId()==updatedCard.getId()){
                cards.set(cards.indexOf(c), updatedCard);
                return updatedCard;
            }
        }
        return null;
    }

    @Override
    public Card add(Card c) {
        cards.add(c);
        return c;
    }

    @Override
    public Card get(Long id) {
        for(Card c : cards){
            if(c.getId()==id){
                return c;
            }
        }
        return null;
    }
}
