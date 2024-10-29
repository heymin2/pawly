package com.pawly.domain.member.entity;

import java.util.Arrays;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum SocialType {
    KAKAO("kakao_account", "id", "email"),
    GOOGLE("null", "sub", "email");

    private final String attributeKey;
    private final String providerCode;
    private final String identifier;

    public static SocialType from(String provider) {
        String upperCastedProvider = provider.toUpperCase();

        return Arrays.stream(SocialType.values())
            .filter(item -> item.name().equals(upperCastedProvider))
            .findFirst()
            .orElseThrow();
    }
}
