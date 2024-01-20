package cz.itnetwork.controller;

// Import statements

import cz.itnetwork.model.Insured;
import cz.itnetwork.service.InsuredService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// Annotation to allow cross-origin requests from any source
@CrossOrigin(origins = "*", allowedHeaders = "*")
// Annotation to define this class as a REST Controller
@RestController
// Defines the base URL for all endpoints in this controller
@RequestMapping("/api/insured")
public class InsuredController {

    // Declaration of a service class for Insured entities
    private final InsuredService insuredService;

    // Constructor for controller, InsuredService is injected via Spring's dependency injection
    @Autowired
    public InsuredController(InsuredService insuredService) {
        this.insuredService = insuredService;
    }

    // Endpoint to retrieve all insured persons
    @GetMapping
    public ResponseEntity<List<Insured>> getAllInsured() {
        // Fetches all insured persons and returns them in the response
        return ResponseEntity.ok(insuredService.findAll());
    }

    // Endpoint to retrieve a specific insured person by their ID
    @GetMapping("/{id}")
    public ResponseEntity<Insured> getInsuredById(@PathVariable Long id) {
        // Tries to find the insured person by ID
        Optional<Insured> insured = insuredService.findById(id);
        // Returns the found insured or 404 if not found
        return insured.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint to add a new insured person
    @PostMapping
    public ResponseEntity<Insured> createInsured(@RequestBody Insured insured) {
        // Saves the new insured person and returns it in the response
        Insured savedInsured = insuredService.saveOrUpdate(insured);
        return ResponseEntity.ok(savedInsured);
    }

    // Endpoint to update an existing insured person by their ID
    @PutMapping("/{id}")
    public ResponseEntity<Insured> updateInsured(@PathVariable Long id, @RequestBody Insured insured) {
        // Checks if the insured person exists
        if (!insuredService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        // Sets the ID and updates the insured person
        insured.setId(id);
        Insured updatedInsured = insuredService.saveOrUpdate(insured);
        return ResponseEntity.ok(updatedInsured);
    }

    // Endpoint to delete an insured person by their ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInsured(@PathVariable Long id) {
        // Checks if the insured person exists
        if (!insuredService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        // Deletes the insured person and returns a success response
        insuredService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // Additional endpoints can be added here...
}



