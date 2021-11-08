import { MikroORM } from "@mikro-orm/core";
import MicroORMConfig from "./mikro-ORM.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolvers } from "./resolvers/hello";
import { PostResolvers } from "./resolvers/post";

const main = async () => {
  const orm = await MikroORM.init(MicroORMConfig);

  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolvers, PostResolvers],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Connected On", 4000);
  });
};

main().catch((e) => {
  console.log(e);
});
