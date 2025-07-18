import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, TrendingUp, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { ScoreBadge } from '@/components/farmer/ScoreBadge';

export const Dashboard = () => {
  const { agent } = useAuth();
  const { getFarmersByAgent } = useData();
  
  if (!agent) return null;

  const myFarmers = getFarmersByAgent(agent.id);
  const scoredFarmers = myFarmers.filter(f => f.climateScore !== undefined);
  const criticalFarmers = scoredFarmers.filter(f => f.scoreBand === 'critical').length;
  const moderateFarmers = scoredFarmers.filter(f => f.scoreBand === 'moderate').length;
  const strongFarmers = scoredFarmers.filter(f => f.scoreBand === 'strong').length;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-primary rounded-lg p-6 text-primary-foreground">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Welcome back, {agent.name}!
        </h1>
        <p className="text-primary-foreground/90">
          Track your farmer enrollments and climate resilience assessments
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{myFarmers.length}</p>
                <p className="text-sm text-muted-foreground">Farmers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-score-strong/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-score-strong" />
              </div>
              <div>
                <p className="text-2xl font-bold">{scoredFarmers.length}</p>
                <p className="text-sm text-muted-foreground">Scored</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{scoredFarmers.length}</p>
                <p className="text-sm text-muted-foreground">Matched</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-score-moderate/10 rounded-lg flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-score-moderate" />
              </div>
              <div>
                <p className="text-2xl font-bold">{myFarmers.length - scoredFarmers.length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
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
              <div className="text-center p-4 bg-score-critical/5 rounded-lg border border-score-critical/20">
                <p className="text-2xl font-bold text-score-critical">{criticalFarmers}</p>
                <p className="text-sm text-muted-foreground">Critical Risk</p>
              </div>
              <div className="text-center p-4 bg-score-moderate/5 rounded-lg border border-score-moderate/20">
                <p className="text-2xl font-bold text-score-moderate">{moderateFarmers}</p>
                <p className="text-sm text-muted-foreground">Moderate Risk</p>
              </div>
              <div className="text-center p-4 bg-score-strong/5 rounded-lg border border-score-strong/20">
                <p className="text-2xl font-bold text-score-strong">{strongFarmers}</p>
                <p className="text-sm text-muted-foreground">Strong Resilience</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New Farmer</CardTitle>
            <CardDescription>
              Register a new farmer and begin their climate assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/farmer/register">
              <Button className="w-full">
                <UserPlus className="h-4 w-4 mr-2" />
                Register Farmer
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>View All Farmers</CardTitle>
            <CardDescription>
              Manage and track all farmers you've enrolled
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/farmers">
              <Button variant="outline" className="w-full">
                <Users className="h-4 w-4 mr-2" />
                View My Farmers
              </Button>
            </Link>
          </CardContent>
        </Card>
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
                <div key={farmer.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
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
                      <span className="text-sm text-muted-foreground">Pending Assessment</span>
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