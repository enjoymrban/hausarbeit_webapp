package services;

import models.Box;
import models.BoxRepository;

import javax.inject.Inject;
import java.util.stream.Stream;
import java.util.concurrent.CompletionStage;


public class DefaultBoxService implements BoxService {
    private BoxRepository boxRepository;

    @Inject
    public DefaultBoxService(BoxRepository boxRepository) {
        this.boxRepository = boxRepository;
    }


    @Override
    public CompletionStage<Stream<Box>> get() {

        return boxRepository.list();
    }

    @Override
    public CompletionStage<Boolean> delete(Long id) {

        return boxRepository.remove(id);
    }

    @Override
    public CompletionStage<Box> update(Box updatedBox) {

        return boxRepository.update(updatedBox);
    }

    @Override
    public CompletionStage<Box> add(Box box) {

        return boxRepository.add(box);
    }

    @Override
    public CompletionStage<Box> get(Long id) {

        return boxRepository.find(id);
    }
}
