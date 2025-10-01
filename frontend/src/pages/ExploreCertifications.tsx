import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  UserGroupIcon,
  ClockIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

const ExploreCertifications: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  // Mock programs - replace with on-chain or API data
  const programs = [
    {
      id: 1,
      title: "Blockchain Fundamentals",
      description:
        "Learn the core concepts of blockchain technology, including distributed ledgers, consensus mechanisms, and cryptographic principles.",
      issuer: "Aptos Academy",
      issuerLogo: "https://via.placeholder.com/40x40/6366f1/ffffff?text=AA",
      duration: "4 weeks",
      difficulty: "Beginner",
      participants: 1245,
      price: "Free",
      category: "Technology",
      skills: ["Blockchain", "Cryptography", "DLT"],
      status: "Active",
      rating: 4.8,
      image: "https://via.placeholder.com/300x200/3b82f6/ffffff?text=Blockchain",
      verified: true,
    },
    {
      id: 2,
      title: "Smart Contract Development",
      description:
        "Master Move programming language and build secure smart contracts on the Aptos blockchain platform.",
      issuer: "Dev Institute",
      issuerLogo: "https://via.placeholder.com/40x40/10b981/ffffff?text=DI",
      duration: "6 weeks",
      difficulty: "Intermediate",
      participants: 892,
      price: "0.5 APT",
      category: "Development",
      skills: ["Move", "Smart Contracts", "Aptos"],
      status: "Active",
      rating: 4.9,
      image: "https://via.placeholder.com/300x200/10b981/ffffff?text=Smart+Contracts",
      verified: true,
    },
    {
      id: 3,
      title: "DeFi Protocol Design",
      description:
        "Understand decentralized finance protocols, tokenomics, and how to design sustainable DeFi applications.",
      issuer: "Finance Labs",
      issuerLogo: "https://via.placeholder.com/40x40/f59e0b/ffffff?text=FL",
      duration: "8 weeks",
      difficulty: "Advanced",
      participants: 456,
      price: "1.2 APT",
      category: "Finance",
      skills: ["DeFi", "Tokenomics", "Protocol Design"],
      status: "Active",
      rating: 4.7,
      image: "https://via.placeholder.com/300x200/f59e0b/ffffff?text=DeFi",
      verified: true,
    },
    {
      id: 4,
      title: "Web3 UX Design",
      description:
        "Learn to design intuitive user experiences for decentralized applications and Web3 platforms.",
      issuer: "Design Academy",
      issuerLogo: "https://via.placeholder.com/40x40/ef4444/ffffff?text=DA",
      duration: "5 weeks",
      difficulty: "Intermediate",
      participants: 678,
      price: "Free",
      category: "Design",
      skills: ["UX Design", "Web3", "User Research"],
      status: "Active",
      rating: 4.6,
      image: "https://via.placeholder.com/300x200/ef4444/ffffff?text=UX+Design",
      verified: true,
    },
    {
      id: 5,
      title: "NFT Marketplace Development",
      description:
        "Build complete NFT marketplaces from smart contracts to frontend interfaces on Aptos.",
      issuer: "Tech Guild",
      issuerLogo: "https://via.placeholder.com/40x40/8b5cf6/ffffff?text=TG",
      duration: "10 weeks",
      difficulty: "Advanced",
      participants: 234,
      price: "2.0 APT",
      category: "Development",
      skills: ["NFTs", "Full-stack", "Marketplace"],
      status: "Active",
      rating: 4.8,
      image: "https://via.placeholder.com/300x200/8b5cf6/ffffff?text=NFT+Dev",
      verified: true,
    },
    {
      id: 6,
      title: "Cryptocurrency Trading",
      description: "Master the fundamentals of cryptocurrency trading and technical analysis.",
      issuer: "Crypto Academy",
      issuerLogo: "https://via.placeholder.com/40x40/06b6d4/ffffff?text=CA",
      duration: "3 weeks",
      difficulty: "Beginner",
      participants: 956,
      price: "Free",
      category: "Finance",
      skills: ["Trading", "Technical Analysis", "Risk Management"],
      status: "Active",
      rating: 4.4,
      image: "https://via.placeholder.com/300x200/06b6d4/ffffff?text=Trading",
      verified: false,
    },
  ];

  const categories = ["all", "Technology", "Development", "Finance", "Design", "Business"];
  const difficulties = ["all", "Beginner", "Intermediate", "Advanced"];

  // Filtering logic
  const filteredPrograms = programs.filter((program) => {
    const matchesSearch =
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = categoryFilter === "all" || program.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === "all" || program.difficulty === difficultyFilter;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Sorting logic
  const sortedPrograms = [...filteredPrograms].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.participants - a.participants;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id;
      case "duration":
        return parseInt(a.duration) - parseInt(b.duration);
      default:
        return 0;
    }
  });

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIconSolid key={i} className="w-4 h-4 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarIcon key="half" className="w-4 h-4 text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarIcon key={`empty-${i}`} className="w-4 h-4 text-gray-600" />);
    }

    return stars;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "text-green-400 bg-green-400/20";
      case "Intermediate":
        return "text-yellow-400 bg-yellow-400/20";
      case "Advanced":
        return "text-red-400 bg-red-400/20";
      default:
        return "text-gray-400 bg-gray-400/20";
    }
  };

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Explore Certification Programs</h1>
          <p className="text-gray-400 text-lg">
            Discover {programs.length} blockchain-verified certification programs from trusted institutions
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search programs, skills, or institutions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="input w-full"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="input w-full"
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === "all" ? "All Levels" : difficulty}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input w-full">
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {sortedPrograms.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
              <AcademicCapIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No programs found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search terms or filters</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
                setDifficultyFilter("all");
              }}
              className="btn-outline btn"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-400">
                Showing {sortedPrograms.length} of {programs.length} programs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedPrograms.map((program) => (
                <div key={program.id} className="card card-hover group overflow-hidden">
                  {/* Program Image */}
                  <div className="relative h-48">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      {program.verified && (
                        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">Verified</div>
                      )}
                      <div className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(program.difficulty)}`}>
                        {program.difficulty}
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-2">
                        <img src={program.issuerLogo} alt={program.issuer} className="w-8 h-8 rounded-full" />
                        <span className="text-white text-sm font-medium">{program.issuer}</span>
                      </div>
                    </div>
                  </div>

                  {/* Program Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {program.title}
                    </h3>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">{program.description}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">{renderStars(program.rating)}</div>
                      <span className="text-gray-400 text-sm">
                        {program.rating} ({program.participants} students)
                      </span>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {program.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-primary-500/20 text-primary-300 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                      {program.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-600 text-gray-300 rounded text-xs">
                          +{program.skills.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Program Info */}
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UserGroupIcon className="w-4 h-4" />
                        <span>{program.participants.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CurrencyDollarIcon className="w-4 h-4" />
                        <span className={program.price === "Free" ? "text-green-400" : "text-yellow-400"}>
                          {program.price}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link to={`/program/${program.id}`} className="btn-primary btn w-full">
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExploreCertifications;
