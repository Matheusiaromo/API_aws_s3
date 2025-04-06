module.exports = {
  apps: [{
    name: "aws-presigned-url-api",
    script: "index.js",
    watch: true,
    instances: 1,
    autorestart: true,
    max_memory_restart: "1G",
    env: {
      NODE_ENV: "production",
    }
  }]
} 