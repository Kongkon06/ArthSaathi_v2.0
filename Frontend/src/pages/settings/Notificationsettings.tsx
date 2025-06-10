import React, { useState } from 'react';
import { Mail, MessageSquare, AlertTriangle, Shield, Gift, Clock, DollarSign, Bell, Users } from 'lucide-react';

interface NotificationOption {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

const NotificationSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'email' | 'push' | 'sms'>('email');
  
  const [emailNotifications, setEmailNotifications] = useState<NotificationOption[]>([
    {
      id: 'account-alerts',
      label: 'Account Alerts',
      description: 'Important notifications about your account status and activity',
      icon: <AlertTriangle className="w-5 h-5 text-orange-500" />,
      enabled: true
    },
    {
      id: 'security-alerts',
      label: 'Security Alerts',
      description: 'Notifications about sign-ins, password changes, and suspicious activity',
      icon: <Shield className="w-5 h-5 text-blue-500" />,
      enabled: true
    },
    {
      id: 'promotional-emails',
      label: 'Promotional Emails',
      description: 'Updates about new features, offers, and other marketing communications',
      icon: <Gift className="w-5 h-5 text-green-500" />,
      enabled: false
    },
    {
      id: 'weekly-digest',
      label: 'Weekly Digest',
      description: 'A summary of your account activity sent once a week',
      icon: <Clock className="w-5 h-5 text-purple-500" />,
      enabled: true
    },
    {
      id: 'transaction-receipts',
      label: 'Transaction Receipts',
      description: 'Receive email receipts for every transaction',
      icon: <DollarSign className="w-5 h-5 text-green-600" />,
      enabled: true
    }
  ]);

  const [pushNotifications, setPushNotifications] = useState<NotificationOption[]>([
    {
      id: 'account-alerts',
      label: 'Account Alerts',
      description: 'Important notifications about your account status and activity',
      icon: <AlertTriangle className="w-5 h-5 text-orange-500" />,
      enabled: true
    },
    {
      id: 'security-alerts',
      label: 'Security Alerts',
      description: 'Notifications about sign-ins, password changes, and suspicious activity',
      icon: <Shield className="w-5 h-5 text-blue-500" />,
      enabled: true
    },
    {
      id: 'payment-reminders',
      label: 'Payment Reminders',
      description: 'Get reminded when payments are due or upcoming',
      icon: <Clock className="w-5 h-5 text-orange-400" />,
      enabled: true
    },
    {
      id: 'new-features',
      label: 'New Features',
      description: 'Stay updated when we launch new features',
      icon: <Users className="w-5 h-5 text-purple-500" />,
      enabled: false
    },
    {
      id: 'balance-updates',
      label: 'Balance Updates',
      description: 'Get notified when your account balance changes',
      icon: <DollarSign className="w-5 h-5 text-green-600" />,
      enabled: true
    }
  ]);

  const [smsNotifications, setSmsNotifications] = useState<NotificationOption[]>([
    {
      id: 'account-alerts',
      label: 'Account Alerts',
      description: 'Important notifications about your account status and activity',
      icon: <AlertTriangle className="w-5 h-5 text-orange-500" />,
      enabled: false
    },
    {
      id: 'security-alerts',
      label: 'Security Alerts',
      description: 'Notifications about sign-ins, password changes, and suspicious activity',
      icon: <Shield className="w-5 h-5 text-blue-500" />,
      enabled: true
    },
    {
      id: 'payment-reminders',
      label: 'Payment Reminders',
      description: 'Get reminded when payments are due or upcoming',
      icon: <Clock className="w-5 h-5 text-orange-400" />,
      enabled: false
    },
    {
      id: 'transaction-alerts',
      label: 'Transaction Alerts',
      description: 'Receive SMS notifications for transactions above a certain amount',
      icon: <DollarSign className="w-5 h-5 text-green-600" />,
      enabled: true
    }
  ]);

  const toggleNotification = (id: string, type: 'email' | 'push' | 'sms') => {
    const setters = {
      email: setEmailNotifications,
      push: setPushNotifications,
      sms: setSmsNotifications
    };
    
    const notifications = {
      email: emailNotifications,
      push: pushNotifications,
      sms: smsNotifications
    };

    setters[type](notifications[type].map(notification =>
      notification.id === id 
        ? { ...notification, enabled: !notification.enabled }
        : notification
    ));
  };

  const getCurrentNotifications = () => {
    switch (activeTab) {
      case 'email': return emailNotifications;
      case 'push': return pushNotifications;
      case 'sms': return smsNotifications;
      default: return emailNotifications;
    }
  };

  const getTabDescription = () => {
    switch (activeTab) {
      case 'email': return 'Configure which emails you\'d like to receive';
      case 'push': return 'Control what appears on your devices';
      case 'sms': return 'Manage text message alerts (standard rates may apply)';
      default: return '';
    }
  };

  const handleSaveChanges = () => {
    // Here you would typically save the settings to your backend
    console.log('Saving notification settings...', {
      email: emailNotifications,
      push: pushNotifications,
      sms: smsNotifications
    });
    alert('Settings saved successfully!');
  };

  const handleDiscardChanges = () => {
    // Reset to default values or fetch from backend
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notification Settings</h1>
          <p className="text-gray-600">Manage how and when you receive notifications from the platform.</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('email')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'email'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Mail className="w-5 h-5" />
              Email
            </button>
            <button
              onClick={() => setActiveTab('push')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'push'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Bell className="w-5 h-5" />
              Push
            </button>
            <button
              onClick={() => setActiveTab('sms')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'sms'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              SMS
            </button>
          </div>
        </div>

        {/* Notification Settings Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {activeTab === 'email' && 'Email Notifications'}
              {activeTab === 'push' && 'Push Notifications'}
              {activeTab === 'sms' && 'SMS Notifications'}
            </h2>
            <p className="text-gray-600 mb-6">{getTabDescription()}</p>

            {/* Notification Options */}
            <div className="space-y-4">
              {getCurrentNotifications().map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    {notification.icon}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">{notification.label}</h3>
                      <p className="text-sm text-gray-600">{notification.description}</p>
                    </div>
                  </div>
                  
                  {/* Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notification.enabled}
                      onChange={() => toggleNotification(notification.id, activeTab)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleDiscardChanges}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Discard Changes
          </button>
          <button
            onClick={handleSaveChanges}
            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 font-medium transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;