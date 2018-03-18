package services;

import models.Box;

import java.util.List;

public interface BoxService {

    /**
     * Return's list of all books.
     * @return list of all books
     */
    List<Box> get();

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
    Box update(final Box updatedBox);

    /**
     * Adds the given book.
     * @param book to add
     * @return added book
     */
    Box add(final Box box);





}