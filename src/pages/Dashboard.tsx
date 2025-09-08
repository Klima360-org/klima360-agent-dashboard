import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserPlus,
  TrendingUp,
  Target,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useData } from "@/contexts/DataContext";
import { ScoreBadge } from "@/components/farmer/ScoreBadge";

export const Dashboard = () => {
  const { user, isLoaded } = useUser();
  const { getFarmersByAgent } = useData();

  // Wait for Clerk to load
  if (!isLoaded) return null;
  if (!user) return <p>Please sign in to view your dashboard.</p>;

  // Fetch farmers by Clerk userId
  const myFarmers = getFarmersByAgent(user.id);

  const scoredFarmers = myFarmers.filter((f) => f.climateScore !== undefined);
  const criticalFarmers = scoredFarmers.filter(
    (f) => f.scoreBand === "critical"
  ).length;
  const moderateFarmers = scoredFarmers.filter(
    (f) => f.scoreBand === "moderate"
  ).length;
  const strongFarmers = scoredFarmers.filter(
    (f) => f.scoreBand === "strong"
  ).length;

  return (
    <div className="space-y-6 font-sans">
      {/* Welcome Header */}
      <div className="bg-gradient-primary rounded-lg p-6 text-primary-foreground">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Welcome back, {user.firstName}!
        </h1>
        <p className="text-primary-foreground/90">
          Track your farmer enrollments and climate resilience assessments
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Users className="h-5 w-5 text-primary" />}
          bg="bg-primary/10"
          label="Farmers"
          value={myFarmers.length}
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5 text-score-strong" />}
          bg="bg-score-strong/10"
          label="Scored"
          value={scoredFarmers.length}
        />
        <StatCard
          icon={<Target className="h-5 w-5 text-primary" />}
          bg="bg-primary/10"
          label="Matched"
          value={scoredFarmers.length}
        />
        <StatCard
          icon={<UserPlus className="h-5 w-5 text-score-moderate" />}
          bg="bg-score-moderate/10"
          label="Pending"
          value={myFarmers.length - scoredFarmers.length}
        />
      </div>

      {/* Score Distribution */}
      {scoredFarmers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Climate Resilience Distribution</CardTitle>
            <CardDescription>
              Score breakdown for your {scoredFarmers.length} assessed farmers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <DistBox
                count={criticalFarmers}
                label="Critical Risk"
                color="score-critical"
              />
              <DistBox
                count={moderateFarmers}
                label="Moderate Risk"
                color="score-moderate"
              />
              <DistBox
                count={strongFarmers}
                label="Strong Resilience"
                color="score-strong"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <QuickAction
          title="Add New Farmer"
          description="Register a new farmer and begin their climate assessment"
          to="/farmer/register"
          icon={<UserPlus className="h-4 w-4 mr-2" />}
          buttonLabel="Register Farmer"
        />
        <QuickAction
          title="View All Farmers"
          description="Manage and track all farmers you've enrolled"
          to="/farmers"
          icon={<Users className="h-4 w-4 mr-2" />}
          buttonLabel="View My Farmers"
          outline
        />
      </div>

      {/* Recent Farmers */}
      {myFarmers.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Farmers</CardTitle>
                <CardDescription>
                  Your latest farmer registrations
                </CardDescription>
              </div>
              <Link to="/farmers">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myFarmers.slice(0, 5).map((farmer) => (
                <div
                  key={farmer.id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{farmer.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {farmer.village}, {farmer.county}
                    </p>
                  </div>
                  <div className="text-right">
                    {farmer.climateScore !== undefined && farmer.scoreBand ? (
                      <ScoreBadge
                        score={farmer.climateScore}
                        scoreBand={farmer.scoreBand}
                        size="sm"
                      />
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Pending Assessment
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

/* --- Helper Components --- */
const StatCard = ({
  icon,
  bg,
  label,
  value,
}: {
  icon: React.ReactNode;
  bg: string;
  label: string;
  value: number;
}) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const DistBox = ({
  count,
  label,
  color,
}: {
  count: number;
  label: string;
  color: string;
}) => (
  <div
    className={`text-center p-4 bg-${color}/5 rounded-lg border border-${color}/20`}
  >
    <p className={`text-2xl font-bold text-${color}`}>{count}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);

const QuickAction = ({
  title,
  description,
  to,
  icon,
  buttonLabel,
  outline,
}: {
  title: string;
  description: string;
  to: string;
  icon: React.ReactNode;
  buttonLabel: string;
  outline?: boolean;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <Link to={to}>
        <Button
          variant={outline ? "outline" : "default"}
          className="w-full flex items-center justify-center"
        >
          {icon}
          {buttonLabel}
        </Button>
      </Link>
    </CardContent>
  </Card>
);
