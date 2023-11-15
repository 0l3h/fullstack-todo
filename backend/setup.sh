#!/bin/bash

(echo "------------- Installing dependencies ------------") && 
npm i && 

(echo "------------- Running migrations ------------") &&
npx typeorm migration:run -d src/data-source.ts &&

(echo "------------- Compiling typescript ------------") &&
npm run build 
