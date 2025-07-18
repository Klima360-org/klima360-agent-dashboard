import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Agent } from '@/types';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      return;
    }

    const agent: Agent = {
      id: `agent_${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      dateJoined: new Date().toISOString(),
      farmersEnrolled: 0,
      farmersScored: 0,
      productsMatched: 0,
      lastActive: new Date().toISOString()
    };

    login(agent);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-earth flex flex-col">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Klima360</span>
          </Link>
          
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-medium">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Agent Login</CardTitle>
            <CardDescription className="text-center">
              Enter your details to access the Klima360 platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-primary border-0">
                Login to Dashboard
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Need help? Contact your system administrator</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};