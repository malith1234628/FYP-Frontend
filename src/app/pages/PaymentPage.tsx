import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { useNavigate } from "react-router-dom";
import { 
  GraduationCap, 
  ArrowLeft,
  CreditCard,
  Building2,
  Wallet,
  CheckCircle2,
  Info
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Alert, AlertDescription } from "@/app/components/ui/alert";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = () => {
    // Simulate payment processing
    setIsPaid(true);
  };

  if (isPaid) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="border-b bg-white">
          <div className="container mx-auto px-6 py-4 flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold">Visa Agency Marketplace</span>
          </div>
        </header>

        <div className="container mx-auto px-6 py-16 max-w-2xl">
          <Card className="border-0 shadow-lg bg-white text-center">
            <CardContent className="pt-12 pb-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Payment Successful! 🎉</h1>
              <p className="text-gray-600 mb-2">
                Your payment of <span className="font-bold text-gray-900">$450.00</span> has been received.
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Transaction ID: TXN-2026-001-VAM
              </p>
              
              <div className="space-y-3">
                <Button 
                  onClick={() => navigate("/dashboard")}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 font-semibold"
                >
                  Return to Dashboard
                </Button>
                <Button 
                  onClick={() => navigate("/chat")}
                  variant="outline"
                  className="w-full h-12"
                >
                  Chat With Agency
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4 flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <GraduationCap className="w-8 h-8 text-primary" />
          <span className="text-xl font-semibold">Visa Agency Marketplace</span>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">💳 Agency Payment</h1>
          <p className="text-gray-600">Complete your payment to proceed with visa processing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Method Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Select Payment Method</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">Credit / Debit Card</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Building2 className="w-5 h-5 text-green-600" />
                        <span className="font-medium">Bank Transfer</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="wallet" id="wallet" />
                      <Label htmlFor="wallet" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Wallet className="w-5 h-5 text-purple-600" />
                        <span className="font-medium">Digital Wallet</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Card Payment Form */}
                {paymentMethod === "card" && (
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input 
                        id="cardName" 
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input 
                          id="expiry" 
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv" 
                          placeholder="123"
                          maxLength={3}
                          type="password"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Bank Transfer Instructions */}
                {paymentMethod === "bank" && (
                  <Alert className="border-blue-200 bg-blue-50">
                    <Info className="h-5 w-5 text-blue-600" />
                    <AlertDescription className="text-sm text-blue-800 ml-2">
                      <p className="font-semibold mb-2">Bank Transfer Instructions:</p>
                      <p className="mb-1">Bank Name: International Bank Ltd.</p>
                      <p className="mb-1">Account Number: 1234567890</p>
                      <p className="mb-1">SWIFT Code: INTLUS33XXX</p>
                      <p className="mt-3 text-xs">Please include your Application ID (VAM-2024-001) in the reference.</p>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Digital Wallet Options */}
                {paymentMethod === "wallet" && (
                  <div className="space-y-3 pt-4">
                    <Button variant="outline" className="w-full h-12 justify-start">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 mr-3" />
                      Pay with PayPal
                    </Button>
                    <Button variant="outline" className="w-full h-12 justify-start">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Pay" className="h-6 mr-3" />
                      Pay with Apple Pay
                    </Button>
                    <Button variant="outline" className="w-full h-12 justify-start">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/7/72/Google_Pay_Logo.svg" alt="Google Pay" className="h-6 mr-3" />
                      Pay with Google Pay
                    </Button>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/dashboard")}
                    className="flex-1 h-12"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handlePayment}
                    className="flex-1 h-12 bg-green-600 hover:bg-green-700 font-semibold"
                  >
                    Pay Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="border-0 shadow-lg bg-white sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Agency</p>
                  <p className="font-bold text-gray-900">Global Visa Services Ltd.</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Application Fee</span>
                    <span className="font-medium text-gray-900">$350.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-medium text-gray-900">$80.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Processing Fee</span>
                    <span className="font-medium text-gray-900">$20.00</span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-900">Total Amount</span>
                      <span className="font-bold text-2xl text-gray-900">$450.00</span>
                    </div>
                  </div>
                </div>

                <Alert className="border-green-200 bg-green-50">
                  <Info className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-xs text-green-800 ml-2">
                    This payment is secure and encrypted. Your information is protected.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
