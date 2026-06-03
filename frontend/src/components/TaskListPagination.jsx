import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination"

const TaskListPagination = ({ page = 1, totalPages = 1, setPage = () => {} }) => {
  // Tính toán số trang cần hiển thị
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 3 // số trang hiển thị xung quanh trang hiện tại
    
    if (totalPages <= 7) {
      // Nếu tổng trang <= 7, hiển thị tất cả
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Luôn hiển thị trang 1
      pages.push(1)
      
      // Tính toán trang bắt đầu và kết thúc quanh trang hiện tại
      let start = Math.max(2, page - 1)
      let end = Math.min(totalPages - 1, page + 1)
      
      // Điều chỉnh nếu gần đầu
      if (page <= 3) {
        start = 2
        end = 4
      }
      
      // Điều chỉnh nếu gần cuối
      if (page >= totalPages - 2) {
        start = totalPages - 3
        end = totalPages - 1
      }
      
      // Thêm ellipsis nếu cần
      if (start > 2) {
        pages.push('...')
      }
      
      // Thêm các trang ở giữa
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      // Thêm ellipsis nếu cần
      if (end < totalPages - 1) {
        pages.push('...')
      }
      
      // Luôn hiển thị trang cuối
      pages.push(totalPages)
    }
    
    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <Pagination className="justify-start">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => page > 1 && setPage(page - 1)}
            className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            text="Trước"
          />
        </PaginationItem>

        {pageNumbers.map((p, index) => (
          <PaginationItem key={index}>
            {p === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => setPage(p)}
                isActive={page === p}
                className="cursor-pointer"
              >
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => page < totalPages && setPage(page + 1)}
            className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            text="Sau"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default TaskListPagination