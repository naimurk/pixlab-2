import React, { useState } from 'react';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';

const MaterialUIIcons = ({ setcontent, content, undoRedoFunc, dm , setshowElements}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const mostUsedIcons = [
        <MdIcons.MdAdd size={40} key={1} onClick={() => handleIconClick('MdAdd')} />,
        <MdIcons.MdCheck size={40} key={2} onClick={() => handleIconClick('MdCheck')} />,
        <MdIcons.MdClose size={40} key={3} onClick={() => handleIconClick('MdClose')} />,
        <MdIcons.MdDelete size={40} key={4} onClick={() => handleIconClick('MdDelete')} />,
        <MdIcons.MdEdit size={40} key={5} onClick={() => handleIconClick('MdEdit')} />,
        <MdIcons.MdFavorite size={40} key={6} onClick={() => handleIconClick('MdFavorite')} />,
        <MdIcons.MdHome size={40} key={7} onClick={() => handleIconClick('MdHome')} />,
        <MdIcons.MdInfo size={40} key={8} onClick={() => handleIconClick('MdInfo')} />,
        <MdIcons.MdMenu size={40} key={9} onClick={() => handleIconClick('MdMenu')} />,
        <MdIcons.MdSearch size={40} key={10} onClick={() => handleIconClick('MdSearch')} />,
        <MdIcons.MdSettings size={40} key={11} onClick={() => handleIconClick('MdSettings')} />,
        <MdIcons.MdShoppingCart size={40} key={12} onClick={() => handleIconClick('MdShoppingCart')} />,
        <MdIcons.MdStar size={40} key={13} onClick={() => handleIconClick('MdStar')} />,
        <MdIcons.MdVisibility size={40} key={14} onClick={() => handleIconClick('MdVisibility')} />,
        <MdIcons.MdWarning size={40} key={15} onClick={() => handleIconClick('MdWarning')} />,
        <MdIcons.MdAccountCircle size={40} key={16} onClick={() => handleIconClick('MdAccountCircle')} />,
        <MdIcons.MdArrowBack size={40} key={17} onClick={() => handleIconClick('MdArrowBack')} />,
        <MdIcons.MdArrowDropDown size={40} key={18} onClick={() => handleIconClick('MdArrowDropDown')} />,
        <MdIcons.MdArrowDropUp size={40} key={19} onClick={() => handleIconClick('MdArrowDropUp')} />,
        <MdIcons.MdArrowForward size={40} key={20} onClick={() => handleIconClick('MdArrowForward')} />,
        <MdIcons.MdBlurOn size={40} key={21} onClick={() => handleIconClick('MdBlurOn')} />,
        <MdIcons.MdCall size={40} key={22} onClick={() => handleIconClick('MdCall')} />,
        <MdIcons.MdDateRange size={40} key={23} onClick={() => handleIconClick('MdDateRange')} />,
        <MdIcons.MdEmail size={40} key={24} onClick={() => handleIconClick('MdEmail')} />,
        <MdIcons.MdFingerprint size={40} key={25} onClick={() => handleIconClick('MdFingerprint')} />,
        <MdIcons.MdGpsFixed size={40} key={26} onClick={() => handleIconClick('MdGpsFixed')} />,
        <MdIcons.MdHistory size={40} key={27} onClick={() => handleIconClick('MdHistory')} />,
        <MdIcons.MdLaptop size={40} key={28} onClick={() => handleIconClick('MdLaptop')} />,
        <MdIcons.MdMic size={40} key={29} onClick={() => handleIconClick('MdMic')} />,
        <MdIcons.MdNotifications size={40} key={30} onClick={() => handleIconClick('MdNotifications')} />,
        <MdIcons.MdPhone size={40} key={31} onClick={() => handleIconClick('MdPhone')} />,
        <MdIcons.MdPowerSettingsNew size={40} key={32} onClick={() => handleIconClick('MdPowerSettingsNew')} />,
        <MdIcons.MdRoundedCorner size={40} key={33} onClick={() => handleIconClick('MdRoundedCorner')} />,
        <MdIcons.MdSecurity size={40} key={34} onClick={() => handleIconClick('MdSecurity')} />,
        <MdIcons.MdSync size={40} key={35} onClick={() => handleIconClick('MdSync')} />,
        <MdIcons.MdThumbUp size={40} key={36} onClick={() => handleIconClick('MdThumbUp')} />,
        <MdIcons.MdTrendingUp size={40} key={37} onClick={() => handleIconClick('MdTrendingUp')} />,
        <MdIcons.MdWifi size={40} key={38} onClick={() => handleIconClick('MdWifi')} />
        // Add more icons as needed
    ];


    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value === '') {
            setSearchResults(mostUsedIcons);
        } else {
            const results = Object.keys({ ...MdIcons, ...FaIcons })
                .filter((iconName) => iconName.toLowerCase().includes(event.target.value.toLowerCase()))
                .map((iconName) => {
                    const IconComponent = iconName.startsWith('Md') ? MdIcons[iconName] : FaIcons[iconName];
                    return React.createElement(IconComponent, { size: 40, color: dm ? "white" : "black", onClick: () => handleIconClick(iconName) });
                });
            setSearchResults(results);
        }
    };


    const handleIconClick = (iconName) => {
        undoRedoFunc()
        setcontent([...content, {
            id: Date.now(),
            isDeleted: false,
            shadow: "0",
            scolor: "#1e1e1e",
            frame: "none",
            size: 10,
            component: "icon",
            position: { left: 0, top: 0 },
            value: iconName,
            fontcolor: "#ffffff",
            background: "#000000",
            transform: 0,
        }])
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search Icons eg: circle or instagram"
                value={searchTerm}
                onChange={handleSearch}
                id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

            <div style={{  gridTemplateColumns: 'repeat(auto-fill, 80px)', gap: '10px', maxHeight: "40vh", overflowY: "scroll", scrollMargin: 0, display: "flex", justifyContent: "center", flexWrap: "wrap", width: "100%", marginTop: "16px", }}>
                {searchTerm.length === 0 ?
                    mostUsedIcons.map((icon, index) => (
                        <div onClick={()=>setshowElements(false)} className='shadow text-gray-900' key={index} style={{ background: "white", padding: "4px", borderRadius: "8px" }}>{icon}</div>
                    )) :
                    searchResults.map((icon, index) => (
                        <div onClick={()=>setshowElements(false)} className='shadow text-gray-900' key={index} style={{ background: "white", padding: "4px", borderRadius: "8px" }}>{icon}</div>
                    ))
                }
            </div>
        </div>
    );
};

export default MaterialUIIcons;
