import { integer, sqliteTable, text} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const user = sqliteTable("user", {
	id: text().primaryKey(),
	name: text().notNull(),
	email: text().notNull().unique(),
	emailVerified: integer({mode: "boolean"}).notNull(),
	image: text(),
	createdAt: integer({mode: "timestamp"}).notNull(),
	updatedAt: integer({mode: "timestamp"}).notNull()
});


export const session = sqliteTable("session", {
	id: text().primaryKey(),
	userId: text().notNull().references(() => user.id),
	expiresAt: integer({mode: "timestamp"}).notNull(),
	ipAddress: text(),
	userAgent: text(),
});


export const account = sqliteTable("account", {
	id: text().primaryKey(),
	userId: text().notNull().references(() => user.id),
	accountId: text().notNull(),
	providerId: text().notNull(),
	accessToken: text(),
	refreshToken: text(),
	expiresAt: integer({mode: "timestamp"}),
	password: text()
});


export const verification = sqliteTable("verification", {
	id: text().primaryKey(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: integer({mode: "timestamp"}).notNull()
});



export const leaveRequest = sqliteTable("leave_request",{
	id: text().primaryKey(),
	userId: text().notNull().references(() => user.id),
	status: text().notNull().$type<"pending" | "accepted" | "rejected">().default("pending"),
	from: text(),
	to: text(),
	note: text(),
	created_at: text(),
});



export const timeTrack = sqliteTable('time_track', {
	id: text().primaryKey(),
	userId: text().notNull().references(() => user.id),
	year: integer().notNull(),
	week: integer().notNull(),
	data: text({ mode: 'json' }).$type<Record<string, {
		Mon: number,
		Tue: number,
		Wed: number,
		Thu: number,
		Fri: number,
		Sat: number,
		Sun: number
	}>>()
});