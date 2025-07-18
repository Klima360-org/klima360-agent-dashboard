import { ArrowRight, Shield, Target, Users, Leaf, BarChart3, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import heroImage from '@/assets/hero-agriculture.jpg';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-earth">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Building Resilience for
            <span className="text-primary block">African Farmers</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Empowering agricultural communities through climate resilience scoring and personalized product matching for sustainable farming futures.
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-gradient-primary border-0 text-lg px-8 py-4">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What We Do
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Klima360 provides comprehensive climate resilience assessment and connects farmers with tailored financial products.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 border-2 hover:shadow-medium transition-all">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Climate Resilience Scoring</h3>
              <p className="text-muted-foreground">
                Comprehensive 23-question assessment across exposure, sensitivity, adaptive capacity, mitigation practices, and financial resilience.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 border-2 hover:shadow-medium transition-all">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Product Matching</h3>
              <p className="text-muted-foreground">
                Automatic matching with suitable financial products based on climate resilience score - from education to credit facilities.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Who It's For
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Designed for organizations committed to supporting agricultural resilience across Africa.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Financial Institutions</h3>
              <p className="text-muted-foreground">
                Banks and microfinance institutions looking to assess and support agricultural customers with climate-smart products.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Field Agents</h3>
              <p className="text-muted-foreground">
                Agricultural extension workers and field officers conducting farmer assessments and providing targeted support.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Cooperatives</h3>
              <p className="text-muted-foreground">
                Agricultural cooperatives supporting members with climate resilience planning and access to financial services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Join Our Pilot Program
            </h2>
            <p className="text-lg text-muted-foreground">
              Ready to transform agricultural resilience? Get in touch to learn how Klima360 can support your organization.
            </p>
          </div>

          <Card className="p-8 border-2">
            <CardContent className="p-0">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Organization Name" />
                  <Input placeholder="Contact Person" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Email Address" type="email" />
                  <Input placeholder="Phone Number" type="tel" />
                </div>
                <Textarea 
                  placeholder="Tell us about your organization and how you'd like to use Klima360..."
                  rows={4}
                />
                <Button className="w-full bg-gradient-primary border-0">
                  Request Pilot Access
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
          <img src="/apple-touch-icon.png" alt="Klima360" className="h-8 w-8" />
            <span className="text-xl font-bold">Klima360</span>
          </div>
          <p className="text-background/70 mb-4">
            Building resilient agricultural communities across Africa
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};