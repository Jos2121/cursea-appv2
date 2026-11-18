import { defineHandler } from "nitro";
import { getQuery } from "nitro/h3";
import { pool, ensureSchema } from "../../../utils/db";

const mapJobRow = (row: any) => ({
  ...row,
  source: row.source || "manual",
  recipient: row.whatsappNumber,
  imageUrl: row.imageUrl || null,
  errorLog: row.errorLog || null,
  pago: row.pago || "Pendiente",
  generaciones: Number(row.generaciones ?? 0),
  voucherUrl: row.voucherUrl || null,
});

export default defineHandler(async (event) => {
  await ensureSchema();
  const query = getQuery(event);
  const hasPagination = query.page !== undefined || query.limit !== undefined;

  if (!hasPagination) {
    const result = await pool.query(
      'SELECT * FROM "MediaJob" ORDER BY "createdAt" DESC LIMIT 100'
    );
    return result.rows.map(mapJobRow);
  }

  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(query.limit) || 12));
  const search = typeof query.search === "string" ? query.search.trim() : "";
  const date = typeof query.date === "string" ? query.date.trim() : "";

  const conditions: string[] = [];
  const params: any[] = [];

  if (search) {
    params.push(`%${search}%`);
    conditions.push(`(COALESCE("whatsappNumber", '') ILIKE $${params.length} OR id ILIKE $${params.length})`);
  }

  if (date) {
    params.push(date);
    conditions.push(`DATE("createdAt") = $${params.length}::date`);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const countResult = await pool.query(
    `SELECT COUNT(*)::int AS total FROM "MediaJob" ${whereClause}`,
    params
  );
  const total = countResult.rows[0]?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(page, totalPages);
  const offset = (safePage - 1) * limit;

  const dataParams = [...params, limit, offset];
  const result = await pool.query(
    `SELECT * FROM "MediaJob" ${whereClause} ORDER BY "createdAt" DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
    dataParams
  );

  return {
    items: result.rows.map(mapJobRow),
    total,
    page: safePage,
    limit,
    totalPages,
  };
});
