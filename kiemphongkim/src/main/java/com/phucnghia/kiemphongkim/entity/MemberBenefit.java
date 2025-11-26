package com.phucnghia.kiemphongkim.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "member_benefits")
public class MemberBenefit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "level_id")
    private MemberLevel level;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Boolean active;
}
