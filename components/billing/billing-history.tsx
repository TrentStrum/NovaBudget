'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  downloadUrl?: string;
}

interface BillingHistoryProps {
  invoices: Invoice[];
}

export function BillingHistory({ invoices }: BillingHistoryProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleDownload = async (invoiceId: string, downloadUrl?: string) => {
    if (!downloadUrl) return;
    
    setLoading(invoiceId);
    try {
      window.open(downloadUrl, '_blank');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Invoice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
              <TableCell>${invoice.amount.toFixed(2)}</TableCell>
              <TableCell>
                <span className={cn(
                  'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                  {
                    'bg-green-50 text-green-700': invoice.status === 'paid',
                    'bg-yellow-50 text-yellow-700': invoice.status === 'pending',
                    'bg-red-50 text-red-700': invoice.status === 'failed',
                  }
                )}>
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={!invoice.downloadUrl || loading === invoice.id}
                  onClick={() => handleDownload(invoice.id, invoice.downloadUrl)}
                >
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download invoice</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}