#!/usr/bin/env node

import 'module-alias/register';
import express from "express";

const server = async () => {

  const app = express();

  const PORT = process.env.PORT || 3007;
  app.listen(PORT, () => {
    console.log(`Server started on localhost:${PORT}`);
  });
};

server().catch((err) => {
  console.error(err);
});
