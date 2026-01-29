import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const SearchBar = ({ search, setSearch, onSearch }) => {


    return (
        <Field orientation="horizontal" className='max-w-md mx-auto my-6 '>
            <Input
                type="search"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Button onClick={onSearch}>Search</Button>
        </Field>
    )
}

export default SearchBar