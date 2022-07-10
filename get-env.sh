#!/bin/bash
if [ -f /usr/share/nginx/html/env.js ] ; then
    rm /usr/share/nginx/html/env.js
fi
touch /usr/share/nginx/html/env.js
echo "window.env = {}; window.env.REACT_APP_API_BASE_PATH = '${REACT_APP_API_BASE_PATH}'" >> /usr/share/nginx/html/env.js