import React, { useState } from 'react';
import axios from 'axios';

const MutualFundsPage = () => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFundId, setSelectedFundId] = useState(null);
  const [showGuidance, setShowGuidance] = useState(true); // Control guidance visibility

  // Enhanced mutual fund data with more examples
  const mutualFunds = [
    // ... previous funds ...
    {
      id: 8,
      name: 'Global Opportunities Fund',
      expense_ratio: 1.3,
      sharpe: 1.7,
      sortino: 1.3,
      fund_size_cr: 2200,
      fund_age_yr: 8,
      sd: 0.19,
      beta: 1.1,
      alpha: 0.09,
      risk_levels: [false, false, true, false, false], // Risk Level 4
      category: 'International',
      investment_strategy: 'Global Equity Markets Exposure'
    },
    {
      id: 9,
      name: 'Dividend Yield Fund',
      expense_ratio: 0.78,
      sharpe: 1.3,
      sortino: 1.0,
      fund_size_cr: 3200,
      fund_age_yr: 12,
      sd: 0.14,
      beta: 0.9,
      alpha: 0.05,
      risk_levels: [false, true, false, false, false], // Risk Level 3
      category: 'Equity',
      investment_strategy: 'High Dividend Yield Stocks'
    },
    {
      id: 10,
      name: 'Dynamic Bond Fund',
      expense_ratio: 0.6,
      sharpe: 0.8,
      sortino: 0.6,
      fund_size_cr: 4500,
      fund_age_yr: 9,
      sd: 0.07,
      beta: 0.4,
      alpha: 0.03,
      risk_levels: [true, false, false, false, false], // Risk Level 2
      category: 'Debt',
      investment_strategy: 'Active Duration Management'
    },
    {
      id: 11,
      name: 'ESG Equity Fund',
      expense_ratio: 0.88,
      sharpe: 1.6,
      sortino: 1.2,
      fund_size_cr: 900,
      fund_age_yr: 4,
      sd: 0.16,
      beta: 0.85,
      alpha: 0.07,
      risk_levels: [false, true, false, false, false], // Risk Level 3
      category: 'Thematic',
      investment_strategy: 'Environmentally Responsible Companies'
    },
    {
      id: 12,
      name: 'Healthcare Innovation Fund',
      expense_ratio: 1.2,
      sharpe: 2.0,
      sortino: 1.8,
      fund_size_cr: 600,
      fund_age_yr: 3,
      sd: 0.21,
      beta: 1.3,
      alpha: 0.11,
      risk_levels: [false, false, false, true, false], // Risk Level 5
      category: 'Sectoral',
      investment_strategy: 'Pharma & Healthcare Sector Focus'
    },
    {
      id: 13,
      name: 'Ultra Short Term Fund',
      expense_ratio: 0.45,
      sharpe: 0.7,
      sortino: 0.5,
      fund_size_cr: 8000,
      fund_age_yr: 6,
      sd: 0.04,
      beta: 0.2,
      alpha: 0.01,
      risk_levels: [true, false, false, false, false], // Risk Level 2
      category: 'Debt',
      investment_strategy: 'Short Duration Debt Instruments'
    },
    {
      id: 14,
      name: 'Value & Contra Fund',
      expense_ratio: 0.95,
      sharpe: 1.9,
      sortino: 1.5,
      fund_size_cr: 1200,
      fund_age_yr: 5,
      sd: 0.17,
      beta: 0.95,
      alpha: 0.08,
      risk_levels: [false, false, true, false, false], // Risk Level 4
      category: 'Equity',
      investment_strategy: 'Contrarian Value Investing'
    },
    {
      id: 15,
      name: 'Multi-Cap Fund',
      expense_ratio: 1.05,
      sharpe: 2.2,
      sortino: 1.9,
      fund_size_cr: 2800,
      fund_age_yr: 7,
      sd: 0.20,
      beta: 1.4,
      alpha: 0.13,
      risk_levels: [false, false, false, false, true], // Risk Level 6
      category: 'Equity',
      investment_strategy: 'Diversified Market Cap Exposure'
    }
  ];

  // Dismiss guidance message
  const dismissGuidance = () => {
    setShowGuidance(false);
  };

  const handleFundClick = async (fund) => {
    setLoading(true);
    setError(null);
    setPrediction(null);
    setSelectedFundId(fund.id);
    setShowGuidance(false); // Hide guidance when user clicks a fund
    
    try {
      const response = await axios.post('https://arthsaathi-1.onrender.com/predict', {
        expense_ratio: fund.expense_ratio,
        sharpe: fund.sharpe,
        sortino: fund.sortino,
        fund_size_cr: fund.fund_size_cr,
        fund_age_yr: fund.fund_age_yr,
        sd: fund.sd,
        beta: fund.beta,
        alpha: fund.alpha,
        risk_level_2: fund.risk_levels[0],
        risk_level_3: fund.risk_levels[1],
        risk_level_4: fund.risk_levels[2],
        risk_level_5: fund.risk_levels[3],
        risk_level_6: fund.risk_levels[4]
      });

      if (response.data.status === 'success') {
        setPrediction(response.data.predictions);
        // Scroll to prediction results
        const predictionElement = document.getElementById('prediction-results');
        if (predictionElement) {
          predictionElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        throw new Error('Failed to get predictions');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 w-screen">
      <h1 className="text-3xl font-bold mb-2">Mutual Fund Schemes</h1>
      <p className="text-gray-600 mb-6">Compare funds and get AI-powered return predictions</p>
      
      {/* User guidance message */}
      {showGuidance && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-blue-800">Click on any fund card below to analyze its performance</p>
              <p className="text-sm text-blue-600">Our AI will predict 1, 3, and 5 year returns based on fund metrics</p>
            </div>
          </div>
          <button 
            onClick={dismissGuidance} 
            className="text-blue-500 hover:text-blue-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
      
      {loading && (
        <div className="mb-4 p-4 bg-blue-50 text-blue-600 rounded-lg flex items-center">
          <svg className="animate-spin h-5 w-5 mr-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Analyzing fund performance...
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </div>
      )}

      {prediction && (
        <div id="prediction-results" className="mb-6 p-5 bg-white rounded-lg shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-3">Predicted Returns</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
              <div className="text-sm text-gray-600 mb-1">1 Year Return</div>
              <div className="text-2xl font-bold text-green-600">
                {prediction["1_year_return"].toFixed(2)}%
              </div>
              <div className="text-xs text-gray-500 mt-1">Short-term forecast</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="text-sm text-gray-600 mb-1">3 Year Return</div>
              <div className="text-2xl font-bold text-blue-600">
                {prediction["3_year_return"].toFixed(2)}%
              </div>
              <div className="text-xs text-gray-500 mt-1">Medium-term forecast</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
              <div className="text-sm text-gray-600 mb-1">5 Year Return</div>
              <div className="text-2xl font-bold text-purple-600">
                {prediction["5_year_return"].toFixed(2)}%
              </div>
              <div className="text-xs text-gray-500 mt-1">Long-term forecast</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mutualFunds.map((fund) => (
          <div
            key={fund.id}
            onClick={() => handleFundClick(fund)}
            className={`p-4 border rounded-lg cursor-pointer transition-all transform hover:-translate-y-1 hover:shadow-lg ${
              selectedFundId === fund.id ? "border-2 border-blue-500 shadow-md bg-blue-50" : "border-gray-200 hover:border-blue-300"
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-lg font-semibold">{fund.name}</h2>
              <span className={`text-sm px-2 py-1 rounded ${
                fund.risk_levels.indexOf(true) <= 1 
                  ? "bg-green-100 text-green-800" 
                  : fund.risk_levels.indexOf(true) === 2 
                  ? "bg-yellow-100 text-yellow-800" 
                  : "bg-red-100 text-red-800"
              }`}>
                Risk Level {fund.risk_levels.indexOf(true) + 2}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Expense Ratio:</span>
                <span className="font-medium">{fund.expense_ratio}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fund Size:</span>
                <span className="font-medium">₹{fund.fund_size_cr} Cr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sharpe Ratio:</span>
                <span className="font-medium">{fund.sharpe}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sortino Ratio:</span>
                <span className="font-medium">{fund.sortino}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fund Age:</span>
                <span className="font-medium">{fund.fund_age_yr} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Beta:</span>
                <span className="font-medium">{fund.beta}</span>
              </div>
            </div>
            
            <div className="mt-3 text-center">
              <button className="w-full py-2 px-4 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium rounded-md transition-colors">
                Analyze Performance
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add glossary/tooltips for financial terms */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Financial Terms Glossary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div><span className="font-medium">Expense Ratio:</span> Annual fee charged by the fund as a percentage of assets</div>
          <div><span className="font-medium">Sharpe Ratio:</span> Measure of risk-adjusted return</div>
          <div><span className="font-medium">Sortino Ratio:</span> Measures return relative to downside risk</div>
          <div><span className="font-medium">Beta:</span> Measure of a fund's volatility compared to the market</div>
          <div><span className="font-medium">Alpha:</span> Excess return compared to the benchmark</div>
          <div><span className="font-medium">Risk Level:</span> Classification of investment risk from 2 (lowest) to 6 (highest)</div>
        </div>
      </div>
    </div>
  );
};

export default MutualFundsPage;