import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

interface CreatorSearchProps {
  onResults: (creators: any[]) => void;
}

const CreatorSearch: React.FC<CreatorSearchProps> = ({ onResults }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [showAiSearch, setShowAiSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Regular search: GET /api/v1/creators/search?q=…
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/creators/search?q=${encodeURIComponent(
          searchQuery.trim()
        )}`
      );
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json(); // { creators: [] }
      onResults(data.creators);
    } catch (err) {
      console.error(err);
      onResults([]); // fallback to empty
    } finally {
      setIsSearching(false);
    }
  };

  // AI search: POST /api/v1/creators/ai-search
  const handleAiSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      const res = await fetch('http://localhost:5000/api/v1/creators/ai-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt }),
      });
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json(); // { creators: [] }
      onResults(data.creators);
    } catch (err) {
      console.error(err);
      onResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Regular Search */}
      <form onSubmit={handleSearch} className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search size={18} className="text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search creators by name or handle..."
          className="input pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          disabled={isSearching}
          className="absolute inset-y-0 right-0 flex items-center px-4 font-medium text-primary-600 hover:text-primary-700 disabled:text-slate-300"
        >
          {isSearching ? 'Searching…' : 'Search'}
        </button>
      </form>

      {/* AI Search Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowAiSearch(!showAiSearch)}
          className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          <Sparkles size={16} className="mr-1" />
          {showAiSearch ? 'Hide AI Search' : 'Try AI-Powered Search'}
        </button>
      </div>

      {/* AI Search Form */}
      {showAiSearch && (
        <form
          onSubmit={handleAiSearch}
          className="rounded-lg bg-primary-50 p-4"
        >
          <div className="mb-3 flex items-center">
            <Sparkles size={18} className="mr-2 text-primary-500" />
            <h3 className="text-sm font-medium text-primary-700">
              AI-Powered Creator Search
            </h3>
          </div>
          <textarea
            placeholder="Describe the perfect creator for your campaign..."
            className="input mb-3 min-h-[100px] w-full resize-none"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
          />
          <button
            type="submit"
            disabled={isSearching}
            className="btn btn-primary w-full disabled:bg-slate-300 disabled:text-slate-600"
          >
            {isSearching ? 'Generating…' : 'Generate Recommendations'}
          </button>
        </form>
      )}
    </div>
  );
};

export default CreatorSearch;
