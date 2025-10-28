#!/bin/bash

# Create the destination directory if it doesn't exist
mkdir -p public/images/el/header-icon

# Copy the icons from the original React app to our Next.js app
cp "/Users/jwindzer/Dropbox/Event Logic gemensam/Publika webbsidan EL/public/images/el/header-icon/"*.svg public/images/el/header-icon/

echo "Icons copied successfully!"
