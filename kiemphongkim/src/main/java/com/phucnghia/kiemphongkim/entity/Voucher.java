package com.phucnghia.kiemphongkim.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "vouchers")
public class Voucher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;

    @Column(name = "discount_value")
    private Integer discountValue;

    @Column(name = "min_order")
    private Integer minOrder;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "expired_at")
    private Date expiredAt;

    @Column(name = "usage_limit")
    private Integer usageLimit;

    // cho hệ thống loyalty
    @Column(name = "required_points")
    private Integer requiredPoints;

    @Column(name = "member_level_limit")
    private String memberLevelLimit;  // Gold, Platinum...
}
