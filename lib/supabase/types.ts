export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          stripe_customer_id?: string
          subscription_status?: string
          subscription_tier?: string
          subscription_end_date?: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          stripe_customer_id?: string
          subscription_status?: string
          subscription_tier?: string
          subscription_end_date?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          stripe_customer_id?: string
          subscription_status?: string
          subscription_tier?: string
          subscription_end_date?: string
        }
      }
      accounts: {
        Row: {
          id: string
          user_id: string
          name: string
          type: string
          balance: number
          created_at: string
          plaid_account_id?: string
          plaid_item_id?: string
          institution_name?: string
          last_synced?: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          type: string
          balance: number
          created_at?: string
          plaid_account_id?: string
          plaid_item_id?: string
          institution_name?: string
          last_synced?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          type?: string
          balance?: number
          created_at?: string
          plaid_account_id?: string
          plaid_item_id?: string
          institution_name?: string
          last_synced?: string
        }
      }
      plaid_items: {
        Row: {
          id: string
          user_id: string
          access_token: string
          item_id: string
          institution_id: string
          institution_name: string
          created_at: string
          last_synced?: string
          status: string
        }
        Insert: {
          id?: string
          user_id: string
          access_token: string
          item_id: string
          institution_id: string
          institution_name: string
          created_at?: string
          last_synced?: string
          status: string
        }
        Update: {
          id?: string
          user_id?: string
          access_token?: string
          item_id?: string
          institution_id?: string
          institution_name?: string
          created_at?: string
          last_synced?: string
          status?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          stripe_subscription_id: string
          status: string
          tier: string
          current_period_end: string
          cancel_at_period_end: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_subscription_id: string
          status: string
          tier: string
          current_period_end: string
          cancel_at_period_end: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_subscription_id?: string
          status?: string
          tier?: string
          current_period_end?: string
          cancel_at_period_end?: boolean
          created_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          account_id: string
          amount: number
          category: string
          description: string
          date: string
          type: string
          created_at: string
          plaid_transaction_id?: string
          merchant_name?: string
          pending?: boolean
          location?: Json
        }
        Insert: {
          id?: string
          account_id: string
          amount: number
          category: string
          description: string
          date: string
          type: string
          created_at?: string
          plaid_transaction_id?: string
          merchant_name?: string
          pending?: boolean
          location?: Json
        }
        Update: {
          id?: string
          account_id?: string
          amount?: number
          category?: string
          description?: string
          date?: string
          type?: string
          created_at?: string
          plaid_transaction_id?: string
          merchant_name?: string
          pending?: boolean
          location?: Json
        }
      }
      budgets: {
        Row: {
          id: string
          user_id: string
          category: string
          amount: number
          period: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category: string
          amount: number
          period: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category?: string
          amount?: number
          period?: string
          created_at?: string
        }
      }
    }
  }
}