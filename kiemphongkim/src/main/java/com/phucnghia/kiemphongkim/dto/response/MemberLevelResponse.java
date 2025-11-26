package com.phucnghia.kiemphongkim.dto.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberLevelResponse {

    private Long id;
    private String name;
    private Integer minPoints;
}
