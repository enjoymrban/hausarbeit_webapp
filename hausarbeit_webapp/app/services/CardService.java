package services;

import models.Card;

import java.util.List;

public interface CardService {

    /**
     * Return's list of all books.
     * @return list of all books
     */
    List<Card> get();

    /**
     * Removes book with given identifier.
     * @param id book identifier
     * @return {@code true} on success  {@code false} on failure
     */
    boolean delete(final Long id);

    /**
     * Updates book with given identifier.
     * @param updatedBook book with updated fields
     * @return updated book
     */
    Card update(final Card updatedCard);

    /**
     * Adds the given book.
     * @param book to add
     * @return added book
     */
    Card add(final Card card);

    Card get(final Long id);

}