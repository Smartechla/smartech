import { relations } from 'drizzle-orm';
import {integer, pgTable, serial, text, varchar} from 'drizzle-orm/pg-core';

export const ReportsClient = pgTable("reportsClient", {
    id: serial().primaryKey(),
    user: text(),
    pc: text(),
    OS: text(),
    motherboard: text(),
    storage: text(),
    ram: text(),
    cpu: text(),
    gpu: text(),
    bios: text(),
    description: text(),
    status: varchar("status", {enum: ["Atendido", "Pendiente"]}),
    clientId: integer().references(()=>Clients.id)
});

export const Clients = pgTable('clients', {
    id: serial().primaryKey(),
    name: varchar().notNull(),
})

//relations reportClient

export const clientsRelations = relations(Clients, ({many})=>({
    ReportsClient: many(ReportsClient),
}));

export const ReportsClientRelations = relations(ReportsClient, ({one})=>({
    client: one(Clients, {
        fields: [ReportsClient.clientId],
        references: [Clients.id]
    })
}));