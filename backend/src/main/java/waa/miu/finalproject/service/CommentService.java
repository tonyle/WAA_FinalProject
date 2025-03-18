package waa.miu.finalproject.service;

import waa.miu.finalproject.entity.dto.input.InputCommentDto;
import waa.miu.finalproject.entity.dto.output.SimpleCommentDto;

import java.util.List;

public interface CommentService {
    public void save(InputCommentDto comment);
    public SimpleCommentDto getComment(long id);
    public List<SimpleCommentDto> getPaginationComments(int postId);
    public List<SimpleCommentDto> getComments();
}
