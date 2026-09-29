import { defineHandler } from "nitro";
import { readBody } from "nitro/h3";
import { pool } from "../../../utils/db";

export default defineHandler(async (event) => {
  const body = await readBody(event);
  
  if (body && body.callback_query) {
    const callbackData = body.callback_query.data;
    const callbackId = body.callback_query.id;
    
    if (callbackData && callbackData.startsWith('confirm_')) {
      const waNumber = callbackData.replace('confirm_', '');
      
      await pool.query(
        `UPDATE "MediaJob" SET pago = 'pagado', "updatedAt" = NOW() WHERE "whatsappNumber" = $1`, 
        [waNumber]
      );

      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          callback_query_id: callbackId, 
          text: 'Pago confirmado y audio liberado exitosamente.',
          show_alert: true
        })
      }).catch(console.error);
    }
  }

  return { ok: true };
});