'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  pageSize: number;
  onPageSizeChange?: (size: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  onPageSizeChange,
}: PaginationProps) {
  // 生成页码数组
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8">
      {/* 左侧：统计信息 */}
      <div className="text-sm text-[#7A7670]">
        共 {totalItems} 条，第 {currentPage}/{totalPages} 页
      </div>

      {/* 中间：页码 */}
      <div className="flex items-center gap-2">
        {/* 上一页 */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-lg border border-[#E5E2DE] text-[#5C5852] hover:bg-[#F0EEEB] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 页码 */}
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            className={`min-w-[40px] px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              page === currentPage
                ? 'bg-[#C9A89A] text-white'
                : page === '...'
                ? 'text-[#A8A49D] cursor-default'
                : 'border border-[#E5E2DE] text-[#5C5852] hover:bg-[#F0EEEB]'
            }`}
          >
            {page}
          </button>
        ))}

        {/* 下一页 */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-lg border border-[#E5E2DE] text-[#5C5852] hover:bg-[#F0EEEB] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 右侧：每页数量 */}
      {onPageSizeChange && (
        <div className="flex items-center gap-2 text-sm text-[#7A7670]">
          <span>每页</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="px-2 py-1 rounded border border-[#E5E2DE] bg-white focus:border-[#C9A89A] outline-none"
          >
            <option value={9}>9</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
          </select>
          <span>条</span>
        </div>
      )}
    </div>
  );
}
