"use client";

import { Search, X, ChevronDown } from "lucide-react";

export default function JobFilters({ 
  categories, 
  types, 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  selectedType, 
  setSelectedType 
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 bg-[#121212] p-6 rounded-3xl border border-neutral-800 shadow-xl">
      
      {/* Search Input */}
      <div className="flex-1">
        <label className="text-sm font-medium text-neutral-300 mb-1.5 block">Search Jobs</label>
        <div className="relative flex items-center bg-neutral-900 border border-neutral-800 rounded-xl text-white">
          <span className="pl-3 text-neutral-400 flex items-center">
            <Search className="w-4 h-4" />
          </span>
          <input 
            type="text"
            placeholder="Search by title, company, or requirements..." 
            className="bg-transparent border-none text-white placeholder:text-neutral-500 focus:outline-none p-3 w-full text-sm"
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
          />
          {searchQuery && (
            <button 
              type="button"
              onClick={() => setSearchQuery("")}
              className="pr-3 text-neutral-400 hover:text-white flex items-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Select */}
      <div className="w-full md:w-64">
        <label className="text-sm font-medium text-neutral-300 mb-1.5 block">Category</label>
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-white text-sm appearance-none focus:outline-none cursor-pointer pr-10"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
            <ChevronDown className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Job Type Filter Select */}
      <div className="w-full md:w-56">
        <label className="text-sm font-medium text-neutral-300 mb-1.5 block">Job Type</label>
        <div className="relative">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-white text-sm appearance-none focus:outline-none cursor-pointer pr-10"
          >
            <option value="all">All Types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
            <ChevronDown className="w-4 h-4" />
          </span>
        </div>
      </div>

    </div>
  );
}