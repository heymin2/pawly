package com.pawly.domain.theme.controller;

import com.pawly.domain.rollingPaper.controller.dto.RollingPaperCreateRequest;
import com.pawly.domain.theme.controller.dto.ThemeCreateRequest;
import com.pawly.domain.theme.controller.dto.ThemeUpdateRequest;
import com.pawly.domain.theme.service.ThemeService;
import com.pawly.global.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/admin/theme")
@RequiredArgsConstructor
public class ThemeController {
    private final ThemeService themeService;

    @PostMapping
    public ApiResponse<?> createTheme(Authentication authentication, @Valid @RequestBody ThemeCreateRequest themeCreateRequest) {
        return themeService.createTheme(themeCreateRequest.toDto(authentication.getName()));
    }

    @PatchMapping("/{themeId}")
    public ApiResponse<?> updateTheme(Authentication authentication, @PathVariable Long themeId,
                                                                     @Valid @RequestBody ThemeUpdateRequest themeUpdateRequest) {
        return themeService.updateTheme(themeUpdateRequest.toDto(authentication.getName(), themeId));
    }

    @DeleteMapping("/{themeId}")
    public ApiResponse<?> deleteTheme(Authentication authentication, @PathVariable Long themeId) {
        return themeService.deleteTheme(authentication.getName(), themeId);
    }
}
