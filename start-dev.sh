#!/bin/bash

echo "Starting development servers..."
echo

echo "Starting Backend Server..."
osascript -e 'tell app "Terminal"
    do script "cd backend && npm start"
end tell'

sleep 3

echo "Starting Frontend Server..."
osascript -e 'tell app "Terminal"
    do script "cd Frontend && yarn run dev"
end tell'

echo
echo "Both servers are starting. Check your terminal windows."
