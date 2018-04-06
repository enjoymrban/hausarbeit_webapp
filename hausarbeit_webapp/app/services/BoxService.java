package services;

import com.google.inject.ImplementedBy;
import models.Box;

import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;

@ImplementedBy(DefaultBoxService.class)
public interface BoxService {

    /**
     * Return's list of all boxes.
     *
     * @return list of all boxes
     */
    CompletionStage<Stream<Box>> get();

    /**
     * Removes box with given identifier.
     *
     * @param id book identifier
     * @return {@code true} on success  {@code false} on failure
     */
    CompletionStage<Boolean> delete(final Long id);

    /**
     * Updates book with given identifier.
     *
     * @param updatedBox book with updated fields
     * @return updated book
     */
    CompletionStage<Box> update(final Box updatedBox);

    /**
     * Adds the given book.
     *
     * @param box to add
     * @return added box
     */
    CompletionStage<Box> add(final Box box);


    /**
     * Returns
     *
     * @param id box identifier
     * @return box
     */

    CompletionStage<Box> get(final Long id);


}