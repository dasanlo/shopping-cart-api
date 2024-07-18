const CronJob = require('cron').CronJob;
const moment = require('moment');

// Modelos de Mongoose
const Cart = require('../models/Cart');
const Order = require('../models/Order');

// Configuración del cronjob para ejecutarse todos los días a las 00:00 horas
const cronJob = new CronJob('0 0 * * *', async () => {
    console.log('Ejecutando tarea cron');
    await deleteCartsAndOrders();
}, null, true, 'Europe/Madrid'); // Ajusta la zona horaria según sea necesario

// Iniciar el cronjob
cronJob.start();
console.log('Cronjob activado para eliminar carritos y órdenes antiguas');

async function deleteCartsAndOrders() {
    console.log("Iniciando función para marcar carritos como abandonados");

    try {
        const yesterday = moment().subtract(1, 'day').toDate();

        const result = await Cart.updateMany(
          { updatedAt: { $lt: yesterday }, status: 'active' },
          { $set: { status: 'abandoned' } }
        );

        console.log(`Se marcaron como abandonados ${result.modifiedCount} carritos.`);
    } catch (error) {
        console.error('Error al marcar carritos como abandonados:', error);
    }
}