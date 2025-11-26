package com.phucnghia.kiemphongkim.dto.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberBenefitResponse {

    private Long id;

    private Long levelId;
    private String levelName;

    private String title;
    private String description;

    private Boolean active;
}
