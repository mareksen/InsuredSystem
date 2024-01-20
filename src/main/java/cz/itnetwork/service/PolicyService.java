package cz.itnetwork.service;

import cz.itnetwork.model.Policy;
import cz.itnetwork.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

// Marks this class as a Spring service, making it eligible for Spring's service scanning
@Service
public class PolicyService {

    // Instance of PolicyRepository to interact with the database
    private final PolicyRepository policyRepository;

    // Constructor to autowire the PolicyRepository
    @Autowired
    public PolicyService(PolicyRepository policyRepository) {
        this.policyRepository = policyRepository;
    }

    // Finds a policy by its ID
    public Optional<Policy> findById(Long id) {
        // Calls the repository to find a policy by ID
        return policyRepository.findById(id);
    }

    /**
     * This commented block is an alternative way to write the above method.
     * public Optional<Policy> findById(Long id) {
     * return policyRepository.findById(id);
     * }
     */

    // Saves or updates a policy
    public Policy saveOrUpdate(Policy policy) {
        // Business logic for updating or saving a policy would go here,
        // such as checking if policy.getId() is null.
        // Saves the policy to the database
        return policyRepository.save(policy);
    }

    // Deletes a policy by its ID
    public void deleteById(Long id) {
        // Calls the repository to delete a policy by ID
        policyRepository.deleteById(id);
    }

    // Retrieves all policies
    public List<Policy> findAll() {
        // Calls the repository to get all policies
        return policyRepository.findAll();
    }

    // Additional methods for other necessary operations can be added here...
}