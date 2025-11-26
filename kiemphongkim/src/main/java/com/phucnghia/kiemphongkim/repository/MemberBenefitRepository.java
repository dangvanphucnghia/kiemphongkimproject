package com.phucnghia.kiemphongkim.repository;

import com.phucnghia.kiemphongkim.entity.MemberBenefit;
import com.phucnghia.kiemphongkim.entity.MemberLevel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberBenefitRepository extends JpaRepository<MemberBenefit, Long> {
    List<MemberBenefit> findByLevelAndActiveTrue(MemberLevel level);
    List<MemberBenefit> findByLevel_IdAndActiveTrue(Long levelId);
}
