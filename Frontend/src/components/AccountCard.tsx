import React, { useState } from 'react';
import { PiggyBank, Wallet, Users, CreditCard, Edit, Trash2, MoreVertical, Calendar, TrendingUp, AlertCircle } from 'lucide-react';

// Type definitions
interface User {
  firstname: string;
  lastname: string;
  id: string;
}

interface Account {
  id: string;
  account_type: 'Savings' | 'Current' | 'Family' | 'Investment';
  current_balance: number;
  monthly_income: number;
  age: number;
  dependents: number;
  disposable_income?: number;
  desired_savings?: number;
  created_date?: string;
  is_default?: boolean;
  family_members?: Array<{
    name: string;
    relationship: string;
  }>;
}

interface AccountCardProps {
  account: Account;
  user: User;
  onEdit?: (account: Account) => void;
  onDelete?: (accountId: string) => void;
  currency?: string;
  showActions?: boolean;
}

const AccountCard: React.FC<AccountCardProps> = ({
  account,
  user,
  onEdit,
  onDelete,
  currency = '₹',
  showActions = true
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Helper functions
  const formatCurrency = (amount: number): string => {
    return `${currency}${amount.toLocaleString()}`;
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const calculateSavingsProgress = (): { amount: number; percentage: number } => {
    if (!account.disposable_income || !account.desired_savings) {
      return { amount: 0, percentage: 0 };
    }
    
    const percentage = Math.min((account.desired_savings / account.disposable_income) * 100, 100);
    return {
      amount: account.desired_savings,
      percentage: Math.round(percentage * 10) / 10
    };
  };

  const getAccountIcon = () => {
    const iconProps = { size: 20 };
    
    switch (account.account_type) {
      case 'Savings':
        return <PiggyBank {...iconProps} className="text-green-600" />;
      case 'Current':
        return <Wallet {...iconProps} className="text-blue-600" />;
      case 'Family':
        return <Users {...iconProps} className="text-purple-600" />;
      case 'Investment':
        return <TrendingUp {...iconProps} className="text-orange-600" />;
      default:
        return <CreditCard {...iconProps} className="text-gray-600" />;
    }
  };

  const getAccountIconBg = () => {
    switch (account.account_type) {
      case 'Savings':
        return 'bg-green-100';
      case 'Current':
        return 'bg-blue-100';
      case 'Family':
        return 'bg-purple-100';
      case 'Investment':
        return 'bg-orange-100';
      default:
        return 'bg-gray-100';
    }
  };

  const savingsProgress = calculateSavingsProgress();
  const fullName = `${user.firstname} ${user.lastname}`.trim();

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 ${getAccountIconBg()} rounded-full flex items-center justify-center`}>
            {getAccountIcon()}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{fullName || 'Unknown User'}</h3>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">{account.account_type} Account</span>
              {account.is_default && (
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                  Default
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions Menu */}
        {showActions && (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Account actions"
            >
              <MoreVertical size={16} className="text-gray-500" />
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 top-10 bg-white border rounded-lg shadow-lg z-10 min-w-[120px]">
                <button
                  onClick={() => {
                    onEdit?.(account);
                    setShowDropdown(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 text-left"
                >
                  <Edit size={14} />
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete?.(account.id);
                    setShowDropdown(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-red-50 text-red-600 text-left"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Balance and Income */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Current Balance</div>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(account.current_balance)}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Monthly Income</div>
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(account.monthly_income)}
          </div>
        </div>
      </div>

      {/* Account Details */}
      <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
        <div>
          <div className="text-gray-600 mb-1">Age</div>
          <div className="font-semibold text-gray-900">{account.age}</div>
        </div>
        <div>
          <div className="text-gray-600 mb-1">Dependents</div>
          <div className="font-semibold text-gray-900">{account.dependents}</div>
        </div>
        <div>
          <div className="text-gray-600 mb-1">Created</div>
          <div className="font-semibold text-gray-900 flex items-center gap-1">
            <Calendar size={12} />
            {formatDate(account.created_date)}
          </div>
        </div>
      </div>

      {/* Savings Progress */}
      {savingsProgress.amount > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Savings Progress</span>
            <span className="text-sm font-semibold text-gray-900">
              {formatCurrency(savingsProgress.amount)} / month
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(savingsProgress.percentage, 100)}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">
              {savingsProgress.percentage}% of disposable income
            </span>
            {savingsProgress.percentage > 100 && (
              <span className="flex items-center gap-1 text-amber-600">
                <AlertCircle size={12} />
                Over budget
              </span>
            )}
          </div>
        </div>
      )}

      {/* Family Members (for Family accounts) */}
      {account.account_type === 'Family' && account.family_members && account.family_members.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Users size={16} className="text-gray-600" />
            <span className="font-semibold text-gray-900">Family Members</span>
          </div>
          <div className="space-y-2">
            {account.family_members.map((member, index) => (
              <div key={index} className="flex justify-between items-center py-1">
                <span className="text-sm text-gray-700">{member.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  member.relationship === 'Daughter' 
                    ? 'bg-pink-100 text-pink-800' 
                    : member.relationship === 'Son'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {member.relationship}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons (Alternative to dropdown) */}
      {showActions && (
        <div className="flex gap-2 pt-4 border-t">
          <button
            onClick={() => onEdit?.(account)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 flex-1 justify-center"
          >
            <Edit size={16} />
            Edit
          </button>
          <button
            onClick={() => onDelete?.(account.id)}
            className="flex items-center gap-2 px-4 py-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-red-600 flex-1 justify-center"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountCard;