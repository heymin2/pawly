package com.pawly.domain.postbox.service;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.domain.postbox.dto.PostboxCreateDto;
import com.pawly.domain.postbox.dto.PostboxReadDto;
import com.pawly.domain.postbox.dto.PostboxReadResponse;
import com.pawly.domain.postbox.entity.Postbox;
import com.pawly.domain.postbox.repository.PostboxRepository;
import com.pawly.domain.rollingPaper.repository.RollingPaperRepository;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostboxService {
    private final PostboxRepository postboxRepository;
    private final RollingPaperRepository rollingPaperRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public boolean createPostbox(PostboxCreateDto dto){
        try {
            Postbox postbox = postboxRepository.save(dto.toEntity());
            return true;
        } catch (Exception e){
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return false;
        }
    }

    @Transactional
    public ApiResponse<?> postboxArRead(PostboxReadDto dto) {
        Optional<Member> member = memberRepository.findByEmail(dto.getName());
        if (!member.isPresent()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        List<PostboxReadResponse> postboxReadResponsesList = postboxRepository.findPostboxesWithinRadius(dto.getLatitude(), dto.getLongitude(), 10.0).stream()
                .map(PostboxReadResponse::from)
                .toList();
        return ApiResponse.createSuccess(postboxReadResponsesList,"AR 우체통 조회 성공");
    }

    @Transactional
    public ApiResponse<?> postboxMapRead(PostboxReadDto dto) {
        Optional<Member> member = memberRepository.findByEmail(dto.getName());
        if (!member.isPresent()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        List<PostboxReadResponse> postboxReadResponsesList = postboxRepository.findPostboxesWithinRadius(dto.getLatitude(), dto.getLongitude(), 1000.0).stream()
                .map(PostboxReadResponse::from)
                .toList();
        return ApiResponse.createSuccess(postboxReadResponsesList, "우체통맵 조회 성공");
    }
}
