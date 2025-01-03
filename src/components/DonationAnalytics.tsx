import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

const bloodGroupData = [
  { name: "A+", value: 35 },
  { name: "B+", value: 28 },
  { name: "O+", value: 42 },
  { name: "AB+", value: 15 },
  { name: "A-", value: 8 },
  { name: "B-", value: 7 },
  { name: "O-", value: 12 },
  { name: "AB-", value: 5 },
];

const monthlyDonations = [
  { month: "Jan", donations: 45 },
  { month: "Feb", donations: 52 },
  { month: "Mar", donations: 48 },
  { month: "Apr", donations: 70 },
  { month: "May", donations: 65 },
  { month: "Jun", donations: 58 },
];

const COLORS = ["#ea384c", "#ff6b6b", "#ffd93d", "#6c5ce7", "#a8e6cf", "#ff8b94", "#ffd3b6", "#dcedc1"];

export const DonationAnalytics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Blood Group Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={bloodGroupData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#ea384c"
                dataKey="value"
              >
                {bloodGroupData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Donations</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyDonations}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="donations" fill="#ea384c" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};