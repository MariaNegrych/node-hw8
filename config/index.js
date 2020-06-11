module.exports = {
    PORT: process.env.PORT || 5000,

    ROOT_EMAIL: process.env.ROOT_EMAIL || 'email',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || 'pass',
    ROOT_EMAIL_SERVICE: process.env.ROOT_EMAIL_SERVICE || 'yahoo',

    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:4200',

    DB_login: process.env.DB_login,
    DB_pass: process.env.DB_pass,
    DB_name: process.env.DB_name,

    CRON_JOB_PERIOD: process.env.CRON_JOB_PERIOD || '0 0 * * *',
}
