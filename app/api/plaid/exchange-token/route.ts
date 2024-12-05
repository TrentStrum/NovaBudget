import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid/client';

export async function POST(request: Request) {
  try {
    const { public_token } = await request.json();
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const response = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    const { access_token, item_id } = response.data;
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: item_id,
      country_codes: ['US'],
    });

    await supabase.from('plaid_items').insert({
      user_id: session.user.id,
      access_token,
      item_id,
      institution_id: item_id,
      institution_name: institutionResponse.data.institution.name,
      status: 'active',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error exchanging token:', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}