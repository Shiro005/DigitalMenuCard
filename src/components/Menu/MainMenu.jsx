import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export default function ScrollableTabsButtonAuto() {
    const [value, setValue] = React.useState(0);
    const [scrolling, setScrolling] = React.useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
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

    return (
        <div className="relative flex items-center justify-center">
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
                    <Tab label="Pizza" />
                    <Tab label="Burger" />
                    <Tab label="Dosa" />
                    <Tab label="Pav - Bhaji" />
                    <Tab label="Chole - Bhature" />
                    <Tab label="Idle - Sambhar" />
                    <Tab label="Fried Rice" />
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
        </div>
    );
}
