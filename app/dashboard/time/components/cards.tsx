'use client'

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CalendarIcon, PlusCircle, Clock, Trophy, Target } from "lucide-react"
import { format, startOfWeek, endOfWeek } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export default function TimeCards() {
  const [selectedWeek, setSelectedWeek] = useState<Date | undefined>(new Date())
  const [projects, setProjects] = useState(["Project A", "Project B", "Project C"])
  const [hours, setHours] = useState<{ [key: string]: { [key: string]: number } }>({
    "Project A": { Mon: 2, Tue: 3, Wed: 4, Thu: 2, Fri: 3, Sat: 0, Sun: 0 },
    "Project B": { Mon: 1, Tue: 2, Wed: 1, Thu: 3, Fri: 2, Sat: 1, Sun: 0 },
    "Project C": { Mon: 3, Tue: 1, Wed: 2, Thu: 2, Fri: 1, Sat: 0, Sun: 1 },
  })

  const [selectedDay, setSelectedDay] = useState("")
  const [selectedProject, setSelectedProject] = useState("")
  const [hoursWorked, setHoursWorked] = useState("")
  const [newProjectName, setNewProjectName] = useState("")

  const totalHours = useMemo(() => {
    return Object.values(hours).reduce((total, projectHours) => 
      total + Object.values(projectHours).reduce((sum, h) => sum + h, 0), 0
    )
  }, [hours])

  const topProject = useMemo(() => {
    const projectTotals = Object.entries(hours).map(([project, projectHours]) => ({
      project,
      total: Object.values(projectHours).reduce((sum, h) => sum + h, 0)
    }))
    return projectTotals.reduce((max, current) => current.total > max.total ? current : max)
  }, [hours])

  const goalHours = 40
  const remainingHours = Math.max(0, goalHours - totalHours)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedDay && selectedProject && hoursWorked) {
      setHours(prevHours => ({
        ...prevHours,
        [selectedProject]: {
          ...prevHours[selectedProject],
          [selectedDay]: parseInt(hoursWorked, 10)
        }
      }))
      setSelectedDay("")
      setSelectedProject("")
      setHoursWorked("")
    }
  }

  const handleSave = () => {
    console.log("Saving data for week:", selectedWeek ? format(selectedWeek, "yyyy-MM-dd") : "No week selected")
    console.log("Hours data:", hours)
  }

  const handleAddProject = () => {
    if (newProjectName && !projects.includes(newProjectName)) {
      setProjects([...projects, newProjectName])
      setHours(prevHours => ({
        ...prevHours,
        [newProjectName]: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 }
      }))
      setNewProjectName("")
    }
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !selectedWeek && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedWeek ? (
                `${format(startOfWeek(selectedWeek), "MMM d")} - ${format(endOfWeek(selectedWeek), "MMM d, yyyy")}`
              ) : (
                <span>Pick a week</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedWeek}
              onSelect={setSelectedWeek}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours Tracked</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Total Hours: {totalHours} hrs</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Project This Week</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topProject.project} – {topProject.total} hrs</div>
            <Progress value={(topProject.total / totalHours) * 100} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining Hours to Goal</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Goal: {goalHours} hrs – {remainingHours} hrs remaining</div>
            <Progress value={(totalHours / goalHours) * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Project Hours</CardTitle>
            <CardDescription>View and manage hours logged for each project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2">Project</th>
                    {days.map(day => (
                      <th key={day} className="border p-2">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {projects.map(project => (
                    <tr key={project}>
                      <td className="border p-2 font-medium">{project}</td>
                      {days.map(day => (
                        <td key={`${project}-${day}`} className="border p-2 text-center">
                          {hours[project]?.[day] || 0}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" />Add Project</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Project</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Enter project name"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                  />
                  <Button onClick={handleAddProject}>Add</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Log Hours</CardTitle>
            <CardDescription>Record time spent on projects for the selected week</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="day">Day</Label>
                <Select value={selectedDay} onValueChange={setSelectedDay}>
                  <SelectTrigger id="day">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map(day => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="project">Project</Label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger id="project">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map(project => (
                      <SelectItem key={project} value={project}>{project}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hours">Hours Worked</Label>
                <Input
                  id="hours"
                  type="number"
                  min="0"
                  max="24"
                  value={hoursWorked}
                  onChange={(e) => setHoursWorked(e.target.value)}
                  placeholder="Enter hours worked"
                />
              </div>
              <Button type="submit" className="w-full">Log Hours</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}