package services;

import models.Card;

import java.util.List;

public interface CardService {

    /**
     * Return's list of all cards.
     * @return list of all cards
     */
    List<Card> get();

    /**
     * Removes card with given identifier.
     * @param id card identifier
     * @return {@code true} on success  {@code false} on failure
     */
    boolean delete(final Long id);

    /**
     * Updates card with given identifier.
     * @param updatedBox book with updated fields
     * @return updated Card
     */
    Card update(final Card updatedBox);

    /**
     * Adds the given book.
     * @param card to add
     * @return added book
     */
    Card add(final Card card);


    /**
     * Returns
     * @param id card identifier
     * @return card
     */

    Card get(final Long id);

}