// TODO: Support more than just Coinbase Pro
// Coinbase Pro product
export interface CoinbaseProProduct {
  accessible: boolean;
  base_currency: string;
  base_max_size: string;
  base_min_size: string;
  cancel_only: boolean;
  display_name: string;
  id: string;
  limit_only: boolean;
  margin_enabled: boolean;
  max_market_funds: string;
  min_market_funds: string;
  post_only: boolean;
  quote_currency: string;
  quote_increment: string;
  status: string;
  status_message: string | null;
}
