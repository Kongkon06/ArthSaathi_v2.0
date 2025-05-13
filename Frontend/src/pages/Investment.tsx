import React, { useState } from 'react';

const InvestmentStrategy = () => {
  const [income, setIncome] = useState('');
  const [financialGoal, setFinancialGoal] = useState('retirement');
  const [riskTolerance, setRiskTolerance] = useState('moderate');
  const [timeHorizon, setTimeHorizon] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 1000);
  };

  const handleReset = () => {
    setIncome('');
    setFinancialGoal('retirement');
    setRiskTolerance('moderate');
    setTimeHorizon('');
    setShowResults(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Personalized Investment Strategy</h1>
      
      {!showResults ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income (₹)</label>
            <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} required className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Horizon (years)</label>
            <input type="number" value={timeHorizon} onChange={(e) => setTimeHorizon(e.target.value)} required className="w-full p-2 border rounded-md" />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={handleReset} className="px-4 py-2 bg-gray-200 rounded-md">Reset</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md" disabled={loading}>
              {loading ? 'Processing...' : 'Get Strategy'}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Personalized Investment Strategy for Retirement ({timeHorizon}-Year Horizon, {riskTolerance.charAt(0).toUpperCase() + riskTolerance.slice(1)} Risk Tolerance)</h2>
          
          <h3 className="text-lg font-medium mb-2">1. Financial Overview & Goals</h3>
          <p><strong>Annual Income:</strong> ₹{income} (5 LPA)</p>
          <p><strong>Primary Goal:</strong> Retirement planning with a {timeHorizon}-year horizon.</p>
          <p><strong>Risk Tolerance:</strong> {riskTolerance.charAt(0).toUpperCase() + riskTolerance.slice(1)}</p>
          
          <h3 className="text-lg font-medium mt-4">2. Asset Allocation Strategy</h3>
          <table className="w-full border mt-2">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Asset Class</th>
                <th className="border px-4 py-2">Allocation</th>
                <th className="border px-4 py-2">Instruments</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Equity</td>
                <td className="border px-4 py-2">60%</td>
                <td className="border px-4 py-2">Large-Cap Mutual Funds, Index Funds, ETFs</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Debt</td>
                <td className="border px-4 py-2">35%</td>
                <td className="border px-4 py-2">PPF, Short-Term Debt Funds, NPS</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Gold</td>
                <td className="border px-4 py-2">5%</td>
                <td className="border px-4 py-2">Sovereign Gold Bonds (SGBs)</td>
              </tr>
            </tbody>
          </table>
          
          <h3 className="text-lg font-medium mt-4">3. Tax-Efficient Investments</h3>
          <ul className="list-disc pl-6">
            <li>PPF: ₹1.5L/year (80C) for tax-free returns.</li>
            <li>NPS: ₹50,000/year (80CCD(1B)) for additional tax savings.</li>
            <li>ELSS Funds: SIPs (₹10,000/month) for equity exposure + tax benefits.</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4">4. Monthly Savings Plan</h3>
          <p>Set up systematic investments: SIPs in equity funds, fixed deposits, and balanced allocations.</p>
          
          <div className="mt-8">
            <button onClick={handleReset} className="px-4 py-2 bg-blue-600 text-white rounded-md">Start Over</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentStrategy;
