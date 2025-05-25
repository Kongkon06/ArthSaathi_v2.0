import { useState, useMemo } from 'react';
import { Calculator, TrendingUp, Shield, DollarSign, PieChart, Target, ArrowLeft, Info } from 'lucide-react';

const InvestmentStrategy = () => {
  const [formData, setFormData] = useState({
    income: '',
    age: '',
    financialGoal: 'retirement',
    riskTolerance: 'moderate',
    timeHorizon: '',
    currentSavings: '',
    monthlyExpenses: ''
  });
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  // Calculate dynamic asset allocation based on age and risk tolerance
  const calculateAssetAllocation = useMemo(() => {
    if (!formData.age || !formData.timeHorizon) return null;

    const age = parseInt(formData.age);
    const timeHorizon = parseInt(formData.timeHorizon);
    
    let baseEquity = Math.max(20, Math.min(80, 100 - age)); // Rule of thumb: 100-age
    
    // Adjust based on risk tolerance
    switch (formData.riskTolerance) {
      case 'conservative':
        baseEquity = Math.max(20, baseEquity - 20);
        break;
      case 'aggressive':
        baseEquity = Math.min(85, baseEquity + 15);
        break;
      default: // moderate
        break;
    }
    
    // Adjust based on time horizon
    if (timeHorizon > 20) baseEquity = Math.min(80, baseEquity + 10);
    if (timeHorizon < 5) baseEquity = Math.max(30, baseEquity - 15);
    
    const equity = baseEquity;
    const debt = Math.max(15, 90 - equity);
    const gold = Math.min(10, 100 - equity - debt);
    
    return { equity, debt, gold };
  }, [formData.age, formData.timeHorizon, formData.riskTolerance]);

  // Calculate monthly investment suggestions
  const calculateInvestmentPlan = useMemo(() => {
    if (!formData.income || !formData.monthlyExpenses) return null;

    const annualIncome = parseInt(formData.income);
    const monthlyIncome = annualIncome / 12;
    const monthlyExpenses = parseInt(formData.monthlyExpenses);
    const availableForInvestment = monthlyIncome - monthlyExpenses;
    
    // Suggest 50-20-30 rule: 50% needs, 30% wants, 20% savings
    const recommendedSavings = monthlyIncome * 0.20;
    const actualSavings = Math.min(availableForInvestment, recommendedSavings);
    
    return {
      monthlyIncome: monthlyIncome.toFixed(0),
      availableForInvestment: availableForInvestment.toFixed(0),
      recommendedSavings: recommendedSavings.toFixed(0),
      actualSavings: actualSavings.toFixed(0)
    };
  }, [formData.income, formData.monthlyExpenses]);

  // Calculate projected returns
  const calculateProjectedReturns = useMemo(() => {
    if (!calculateInvestmentPlan || !calculateAssetAllocation || !formData.timeHorizon) return null;

    const monthlyInvestment = parseInt(calculateInvestmentPlan.actualSavings);
    const years = parseInt(formData.timeHorizon);
    const currentSavings = parseInt(formData.currentSavings) || 0;
    
    // Expected returns based on asset allocation
    const equityReturn = 0.12; // 12% for equity
    const debtReturn = 0.07; // 7% for debt
    const goldReturn = 0.08; // 8% for gold
    
    const { equity, debt, gold } = calculateAssetAllocation;
    const weightedReturn = (equity * equityReturn + debt * debtReturn + gold * goldReturn) / 100;
    
    // SIP future value calculation
    const monthlyRate = weightedReturn / 12;
    const totalMonths = years * 12;
    
    // Future value of monthly SIPs
    const sipFutureValue = monthlyInvestment * (((1 + monthlyRate) ** totalMonths - 1) / monthlyRate);
    
    // Future value of current savings
    const currentSavingsFV = currentSavings * ((1 + weightedReturn) ** years);
    
    const totalFutureValue = sipFutureValue + currentSavingsFV;
    const totalInvested = (monthlyInvestment * totalMonths) + currentSavings;
    const totalReturns = totalFutureValue - totalInvested;
    
    return {
      totalFutureValue: totalFutureValue.toFixed(0),
      totalInvested: totalInvested.toFixed(0),
      totalReturns: totalReturns.toFixed(0),
      weightedReturn: (weightedReturn * 100).toFixed(1)
    };
  }, [calculateInvestmentPlan, calculateAssetAllocation, formData.timeHorizon, formData.currentSavings]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      income: '',
      age: '',
      financialGoal: 'retirement',
      riskTolerance: 'moderate',
      timeHorizon: '',
      currentSavings: '',
      monthlyExpenses: ''
    });
    setShowResults(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };


  if (showResults) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen" style={{ width: '1182.22px', transform: 'translate(10.6667px, 0px)' }}>
        <div className="mb-6">
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <ArrowLeft size={20} />
            Back to Advisor
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-blue-600" size={32} />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Your Personalized Investment Strategy</h1>
              <p className="text-gray-600">Tailored for {formData.financialGoal} with {formData.timeHorizon}-year horizon</p>
            </div>
          </div>

          {/* Financial Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="text-blue-600" size={20} />
                <span className="font-medium text-blue-800">Annual Income</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">{formatCurrency(formData.income)}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="text-green-600" size={20} />
                <span className="font-medium text-green-800">Monthly Investment</span>
              </div>
              <p className="text-2xl font-bold text-green-900">
                {calculateInvestmentPlan ? formatCurrency(calculateInvestmentPlan.actualSavings) : 'N/A'}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="text-purple-600" size={20} />
                <span className="font-medium text-purple-800">Risk Level</span>
              </div>
              <p className="text-2xl font-bold text-purple-900 capitalize">{formData.riskTolerance}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="text-orange-600" size={20} />
                <span className="font-medium text-orange-800">Time Horizon</span>
              </div>
              <p className="text-2xl font-bold text-orange-900">{formData.timeHorizon} Years</p>
            </div>
          </div>

          {/* Projected Returns */}
          {calculateProjectedReturns && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-green-600" size={24} />
                <h3 className="text-xl font-bold text-gray-800">Projected Portfolio Growth</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Total Investment</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(calculateProjectedReturns.totalInvested)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Expected Returns</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(calculateProjectedReturns.totalReturns)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Future Value</p>
                  <p className="text-3xl font-bold text-purple-600">{formatCurrency(calculateProjectedReturns.totalFutureValue)}</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">Expected Annual Return: <span className="font-semibold text-gray-800">{calculateProjectedReturns.weightedReturn}%</span></p>
              </div>
            </div>
          )}

          {/* Asset Allocation */}
          {calculateAssetAllocation && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <PieChart className="text-blue-600" size={24} />
                <h3 className="text-xl font-bold text-gray-800">Recommended Asset Allocation</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{calculateAssetAllocation.equity}%</div>
                  <div className="font-medium text-blue-800">Equity</div>
                  <div className="text-sm text-blue-600 mt-1">Growth potential</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{calculateAssetAllocation.debt}%</div>
                  <div className="font-medium text-green-800">Debt</div>
                  <div className="text-sm text-green-600 mt-1">Stability & income</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">{calculateAssetAllocation.gold}%</div>
                  <div className="font-medium text-yellow-800">Gold</div>
                  <div className="text-sm text-yellow-600 mt-1">Inflation hedge</div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Asset Class</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Allocation</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Recommended Instruments</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Expected Return</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-medium text-blue-800">Equity</td>
                      <td className="border border-gray-200 px-4 py-3">{calculateAssetAllocation.equity}%</td>
                      <td className="border border-gray-200 px-4 py-3">Large-Cap Funds, Index Funds, Flexi-Cap Funds, ELSS</td>
                      <td className="border border-gray-200 px-4 py-3 text-green-600 font-semibold">10-14%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-medium text-green-800">Debt</td>
                      <td className="border border-gray-200 px-4 py-3">{calculateAssetAllocation.debt}%</td>
                      <td className="border border-gray-200 px-4 py-3">PPF, EPF, Corporate Bonds, Debt Mutual Funds, NPS</td>
                      <td className="border border-gray-200 px-4 py-3 text-green-600 font-semibold">6-8%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-medium text-yellow-600">Gold</td>
                      <td className="border border-gray-200 px-4 py-3">{calculateAssetAllocation.gold}%</td>
                      <td className="border border-gray-200 px-4 py-3">Sovereign Gold Bonds, Gold ETFs, Gold Mutual Funds</td>
                      <td className="border border-gray-200 px-4 py-3 text-green-600 font-semibold">7-9%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tax-Efficient Investments */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Tax-Efficient Investment Options</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Section 80C (₹1.5L limit)</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• PPF: 15-year lock-in, tax-free returns</li>
                  <li>• ELSS Mutual Funds: 3-year lock-in</li>
                  <li>• EPF: Employer contribution</li>
                  <li>• NSC, Tax Saver FD</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Additional Tax Benefits</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• NPS: Extra ₹50k deduction under 80CCD(1B)</li>
                  <li>• Health Insurance: 80D benefits</li>
                  <li>• Home Loan: 80C (principal) + 24(b) (interest)</li>
                  <li>• Education Loan: Interest deduction</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Monthly Investment Plan */}
          {calculateInvestmentPlan && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Monthly Investment Breakdown</h3>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Income Analysis</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Monthly Income:</span>
                        <span className="font-semibold">{formatCurrency(calculateInvestmentPlan.monthlyIncome)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Expenses:</span>
                        <span className="font-semibold">{formatCurrency(formData.monthlyExpenses)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Available for Investment:</span>
                        <span className="font-semibold text-green-600">{formatCurrency(calculateInvestmentPlan.availableForInvestment)}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Investment Distribution</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Equity SIPs:</span>
                        <span className="font-semibold">
                          {calculateAssetAllocation
                            ? formatCurrency(Number(calculateInvestmentPlan.actualSavings) * calculateAssetAllocation.equity / 100)
                            : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Debt Investments:</span>
                        <span className="font-semibold">
                          {calculateAssetAllocation
                            ? formatCurrency(Number(calculateInvestmentPlan.actualSavings) * calculateAssetAllocation.debt / 100)
                            : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gold Investment:</span>
                        <span className="font-semibold">
                          {calculateAssetAllocation
                            ? formatCurrency(Number(calculateInvestmentPlan.actualSavings) * calculateAssetAllocation.gold / 100)
                            : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Steps */}
          <div className="bg-yellow-50 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Info className="text-yellow-600" size={20} />
              <h3 className="text-lg font-bold text-yellow-800">Next Steps</h3>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-yellow-800">
              <li>Open a Demat account if you don't have one</li>
              <li>Start SIPs in recommended mutual funds</li>
              <li>Maximize tax-saving investments (80C, 80CCD)</li>
              <li>Build an emergency fund (6-12 months expenses)</li>
              <li>Review and rebalance portfolio annually</li>
              <li>Consider increasing SIP amount with salary increments</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen" style={{ width: '932.445px', transform: 'translate(13.3333px, 0px)' }}>
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-3 mb-4">
          <Calculator className="text-blue-600" size={40} />
          <h1 className="text-4xl font-bold text-gray-800">Investment Strategy Advisor</h1>
        </div>
        <p className="text-gray-600 text-lg">Get personalized investment recommendations based on your financial profile</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-xl p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Annual Income (₹) *</label>
            <input 
              type="number" 
              value={formData.income} 
              onChange={(e) => handleInputChange('income', e.target.value)} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
              placeholder="e.g., 500000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Age *</label>
            <input 
              type="number" 
              value={formData.age} 
              onChange={(e) => handleInputChange('age', e.target.value)} 
              required 
              min="18"
              max="65"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
              placeholder="e.g., 25"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Expenses (₹) *</label>
            <input 
              type="number" 
              value={formData.monthlyExpenses} 
              onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
              placeholder="e.g., 25000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Current Savings (₹)</label>
            <input 
              type="number" 
              value={formData.currentSavings} 
              onChange={(e) => handleInputChange('currentSavings', e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
              placeholder="e.g., 100000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Financial Goal *</label>
            <select 
              value={formData.financialGoal} 
              onChange={(e) => handleInputChange('financialGoal', e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="retirement">Retirement Planning</option>
              <option value="wealth">Wealth Creation</option>
              <option value="education">Child's Education</option>
              <option value="house">House Purchase</option>
              <option value="emergency">Emergency Fund</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Risk Tolerance *</label>
            <select 
              value={formData.riskTolerance} 
              onChange={(e) => handleInputChange('riskTolerance', e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="conservative">Conservative (Low Risk)</option>
              <option value="moderate">Moderate (Medium Risk)</option>
              <option value="aggressive">Aggressive (High Risk)</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Investment Time Horizon (Years) *</label>
            <input 
              type="number" 
              value={formData.timeHorizon} 
              onChange={(e) => handleInputChange('timeHorizon', e.target.value)} 
              required 
              min="1"
              max="40"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
              placeholder="e.g., 20"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 pt-6">
          <button 
            type="button" 
            onClick={handleReset} 
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Reset
          </button>
          <button 
            type="submit" 
            onClick={handleSubmit}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium flex items-center gap-2 disabled:opacity-50" 
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing...
              </>
            ) : (
              <>
                <Calculator size={20} />
                Get My Strategy
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentStrategy;