package services;

import models.Category;

import java.util.List;

public interface CategoryService {

    /**
     * Return's list of all categories.
     * @return list of all categories
     */
    List<Category> get();

    /**
     * Removes Category with given identifier.
     * @param id card identifier
     * @return {@code true} on success  {@code false} on failure
     */
    boolean delete(final Long id);

    /**
     * Updates book with given identifier.
     * @param updatedCategory card with updated fields
     * @return updated Category
     */
    Category update(final Category updatedCategory);

    /**
     * Adds the given Category.
     * @param category to add
     * @return added category
     */
    Category add(final Category category);

    /**
     * Returns
     * @param id category identifier
     * @return Category
     */

    Category get(final Long id);

}