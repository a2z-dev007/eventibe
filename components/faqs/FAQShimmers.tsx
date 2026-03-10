import React from 'react';

export const CategoryShimmer = () => {
  return (
    <div className="space-y-1 p-2">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className="px-4 py-4 rounded-2xl bg-gray-50/50 flex items-center gap-4 animate-pulse mb-1"
        >
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gray-200"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded-full w-[70%]"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const FAQShimmer = () => {
  return (
    <div className="grid gap-4">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="rounded-[28px] border-2 border-gray-100 overflow-hidden bg-white animate-pulse"
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-100"></div>
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-gray-100 rounded-full w-4/5"></div>
                <div className="h-5 bg-gray-100 rounded-full w-2/3 md:hidden"></div>
              </div>
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const CategoryHeaderShimmer = () => {
  return (
    <div className="bg-corporate-blue text-white p-8 md:p-12 animate-pulse overflow-hidden relative">
      <div className="relative flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0 w-24 h-24 bg-white/10 rounded-[32px]"></div>
        <div className="flex-1 space-y-4 w-full">
          <div className="h-10 bg-white/20 rounded-full w-[60%] mx-auto md:mx-0"></div>
          <div className="space-y-2 hidden md:block">
            <div className="h-5 bg-white/20 rounded-full w-full"></div>
            <div className="h-5 bg-white/20 rounded-full w-4/5"></div>
          </div>
          <div className="h-5 bg-white/20 rounded-full w-3/4 mx-auto md:hidden"></div>
        </div>
      </div>
    </div>
  );
};
