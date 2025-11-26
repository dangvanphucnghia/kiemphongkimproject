package com.phucnghia.kiemphongkim.dto.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserMemberProfileResponse {

    private Long userId;

    private Long memberLevelId;
    private String memberLevelName;

    private Integer points;

    // thêm field hỗ trợ UI
    private Integer nextLevelMinPoints;   // điểm cần để lên hạng tiếp theo (có thể null nếu max)
    private String nextLevelName;        // tên hạng tiếp theo
}
