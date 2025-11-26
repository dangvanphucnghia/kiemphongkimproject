package com.phucnghia.kiemphongkim.dto.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BannerResponse {

    private Long id;
    private String title;
    private String imageUrl;
    private String link;
    private String status;
}
