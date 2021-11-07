import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/Post";
import MicroORMConfig from "./mikro-ORM.config";

const main = async () => {
  const orm = await MikroORM.init(MicroORMConfig);

  await orm.getMigrator().up()

  const post = orm.em.create(Post, { title: "my first post" });
  await orm.em.persistAndFlush(post)
  // await orm.em.nativeInsert(post);
};

main().catch((e) => {
  console.log(e);
});
