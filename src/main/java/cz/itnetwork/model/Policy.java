package cz.itnetwork.model;

import javax.persistence.*;
import java.util.Date;

// Marks this class as a JPA Entity and maps it to the 'policies' table in the database
@Entity
@Table(name = "policies")
public class Policy {

    // Primary key with auto-incremented value
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Maps to 'coverage_amount' column in the database
    @Column(name = "coverage_amount")
    private Double coverageAmount;

    // Maps to 'monthly_amount' column in the database
    @Column(name = "monthly_amount")
    private Double monthlyAmount;

    // Maps to 'policy_start_date' column, treated as a Date
    @Column(name = "policy_start_date")
    @Temporal(TemporalType.DATE)
    private Date policyStartDate;

    // Maps to 'policy_end_date' column, treated as a Date
    @Column(name = "policy_end_date")
    @Temporal(TemporalType.DATE)
    private Date policyEndDate;

    // Maps to 'policy_type' column
    @Column(name = "policy_type")
    private String policyType;

    // Establishes a Many-to-One relationship with the Insured entity
    // Links to 'insured_id' column, which is a foreign key
    @ManyToOne
    @JoinColumn(name = "insured_id", nullable = false)
    private Insured insured;

    // Constructors, getters and setters are assumed to be defined below

    // Setter for the id field
    public void setId(Long id) {
        this.id = id;
    }
}
