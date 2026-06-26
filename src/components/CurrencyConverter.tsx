import { useState, useEffect } from 'react';
import { ArrowRightLeft, Loader2 } from 'lucide-react';

export default function CurrencyConverter() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [amount, setAmount] = useState<number | string>(100);
  const [rate, setRate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'NZD'];

  useEffect(() => {
    async function fetchRate() {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
        if (!response.ok) throw new Error('Failed to fetch rates');
        const data = await response.json();
        if (data && data.rates && data.rates[targetCurrency]) {
          setRate(data.rates[targetCurrency]);
        } else {
          setError('Rate not found');
        }
      } catch (err) {
        setError('Error fetching rates');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    if (baseCurrency !== targetCurrency) {
      fetchRate();
    } else {
      setRate(1);
    }
  }, [baseCurrency, targetCurrency]);

  const handleSwap = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
  };

  const convertedAmount = rate && amount ? (Number(amount) * rate).toFixed(2) : '0.00';

  return (
    <div className="bg-neutral border border-neutral-light rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-primary/50 transition-colors">
      <h3 className="text-xl font-medium mb-6 flex items-center font-serif text-secondary">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
          <ArrowRightLeft className="w-4 h-4 text-primary" />
        </div>
        Currency Converter
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-xs text-secondary/60 mb-1.5 uppercase tracking-wider font-medium">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-tertiary border border-neutral-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors text-secondary"
            placeholder="Enter amount..."
          />
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <label className="block text-xs text-secondary/60 mb-1.5 uppercase tracking-wider font-medium">From</label>
            <select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
              className="w-full bg-tertiary border border-neutral-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors text-secondary appearance-none"
            >
              {currencies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          
          <div className="pt-6">
            <button 
              onClick={handleSwap}
              className="w-10 h-10 rounded-full bg-neutral-light flex items-center justify-center hover:bg-primary hover:text-tertiary transition-colors text-secondary"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1">
            <label className="block text-xs text-secondary/60 mb-1.5 uppercase tracking-wider font-medium">To</label>
            <select
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
              className="w-full bg-tertiary border border-neutral-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors text-secondary appearance-none"
            >
              {currencies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-6 p-4 bg-tertiary rounded-2xl border border-neutral-light text-center">
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
          ) : error ? (
            <p className="text-sm text-red-400">{error}</p>
          ) : (
            <div>
              <p className="text-secondary/60 text-sm mb-1">Converted Amount</p>
              <p className="text-2xl font-serif text-secondary font-medium">
                {rate ? `${targetCurrency} ${convertedAmount}` : '--'}
              </p>
              <p className="text-xs text-secondary/40 mt-1">
                1 {baseCurrency} = {rate?.toFixed(4)} {targetCurrency}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
