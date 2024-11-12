import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; // Assuming you have a Progress component
import { DonutChart } from "./DonutChart"; // Assuming you have a DonutChart component
import Upcoming from "./Upcoming";

export default function LeaveRequestWidgets() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Total Leaves Taken This Year Widget */}
      <DonutChart/>
      {/* Leave Balance Summary Widget */}
      <Card className="flex-1">
        <CardHeader className="items-center">
        <CardTitle>Leave Balance Summary</CardTitle>
        <CardDescription>updates require 48 hours</CardDescription>
        </CardHeader>
        <CardContent>
          {[
            { label: "Annual Leave", used: 5, total: 15, color: "blue" },
            { label: "Sick Leave", used: 2, total: 7, color: "red" },
            { label: "Casual Leave", used: 1, total: 3, color: "orange" },
          ].map(({ label, used, total, color }, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{label}</span>
                <span className="text-sm text-muted-foreground">
                  {used}/{total} days used
                </span>
              </div>
              <Progress value={(used / total) * 100}/>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Holidays Widget */}
      <Upcoming></Upcoming>
    </div>
  );
}
