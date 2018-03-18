package services;

import models.Category;

import java.util.List;

public interface CategoryService {

    /**
     * Return's list of all books.
     * @return list of all books
     */
    List<Category> get();

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
    Category update(final Category updatedCategory);

    /**
     * Adds the given book.
     * @param book to add
     * @return added book
     */
    Category add(final Category category);

}