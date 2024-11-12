"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format, addDays } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn, getRandomString } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { createNewRequest } from "./LeaveRequestActions"
import { authClient } from "@/lib/auth-client"
import { eventBus } from "@/lib/bus"


const FormSchema = z.object({
    from: z.date({
        required_error: "A from date is required.",
    }),
    to: z.date({
        required_error: "A to date is required.",
    }),
    notes: z.string().optional()
})

export function LeaveRequestForm() {
    const { data: session } = authClient.useSession()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            from: new Date(),
            to: addDays(new Date(), 1),
            notes: ""
        }
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if (session && session.user.id) {
            await createNewRequest({
                userId: session?.user.id,
                from: data.from,
                to: data.to,
                notes: data.notes,
                status: getRandomString(["pending" , "accepted" , "rejected"]) as "pending" | "accepted" | "rejected"
            });

            toast({
                variant: "success",
                title: "Request Created",
                description: "We have received your request.",
            });

            form.reset();

            eventBus.emit('new:leaveRequest');
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {
                    // From Field 
                }
                <FormField
                    control={form.control}
                    name="from"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>From</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date < new Date()
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    // To Field 
                }

                <FormField
                    control={form.control}
                    name="to"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>To</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date < new Date()
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                {
                    // Note Field
                }

                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Add request notes if you have any."
                                    className=""
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-4">
                    <Button type="submit">Request Now</Button>
                    <Button variant="outline">Cancel</Button>
                </div>
            </form>
        </Form>
    )
}
