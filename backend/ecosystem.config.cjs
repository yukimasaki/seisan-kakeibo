module.exports = {
  apps: [
    {
      name: 'nest',
      exec_mode: 'cluster',
      instances: '-1',
      script: './dist/src/main.js',
      args: 'start',
      time: true,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
    },
  ],
}
