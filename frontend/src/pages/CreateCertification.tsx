import React, { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import toast from "react-hot-toast";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

const CreateCertification: React.FC = () => {
  const { account, signAndSubmitTransaction } = useWallet();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    studentAddress: "",
    courseName: "",
    skills: [""],
    grade: "A",
    metadataUri: "",
    description: "",
  });

  const gradeOptions = [
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "Pass",
    "Completed",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData((prev) => ({ ...prev, skills: newSkills }));
  };

  const addSkill = () => {
    setFormData((prev) => ({ ...prev, skills: [...prev.skills, ""] }));
  };

  const removeSkill = (index: number) => {
    if (formData.skills.length > 1) {
      const newSkills = formData.skills.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, skills: newSkills }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!account) {
      toast.error("Please connect your wallet");
      return;
    }

    if (!formData.studentAddress || !formData.courseName) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.studentAddress.match(/^0x[a-fA-F0-9]{64}$/)) {
      toast.error("Please enter a valid Aptos address");
      return;
    }

    setLoading(true);

    try {
      const validSkills = formData.skills.filter((skill) => skill.trim() !== "");

      const payload = {
        type: "entry_function_payload",
        function:
          "0x19004ee0356664f98fe6a8add771a2747a2b38328a70af222faccb3fdfe226ad::MicroCertification::issue_certification",
        arguments: [
          formData.studentAddress,
          formData.courseName,
          formData.metadataUri || `ipfs://certification/${Date.now()}`,
          validSkills,
          formData.grade,
        ],
        type_arguments: [],
      };

      const response = await signAndSubmitTransaction(payload);
      console.log("Transaction:", response);

      toast.success("Certification issued successfully!");

      setFormData({
        studentAddress: "",
        courseName: "",
        skills: [""],
        grade: "A",
        metadataUri: "",
        description: "",
      });
    } catch (error: any) {
      console.error("Error issuing certification:", error);
      toast.error(error.message || "Failed to issue certification");
    } finally {
      setLoading(false);
    }
  };

  if (!account) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Wallet Not Connected
          </h1>
          <p className="text-gray-400">Please connect your wallet to create certifications.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Create New Certification</h1>
          <p className="text-gray-400 text-lg">
            Issue a blockchain-based certificate to recognize student achievements
          </p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student Address */}
            <div>
              <label className="label">Student Wallet Address *</label>
              <input
                type="text"
                name="studentAddress"
                value={formData.studentAddress}
                onChange={handleInputChange}
                placeholder="0x1234567890abcdef..."
                className="input"
                required
              />
              <p className="text-sm text-gray-400 mt-2">
                The Aptos wallet address of the student receiving the certificate
              </p>
            </div>

            {/* Course Name */}
            <div>
              <label className="label">Course/Program Name *</label>
              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleInputChange}
                placeholder="e.g., Blockchain Fundamentals"
                className="input"
                required
              />
            </div>

            {/* Skills */}
            <div>
              <label className="label">Skills Acquired</label>
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex gap-3 mb-3">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    placeholder="e.g., Smart Contracts"
                    className="input flex-1"
                  />
                  {formData.skills.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="btn-ghost btn p-2"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addSkill}
                className="btn-outline btn-sm flex items-center gap-2"
              >
                <PlusIcon className="w-4 h-4" />
                Add Skill
              </button>
            </div>

            {/* Grade */}
            <div>
              <label className="label">Grade/Score</label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                className="input"
              >
                {gradeOptions.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>

            {/* Metadata URI */}
            <div>
              <label className="label">Metadata URI (Optional)</label>
              <input
                type="url"
                name="metadataUri"
                value={formData.metadataUri}
                onChange={handleInputChange}
                placeholder="ipfs://... or https://..."
                className="input"
              />
              <p className="text-sm text-gray-400 mt-2">
                Link to additional certificate metadata (will auto-generate if empty)
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="label">Description (Optional)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Additional details about the certification..."
                rows={4}
                className="input resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button type="submit" disabled={loading} className="btn-primary btn flex-1">
                {loading ? (
                  <>
                    <div className="spinner mr-2" />
                    Issuing Certificate...
                  </>
                ) : (
                  "Issue Certificate"
                )}
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    studentAddress: "",
                    courseName: "",
                    skills: [""],
                    grade: "A",
                    metadataUri: "",
                    description: "",
                  })
                }
                className="btn-ghost btn px-8"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>

        {/* Info Section */}
        <div className="mt-8 card p-6 bg-blue-500/10 border-blue-500/20">
          <h3 className="text-xl font-semibold text-white mb-4">📋 Before You Issue</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• Ensure the student wallet address is correct</li>
            <li>• Verify the student has completed all course requirements</li>
            <li>• Double-check the course name and skills for accuracy</li>
            <li>• Once issued, certificates cannot be modified or deleted</li>
            <li>• Gas fees will be deducted from your wallet</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateCertification;
