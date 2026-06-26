'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import JobCard from '@/components/jobs/JobCard';
import JobCardSkeleton from '@/components/JobCardSkeleton';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    minExperience: '',
    maxExperience: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs?public=true');
      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm || 
      job.job_title?.toLowerCase().includes(searchLower) ||
      job.location?.toLowerCase().includes(searchLower) ||
      job.tags?.some(tag => tag.toLowerCase().includes(searchLower));

    const matchesLocation = !filters.location || 
      job.location?.toLowerCase().includes(filters.location.toLowerCase());
    const matchesMinExp = !filters.minExperience || 
      job.required_experience_years >= parseInt(filters.minExperience);
    const matchesMaxExp = !filters.maxExperience || 
      job.required_experience_years <= parseInt(filters.maxExperience);

    return matchesSearch && matchesLocation && matchesMinExp && matchesMaxExp;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ location: '', minExperience: '', maxExperience: '' });
  };

  const hasActiveFilters = searchTerm || filters.location || filters.minExperience || filters.maxExperience;

  return (
    <div className="section-card mx-auto mt-6 max-w-6xl border-2 border-black p-6 dark:border-white md:p-8">
      {/* Header */}
      <div className="mb-6 text-center">
        <p className="section-label">Opportunities</p>
        <h1 className="gradient-text text-5xl font-black uppercase leading-[0.86] tracking-tighter md:text-6xl">
          Open Positions
        </h1>
        <p className="mt-3 font-bold opacity-70">
          Find your next career move
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 border-2 border-black/10 p-4 dark:border-white/10">
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Search Input */}
          <div className="flex flex-1 items-center gap-2 border-2 border-black/20 px-3 py-2 dark:border-white/20">
            <Search size={18} className="opacity-50" />
            <input
              type="text"
              className="flex-1 bg-transparent text-sm font-bold outline-none"
              placeholder="Search by title, location, skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="text-xs opacity-50 hover:opacity-100"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="button"
            className={`flex items-center gap-2 border-2 px-4 py-2 text-[10px] font-black uppercase tracking-wider transition-colors ${
              showFilters
                ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                : 'border-black/30 dark:border-white/30'
            }`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            Filters
            {hasActiveFilters && <span className="ml-1 inline-block h-2 w-2 rounded-full bg-purple-500" />}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 border-t border-black/10 pt-4 dark:border-white/10">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-[10px] font-black uppercase tracking-widest">Location</label>
                <input
                  type="text"
                  placeholder="e.g., Remote, Mumbai"
                  className="w-full border-2 border-black/20 bg-transparent px-3 py-2 text-sm font-bold outline-none dark:border-white/20"
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-black uppercase tracking-widest">Min Experience (years)</label>
                <input
                  type="number"
                  placeholder="0"
                  min="0"
                  className="w-full border-2 border-black/20 bg-transparent px-3 py-2 text-sm font-bold outline-none dark:border-white/20"
                  value={filters.minExperience}
                  onChange={(e) => setFilters({...filters, minExperience: e.target.value})}
                />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-black uppercase tracking-widest">Max Experience (years)</label>
                <input
                  type="number"
                  placeholder="20"
                  min="0"
                  className="w-full border-2 border-black/20 bg-transparent px-3 py-2 text-sm font-bold outline-none dark:border-white/20"
                  value={filters.maxExperience}
                  onChange={(e) => setFilters({...filters, maxExperience: e.target.value})}
                />
              </div>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                className="mt-3 flex items-center gap-1 text-[10px] font-black uppercase tracking-wider opacity-60 hover:opacity-100"
                onClick={clearFilters}
              >
                <X size={14} /> Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      {!loading && (
        <p className="mb-6 text-center text-[10px] font-black uppercase tracking-widest opacity-60">
          Showing <span className="text-purple-600 dark:text-purple-400">{filteredJobs.length}</span> of {jobs.length} positions
        </p>
      )}

      {/* Job Cards */}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.job_id} job={job} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center border-2 border-black/20 dark:border-white/20">
            <Search size={28} className="opacity-50" />
          </div>
          <p className="font-bold opacity-60">
            {hasActiveFilters
              ? 'No positions match your criteria'
              : 'No open positions at the moment'}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              className="mt-4 border-2 border-black px-4 py-2 text-[10px] font-black uppercase tracking-wider transition-colors hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
