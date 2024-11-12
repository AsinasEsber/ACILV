"use server";

import { db, leaveRequestRepo, LeavRequestCreateForm } from "@/lib/db";
import { leaveRequest } from "@/lib/schema";
import { eq } from 'drizzle-orm';


export async function createNewRequest(data:LeavRequestCreateForm) {
    await leaveRequestRepo.create(data);
}


export async function getRequests(userId:string) {
    console.log("hi" + userId)
    return await db.select().from(leaveRequest).where(eq(leaveRequest.userId, userId));
}