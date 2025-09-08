// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';
// import { MapPin, Save } from 'lucide-react';
// import { useAuth } from '@/contexts/AuthContext';
// import { useData } from '@/contexts/DataContext';
// import { Farmer } from '@/types';
// import { toast } from '@/hooks/use-toast';

// export const FarmerRegister = () => {
//   const navigate = useNavigate();
//   const { agent } = useAuth();
//   const { addFarmer } = useData();
  
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     county: '',
//     subCounty: '',
//     village: '',
//     gpsCoordinates: '',
//     farmSize: '',
//     farmingType: '',
//     mainCrops: ''
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!agent) return;

//     if (!formData.name || !formData.phone || !formData.county || !formData.village || !formData.farmSize || !formData.farmingType) {
//       toast({
//         title: "Missing Information",
//         description: "Please fill in all required fields",
//         variant: "destructive"
//       });
//       return;
//     }

//     const farmer: Farmer = {
//       id: `farmer_${Date.now()}`,
//       name: formData.name,
//       phone: formData.phone,
//       county: formData.county,
//       subCounty: formData.subCounty,
//       village: formData.village,
//       gpsCoordinates: formData.gpsCoordinates,
//       farmSize: parseFloat(formData.farmSize),
//       farmingType: formData.farmingType as 'crop' | 'livestock' | 'mixed',
//       mainCrops: formData.mainCrops,
//       dateEnrolled: new Date().toISOString(),
//       agentId: agent.id,
//       agentName: agent.name
//     };

//     addFarmer(farmer);
    
//     toast({
//       title: "Farmer Registered",
//       description: `${farmer.name} has been successfully registered`,
//     });

//     // Redirect to scoring
//     navigate(`/farmer/${farmer.id}/score`);
//   };

//   return (
//     <div className="max-w-2xl mx-auto space-y-6">
//       <div>
//         <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
//           Register New Farmer
//         </h1>
//         <p className="text-muted-foreground">
//           Enter farmer details to begin their climate resilience assessment
//         </p>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Farmer Information</CardTitle>
//           <CardDescription>
//             Basic details and farm characteristics
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Personal Information */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold">Personal Information</h3>
              
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Full Name *</Label>
//                   <Input
//                     id="name"
//                     placeholder="Enter farmer's full name"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     required
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="phone">Phone Number *</Label>
//                   <Input
//                     id="phone"
//                     type="tel"
//                     placeholder="+254 XXX XXX XXX"
//                     value={formData.phone}
//                     onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Location */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold flex items-center gap-2">
//                 <MapPin className="h-5 w-5" />
//                 Location
//               </h3>
              
//               <div className="grid md:grid-cols-3 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="county">County *</Label>
//                   <Input
//                     id="county"
//                     placeholder="e.g. Kiambu"
//                     value={formData.county}
//                     onChange={(e) => setFormData({ ...formData, county: e.target.value })}
//                     required
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="subCounty">Sub-County</Label>
//                   <Input
//                     id="subCounty"
//                     placeholder="e.g. Ruiru"
//                     value={formData.subCounty}
//                     onChange={(e) => setFormData({ ...formData, subCounty: e.target.value })}
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="village">Village *</Label>
//                   <Input
//                     id="village"
//                     placeholder="e.g. Kahawa"
//                     value={formData.village}
//                     onChange={(e) => setFormData({ ...formData, village: e.target.value })}
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="gps">GPS Coordinates (Optional)</Label>
//                 <Input
//                   id="gps"
//                   placeholder="e.g. -1.2345, 36.6789"
//                   value={formData.gpsCoordinates}
//                   onChange={(e) => setFormData({ ...formData, gpsCoordinates: e.target.value })}
//                 />
//               </div>
//             </div>

