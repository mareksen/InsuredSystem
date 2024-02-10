

package cz.itnetwork.model;

import javax.persistence.*;
import java.util.Date;
import javax.validation.constraints.*;
import java.util.Objects;

/**
 * The Insured class is an entity that maps to the 'insured' table in the database.
 * It represents the data model for the insured person with all the necessary attributes.
 * Annotations are used to specify the table name, column mappings, and primary key.
 */
@Entity
@Table(name = "insured")
public class Insured {

    // Primary key for the entity
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // First name of the insured person
    @NotBlank(message = "First name is required")
    @Column(name = "first_name", nullable = false)
    private String firstName;

    // Last name of the insured person
    @NotBlank(message = "Last name is required")
    @Column(name = "last_name", nullable = false)
    private String lastName;

    // Email of the insured person
    @Email(message = "Email should be valid")
    @Column(name = "email")
    private String email;

    // Date of birth of the insured person
    @Column(name = "date_of_birth")
    @Temporal(TemporalType.DATE)
    private Date dateOfBirth;

    // Phone number of the insured person
    @Pattern(regexp = "\\+420[0-9]{9}", message = "Phone number should start with +420 followed by 9 digits")
    @Column(name = "phone")
    private String phone;

    // Permanent residence address of the insured person
    @NotBlank(message = "Residence address is required")
    @Column(name = "residence")
    private String residence;

    // Place of birth of the insured person
    @Column(name = "place_of_birth")
    private String placeOfBirth;

    // Social security number of the insured person
    @Column(name = "social_security_number")
    private String socialSecurityNumber;

    // Marital status of the insured person
    @Enumerated(EnumType.STRING)
    @Column(name = "marital_status")
    private MaritalStatus maritalStatus;

    // Default constructor for JPA
    public Insured() {
        // JPA requires a no-arg constructor
    }

    // Getters and setters for all attributes

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getResidence() {
        return residence;
    }

    public void setResidence(String residence) {
        this.residence = residence;
    }

    public String getPlaceOfBirth() {
        return placeOfBirth;
    }

    public void setPlaceOfBirth(String placeOfBirth) {
        this.placeOfBirth = placeOfBirth;
    }

    public String getSocialSecurityNumber() {
        return socialSecurityNumber;
    }

    public void setSocialSecurityNumber(String socialSecurityNumber) {
        this.socialSecurityNumber = socialSecurityNumber;
    }

    public MaritalStatus getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(MaritalStatus maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    // Override methods for toString, equals, and hashCode

    @Override
    public String toString() {
        // toString method for printing the details of the insured person
        return "Insured{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", phone='" + phone + '\'' +
                ", residence='" + residence + '\'' +
                ", placeOfBirth='" + placeOfBirth + '\'' +
                ", socialSecurityNumber='" + socialSecurityNumber + '\'' +
                ", maritalStatus=" + maritalStatus +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        // equals method for comparing two Insured objects
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Insured insured = (Insured) o;
        return Objects.equals(id, insured.id) &&
                Objects.equals(email, insured.email);
    }

    @Override
    public int hashCode() {
        // hashCode method for the object
        return Objects.hash(id, email);
    }


}

/**
 * Enum for representing marital status of the insured person.
 */
enum MaritalStatus {
    SINGLE, MARRIED, DIVORCED, WIDOWED
}







