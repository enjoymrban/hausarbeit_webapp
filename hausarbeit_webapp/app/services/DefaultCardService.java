package services;

import models.Card;
import models.CardRepository;

import javax.inject.Inject;
import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;


public class DefaultCardService implements CardService {
    private CardRepository cardRepository;


    @Inject
    public DefaultCardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    @Override
    public CompletionStage<Stream<Card>> get() {
        return cardRepository.list();
    }

    @Override
    public CompletionStage<Boolean> delete(Long id) {
        return cardRepository.remove(id);
    }

    @Override
    public CompletionStage<Card> update(Card updateCard) {
        return cardRepository.update(updateCard);
    }

    @Override
    public CompletionStage<Card> add(Card card) {
        return cardRepository.add(card);
    }

    @Override
    public CompletionStage<Card> get(Long id) {
        return cardRepository.find(id);
    }
}
