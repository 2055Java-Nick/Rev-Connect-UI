import { PostModel } from "../models/post";
import { BaseService } from "./BaseService";

class PostService extends BaseService<PostModel> {
  constructor() {
    super("/posts");
  }

  // TODO: fill in /posts specific api calls
}

export const postService = new PostService();
