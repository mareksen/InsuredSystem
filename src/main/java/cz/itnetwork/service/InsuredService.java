package cz.itnetwork.service;

import cz.itnetwork.model.Insured;
import cz.itnetwork.repository.InsuredRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

// Marks this class as a Spring service, making it eligible for Spring's service scanning
@Service
public class InsuredService {

    // Instance of InsuredRepository to interact with the database
    private final InsuredRepository insuredRepository;

    // Constructor to autowire the InsuredRepository
    @Autowired
    public InsuredService(InsuredRepository insuredRepository) {
        this.insuredRepository = insuredRepository;
    }

    /**
     * Finds an insured person by their ID.
     *
     * @param id the ID of the insured person
     * @return an Optional containing the found Insured, or an empty Optional if not found
     */
    public Optional<Insured> findById(Long id) {
        // Calls the repository to find an insured person by their ID
        return insuredRepository.findById(id);
    }

    /**
     * Saves or updates an insured person in the database.
     *
     * @param insured the insured person to save or update
     * @return the saved or updated Insured
     */
    public Insured saveOrUpdate(Insured insured) {
        // Saves or updates the insured person in the database
        return insuredRepository.save(insured);
    }

    /**
     * Deletes an insured person from the database by their ID.
     *
     * @param id the ID of the insured person to delete
     */
    public void deleteById(Long id) {
        // Deletes the insured person by their ID
        insuredRepository.deleteById(id);
    }

    // Retrieves all insured persons from the database
    public List<Insured> findAll() {
        // Calls the repository to get all insured persons
        return insuredRepository.findAll();
    }

    // Additional methods for business logic can be added here...
}