package cz.itnetwork.controller;


import cz.itnetwork.model.Policy;
import cz.itnetwork.service.PolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// Allows cross-origin requests
@CrossOrigin(origins = "*", allowedHeaders = "*")
// Marks this class as a REST controller
@RestController
// Maps HTTP requests to /api/policies path
@RequestMapping("/api/policies")
public class PolicyController {

    // PolicyService instance injected by Spring
    private final PolicyService policyService;

    // Constructor to autowire PolicyService
    @Autowired
    public PolicyController(PolicyService policyService) {
        this.policyService = policyService;
    }

    // HTTP GET method to fetch all policies
    @GetMapping
    public ResponseEntity<List<Policy>> getAllPolicies() {
        // Returns a list of all policies
        return ResponseEntity.ok(policyService.findAll());
    }

    // HTTP GET method to fetch a policy by its ID
    @GetMapping("/{id}")
    public ResponseEntity<Policy> getPolicyById(@PathVariable Long id) {
        // Tries to find the policy, returns it if found, or 404 if not found
        Optional<Policy> policy = policyService.findById(id);
        return policy.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // HTTP POST method to create a new policy
    @PostMapping
    public ResponseEntity<Policy> createPolicy(@RequestBody Policy policy) {
        // Saves the new policy and returns it with a 201 CREATED status
        Policy savedPolicy = policyService.saveOrUpdate(policy);
        return new ResponseEntity<>(savedPolicy, HttpStatus.CREATED);
    }

    // HTTP PUT method to update an existing policy by its ID
    @PutMapping("/{id}")
    public ResponseEntity<Policy> updatePolicy(@PathVariable Long id, @RequestBody Policy policy) {
        // Checks if the policy exists, updates it if it does, or returns 404 if not found
        return policyService.findById(id)
                .map(existingPolicy -> {
                    policy.setId(id);
                    Policy updatedPolicy = policyService.saveOrUpdate(policy);
                    return new ResponseEntity<>(updatedPolicy, HttpStatus.OK);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // HTTP DELETE method to delete a policy by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePolicy(@PathVariable Long id) {
        // Checks if the policy exists, deletes it if it does, or returns 404 if not found
        return policyService.findById(id)
                .map(policy -> {
                    policyService.deleteById(id);
                    return new ResponseEntity<Void>(HttpStatus.OK);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Additional CRUD endpoints can be added here...
}

