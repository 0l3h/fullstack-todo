#!/bin/bash

# (echo "----------- Installing dependencies -----------") &&
# npm i && 
(echo "------------- Compiling typescript ------------") &&
npm run build && 
(echo "------------- Running migrations ------------") &&
typeorm migration:run
# (echo "------------- Running a node server ------------") &&
# npm run serve;