//             {/* Farm Information */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold">Farm Information</h3>
              
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="farmSize">Farm Size (Acres) *</Label>
//                   <Input
//                     id="farmSize"
//                     type="number"
//                     step="0.1"
//                     placeholder="e.g. 2.5"
//                     value={formData.farmSize}
//                     onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
//                     required
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="farmingType">Type of Farming *</Label>
//                   <Select value={formData.farmingType} onValueChange={(value) => setFormData({ ...formData, farmingType: value })}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select farming type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="crop">Crop Farming</SelectItem>
//                       <SelectItem value="livestock">Livestock</SelectItem>
//                       <SelectItem value="mixed">Mixed Farming</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="mainCrops">Main Crops/Products</Label>
//                 <Textarea
//                   id="mainCrops"
//                   placeholder="e.g. Maize, beans, potatoes, dairy cattle..."
//                   value={formData.mainCrops}
//                   onChange={(e) => setFormData({ ...formData, mainCrops: e.target.value })}
//                   rows={3}
//                 />
//               </div>
//             </div>

//             <Button type="submit" className="w-full bg-gradient-primary border-0">
//               <Save className="h-4 w-4 mr-2" />
//               Register Farmer & Start Assessment
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useData } from "@/contexts/DataContext";

interface Farmer {
  id: string;
  name: string;
  phone: string;
  county: string;
  subCounty?: string;
  village: string;
  gpsCoordinates?: string;
  farmSize: number;
  farmingType: "crop" | "livestock" | "mixed";
  mainCrops?: string;
  dateEnrolled: string;
  agentId: string;
  agentName: string;
}

export const FarmerRegister = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { addFarmer } = useData();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    county: "",
    subCounty: "",
    village: "",
    gpsCoordinates: "",
    farmSize: "",
    farmingType: "",
    mainCrops: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    if (
      !formData.name ||
      !formData.phone ||
      !formData.county ||
      !formData.village ||
      !formData.farmSize ||
      !formData.farmingType
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const farmer: Farmer = {
      id: `farmer_${Date.now()}`,
      name: formData.name,
      phone: formData.phone,
      county: formData.county,
      subCounty: formData.subCounty,
      village: formData.village,
      gpsCoordinates: formData.gpsCoordinates,
      farmSize: parseFloat(formData.farmSize),
      farmingType: formData.farmingType as "crop" | "livestock" | "mixed",
      mainCrops: formData.mainCrops,
      dateEnrolled: new Date().toISOString(),
      agentId: user.id,
      agentName: user.fullName || user.username || user.primaryEmailAddress?.emailAddress || "Agent",
    };

    // 🔹 Save locally for now (later: send to backend)
    // const farmers = JSON.parse(localStorage.getItem("farmers") || "[]");
    // farmers.push(farmer);
    // localStorage.setItem("farmers", JSON.stringify(farmers));
    addFarmer(farmer);

    toast({
      title: "Farmer Registered",
      description: `${farmer.name} has been successfully registered`,
    });

    // Redirect to scoring page
    navigate(`/farmer/${farmer.id}/score`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Register New Farmer
        </h1>
        <p className="text-muted-foreground">
          Enter farmer details to begin their climate resilience assessment
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Farmer Information</CardTitle>
          <CardDescription>
            Basic details and farm characteristics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="county">County *</Label>
                  <Input
                    id="county"
                    value={formData.county}
                    onChange={(e) =>
                      setFormData({ ...formData, county: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subCounty">Sub-County</Label>
                  <Input
                    id="subCounty"
                    value={formData.subCounty}
                    onChange={(e) =>
                      setFormData({ ...formData, subCounty: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="village">Village *</Label>
                  <Input
                    id="village"
                    value={formData.village}
                    onChange={(e) =>
                      setFormData({ ...formData, village: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gps">GPS Coordinates</Label>
                <Input
                  id="gps"
                  value={formData.gpsCoordinates}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gpsCoordinates: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Farm Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Farm Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmSize">Farm Size (Acres) *</Label>
                  <Input
                    id="farmSize"
                    type="number"
                    value={formData.farmSize}
                    onChange={(e) =>
                      setFormData({ ...formData, farmSize: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmingType">Type of Farming *</Label>
                  <Select
                    value={formData.farmingType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, farmingType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select farming type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="crop">Crop</SelectItem>
                      <SelectItem value="livestock">Livestock</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mainCrops">Main Crops/Products</Label>
                <Textarea
                  id="mainCrops"
                  value={formData.mainCrops}
                  onChange={(e) =>
                    setFormData({ ...formData, mainCrops: e.target.value })
                  }
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-gradient-primary">
              <Save className="h-4 w-4 mr-2" />
              Register Farmer & Start Assessment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
