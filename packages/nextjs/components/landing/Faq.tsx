import React, { useState } from "react";

const FAQ_ITEMS = [
  {
    id: 1,
    question: "How does Stone.proof enhance mineral traceability?",
    answer:
      "Stone.proof uses blockchain technology to create immutable records of mineral assets from extraction to market. Each mineral batch is registered as an ERC721 token on the Base Layer 2 blockchain, providing verifiable proof of origin, processing history, and ownership throughout the entire supply chain.",
  },
  {
    id: 2,
    question: "How do different roles work in the platform?",
    answer:
      "Our platform enforces role-based access through smart contracts. Miners register minerals, Refiners process and document stages, Inspectors validate quality, Auditors ensure compliance, Transporters track shipments, and Buyers can verify the full history before purchase. Each role has a dedicated portal with specific capabilities.",
  },
  {
    id: 3,
    question: "What blockchain technology powers Stone.proof?",
    answer:
      "Stone.proof is built on Base Layer 2, providing low gas fees, high throughput, and enterprise-grade security while maintaining compatibility with Ethereum's robust ecosystem. This enables cost-effective tracking of even high-volume mineral transactions.",
  },
  {
    id: 4,
    question: "How does tokenization of minerals work?",
    answer:
      "Minerals are registered and minted as unique NFTs (ERC721 tokens), embedding crucial data like origin, composition, processing stages, and validation status. This creates a digital twin of the physical asset that follows it through the supply chain, ensuring end-to-end traceability.",
  },
  {
    id: 5,
    question: "How does the validation process ensure mineral integrity?",
    answer:
      "Our system requires multiple validation checkpoints from authorized Inspectors and Auditors before minerals can be cleared for sale. Each validation event is recorded on-chain, creating an immutable audit trail that prevents fraud and ensures regulatory compliance.",
  },
  {
    id: 6,
    question: "How does Stone.proof resolve disputes in the supply chain?",
    answer:
      "Our platform includes a dedicated dispute resolution mechanism where issues can be raised, documented, and resolved. Super Admins can intervene when necessary, with all actions recorded on-chain to maintain transparency and accountability throughout the resolution process.",
  },
];

interface FaqItemProps {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: (id: number) => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ id, question, answer, isOpen, onToggle }) => {
  return (
    <div className="border border-[#23262F] rounded-xl bg-[#060910] h-fit">
      <button className="w-full flex items-center justify-between p-5 focus:outline-none" onClick={() => onToggle(id)}>
        <span className="text-white font-medium text-lg text-left">{question}</span>
        <svg
          className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-5 text-gray-400 text-base">{answer}</div>
      </div>
    </div>
  );
};

const Faq = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full bg-gradient-to-b from-[#10131A] to-[#0A0F1B] py-16 px-4 flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">Frequently Asked Questions</h2>
      <p className="text-gray-300 text-center max-w-2xl mb-12 text-base md:text-lg">
        Learn more about how our blockchain solution transforms mineral supply chain transparency, verification, and
        trust. These questions address the core functionality of our mineral traceability platform.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl auto-rows-min">
        {FAQ_ITEMS.map(item => (
          <FaqItem
            key={item.id}
            id={item.id}
            question={item.question}
            answer={item.answer}
            isOpen={openId === item.id}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </section>
  );
};

export default Faq;
