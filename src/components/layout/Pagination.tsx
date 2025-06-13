import React from 'react'
import { Button } from '../ui/button';

interface PaginationProps {
  page:number,
  setPage:any,
  pagination:{
    limit:number,
    page:number,
    totalPages:number
  }  
}


const Pagination: React.FC<PaginationProps> = ({page,setPage,pagination}) => {
  return (
    <div className="flex justify-center gap-4 mt-4">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(p - 1, 1))}
          >
            السابق
          </Button>
          <div className="text-sm pt-2">صفحة {page} من {pagination.totalPages}</div>
          <Button
            variant="outline"
            disabled={page === pagination.totalPages}
            onClick={() => setPage(p => Math.min(p + 1, pagination.totalPages))}
          >
            التالي
          </Button>
        </div>
  )
}

export default Pagination