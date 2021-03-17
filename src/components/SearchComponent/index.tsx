import React, {useEffect, useState} from "react";
import {useFetch} from "@hooks/useFetchAxios";
import {AxiosRequestConfig} from "axios";

export interface ILocation {
    location: string;
    country: string;
}

export default function SearchComponent() {
    const [searchString, setSearchString] = useState("");
    const [isPanelOpen, setIsPanelOpen] = useState(false); // show/hide results
    const [doSearch, setDoSearch] = useState(false); // controls fetch run

    // useFetch hook above.
    const {response, loading, error} = useFetch(doSearch, "test.json", {} as AxiosRequestConfig);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.target.value);
    };

    // If the searchString length > 0, then do the following
    useEffect(() => {
        setDoSearch(searchString.length > 0);
        setIsPanelOpen(searchString.length > 0);
    }, [searchString.length]);

    const renderSearchResults = () => console.log("write");
    /*    
    !loading &&
        !error &&
        // response.length > 0 &&
        response && (
            <ul aria-label="search-results">
                {response.map((loc: ILocation, i: number) => (
                    <li key={i}>
                        {loc.location}, {loc.country}
                    </li>
                ))}
            </ul>
        );
     */
    return (
        <div className="App">
            <label htmlFor="search">Search:</label>
            <input
                type="text"
                aria-label="search-input" // label used by our tests
                id="search"
                name="search"
                autoComplete="off"
                value={searchString}
                onChange={handleChange}
            />

            {isPanelOpen && <div aria-label="search-panel">{/*renderSearchResults()*/}/</div>}
        </div>
    );
}
