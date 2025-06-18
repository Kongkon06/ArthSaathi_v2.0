import { useState } from 'react';
import { X, Plus, Trash2, Wallet, TrendingUp, Target, Tag, PiggyBank } from 'lucide-react';
import { accountService } from '@/services/accountService';
import { useAccount } from '@/Atoms/AccountContext';

const FinancialAccountsDashboard = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { account } = useAccount();
  const [formData, setFormData] = useState({
    age: '0',
    dependents: '0',
    currentBalance: '0',
    accountType: 'Current',
    monthlyIncome: '0',
    disposableIncome: '1000.00',
    desiredSavings: '500.00'
  });

  const handleInputChange = (field:any, value:any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateAccount = () => {
  const token = localStorage.getItem('token') ||'';

  // Convert fields to proper types
  const accountPayload = {
    ...formData,
    age: Number(formData.age),
    dependents: Number(formData.dependents),
    currentBalance: parseFloat(formData.currentBalance),
    monthlyIncome: parseFloat(formData.monthlyIncome),
    disposableIncome: parseFloat(formData.disposableIncome),
    desiredSavings: parseFloat(formData.desiredSavings),
  };

  accountService.create(accountPayload, token).then(()=>setShowCreateModal(false));

  // Reset form
  setFormData({
    age: '0',
    dependents: '0',
    currentBalance: '0',
    accountType: 'Current Account',
    monthlyIncome: '0',
    disposableIncome: '1000.00',
    desiredSavings: '500.00'
  });
};
const AccountCard = (account:any)=>{
  return <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              {account.account_type == 'Savings' ?<PiggyBank size={20} className="text-green-600" /> : <Wallet size={20} className="text-red-600"/>}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{account.firstname + ' ' + account.lastname}</h3>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">{account.account_type} Account</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Default</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Balance</div>
              <div className="text-2xl font-bold text-green-600">{account.current_balance}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Monthly Income</div>
              <div className="text-2xl font-bold">{account.monthly_income}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
            <div>
              <div className="text-gray-600">Age</div>
              <div className="font-semibold">{account.age}</div>
            </div>
            <div>
              <div className="text-gray-600">Dependents</div>
              <div className="font-semibold">{account.dependents}</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Savings Progress</span>
              <span className="text-sm font-semibold">₹1,500 / month</span>
            </div>
            <div className="text-xs text-gray-500">100.0% of disposable income</div>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors text-red-600">
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
}

  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold text-blue-600 mb-2">My Accounts</h1>
          <p className="text-gray-600">Manage your personal and family finances with ease</p>
        </div>
        
        {/* Summary Cards */}
        <div className="flex gap-4">
          <div className="bg-white p-4 rounded-lg border-2 border-blue-500 shadow-sm min-w-[140px]">
            <div className="flex items-center gap-2 mb-2">
              <Wallet size={16} className="text-blue-500" />
              <span className="text-sm text-gray-600">Total Balance</span>
            </div>
            <div className="text-2xl font-bold">₹13,000</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border-2 border-green-500 shadow-sm min-w-[140px]">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-green-500" />
              <span className="text-sm text-gray-600">Total Income</span>
            </div>
            <div className="text-2xl font-bold">₹7500</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border-2 border-purple-500 shadow-sm min-w-[140px]">
            <div className="flex items-center gap-2 mb-2">
              <Target size={16} className="text-purple-500" />
              <span className="text-sm text-gray-600">Savings Goal</span>
            </div>
            <div className="text-2xl font-bold">₹4,000</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-8">
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
          <Tag size={20} />
        </button>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Create Account
        </button>
      </div>

      {/* Account Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> 

        {/* Jane Smith Account */}
        <AccountCard account={account}/>
      </div>

      {/* Create Account Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create New Account</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">Fill in the details to create a new account.</p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input 
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Dependents</label>
                  <input 
                    type="number"
                    value={formData.dependents}
                    onChange={(e) => handleInputChange('dependents', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Balance</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">₹</span>
                    <input 
                      type="number"
                      value={formData.currentBalance}
                      onChange={(e) => handleInputChange('currentBalance', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                  <select 
                    value={formData.accountType}
                    onChange={(e) => handleInputChange('accountType', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Current">Current Account</option>
                    <option value="Savings">Savings Account</option>
                    <option value="Family">Family Account</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">₹</span>
                  <input 
                    type="number"
                    value={formData.monthlyIncome}
                    onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                    className="w-full p-2 pl-8 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Disposable Income</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">₹</span>
                    <input 
                      type="number"
                      value={formData.disposableIncome}
                      onChange={(e) => handleInputChange('disposableIncome', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      step="0.01"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Desired Monthly Savings</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">₹</span>
                    <input 
                      type="number"
                      value={formData.desiredSavings}
                      onChange={(e) => handleInputChange('desiredSavings', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateAccount}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialAccountsDashboard;