package cz.itnetwork.repository;

import cz.itnetwork.model.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long> {
    // Repository interface for Policy entity
}
