import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid/client';

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get all Plaid items for the user
    const { data: plaidItems } = await supabase
      .from('plaid_items')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('status', 'active');

    if (!plaidItems?.length) {
      return new NextResponse('No connected accounts', { status: 400 });
    }

    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

    for (const item of plaidItems) {
      // Get transactions from Plaid
      const response = await plaidClient.transactionsGet({
        access_token: item.access_token,
        start_date: thirtyDaysAgo.toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0],
      });

      const transactions = response.data.transactions;

      // Get accounts for this item
      const accounts = response.data.accounts;
      
      // Update account balances
      for (const account of accounts) {
        await supabase
          .from('accounts')
          .update({
            balance: account.balances.current,
            last_synced: new Date().toISOString(),
          })
          .eq('plaid_account_id', account.account_id);
      }

      // Insert new transactions
      const formattedTransactions = transactions.map((transaction) => ({
        account_id: transaction.account_id,
        amount: transaction.amount,
        category: transaction.category?.[0] || 'uncategorized',
        description: transaction.name,
        date: transaction.date,
        type: transaction.amount > 0 ? 'income' : 'expense',
        plaid_transaction_id: transaction.transaction_id,
        merchant_name: transaction.merchant_name,
        pending: transaction.pending,
        location: transaction.location,
      }));

      if (formattedTransactions.length > 0) {
        await supabase
          .from('transactions')
          .upsert(formattedTransactions, {
            onConflict: 'plaid_transaction_id',
          });
      }

      // Update last synced timestamp
      await supabase
        .from('plaid_items')
        .update({ last_synced: new Date().toISOString() })
        .eq('id', item.id);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error syncing transactions:', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}