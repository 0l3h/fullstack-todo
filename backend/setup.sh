#!/bin/bash

(echo "------------- Installing dependencies ------------") && 
npm i && 
(echo "------------- Compiling typescript ------------") &&
npm run build 
