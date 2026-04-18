function JobSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 animate-pulse">
      <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4 mt-3"></div>

      <div className="mt-4 h-10 bg-gray-300 rounded-xl"></div>
    </div>
  );
}

export default JobSkeleton