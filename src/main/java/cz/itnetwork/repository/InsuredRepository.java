package cz.itnetwork.repository;

import cz.itnetwork.model.Insured;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsuredRepository extends JpaRepository<Insured, Long> {
    // Here you can add additional polling methods if needed

}
