import { useData } from "@/contexts/DataContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { ScoreBadge } from "@/components/farmer/ScoreBadge";

export const Analytics = () => {
  const { farmers } = useData();

// Calculate metrics
const totalFarmers = farmers.length;
const scoredFarmers = farmers.filter(f => f.climateScore !== undefined).length;

const averageScore =
  scoredFarmers > 0
    ? Math.round(
        farmers.reduce((sum, f) => {
          const score = f.climateScore ?? 0;
          const safeScore = Math.min(100, Math.max(0, score)); // clamp 0–100
          return sum + safeScore;
        }, 0) / scoredFarmers
      )
    : 0;


  // Score distribution (5 bands)
  const veryCritical = farmers.filter(
    (f) => f.climateScore && f.climateScore <= 20
  ).length;
  const low = farmers.filter(
    (f) => f.climateScore && f.climateScore > 20 && f.climateScore <= 40
  ).length;
  const moderate = farmers.filter(
    (f) => f.climateScore && f.climateScore > 40 && f.climateScore <= 60
  ).length;
  const good = farmers.filter(
    (f) => f.climateScore && f.climateScore > 60 && f.climateScore <= 80
  ).length;
  const excellent = farmers.filter(
    (f) => f.climateScore && f.climateScore > 80
  ).length;

  const scoreDistribution = [
    { name: "Very Critical", value: veryCritical, color: "#ef4444" }, // red-500
    { name: "Low", value: low, color: "#f97316" }, // orange-500
    { name: "Moderate", value: moderate, color: "#eab308" }, // yellow-500
    { name: "Good", value: good, color: "#22c55e" }, // green-500
    { name: "Excellent", value: excellent, color: "#3b82f6" }, // blue-500
  ];

  // County distribution
  const countyStats = farmers.reduce((acc, farmer) => {
    const county = farmer.county || "Unknown";
    acc[county] = (acc[county] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const countyData = Object.entries(countyStats).map(([county, count]) => ({
    county,
    count,
  }));

  // Farming type distribution
  const farmingTypeStats = farmers.reduce((acc, farmer) => {
    const type = farmer.farmingType || "Unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const farmingTypeData = Object.entries(farmingTypeStats).map(
    ([type, count]) => ({
      type,
      count,
    })
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground">
          Overview of farmer enrollment and climate scoring progress
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFarmers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Scored Farmers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scoredFarmers}</div>
            <p className="text-xs text-muted-foreground">
              {totalFarmers > 0
                ? Math.round((scoredFarmers / totalFarmers) * 100)
                : 0}
              % completion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <CardContent>
              <div className="text-2xl font-bold">{averageScore}</div>
              <div className="mt-2">
                <ScoreBadge
                  score={averageScore}
                  scoreBand={
                    averageScore <= 20
                      ? "veryCritical"
                      : averageScore <= 40
                      ? "low"
                      : averageScore <= 60
                      ? "moderate"
                      : averageScore <= 80
                      ? "good"
                      : "excellent"
                  }
                />
              </div>
            </CardContent>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Products Matched
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scoredFarmers}</div>
            <p className="text-xs text-muted-foreground">100% match rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
            <CardDescription>
              Climate resilience scores by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={scoreDistribution.filter((d) => d.value > 0)} // show only non-zero in pie
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {scoreDistribution
                    .filter((d) => d.value > 0)
                    .map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-sm text-muted-foreground">
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* County Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Farmers by County</CardTitle>
            <CardDescription>
              Geographic distribution of enrolled farmers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={countyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="county" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Farming Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Farming Types</CardTitle>
            <CardDescription>Distribution by farming practices</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={farmingTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--secondary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Enrollments</CardTitle>
            <CardDescription>
              Latest farmers added to the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {farmers
                .sort(
                  (a, b) =>
                    new Date(b.dateEnrolled).getTime() -
                    new Date(a.dateEnrolled).getTime()
                )
                .slice(0, 5)
                .map((farmer) => (
                  <div
                    key={farmer.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{farmer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {farmer.county}
                      </p>
                    </div>
                    <div className="text-right">
                      {farmer.climateScore && farmer.scoreBand && (
                        <ScoreBadge
                          score={farmer.climateScore}
                          scoreBand={farmer.scoreBand}
                        />
                      )}
                      <p className="text-xs text-muted-foreground">
                        {new Date(farmer.dateEnrolled).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              {farmers.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No farmers enrolled yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
