import React, { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ShareIcon,
  CheckBadgeIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

const MyCertifications: React.FC = () => {
  const { account } = useWallet();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Mock data - replace with actual blockchain data fetching
  const certificates = [
    {
      id: "cert_001",
      title: "Blockchain Fundamentals",
      issuer: "Aptos Academy",
      issuerLogo: "https://via.placeholder.com/40x40/6366f1/ffffff?text=AA",
      earnedDate: "2024-03-15",
      grade: "A+",
      skills: ["Blockchain", "Cryptography", "DLT"],
      verified: true,
      image: "https://via.placeholder.com/400x300/3b82f6/ffffff?text=Certificate",
      certificationId: "BF-2024-001245",
      verificationUrl: "https://verify.aptoscert.io/cert_001",
      description: "Comprehensive introduction to blockchain technology and its applications.",
    },
    {
      id: "cert_002",
      title: "Smart Contract Development",
      issuer: "Dev Institute",
      issuerLogo: "https://via.placeholder.com/40x40/10b981/ffffff?text=DI",
      earnedDate: "2024-02-28",
      grade: "A",
      skills: ["Move", "Smart Contracts", "Aptos"],
      verified: true,
      image: "https://via.placeholder.com/400x300/10b981/ffffff?text=Certificate",
      certificationId: "SC-2024-000892",
      verificationUrl: "https://verify.aptoscert.io/cert_002",
      description: "Advanced course on developing smart contracts using Move language.",
    },
    {
      id: "cert_003",
      title: "Web3 UX Design",
      issuer: "Design Academy",
      issuerLogo: "https://via.placeholder.com/40x40/ef4444/ffffff?text=DA",
      earnedDate: "2024-01-20",
      grade: "A-",
      skills: ["UX Design", "Web3", "User Research"],
      verified: true,
      image: "https://via.placeholder.com/400x300/ef4444/ffffff?text=Certificate",
      certificationId: "WUD-2024-000678",
      verificationUrl: "https://verify.aptoscert.io/cert_003",
      description: "Designing intuitive user experiences for decentralized applications.",
    },
  ];

  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch =
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    if (filterType === "all") return matchesSearch;
    if (filterType === "verified") return matchesSearch && cert.verified;

    if (filterType === "recent") {
      const certDate = new Date(cert.earnedDate);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      return matchesSearch && certDate > threeMonthsAgo;
    }
    return matchesSearch;
  });

  const handleShare = (cert: any) => {
    if (navigator.share) {
      navigator.share({
        title: `${cert.title} Certificate`,
        text: `I earned a certificate in ${cert.title} from ${cert.issuer}!`,
        url: cert.verificationUrl,
      });
    } else {
      navigator.clipboard.writeText(cert.verificationUrl);
      // Optional: Show toast notification
    }
  };

  const handleVerify = (cert: any) => {
    window.open(cert.verificationUrl, "_blank");
  };

  if (!account) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Wallet Not Connected</h1>
          <p className="text-gray-400">Please connect your wallet to view your certifications.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Certifications</h1>
          <p className="text-gray-400 text-lg">
            {certificates.length} blockchain-verified certificates earned
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search certificates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="input pr-10"
              >
                <option value="all">All Certificates</option>
                <option value="verified">Verified Only</option>
                <option value="recent">Recent (3 months)</option>
              </select>
              <FunnelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        {filteredCertificates.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
              <CheckBadgeIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {searchTerm ? "No certificates found" : "No certificates yet"}
            </h3>
            <p className="text-gray-400 mb-6">
              {searchTerm
                ? "Try adjusting your search terms or filters"
                : "Start earning certificates by completing courses and programs"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((cert) => (
              <div key={cert.id} className="card card-hover group overflow-hidden">
                {/* Certificate Image */}
                <div className="relative h-48 bg-gradient-to-br from-primary-500 to-secondary-500">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 right-4">
                    {cert.verified && (
                      <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <CheckBadgeIcon className="w-3 h-3" />
                        Verified
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-2">
                      <img src={cert.issuerLogo} alt={cert.issuer} className="w-8 h-8 rounded-full" />
                      <span className="text-white text-sm font-medium">{cert.issuer}</span>
                    </div>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {cert.title}
                  </h3>

                  <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                    <span>Earned: {new Date(cert.earnedDate).toLocaleDateString()}</span>
                    <span className="text-green-400 font-semibold">Grade: {cert.grade}</span>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{cert.description}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary-500/20 text-primary-300 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-600 text-gray-300 rounded text-xs">
                        +{cert.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleVerify(cert)}
                      className="btn-outline btn-sm flex-1 flex items-center justify-center gap-2"
                    >
                      <EyeIcon className="w-4 h-4" />
                      Verify
                    </button>
                    <button
                      onClick={() => handleShare(cert)}
                      className="btn-ghost btn-sm flex items-center justify-center gap-2"
                    >
                      <ShareIcon className="w-4 h-4" />
                      Share
                    </button>
                  </div>

                  {/* Certificate ID */}
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="text-xs text-gray-500">ID: {cert.certificationId}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">{certificates.length}</div>
            <div className="text-gray-400">Total Certificates</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">
              {new Set(certificates.flatMap((c) => c.skills)).size}
            </div>
            <div className="text-gray-400">Skills Acquired</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">{new Set(certificates.map((c) => c.issuer)).size}</div>
            <div className="text-gray-400">Institutions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCertifications;
