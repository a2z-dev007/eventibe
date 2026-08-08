'use client';

import Link from 'next/link';
import { useScrollLock, modalScrollAreaProps, preventModalBackdropScroll } from '@/hooks/useScrollLock';
import {
  Search as SearchIcon,
  SlidersHorizontal,
  X,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { VenueResultCard } from '@/components/events/event-search/VenueResultCard';
import { VenueFilterSidebar } from '@/components/events/event-search/VenueFilterSidebar';
import type { Filters, Venue } from '@/components/events/event-search/types';
import { PER_PAGE } from '@/components/events/event-search/data';
import { useScrollDirection } from '@/hooks/useScrollDirection';

interface VenueSearchResultsPanelProps {
  totalRecords: number;
  processedResults: Venue[];
  isLoading: boolean;
  isError: boolean;
  page: number;
  totalPages: number;
  sort: string;
  viewType: 'grid' | 'list';
  sidebarOpen: boolean;
  isAnyFilterActive: boolean;
  filters: Filters;
  location: { value: string | number; label: string } | null;
  cityName?: string;
  venueTypeRecords?: { id: number; name: string }[];
  eventTypeRecords?: { id: number; name: string }[];
  setLocation: (loc: { value: string | number; label: string } | null) => void;
  onSortChange: (sort: string) => void;
  onViewTypeChange: (view: 'grid' | 'list') => void;
  onSidebarOpen: (open: boolean) => void;
  onUpdateFilters: (partial: Partial<Filters>) => void;
  onClearFilters: () => void;
  onPageChange: (page: number) => void;
}

function ListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row animate-pulse"
        >
          <div className="md:w-64 lg:w-72 shrink-0 aspect-[16/9] md:min-h-[180px] bg-gray-200" />
          <div className="flex-1 p-3 lg:p-4 space-y-3">
            <div className="h-4 w-1/2 bg-gray-100 rounded" />
            <div className="h-5 w-3/4 bg-gray-200 rounded" />
            <div className="flex gap-2">
              <div className="h-5 w-16 bg-gray-100 rounded-full" />
              <div className="h-5 w-16 bg-gray-100 rounded-full" />
            </div>
            <div className="h-8 w-full bg-gray-50 rounded mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
          <div className="aspect-[16/9] bg-gray-200" />
          <div className="p-3 space-y-2">
            <div className="h-4 w-2/3 bg-gray-100 rounded" />
            <div className="h-5 w-full bg-gray-200 rounded" />
            <div className="h-8 bg-gray-50 rounded mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function VenueSearchResultsPanel({
  totalRecords,
  processedResults,
  isLoading,
  isError,
  page,
  totalPages,
  sort,
  viewType,
  sidebarOpen,
  isAnyFilterActive,
  filters,
  location,
  cityName,
  venueTypeRecords = [],
  eventTypeRecords = [],
  setLocation,
  onSortChange,
  onViewTypeChange,
  onSidebarOpen,
  onUpdateFilters,
  onClearFilters,
  onPageChange,
}: VenueSearchResultsPanelProps) {
  const isButtonsVisible = useScrollDirection();

  useScrollLock(sidebarOpen);

  const activeFilterCount =
    (location ? 1 : 0) +
    filters.venueTypes.length +
    filters.eventTypes.length +
    (filters.minCap !== 0 || filters.maxCap !== 10000 ? 1 : 0) +
    (filters.minVeg !== 0 || filters.maxVeg !== 5000 ? 1 : 0);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const removeVenueType = (id: number) => {
    onUpdateFilters({ venueTypes: filters.venueTypes.filter((v) => v !== id) });
  };

  const removeEventType = (id: number) => {
    onUpdateFilters({ eventTypes: filters.eventTypes.filter((v) => v !== id) });
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="mb-3">
        <nav className="flex items-center text-sm text-gray-600">
          <Link href="/" className="text-[#FF9530] hover:text-[#e8851c]">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <span>Venues{cityName ? ` in ${cityName}` : ''}</span>
        </nav>
      </div>

      {/* Applied filters chips */}
      {isAnyFilterActive && (
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Applied Filters:</span>
            <div className="flex flex-wrap items-center gap-2 flex-1">
              {location && (
                <div className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full text-sm border border-orange-200">
                  <span className="whitespace-nowrap">{location.label}</span>
                  <button
                    type="button"
                    onClick={() => setLocation(null)}
                    className="ml-1 hover:bg-orange-100 rounded-full p-0.5 transition-colors"
                    aria-label="Remove location filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {filters.venueTypes.map((id) => {
                const label = venueTypeRecords.find((v) => v.id === id)?.name || `Venue ${id}`;
                return (
                  <div
                    key={`vt-${id}`}
                    className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm border border-blue-200"
                  >
                    <span className="whitespace-nowrap">{label}</span>
                    <button
                      type="button"
                      onClick={() => removeVenueType(id)}
                      className="ml-1 hover:bg-blue-100 rounded-full p-0.5 transition-colors"
                      aria-label={`Remove ${label}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
              {filters.eventTypes.map((id) => {
                const label = eventTypeRecords.find((e) => e.id === id)?.name || `Event ${id}`;
                return (
                  <div
                    key={`et-${id}`}
                    className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm border border-emerald-200"
                  >
                    <span className="whitespace-nowrap">{label}</span>
                    <button
                      type="button"
                      onClick={() => removeEventType(id)}
                      className="ml-1 hover:bg-emerald-100 rounded-full p-0.5 transition-colors"
                      aria-label={`Remove ${label}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
              <button
                type="button"
                onClick={onClearFilters}
                className="text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-md whitespace-nowrap"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile filter FAB */}
      <div
        className={`lg:hidden fixed bottom-6 right-4 sm:right-6 z-40 transition-all duration-300 ${
          isButtonsVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={() => onSidebarOpen(true)}
          className="bg-[#FF9530] hover:bg-[#e8851c] text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 font-medium transition-all active:scale-95"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="text-sm">Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-white text-[#FF9530] rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile sidebar bottom-sheet */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[10000] bg-black/50"
          data-lenis-prevent
          onWheel={preventModalBackdropScroll}
          onTouchMove={preventModalBackdropScroll}
          onClick={() => onSidebarOpen(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-hidden flex flex-col animate-slide-up"
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b px-4 py-4 flex items-center justify-between z-10">
              <h3 className="text-lg font-bold text-gray-900">Filters</h3>
              <button
                type="button"
                onClick={() => onSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div
              {...modalScrollAreaProps}
              className={`flex-1 overflow-y-auto px-4 py-4 ${modalScrollAreaProps.className}`}
            >
              <VenueFilterSidebar
                filters={filters}
                onChange={onUpdateFilters}
                onClear={onClearFilters}
              />
            </div>
            <div className="sticky bottom-0 bg-white border-t px-4 py-4 flex gap-3">
              <button
                type="button"
                onClick={onClearFilters}
                className="flex-1 border border-[#FF9530] text-[#FF9530] hover:bg-[#FF9530]/10 font-semibold rounded-xl py-2.5 text-sm"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={() => onSidebarOpen(false)}
                className="flex-1 gradient-btn text-white font-semibold rounded-xl py-2.5 text-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Desktop sidebar */}
        <div className="hidden lg:block lg:col-span-1 sticky top-20 self-start">
          <VenueFilterSidebar
            filters={filters}
            onChange={onUpdateFilters}
            onClear={onClearFilters}
          />
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {/* Header row — matches search-results */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                {cityName ? (
                  <>
                    {cityName}: {totalRecords.toLocaleString()} venues found
                  </>
                ) : (
                  <>{totalRecords.toLocaleString()} venues found</>
                )}
              </h1>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2 flex-1 sm:flex-initial">
                <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
                <div className="relative flex-1 sm:flex-initial">
                  <select
                    value={sort}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-xl px-3 py-2 pr-8 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9530]/30 w-full sm:w-auto cursor-pointer"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="rating">Highest Rated</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                    <option value="capacity-high">Capacity: High to Low</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="hidden md:flex items-center bg-[#F5F5F5] rounded-full p-1 border border-gray-200">
                <button
                  type="button"
                  onClick={() => onViewTypeChange('list')}
                  className={`px-3 py-1 text-xs sm:text-sm font-medium rounded-full transition-colors ${
                    viewType === 'list' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  List
                </button>
                <button
                  type="button"
                  onClick={() => onViewTypeChange('grid')}
                  className={`px-3 py-1 text-xs sm:text-sm font-medium rounded-full transition-colors ${
                    viewType === 'grid' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Grid
                </button>
              </div>
              {/* Mobile view toggle icons */}
              <div className="flex md:hidden items-center bg-gray-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => onViewTypeChange('list')}
                  className={`p-1.5 rounded-md ${viewType === 'list' ? 'bg-white text-[#FF9530] shadow-sm' : 'text-gray-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onViewTypeChange('grid')}
                  className={`p-1.5 rounded-md ${viewType === 'grid' ? 'bg-white text-[#FF9530] shadow-sm' : 'text-gray-400'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {isLoading ? (
            viewType === 'grid' ? <GridSkeleton /> : <ListSkeleton />
          ) : isError ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
              <p className="text-3xl mb-2">⚠️</p>
              <h3 className="font-bold text-gray-900 mb-1">Error loading venues</h3>
              <p className="text-gray-500 text-sm">Please try again later.</p>
            </div>
          ) : processedResults.length === 0 ? (
            <div className="bg-white rounded-xl p-8 sm:p-12 text-center shadow-sm border border-gray-100">
              <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No venues found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">
                We couldn&apos;t find any venues matching your criteria. Try adjusting your filters or search in a
                different city.
              </p>
              <button
                type="button"
                onClick={onClearFilters}
                className="gradient-btn text-white font-semibold px-6 py-2.5 rounded-full text-sm"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div
              className={
                viewType === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
                  : 'space-y-4'
              }
            >
              {processedResults.map((v) => (
                <VenueResultCard key={v.id || v.name} venue={v} viewType={viewType} />
              ))}
            </div>
          )}

          {totalPages > 1 && !isLoading && processedResults.length > 0 && (
            <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
              <p className="text-sm text-gray-500">
                Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, totalRecords)} of {totalRecords}
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => {
                    onPageChange(page - 1);
                    scrollToTop();
                  }}
                  className="w-8 h-8 rounded-lg border border-gray-200 text-gray-600 flex items-center justify-center disabled:opacity-40 hover:border-[#FF9530] hover:text-[#FF9530] transition-colors"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => {
                        onPageChange(pageNum);
                        scrollToTop();
                      }}
                      className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
                        pageNum === page
                          ? 'gradient-btn text-white shadow-sm'
                          : 'border border-gray-200 text-gray-600 hover:border-[#FF9530] hover:text-[#FF9530]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {totalPages > 5 && <span className="text-gray-400 mx-1">...</span>}
                <button
                  type="button"
                  disabled={page === totalPages}
                  onClick={() => {
                    onPageChange(page + 1);
                    scrollToTop();
                  }}
                  className="w-8 h-8 rounded-lg border border-gray-200 text-gray-600 flex items-center justify-center disabled:opacity-40 hover:border-[#FF9530] hover:text-[#FF9530] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
