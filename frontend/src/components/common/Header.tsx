import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import {
  Bars3Icon,
  XMarkIcon,
  AcademicCapIcon,
  HomeIcon,
  PlusCircleIcon,
  EyeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import WalletSelector from '../wallet/WalletSelector';

const Header: React.FC = () => {
  const location = useLocation();
  const { connected, account, disconnect } = useWallet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Explore', href: '/explore', icon: EyeIcon },
    ...(connected
      ? [
          { name: 'Dashboard', href: '/dashboard', icon: UserCircleIcon },
          { name: 'Create', href: '/create', icon: PlusCircleIcon },
          { name: 'My Certificates', href: '/my-certifications', icon: AcademicCapIcon },
        ]
      : []),
  ];

  const isActive = (path: string) => location.pathname === path;

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-glass border-b border-gray-700/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <AcademicCapIcon className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold gradient-text">Aptos CertiFi</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary-400 bg-primary-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {connected && account ? (
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-sm text-gray-400">{truncateAddress(account.address)}</div>
                <button onClick={disconnect} className="btn-ghost btn-sm flex items-center space-x-2">
                  <ArrowRightOnRectangleIcon className="w-4 h-4" />
                  <span>Disconnect</span>
                </button>
              </div>
            ) : (
              <WalletSelector />
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden backdrop-blur-glass border-t border-gray-700/50">
          <div className="px-4 py-6 space-y-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary-400 bg-primary-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Mobile Wallet Info */}
            {connected && account && (
              <div className="pt-4 border-t border-gray-700/50">
                <div className="text-sm text-gray-400 mb-3">Connected: {truncateAddress(account.address)}</div>
                <button
                  onClick={() => {
                    disconnect();
                    setMobileMenuOpen(false);
                  }}
                  className="btn-ghost btn-sm w-full flex items-center justify-center space-x-2"
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4" />
                  <span>Disconnect Wallet</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
