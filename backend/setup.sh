#!/bin/bash

(echo "------------- Compiling typescript ------------") &&
npm run build && 
(echo "------------- Running migrations ------------") &&
typeorm migration:run