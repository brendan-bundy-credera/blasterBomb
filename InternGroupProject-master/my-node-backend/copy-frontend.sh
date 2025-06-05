#!/bin/bash

# Paths (adjust if your folder names change)
FRONTEND_BUILD_DIR="../group-project-ui/build"
BACKEND_CLIENT_DIR="./client"

# Remove old client build (optional, but recommended)
rm -rf "$BACKEND_CLIENT_DIR"

# Copy new build to backend client directory
cp -r "$FRONTEND_BUILD_DIR" "$BACKEND_CLIENT_DIR"

echo "✅ React build copied to backend client directory."