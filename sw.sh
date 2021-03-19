#!/bin/bash
xcfe4-terminal
cd isohelapp
nvm use 15
tmux new -s sw
cd backend
yarn watch 
