import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle, Calculator } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { ClimateScoreAnswers } from '@/types';
import { calculateClimateScore } from '@/utils/scoring';
import { getProductByScoreBand } from '@/data/products';
import { ScoreBadge } from '@/components/farmer/ScoreBadge';
import { toast } from '@/hooks/use-toast';

const scoreQuestions = [
  // Exposure (4 questions)
  {
    category: 'Exposure',
    questions: [
      { key: 'droughtFrequency', text: 'Has the farm experienced drought in the past 3 years?' },
      { key: 'floodingRisk', text: 'Is the farm located in a flood-prone area?' },
      { key: 'temperatureExtremes', text: 'Have you noticed more extreme temperatures recently?' },
      { key: 'rainfallVariability', text: 'Has rainfall become more unpredictable in your area?' }
    ]
  },
  // Sensitivity (4 questions)
  {
    category: 'Sensitivity',
    questions: [
      { key: 'soilDegradation', text: 'Is soil erosion or degradation a problem on your farm?' },
      { key: 'waterScarcity', text: 'Do you face water shortage during dry seasons?' },
      { key: 'pestDisease', text: 'Have pest and disease problems increased recently?' },
      { key: 'cropDiversity', text: 'Do you grow multiple types of crops?' }
    ]
  },
  // Adaptive Capacity (5 questions)
  {
    category: 'Adaptive Capacity',
    questions: [
      { key: 'weatherInfo', text: 'Do you have access to weather forecasts and advisories?' },
      { key: 'alternativeIncome', text: 'Do you have income sources other than farming?' },
      { key: 'marketAccess', text: 'Do you have good access to markets for your products?' },
      { key: 'trainingAccess', text: 'Have you received agricultural training in the past 2 years?' },
      { key: 'communitySupport', text: 'Is there strong community support for farming in your area?' }
    ]
  },
  // Mitigation Practices (5 questions)
  {
    category: 'Mitigation Practices',
    questions: [
      { key: 'soilConservation', text: 'Do you practice soil conservation techniques?' },
      { key: 'waterHarvesting', text: 'Do you harvest and store rainwater?' },
      { key: 'agroforestry', text: 'Do you plant trees on or around your farm?' },
      { key: 'organicPractices', text: 'Do you use organic farming methods?' },
      { key: 'climateSmartSeeds', text: 'Do you use drought-resistant or improved seeds?' }
    ]
  },
  // Financial Resilience (5 questions)
  {
    category: 'Financial Resilience',
    questions: [
      { key: 'savingsAccess', text: 'Do you have access to savings services?' },
      { key: 'creditAccess', text: 'Can you access credit when needed?' },
      { key: 'insuranceAccess', text: 'Do you have crop or livestock insurance?' },
      { key: 'cooperativeMember', text: 'Are you a member of a farmers cooperative?' },
      { key: 'recordKeeping', text: 'Do you keep records of your farm income and expenses?' }
    ]
  }
];

