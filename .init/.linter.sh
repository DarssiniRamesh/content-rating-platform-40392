#!/bin/bash
cd /home/kavia/workspace/code-generation/content-rating-platform-40392/content_rating_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

