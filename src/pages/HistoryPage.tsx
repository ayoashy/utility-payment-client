import React, { useState } from 'react';
import { Calendar, Filter, Search, Download, Clipboard, ExternalLink, Check, Clock, X, Zap, ArrowUpRight, Gift, Ticket } from 'lucide-react';

const HistoryPage = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Sample data for demonstration
  const transactions = [
    {
      id: 1,
      date: 'March 6, 2025',
      timestamp: 'March 6, 2025 - 12:34 PM UTC',
      type: 'Utility Payment',
      details: 'Paid for Electricity',
      amount: '10 $TOKEN',
      status: 'Success',
      hash: '0xabc123def456ghi789jkl012mno345pqr678stu901',
      recipient: '0xdef456ghi789jkl012mno345pqr678stu901vwx',
      gasFee: '0.0005 ETH'
    },
    {
      id: 2,
      date: 'March 4, 2025',
      timestamp: 'March 4, 2025 - 10:15 AM UTC',
      type: 'Subscription',
      details: 'Subscribed to Netflix',
      amount: '15 $TOKEN',
      status: 'Success',
      hash: '0xbcd234efg567hij890klm123nop456qrs789tuv012',
      recipient: '0xefg567hij890klm123nop456qrs789tuv012wxy',
      gasFee: '0.0004 ETH'
    },
    {
      id: 3,
      date: 'March 2, 2025',
      timestamp: 'March 2, 2025 - 3:22 PM UTC',
      type: 'Faucet Claim',
      details: 'Claimed free 5 $TOKEN',
      amount: '5 $TOKEN',
      status: 'Success',
      hash: '0xcde345fgh678ijk901lmn234opq567rst890uvw123',
      recipient: 'Self',
      gasFee: '0.0003 ETH'
    },
    {
      id: 4,
      date: 'March 1, 2025',
      timestamp: 'March 1, 2025 - 9:45 AM UTC',
      type: 'Token Transfer',
      details: 'Sent to 0xabc...123',
      amount: '100 $TOKEN',
      status: 'Failed',
      hash: '0xdef456ghi789jkl012mno345pqr678stu901vwx234',
      recipient: '0xabc123def456ghi789jkl012mno345pqr678stu',
      gasFee: '0.0005 ETH'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Success': return 'text-green-500';
      case 'Pending': return 'text-yellow-500';
      case 'Failed': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Success': return <Check className="w-5 h-5" />;
      case 'Pending': return <Clock className="w-5 h-5" />;
      case 'Failed': return <X className="w-5 h-5" />;
      default: return null;
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Utility Payment': return <Zap className="w-5 h-5 text-primary" />;
      case 'Token Transfer': return <ArrowUpRight className="w-5 h-5 text-info" />;
      case 'Faucet Claim': return <Gift className="w-5 h-5 text-secondary" />;
      case 'Subscription': return <Ticket className="w-5 h-5 text-muted" />;
      default: return null;
    }
  };

  const openTransactionModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="min-h-screen bg-background font-gilroy-regular">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-text-primary mb-6">Transaction History</h1>
        
        {/* Summary Overview Card */}
        <div className="bg-surface rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-text-primary mb-4">Summary Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-background rounded-lg">
              <p className="text-text-secondary text-sm mb-1">Total Transactions</p>
              <p className="text-text-primary text-lg font-bold">42 transactions</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <p className="text-text-secondary text-sm mb-1">Last Transaction</p>
              <p className="text-text-primary text-lg font-bold">Paid 10 $TOKEN for Electricity on March 6, 2025</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <p className="text-text-secondary text-sm mb-1">Highest Transaction</p>
              <p className="text-text-primary text-lg font-bold">Transferred 100 $TOKEN on March 1, 2025</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <p className="text-text-secondary text-sm mb-1">Total Spent</p>
              <p className="text-text-primary text-lg font-bold">300 $TOKEN</p>
            </div>
          </div>
        </div>
        
        {/* Filters Section */}
        <div className="bg-surface rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              {/* Type Filter */}
              <div className="relative w-full sm:w-48">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-secondary">
                  <Filter className="w-4 h-4" />
                </div>
                <select className="bg-background border border-border rounded-lg text-text-primary py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Filter By Type</option>
                  <option value="faucet">Faucet Claims</option>
                  <option value="transfer">Token Transfers</option>
                  <option value="utility">Utility Payments</option>
                  <option value="subscription">Subscriptions</option>
                </select>
              </div>
              
              {/* Date Range Filter */}
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-40">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-secondary">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input type="date" className="bg-background border border-border rounded-lg text-text-primary py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-primary" placeholder="From" />
                </div>
                <div className="relative w-full sm:w-40">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-secondary">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input type="date" className="bg-background border border-border rounded-lg text-text-primary py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-primary" placeholder="To" />
                </div>
              </div>
            </div>
            
            {/* Search */}
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-secondary">
                <Search className="w-4 h-4" />
              </div>
              <input type="text" className="bg-background border border-border rounded-lg text-text-primary py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Search by address/service" />
            </div>
          </div>
        </div>
        
        {/* Transaction List */}
        <div className="bg-surface rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-text-primary">Transaction List</h2>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 text-text-secondary hover:text-primary px-3 py-2 rounded-lg hover:bg-background transition-colors">
                <Download className="w-4 h-4" /> CSV
              </button>
              <button className="flex items-center gap-1 text-text-secondary hover:text-primary px-3 py-2 rounded-lg hover:bg-background transition-colors">
                <Download className="w-4 h-4" /> PDF
              </button>
              <button className="flex items-center gap-1 text-text-secondary hover:text-primary px-3 py-2 rounded-lg hover:bg-background transition-colors">
                <Clipboard className="w-4 h-4" /> Copy
              </button>
            </div>
          </div>
          
          {/* Transactions Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 px-2 text-left font-medium text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> Date
                    </span>
                  </th>
                  <th className="py-4 px-2 text-left font-medium text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Filter className="w-4 h-4" /> Type
                    </span>
                  </th>
                  <th className="py-4 px-2 text-left font-medium text-text-secondary">Details</th>
                  <th className="py-4 px-2 text-right font-medium text-text-secondary">Amount</th>
                  <th className="py-4 px-2 text-center font-medium text-text-secondary">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr 
                    key={transaction.id} 
                    className="border-b border-border hover:bg-background cursor-pointer transition-colors"
                    onClick={() => openTransactionModal(transaction)}
                  >
                    <td className="py-4 px-2 text-text-primary">{transaction.date}</td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(transaction.type)}
                        <span className="text-text-primary">{transaction.type}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-text-primary">{transaction.details}</td>
                    <td className="py-4 px-2 text-right font-medium text-text-primary">{transaction.amount}</td>
                    <td className="py-4 px-2">
                      <div className={`flex items-center justify-center gap-1 ${getStatusColor(transaction.status)}`}>
                        {getStatusIcon(transaction.status)}
                        <span>{transaction.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-text-secondary">Showing 1-4 of 42 transactions</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-md border border-border text-text-secondary hover:bg-background">Previous</button>
              <button className="px-3 py-1 rounded-md bg-primary text-white">1</button>
              <button className="px-3 py-1 rounded-md border border-border text-text-secondary hover:bg-background">2</button>
              <button className="px-3 py-1 rounded-md border border-border text-text-secondary hover:bg-background">3</button>
              <button className="px-3 py-1 rounded-md border border-border text-text-secondary hover:bg-background">Next</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Transaction Details Modal */}
      {isModalOpen && selectedTransaction && (
        <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg shadow-lg w-full max-w-2xl max-h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-text-primary">Transaction Details</h3>
                <button 
                  onClick={closeModal}
                  className="text-text-secondary hover:text-text-primary"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-text-secondary text-sm mb-1">Transaction Type</p>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(selectedTransaction.type)}
                    <p className="text-text-primary font-medium">{selectedTransaction.type}</p>
                  </div>
                </div>
                <div>
                  <p className="text-text-secondary text-sm mb-1">Transaction Status</p>
                  <div className={`flex items-center gap-1 ${getStatusColor(selectedTransaction.status)}`}>
                    {getStatusIcon(selectedTransaction.status)}
                    <span className="font-medium">{selectedTransaction.status}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-text-secondary text-sm mb-1">Transaction Hash</p>
                  <p className="text-text-primary font-mono bg-background p-2 rounded overflow-x-auto">
                    {selectedTransaction.hash}
                  </p>
                </div>
                
                <div>
                  <p className="text-text-secondary text-sm mb-1">Timestamp</p>
                  <p className="text-text-primary">{selectedTransaction.timestamp}</p>
                </div>
                
                <div>
                  <p className="text-text-secondary text-sm mb-1">Details</p>
                  <p className="text-text-primary">{selectedTransaction.details}</p>
                </div>
                
                <div>
                  <p className="text-text-secondary text-sm mb-1">Amount</p>
                  <p className="text-text-primary font-bold">{selectedTransaction.amount}</p>
                </div>
                
                <div>
                  <p className="text-text-secondary text-sm mb-1">Recipient</p>
                  <p className="text-text-primary font-mono bg-background p-2 rounded overflow-x-auto">
                    {selectedTransaction.recipient}
                  </p>
                </div>
                
                <div>
                  <p className="text-text-secondary text-sm mb-1">Gas Fee</p>
                  <p className="text-text-primary">{selectedTransaction.gasFee}</p>
                </div>
              </div>
              
              <div className="border-t border-border pt-4">
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on Blockchain Explorer
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;