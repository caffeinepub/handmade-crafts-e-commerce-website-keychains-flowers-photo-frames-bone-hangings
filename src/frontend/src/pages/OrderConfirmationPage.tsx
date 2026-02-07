import { useParams, useNavigate } from '@tanstack/react-router';
import { CheckCircle2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useGetOrder } from '../hooks/useQueries';

export default function OrderConfirmationPage() {
  const { orderId } = useParams({ from: '/order/$orderId' });
  const navigate = useNavigate();
  const { data: order, isLoading } = useGetOrder(orderId);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <Card className="mx-auto max-w-2xl">
          <CardContent className="py-16 text-center">
            <div className="h-16 w-16 mx-auto mb-4 animate-pulse bg-muted rounded-full" />
            <p className="text-muted-foreground">Loading order details...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16">
      <Card className="mx-auto max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-3xl">Order Confirmed!</CardTitle>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been received.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Package className="h-4 w-4" />
              <span>Order ID:</span>
            </div>
            <p className="mt-1 font-mono text-lg font-semibold">{orderId}</p>
          </div>

          {order && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold">Shipping Information</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span>
                    <p className="font-medium">{order.buyerName}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Contact:</span>
                    <p className="font-medium">{order.contactInfo}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Address:</span>
                    <p className="font-medium">{order.shippingAddress}</p>
                  </div>
                  {order.notes && (
                    <div>
                      <span className="text-muted-foreground">Notes:</span>
                      <p className="font-medium">{order.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <Separator />

          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full"
              onClick={() => navigate({ to: '/catalog' })}
            >
              Continue Shopping
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => navigate({ to: '/' })}
            >
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
