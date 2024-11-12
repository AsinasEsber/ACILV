import { drizzle } from 'drizzle-orm/better-sqlite3';
import "@/lib/config"
import {leaveRequest, timeTrack} from "@/lib/schema"
import { generateRandomId } from './utils';
import { formatDate } from 'date-fns';

export const db = drizzle(process.env.DB_FILE_NAME as string);



// leave requests
export interface LeavRequestCreateForm {
    userId:string;
    from: Date;
    to: Date;
    status: "pending" | "accepted" | "rejected";
    notes?: string | undefined;
}

export const leaveRequestRepo = {
    create: async (data:LeavRequestCreateForm) => {
        await db.insert(leaveRequest).values({
            id: generateRandomId(),
            userId: data.userId,
            from: formatDate(data.from, 'dd.MM.yyyy'),
            to: formatDate(data.to, 'dd.MM.yyyy'),
            note: data.notes,
            status: data.status,
            created_at: formatDate(new Date(), 'dd.MM.yyyy'),
        })
    }
}


export const timeTrackRepo = {
    create: async () => {
        await db.insert(timeTrack).values({
            id: generateRandomId(),
            userId: "1lC0oMT2-FjM5NE-zdqrV",
            year:2024,
            week:46,
            data:{
                "Internal": {
                    Mon: 0,
                    Tue: 0,
                    Wed: 0,
                    Thu: 0,
                    Fri: 0,
                    Sat: 0,
                    Sun: 0
                }
            }
        })
    }
}