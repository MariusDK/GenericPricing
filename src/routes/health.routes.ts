import express from 'express';
const router = express.Router({});
router.get("/", async (req, res, next) => {   
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    const healthCheck = {
        uptime: process.uptime(),
        message: 'Generic Pricing Api is healthy! ⚡',
        timestamp: Date.now()
    }
    try {
        res.status(200).send(healthCheck);
    } catch (e) {
        res.status(503).send('Generic Pricing Api is down');
    }
})

export default router;