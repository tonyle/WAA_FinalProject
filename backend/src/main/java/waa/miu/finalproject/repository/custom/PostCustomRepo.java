package waa.miu.finalproject.repository.custom;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import waa.miu.finalproject.entity.Post;


public interface PostCustomRepo {
    Page<Post> searchPosts(String author, String title, Pageable pageable);
}
