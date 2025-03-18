package waa.miu.finalproject.service.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import waa.miu.finalproject.entity.Comment;
import waa.miu.finalproject.entity.Post;
import waa.miu.finalproject.entity.dto.input.InputCommentDto;
import waa.miu.finalproject.entity.dto.output.SimpleCommentDto;
import waa.miu.finalproject.repository.CommentRepo;
import waa.miu.finalproject.repository.PostRepo;
import waa.miu.finalproject.service.CommentService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {
    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private PostRepo postRepo;

    @Autowired
    private CommentRepo commentRepo;

    @Override
    public void save(InputCommentDto comment) {
        Post p = postRepo.findById(comment.getPost_id()).orElse(null);
        Comment c = modelMapper.map(comment, Comment.class);
        c.setPost(p);
        entityManager.persist(c); // add new comment
    }

    @Override
    public SimpleCommentDto getComment(long id) {
        Comment comment = entityManager.find(Comment.class, id);
        return modelMapper.map(comment, SimpleCommentDto.class);
    }

    @Override
    public List<SimpleCommentDto> getPaginationComments(int postId) {
//        List<Comment> comments = commentRepo.findAll().subList(0, postId);
//        return modelMapper.map()
        return List.of();
    }

    @Override
    public List<SimpleCommentDto> getComments() {
        List<Comment> comments = commentRepo.findAll();
        return comments.stream().map(c -> modelMapper.map(c, SimpleCommentDto.class)).collect(Collectors.toList());
    }
}
