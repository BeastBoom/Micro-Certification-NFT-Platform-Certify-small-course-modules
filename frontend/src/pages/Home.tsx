import React from "react";
import { Link } from "react-router-dom";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {
  ArrowRightIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const Home: React.FC = () => {
  const { connected } = useWallet();

  const features = [
    {
      icon: AcademicCapIcon,
      title: "Blockchain Certifications",
      description: "Issue tamper-proof certificates stored permanently on the Aptos blockchain",
    },
    {
      icon: ShieldCheckIcon,
      title: "Instant Verification",
      description: "Verify certificate authenticity instantly with blockchain-based validation",
    },
    {
      icon: GlobeAltIcon,
      title: "Global Recognition",
      description: "Certificates recognized worldwide with decentralized ownership",
    },
    {
      icon: UserGroupIcon,
      title: "Multi-Role Platform",
      description: "Support for students, educators, and institutions with different access levels",
    },
  ];

  const stats = [
    { label: "Certificates Issued", value: "15,678" },
    { label: "Active Courses", value: "127" },
    { label: "Registered Users", value: "8,934" },
    { label: "Verified Issuers", value: "45" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
              The Future of
              <br />
              Digital Certifications
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Issue, manage, and verify course completion certificates as NFTs on the Aptos blockchain.
              Tamper-proof, instantly verifiable, and owned by learners forever.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            {connected ? (
              <Link to="/dashboard" className="btn-primary btn text-lg px-8 py-4 rounded-xl group">
                Go to Dashboard
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div className="btn-primary btn text-lg px-8 py-4 rounded-xl opacity-75 cursor-not-allowed">
                Connect Wallet to Get Started
              </div>
            )}
            <Link to="/explore" className="btn-outline btn text-lg px-8 py-4 rounded-xl">
              Explore Certifications
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Why Choose Aptos CertiFi?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built on cutting-edge blockchain technology to revolutionize how educational credentials are issued, stored, and verified.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card card-hover p-8 text-center group">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 p-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card p-12 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border-primary-500/20">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of educators and learners who are already using blockchain technology to secure their educational achievements.
            </p>
            {connected ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/create" className="btn-primary btn text-lg px-8 py-4 rounded-xl">
                  Create Certification
                </Link>
                <Link to="/my-certifications" className="btn-outline btn text-lg px-8 py-4 rounded-xl">
                  View My Certificates
                </Link>
              </div>
            ) : (
              <div className="text-primary-400">Connect your wallet to start issuing and earning certifications</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
