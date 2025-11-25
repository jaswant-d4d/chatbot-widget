interface Props {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
}


const Pagination = ({ totalPages, currentPage, onPageChange }: Props) => {

    function getPaginationPages(currentPage: number, totalPages: number) {
        const pages = [];
        const maxVisiblePages = 5; // 2 prev + 1 current + 2 next

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        // Adjust start/end to maintain maxVisiblePages when near boundaries
        if (endPage - startPage + 1 < maxVisiblePages) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            } else if (endPage === totalPages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    }
    const pages = getPaginationPages(currentPage, totalPages);

    return (
        <div className='w-full p-4'>
            <nav aria-label="Page navigation example" className=" space-x-4">
                <ul className="flex -space-x-px text-sm rounded-xl">
                    <li >
                        <button
                            type='button'
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="flex items-center justify-center text-body bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading shadow-xs font-medium leading-5 rounded-s-lg text-sm px-3 h-9 focus:outline-none hover:bg-gray-300 hover:font-semibold">Prev</button>
                    </li>
                    {pages?.map((page) => (
                        <li key={page} >
                            <button
                                type='button'
                                disabled={currentPage === page}
                                onClick={() => onPageChange(page)}
                                className={`hover:bg-gray-300 ${currentPage === page ? "bg-gray-300 font-semibold" : ""} flex items-center justify-center text-body bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading shadow-xs font-medium leading-5 text-sm w-9 h-9 focus:outline-none hover:font-semibold`}>{page}</button>
                        </li>
                    ))}
                    <li >
                        <button
                            type='button'
                            disabled={currentPage === totalPages}
                            onClick={() => onPageChange(currentPage + 1)}
                            className="flex items-center justify-center text-body bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading shadow-xs font-medium leading-5 rounded-e-lg text-sm px-3 h-9 focus:outline-none hover:bg-gray-300 hover:font-semibold">Next</button>
                    </li>
                </ul>

            </nav>
        </div>
    )
}

export default Pagination
