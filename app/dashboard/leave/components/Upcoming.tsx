import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface Feiertag {
    date: string;
    fname: string;
    all_states: string;
    bw: string;
    by: string;
    be: string;
    bb: string;
    hb: string;
    hh: string;
    he: string;
    mv: string;
    ni: string;
    nw: string;
    rp: string;
    sl: string;
    sn: string;
    st: string;
    sh: string;
    th: string;
    comment: string;
    augsburg: string | null;
    katholisch: string | null;
}

interface ApiResponse {
    status: string;
    feiertage: Feiertag[];
}

interface UpcomingHoliday {
    name: string;
    date: Date;
}

export default async function Upcoming() {
    const response = await fetch('https://get.api-feiertage.de/?states=bw');
    const data: ApiResponse = await response.json();

    // Get today's date without time
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingHolidays: UpcomingHoliday[] = data.feiertage
        .map(({ fname, date }): UpcomingHoliday => ({
            name: fname,
            date: new Date(date),
        }))
        .filter(({ date }) => date >= today)
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(0, 4);


    return (
        <Card className="flex-1 max-w-sm" >
            <CardHeader className="items-center">
                <CardTitle>Upcoming Holidays</CardTitle>
                <CardDescription>Baden-Württemberg, Germany</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4 pt-4">
                    {upcomingHolidays.map(({ name, date }, idx) => (
                        <li key={idx} className="flex justify-between">
                            <span className="font-medium">{name}</span>
                            <span className="text-sm text-muted-foreground">
                                {date.toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}