import { serializeActionResult } from 'astro:actions';
import { relations } from 'drizzle-orm';
import {integer, pgTable, serial, text, varchar} from 'drizzle-orm/pg-core';

export const ReportsClient = pgTable("reportsClient", {
    id: serial().primaryKey(),
    text: text(),
    status: varchar("status", {enum: ["Atendido", "Pendiente"]}),
    clientId: integer().references(()=>Clients.id)
});

export const Clients = pgTable('clients', {
    id: serial().primaryKey(),
    name: varchar().notNull(),
})
//export const employeeReports = pgTable("employeeReports", {});

//relations

export const clientsRelations = relations(Clients, ({many})=>({
    ReportsClient: many(ReportsClient),
}));

export const ReportsClientRelations = relations(ReportsClient, ({one})=>({
    client: one(Clients, {
        fields: [ReportsClient.clientId],
        references: [Clients.id]
    })
}));