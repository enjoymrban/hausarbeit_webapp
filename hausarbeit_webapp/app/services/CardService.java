package services;

import com.google.inject.ImplementedBy;

import models.Card;


import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;


@ImplementedBy(DefaultCardService.class)
public interface CardService {

    /**
     * Return's list of all cards.
     *
     * @return list of all cards
     */
    CompletionStage<Stream<Card>> get();

    /**
     * Removes card with given identifier.
     *
     * @param id card identifier
     * @return {@code true} on success  {@code false} on failure
     */
    CompletionStage<Boolean> delete(final Long id);

    /**
     * Updates card with given identifier.
     *
     * @param updateCard book with updated fields
     * @return updated Card
     */
    CompletionStage<Card> update(final Card updateCard);

    /**
     * Adds the given book.
     *
     * @param card to add
     * @return added book
     */
    CompletionStage<Card> add(final Card card);


    /**
     * Returns
     *
     * @param id card identifier
     * @return card
     */

    CompletionStage<Card> get(final Long id);

}