import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useCart } from '../cart/CartProvider';
import { usePlaceOrder } from '../hooks/useQueries';
import type { Order } from '../backend';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart, getCartSnapshot } = useCart();
  const placeOrderMutation = usePlaceOrder();

  const [formData, setFormData] = useState({
    buyerName: '',
    contactInfo: '',
    shippingAddress: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.buyerName.trim()) newErrors.buyerName = 'Name is required';
    if (!formData.contactInfo.trim()) newErrors.contactInfo = 'Contact info is required';
    if (!formData.shippingAddress.trim()) newErrors.shippingAddress = 'Shipping address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const cartSnapshot = getCartSnapshot();
    if (cartSnapshot.length === 0) {
      navigate({ to: '/cart' });
      return;
    }

    try {
      for (const item of cartSnapshot) {
        const orderId = `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const order: Order = {
          id: orderId,
          buyerName: formData.buyerName,
          contactInfo: formData.contactInfo,
          shippingAddress: formData.shippingAddress,
          notes: formData.notes || undefined,
          productId: item.productId,
          quantity: BigInt(item.quantity),
        };
        await placeOrderMutation.mutateAsync(order);
      }

      const firstOrderId = `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      clearCart();
      navigate({ to: '/order/$orderId', params: { orderId: firstOrderId } });
    } catch (error) {
      console.error('Error placing order:', error);
      setErrors({ submit: 'Failed to place order. Please try again.' });
    }
  };

  const subtotalInDollars = Number(subtotal) / 100;

  if (items.length === 0) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Your cart is empty</h1>
        <Button onClick={() => navigate({ to: '/catalog' })}>
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate({ to: '/cart' })}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Cart
      </Button>

      <h1 className="mb-8 text-4xl font-bold">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="buyerName">Full Name *</Label>
                  <Input
                    id="buyerName"
                    name="buyerName"
                    value={formData.buyerName}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                  {errors.buyerName && (
                    <p className="text-sm text-destructive">{errors.buyerName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactInfo">Email or Phone *</Label>
                  <Input
                    id="contactInfo"
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleChange}
                    placeholder="john@example.com or +1234567890"
                  />
                  {errors.contactInfo && (
                    <p className="text-sm text-destructive">{errors.contactInfo}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shippingAddress">Shipping Address *</Label>
                  <Textarea
                    id="shippingAddress"
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleChange}
                    placeholder="123 Main St, City, State, ZIP"
                    rows={3}
                  />
                  {errors.shippingAddress && (
                    <p className="text-sm text-destructive">{errors.shippingAddress}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Order Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any special instructions or requests"
                    rows={3}
                  />
                </div>

                {errors.submit && (
                  <p className="text-sm text-destructive">{errors.submit}</p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={placeOrderMutation.isPending}
                >
                  {placeOrderMutation.isPending ? 'Placing Order...' : 'Place Order'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {items.map(item => {
                  const priceInDollars = Number(item.price) / 100;
                  const totalInDollars = priceInDollars * item.quantity;
                  return (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} × {item.quantity}
                      </span>
                      <span>${totalInDollars.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${subtotalInDollars.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
