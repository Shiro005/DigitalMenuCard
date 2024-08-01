import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import TextField from '@mui/material/TextField';

export default function ScrollableTabsButtonAuto() {
    const [value, setValue] = React.useState(0);
    const [scrolling, setScrolling] = React.useState(false);
    const [foodItems, setFoodItems] = React.useState([]);
    const [filteredItems, setFilteredItems] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');

    React.useEffect(() => {
        fetch('/foodItems.json')
            .then(response => response.json())
            .then(data => {
                setFoodItems(data);
                setFilteredItems(data);
            });
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        filterItems(tabs[newValue]);
    };

    const handleScroll = (event) => {
        setScrolling(event.currentTarget.scrollLeft > 0);
    };

    const scrollLeft = () => {
        document.querySelector(".scrollable-tabs").scrollBy({ left: -100, behavior: 'smooth' });
    };

    const scrollRight = () => {
        document.querySelector(".scrollable-tabs").scrollBy({ left: 100, behavior: 'smooth' });
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        filterItems(tabs[value], query);
    };

    const filterItems = (category, query = searchQuery) => {
        const filtered = foodItems.filter(item => 
            item.category === category && item.name.toLowerCase().includes(query)
        );
        setFilteredItems(filtered);
    };

    const tabs = ['Pizza', 'Burger', 'Dosa', 'Pav Bhaji', 'Chicken', 'Idle - Sambhar', 'Fried Rice'];

    return (
        <div className="relative flex items-center justify-center flex-col p-12">
            <Box
                sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}
                className="scrollable-tabs overflow-hidden"
                onScroll={handleScroll}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    className="scrollable-tabs-content"
                >
                    {tabs.map((tab, index) => (
                        <Tab key={index} label={tab} />
                    ))}
                </Tabs>
            </Box>
            {scrolling && (
                <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full shadow-lg"
                    onClick={scrollLeft}
                >
                    <ChevronLeft />
                </button>
            )}
            {scrolling && (
                <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full shadow-lg"
                    onClick={scrollRight}
                >
                    <ChevronRight />
                </button>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {filteredItems.map(item => (
                    <div key={item.id} className="p-4 bg-white rounded-lg shadow-md flex flex-col items-start">
                        <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-md mb-4" />
                        <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                        <p className="text-gray-600 mb-2">{item.description}</p>
                        <p className="text-gray-800 font-semibold mb-2">Price: ${item.price} <span className="line-through text-gray-400">${item.discountPrice}</span></p>
                        <p className="text-gray-800 font-semibold mb-2">Rating: {item.rating}</p>
                        <span className={`px-2 py-1 text-white rounded-full ${item.tag === 'Bestseller' ? 'bg-red-500' : 'bg-green-500'}`}>{item.tag}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
