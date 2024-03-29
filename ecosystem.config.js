module.exports = {
  apps : [{
    name: 'API',
    script: './db/server.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '47.110.57.207',
      ref  : 'origin/master',
      repo : 'git@github.com:luo-mini/whisper-app.git',
      path : '/',
      'post-deploy' : 'pm2 reload ecosystem.config.js --env production'
    }
  }
};
