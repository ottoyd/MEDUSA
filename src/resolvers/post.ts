import { Post } from "../entities/Post";
import { MyContext } from "../type";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolvers {
  @Query(() => [Post])
  posts (
    @Ctx() {em}: MyContext
  ) {
    return em.find(Post, {})
  }
}