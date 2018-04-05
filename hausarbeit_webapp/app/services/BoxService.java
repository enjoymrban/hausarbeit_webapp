package services;

import models.Box;

import java.util.List;

public interface BoxService {

    /**
     * Return's list of all boxes.
     * @return list of all boxes
     */
    List<Box> get();

    /**
     * Removes box with given identifier.
     * @param id book identifier
     * @return {@code true} on success  {@code false} on failure
     */
    boolean delete(final Long id);

    /**
     * Updates book with given identifier.
     * @param updatedBox book with updated fields
     * @return updated book
     */
    Box update(final Box updatedBox);

    /**
     * Adds the given book.
     * @param box to add
     * @return added box
     */
    Box add(final Box box);


    /**
     * Returns
     * @param id box identifier
     * @return box
     */

    Box get(final Long id);





}