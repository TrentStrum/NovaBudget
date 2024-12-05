import { http, HttpResponse } from 'msw';
import { mockUsers, mockSubscriptions } from './data';

export const handlers = [
  // Auth handlers
  http.post('/auth/login', async ({ request }) => {
    const { email, password } = await request.json();
    const user = mockUsers.find(u => u.email === email);

    if (!user || password !== 'correct-password') {
      return HttpResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return HttpResponse.json({ user, session: { token: 'mock-token' } });
  }),

  // Subscription handlers
  http.get('/api/subscriptions/current', ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = authHeader.split(' ')[1];
    const subscription = mockSubscriptions.find(s => s.user_id === userId);

    if (!subscription) {
      return HttpResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(subscription);
  }),

  http.post('/api/subscriptions/upgrade', async ({ request }) => {
    const { tier } = await request.json();
    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      success: true,
      tier,
      status: 'active',
    });
  }),
];