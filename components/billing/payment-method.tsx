'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

interface PaymentMethodProps {
  paymentMethods: PaymentMethod[];
  onAddNew: () => void;
  onSetDefault: (id: string) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
}

export function PaymentMethod({
  paymentMethods,
  onAddNew,
  onSetDefault,
  onRemove,
}: PaymentMethodProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSetDefault = async (id: string) => {
    setLoading(`default_${id}`);
    try {
      await onSetDefault(id);
      toast({
        title: 'Default payment method updated',
        description: 'Your default payment method has been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update default payment method.',
        variant: 'destructive',
      });
    } finally {
      setLoading(null);
    }
  };

  const handleRemove = async (id: string) => {
    setLoading(`remove_${id}`);
    try {
      await onRemove(id);
      toast({
        title: 'Payment method removed',
        description: 'Your payment method has been removed successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove payment method.',
        variant: 'destructive',
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      {paymentMethods.map((method) => (
        <Card key={method.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <CreditCard className="h-6 w-6" />
              <div>
                <p className="font-medium">
                  {method.brand} •••• {method.last4}
                </p>
                <p className="text-sm text-muted-foreground">
                  Expires {method.expMonth}/{method.expYear}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!method.isDefault && (
                <Button
                  variant="outline"
                  size="sm"
                  disabled={loading === `default_${method.id}`}
                  onClick={() => handleSetDefault(method.id)}
                >
                  Make Default
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                disabled={loading === `remove_${method.id}` || method.isDefault}
                onClick={() => handleRemove(method.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        </Card>
      ))}

      <Button
        variant="outline"
        className="w-full"
        onClick={onAddNew}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Payment Method
      </Button>
    </div>
  );
}