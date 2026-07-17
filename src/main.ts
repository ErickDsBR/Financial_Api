import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { ValidationPipe } from "@nestjs/common";
import express = require("express");
import { ExpressAdapter } from "@nestjs/platform-express";

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.enableCors();

  if (process.env.NODE_ENV === "production") {
    await app.listen(3000);
  } else {
    await app.init();
  }
}
bootstrap();

export default server;
