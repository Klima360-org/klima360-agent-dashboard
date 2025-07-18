import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Calendar, Target, Search, Filter, UserPlus, BarChart3 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { ScoreBadge } from '@/components/farmer/ScoreBadge';
import { format } from 'date-fns';

export const FarmersList = () => {
  const { agent } = useAuth();
  const { getFarmersByAgent } = useData();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [scoreBandFilter, setScoreBandFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  if (!agent) return null;

  const allFarmers = getFarmersByAgent(agent.id);
  
  // Get unique locations for filter
  const uniqueLocations = [...new Set(allFarmers.map(f => f.county))].sort();
  
  // Apply filters
  const filteredFarmers = allFarmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         farmer.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         farmer.phone.includes(searchQuery);
    
    const matchesScoreBand = scoreBandFilter === 'all' || 
                            (scoreBandFilter === 'unscored' && !farmer.scoreBand) ||
                            farmer.scoreBand === scoreBandFilter;
    
    const matchesLocation = locationFilter === 'all' || farmer.county === locationFilter;
    
    return matchesSearch && matchesScoreBand && matchesLocation;
  });

  const scoredFarmers = allFarmers.filter(f => f.climateScore !== undefined).length;
  const unscoredFarmers = allFarmers.length - scoredFarmers;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            My Farmers
          </h1>
          <p className="text-muted-foreground">
            Manage and track your enrolled farmers
          </p>
        </div>
        <Link to="/farmer/register">
          <Button className="bg-gradient-primary border-0">
            <UserPlus className="h-4 w-4 mr-2" />
            Add New Farmer
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{allFarmers.length}</p>
              <p className="text-sm text-muted-foreground">Total Farmers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-score-strong">{scoredFarmers}</p>
              <p className="text-sm text-muted-foreground">Assessed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-score-moderate">{unscoredFarmers}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{scoredFarmers}</p>
              <p className="text-sm text-muted-foreground">Matched</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, village, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={scoreBandFilter} onValueChange={setScoreBandFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by score" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Scores</SelectItem>
                <SelectItem value="unscored">Unscored</SelectItem>
                <SelectItem value="critical">Critical Risk</SelectItem>
                <SelectItem value="moderate">Moderate Risk</SelectItem>
                <SelectItem value="strong">Strong Resilience</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {uniqueLocations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Farmers List */}
      {filteredFarmers.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground mb-4">
              {allFarmers.length === 0 
                ? "No farmers registered yet. Start by adding your first farmer!"
                : "No farmers match your current filters."
              }
            </p>
            {allFarmers.length === 0 && (
              <Link to="/farmer/register">
                <Button className="bg-gradient-primary border-0">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register First Farmer
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredFarmers.map((farmer) => (
            <Card key={farmer.id} className="hover:shadow-medium transition-all">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Farmer Info */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <h3 className="text-lg font-semibold text-foreground">{farmer.name}</h3>
                      {farmer.climateScore !== undefined && farmer.scoreBand ? (
                        <ScoreBadge 
                          score={farmer.climateScore} 
                          scoreBand={farmer.scoreBand} 
                          size="sm"
                        />
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Pending Assessment
                        </Badge>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {farmer.village}, {farmer.county}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {farmer.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(farmer.dateEnrolled), 'MMM dd, yyyy')}
                      </div>
                    </div>

                    <div className="mt-2 text-sm">
                      <p><span className="font-medium">Farm:</span> {farmer.farmSize} acres, {farmer.farmingType}</p>
                      {farmer.mainCrops && (
                        <p><span className="font-medium">Crops:</span> {farmer.mainCrops}</p>
                      )}
                    </div>

                    {farmer.matchedProduct && (
                      <div className="mt-3 p-3 bg-accent/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Target className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">Matched Product</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{farmer.matchedProduct.title}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 min-w-32">
                    {farmer.climateScore === undefined ? (
                      <Link to={`/farmer/${farmer.id}/score`}>
                        <Button size="sm" className="w-full bg-gradient-primary border-0">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Start Assessment
                        </Button>
                      </Link>
                    ) : (
                      <Link to={`/farmer/${farmer.id}/score`}>
                        <Button size="sm" variant="outline" className="w-full">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View Assessment
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};