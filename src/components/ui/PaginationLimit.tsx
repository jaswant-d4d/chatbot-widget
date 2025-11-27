
interface Props {
    itemsPerPage: number
    setItemsPerPage: (items: number) => void
}
const PaginationLimit = ({ itemsPerPage, setItemsPerPage }: Props) => {

    return (
        <form className="bg-white dark:bg-gray-700">
            <label htmlFor="countries" className="sr-only">Select an option</label>
            <select
                id="countries"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-default-medium text-heading text-sm leading-4 rounded-lg focus:ring-brand focus:border-brand shadow-xs placeholder:text-body">
                <option selected value="10">10 per page</option>
                <option value="25">25 per page</option>
                <option value="50">50 per page</option>
                <option value="100">100 per page</option>
            </select>
        </form>
    )
}

export default PaginationLimit
