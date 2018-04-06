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
public class BoxRepository {

    private final JPAApi jpaApi;

    @Inject
    public BoxRepository(JPAApi jpaApi) {
        this.jpaApi = jpaApi;
    }

    public CompletionStage<Box> add(Box box) {
        return supplyAsync(() -> wrap(em -> insert(em, box)));
    }

    public CompletionStage<Box> update(Box box) {
        return supplyAsync(() -> wrap(em -> update(em, box)));
    }

    public CompletionStage<Box> find(Long id) {
        return supplyAsync(() -> wrap(em -> find(em, id)));
    }

    public CompletionStage<Boolean> remove(Long id) {
        return supplyAsync(() -> wrap(em -> remove(em, id)));
    }

    public CompletionStage<Stream<Box>> list() {
        return supplyAsync(() -> wrap(em -> list(em)));
    }

    private <T> T wrap(Function<EntityManager, T> function) {
        return jpaApi.withTransaction(function);
    }

    private Box insert(EntityManager em, Box box) {
        em.persist(box);
        return box;
    }

    private Box update(EntityManager em, Box box) {
        Box bookToUpdate = em.find(Box.class, box.getId());
        bookToUpdate.setTitle(box.getTitle());
        bookToUpdate.setDescription(box.getDescription());
        return bookToUpdate;
    }

    private Box find(EntityManager em, Long id) {
        return em.find(Box.class, id);

    }

    private Boolean remove(EntityManager em, Long id) {
        Box box = em.find(Box.class, id);
        if(null != box) {
            em.remove(box);
            return true;

        }
        return false;
    }

    private Stream<Box> list(EntityManager em) {
        List<Box> boxes = em.createQuery("select b from box b", Box.class).getResultList();
        return boxes.stream();
    }
}