import * as React from "react"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LeaveRequestForm } from "./LeaveRequestForm"


export function LeaveRequestCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Details</CardTitle>
        <CardDescription>Submit your leave request details and dates for approval.</CardDescription>
      </CardHeader>
      <CardContent>
      <LeaveRequestForm></LeaveRequestForm>
      </CardContent>
    </Card>
  )
}
