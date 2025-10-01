import React from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Link } from "react-router-dom";
import {
  AcademicCapIcon,
  UserGroupIcon,
  TrophyIcon,
  ChartBarIcon,
  PlusCircleIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

const Dashboard: React.FC = () => {
  const { account } = useWallet();

  // Mock user stats (replace with blockchain data in production)
  const userStats = {
    certificatesEarned: 3,
    certificatesIssued: 12,
    skillPoints: 450,
    reputation: 98,
  };

  const recentCertifications = [
    {
      id: 1,
      title: "Blockchain Fundamentals",
      issuer: "Aptos Academy",
      earnedDate: "2024-03-15",
      grade: "A+",
      skills: ["Blockchain", "Cryptography", "DLT"],
    },
    {
      id: 2,
      title: "Smart Contract Development",
      issuer: "Dev Institute",
      earnedDate: "2024-02-28",
      grade: "A",
      skills: ["Move", "Smart Contracts", "Aptos"],
    },
  ];

  const quickActions = [
    {
      title: "Create Certification",
      description: "Issue a new certificate to a student",
      icon: PlusCircleIcon,
      link: "/create",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "My Certifications",
      description: "View all your earned certificates",
      icon: AcademicCapIcon,
      link: "/my-certifications",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Explore Programs",
      description: "Discover new certification programs",
      icon: EyeIcon,
      link: "/explore",
      color: "from-purple-500 to-purple-600",
    },
  ];

  if (!account) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Wallet Not Connected</h1>
          <p className="text-gray-400">Please connect your wallet to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back!</h1>
          <p className="text-gray-400 text-lg">
            Address: {account.address.slice(0, 10)}...{account.address.slice(-8)}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6 text-center">
            <AcademicCapIcon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">{userStats.certificatesEarned}</div>
            <div className="text-gray-400 text-sm">Certificates Earned</div>
          </div>

          <div className="card p-6 text-center">
            <UserGroupIcon className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">{userStats.certificatesIssued}</div>
            <div className="text-gray-400 text-sm">Certificates Issued</div>
          </div>

          <div className="card p-6 text-center">
            <TrophyIcon className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">{userStats.skillPoints}</div>
            <div className="text-gray-400 text-sm">Skill Points</div>
          </div>

          <div className="card p-6 text-center">
            <ChartBarIcon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">{userStats.reputation}%</div>
            <div className="text-gray-400 text-sm">Reputation</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link} className="card card-hover p-6 group">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} p-3 mb-4 group-hover:scale-110 transition-transform`}
                >
                  <action.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{action.title}</h3>
                <p className="text-gray-400">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Certifications */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Certifications</h2>
            <Link to="/my-certifications" className="text-primary-400 hover:text-primary-300 transition-colors">
              View All
            </Link>
          </div>

          <div className="grid gap-6">
            {recentCertifications.map((cert) => (
              <div key={cert.id} className="card card-hover p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{cert.title}</h3>
                    <div className="flex items-center gap-4 text-gray-400 mb-3">
                      <span>Issued by: {cert.issuer}</span>
                      <span>•</span>
                      <span>Earned: {cert.earnedDate}</span>
                      <span>•</span>
                      <span className="text-green-400 font-semibold">Grade: {cert.grade}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <button className="btn-outline btn-sm">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