export const ClimateScoring = () => {
  const { farmerId } = useParams();
  const navigate = useNavigate();
  const { farmers, updateFarmer } = useData();
  
  const [currentCategoryIndex, setCategoryIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<ClimateScoreAnswers>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [scoreResult, setScoreResult] = useState<any>(null);

  const farmer = farmers.find(f => f.id === farmerId);
  const currentCategory = scoreQuestions[currentCategoryIndex];
  const totalQuestions = scoreQuestions.reduce((sum, cat) => sum + cat.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  useEffect(() => {
    if (!farmer) {
      navigate('/dashboard');
    }
  }, [farmer, navigate]);

  const handleAnswer = (questionKey: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionKey]: value === 'yes'
    }));
  };

  const canProceedToNext = () => {
    return currentCategory.questions.every(q => answers.hasOwnProperty(q.key));
  };

  const handleNext = () => {
    if (currentCategoryIndex < scoreQuestions.length - 1) {
      setCategoryIndex(currentCategoryIndex + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentCategoryIndex > 0) {
      setCategoryIndex(currentCategoryIndex - 1);
    }
  };

  const handleComplete = () => {
    if (Object.keys(answers).length === totalQuestions && farmer) {
      const result = calculateClimateScore(answers as ClimateScoreAnswers);
      const matchedProduct = getProductByScoreBand(result.scoreBand);
      
      setScoreResult(result);
      setIsComplete(true);

      // Update farmer with score and matched product
      updateFarmer(farmer.id, {
        climateScore: result.totalScore,
        scoreBand: result.scoreBand,
        matchedProduct
      });

      toast({
        title: "Assessment Complete",
        description: `Climate resilience score calculated: ${result.totalScore}/100`,
      });
    }
  };

  const handleFinish = () => {
    navigate('/farmers');
  };

  if (!farmer) {
    return null;
  }

  if (isComplete && scoreResult) {
    const matchedProduct = getProductByScoreBand(scoreResult.scoreBand);
    
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="border-2 border-primary">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">Assessment Complete!</CardTitle>
            <CardDescription>
              Climate resilience score for {farmer.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Score */}
            <div className="text-center">
              <ScoreBadge 
                score={scoreResult.totalScore} 
                scoreBand={scoreResult.scoreBand} 
                size="lg" 
              />
            </div>

            {/* Category Breakdown */}
            <div className="space-y-4">
              <h3 className="font-semibold text-center">Category Breakdown</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Exposure</p>
                  <p className="text-lg font-semibold">{scoreResult.categoryScores.exposure}%</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Sensitivity</p>
                  <p className="text-lg font-semibold">{scoreResult.categoryScores.sensitivity}%</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Adaptive Capacity</p>
                  <p className="text-lg font-semibold">{scoreResult.categoryScores.adaptiveCapacity}%</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Mitigation</p>
                  <p className="text-lg font-semibold">{scoreResult.categoryScores.mitigationPractices}%</p>
                </div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg mx-auto max-w-48">
                <p className="text-sm text-muted-foreground">Financial Resilience</p>
                <p className="text-lg font-semibold">{scoreResult.categoryScores.financialResilience}%</p>
              </div>
            </div>

            {/* Matched Product */}
            <Card className="bg-gradient-earth border-2">
              <CardHeader>
                <CardTitle className="text-lg">Recommended Product</CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-primary mb-2">{matchedProduct.title}</h4>
                <p className="text-sm text-muted-foreground">{matchedProduct.description}</p>
              </CardContent>
            </Card>

            <Button onClick={handleFinish} className="w-full bg-gradient-primary border-0">
              Complete & Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Climate Resilience Assessment
        </h1>
        <p className="text-muted-foreground">
          Farmer: <span className="font-medium text-foreground">{farmer.name}</span>
        </p>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">
              {answeredQuestions} of {totalQuestions} questions
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Current Category */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            {currentCategory.category}
          </CardTitle>
          <CardDescription>
            Category {currentCategoryIndex + 1} of {scoreQuestions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentCategory.questions.map((question, index) => (
            <div key={question.key} className="space-y-3">
              <Label className="text-base font-medium leading-relaxed">
                {index + 1}. {question.text}
              </Label>
              <RadioGroup
                value={answers[question.key] === true ? 'yes' : answers[question.key] === false ? 'no' : ''}
                onValueChange={(value) => handleAnswer(question.key, value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id={`${question.key}-yes`} />
                  <Label htmlFor={`${question.key}-yes`}>Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id={`${question.key}-no`} />
                  <Label htmlFor={`${question.key}-no`}>No</Label>
                </div>
              </RadioGroup>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentCategoryIndex === 0}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canProceedToNext()}
          className="bg-gradient-primary border-0"
        >
          {currentCategoryIndex === scoreQuestions.length - 1 ? 'Complete Assessment' : 'Next Category'}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};