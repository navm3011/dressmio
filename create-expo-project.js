#!/usr/bin/env node

const https = require('https');

const EXPO_TOKEN = process.env.EXPO_TOKEN;

if (!EXPO_TOKEN) {
  console.error('ERROR: EXPO_TOKEN environment variable is required');
  process.exit(1);
}

console.log('Creating new Expo project for dressMio...');

const projectData = JSON.stringify({
  name: 'dressMio',
});

const options = {
  hostname: 'api.expo.dev',
  path: '/v2/projects',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': projectData.length,
    'Authorization': `Bearer ${EXPO_TOKEN}`,
  },
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 201 || res.statusCode === 200) {
      try {
        const project = JSON.parse(data);
        console.log('\n✅ Expo project created successfully!');
        console.log('\nProject Details:');
        console.log(`  Name: ${project.name}`);
        console.log(`  Project ID: ${project.id}`);
        console.log(`  Slug: ${project.slug}`);
        console.log(`\nUse this Project ID in your app.config.ts:`);
        console.log(`  projectId: "${project.id}"`);
        console.log(`\nYou can view it at: https://expo.dev/accounts/@${project.ownerAccount.username}/projects/${project.slug}`);
      } catch (e) {
        console.error('Error parsing response:', e);
        console.error('Response:', data);
        process.exit(1);
      }
    } else {
      console.error(`Error: HTTP ${res.statusCode}`);
      console.error('Response:', data);
      process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e);
  process.exit(1);
});

req.write(projectData);
req.end();
