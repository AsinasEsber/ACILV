"use client";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { eventBus } from "@/lib/bus";
import { db } from "@/lib/db"
import { leaveRequest } from "@/lib/schema"
import { FileIcon } from "lucide-react"
import { useEffect, useState, useCallback } from "react";
import { getRequests } from "./LeaveRequestActions";
import { authClient } from "@/lib/auth-client"

interface records {
    id: string;
    userId: string;
    status: "pending" | "accepted" | "rejected";
    from: string | null;
    to: string | null;
    note: string | null;
    created_at: string | null;
}[]


export default function LeaveRequestTable() {
    const { data: session } = authClient.useSession();
    const [requests, setRequests] = useState<records[]>([]);
    let listenerAdded = false;

    const statusColors = {
        accepted: "bg-green-500",
        rejected: "bg-red-500",
        pending: "bg-yellow-500"
    }

    const fetchData = async () => {
        if (session && session.user.id) {
            setRequests(await getRequests(session.user.id));
        }
    };

    useEffect(() => {
        if (!listenerAdded) {
            fetchData()
            eventBus.on('new:leaveRequest', fetchData);
            listenerAdded = true;
        }
        return () => {
            eventBus.off('new:leaveRequest', fetchData);
            listenerAdded = false;
          };
    }, [session]);




    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Requests</CardTitle>
                <CardDescription>Here is a list of your leave request details and their approval status.</CardDescription>
            </CardHeader>
            <CardContent>
                {requests.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Creation Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>From Date</TableHead>
                                <TableHead>To Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.map((request, index) => (
                                <TableRow key={index}>
                                    <TableCell>{request.created_at}</TableCell>
                                    <TableCell>
                                        <Badge className={statusColors[request.status ?? "accepted"]}>
                                            {request.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{request.from}</TableCell>
                                    <TableCell>{request.to}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
                        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                            <FileIcon className="h-10 w-10 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-semibold">No requests found</h3>
                            <p className="mb-4 mt-2 text-sm text-muted-foreground">
                                You haven't made any requests yet. You can use the form to create new requests.
                            </p>
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <p className="text-muted-foreground text-sm pt-4">
                    After submitting a request. your request will be reviewed by your supervisor. The review process should not take more than 24 hours to be complated.
                </p>
            </CardFooter>
        </Card>
    )
}