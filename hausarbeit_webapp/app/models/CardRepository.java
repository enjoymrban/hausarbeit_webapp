package models;

import play.db.jpa.JPAApi;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.function.Function;
import java.util.stream.Stream;

import static java.util.concurrent.CompletableFuture.supplyAsync;

/**
 * Provide JPA operations running inside of a thread pool sized to the connection pool
 */


public class CardRepository {

    private final JPAApi jpaApi;

    @Inject
    public CardRepository(JPAApi jpaApi) {
        this.jpaApi = jpaApi;
    }

    public CompletionStage<Card> add(Card card) {
        return supplyAsync(() -> wrap(em -> insert(em, card)));
    }

    public CompletionStage<Card> update(Card card) {
        return supplyAsync(() -> wrap(em -> update(em, card)));
    }

    public CompletionStage<Card> find(Long id) {
        return supplyAsync(() -> wrap(em -> find(em, id)));
    }

    public CompletionStage<Boolean> remove(Long id) {
        return supplyAsync(() -> wrap(em -> remove(em, id)));
    }

    public CompletionStage<Stream<Card>> list() {
        return supplyAsync(() -> wrap(em -> list(em)));
    }

    private <T> T wrap(Function<EntityManager, T> function) {
        return jpaApi.withTransaction(function);
    }

    private Card insert(EntityManager em, Card card) {
        em.persist(card);
        return card;
    }

    private Card update(EntityManager em, Card card) {
        Card cardToUpdate = em.find(Card.class, card.getId());
        cardToUpdate.setQuestion(card.getQuestion());
        cardToUpdate.setAnswer(card.getAnswer());
        cardToUpdate.setnTries(card.getnTries());
        cardToUpdate.setnCorrect(card.getnCorrect());
        cardToUpdate.setCategory(card.getCategory());
        cardToUpdate.setBox(card.getBox());

        return cardToUpdate;
    }

    private Card find(EntityManager em, Long id) {
        return em.find(Card.class, id);
    }

    private Boolean remove(EntityManager em, Long id) {
        Card card = em.find(Card.class, id);
        if(null != card) {
            em.remove(card);
            return true;

        }
        return false;
    }

    private Stream<Card> list(EntityManager em) {
        List<Card> cards = em.createQuery("select c from card c", Card.class).getResultList();
        return cards.stream();
    }
}