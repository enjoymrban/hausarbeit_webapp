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
        return null;
    }

    @Override
    public boolean delete(Long id) {
        return false;
    }

    @Override
    public Card update(Card updatedCard) {
        return null;
    }

    @Override
    public Card add(Card card) {
        return null;
    }
}
