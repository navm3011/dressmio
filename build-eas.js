#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

const EXPO_USERNAME = process.env.EXPO_USERNAME;
const EXPO_PASSWORD = process.env.EXPO_PASSWORD;

if (!EXPO_USERNAME || !EXPO_PASSWORD) {
  console.error('ERROR: EXPO_USERNAME and EXPO_PASSWORD environment variables are required');
  process.exit(1);
}

console.log('========================================');
console.log('dressMio iOS Build via EAS CLI');
console.log('========================================');
console.log('');

// Step 1: Login to EAS
console.log('Step 1: Logging in to Expo...');
const login = spawn('eas', ['login', '--no-browser'], {
  cwd: path.join(__dirname),
  stdio: 'pipe',
  env: { ...process.env }
});

let loginOutput = '';
let loginError = '';

login.stdout.on('data', (data) => {
  loginOutput += data.toString();
  process.stdout.write(data);
});

login.stderr.on('data', (data) => {
  loginError += data.toString();
  process.stderr.write(data);
});

login.on('close', (code) => {
  if (code !== 0) {
    console.error('\nERROR: Login failed');
    console.error(loginError);
    process.exit(1);
  }

  console.log('\nLogin successful!');
  console.log('');

  // Step 2: Build for iOS
  console.log('Step 2: Starting iOS build...');
  console.log('This may take 10-20 minutes...');
  console.log('');

  const build = spawn('eas', ['build', '--platform', 'ios', '--profile', 'production'], {
    cwd: path.join(__dirname),
    stdio: 'inherit',
    env: { ...process.env }
  });

  build.on('close', (buildCode) => {
    console.log('');
    console.log('========================================');
    if (buildCode === 0) {
      console.log('Build complete!');
      console.log('========================================');
      console.log('');
      console.log('Your build is now available in EAS.');
      console.log(`Check the build status at:`);
      console.log(`https://expo.dev/accounts/${EXPO_USERNAME}/projects/smart-closet-app/builds`);
      console.log('');
    } else {
      console.log('Build failed with exit code:', buildCode);
      console.log('========================================');
      process.exit(buildCode);
    }
  });
});

// Handle stdin for interactive prompts
process.stdin.on('data', (data) => {
  login.stdin.write(data);
});
