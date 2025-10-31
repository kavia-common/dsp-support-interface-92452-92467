#!/bin/bash
cd /home/kavia/workspace/code-generation/dsp-support-interface-92452-92467/dsp_web_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

