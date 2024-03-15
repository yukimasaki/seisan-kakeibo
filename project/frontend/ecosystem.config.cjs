module.exports = {
  apps: [
    {
      name: 'next',
      exec_mode: 'cluster',
      instances: '-1',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      time: true,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
    },
  ],
}
