package services;

import com.google.inject.ImplementedBy;
import models.Category;


import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;


@ImplementedBy(DefaultCategoryService.class)
public interface CategoryService {

    /**
     * Return's list of all categories.
     *
     * @return list of all categories
     */
    CompletionStage<Stream<Category>> get();

    /**
     * Removes Category with given identifier.
     *
     * @param id card identifier
     * @return {@code true} on success  {@code false} on failure
     */
    CompletionStage<Boolean> delete(final Long id);

    /**
     * Updates book with given identifier.
     *
     * @param updatedCategory card with updated fields
     * @return updated Category
     */
    CompletionStage<Category> update(final Category updatedCategory);

    /**
     * Adds the given Category.
     *
     * @param category to add
     * @return added category
     */
    CompletionStage<Category> add(final Category category);

    /**
     * Returns
     * @param id category identifier
     * @return Category
     */

    //CompletionStage<Category> get(final Long id);

}