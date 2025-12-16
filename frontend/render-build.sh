#!/usr/bin/env bash
# Build script for Render frontend

echo "Installing dependencies..."
npm install

echo "Building with Vite..."
npm run build

echo "Build complete! Output in dist/"
