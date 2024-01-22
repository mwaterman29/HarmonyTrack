import React, { useEffect } from "react";
import { Menu, MenuItem, SubMenu } from "@spaceymonk/react-radial-menu";

function FeelingsWheel() {
  const [show, setShow] = React.useState(true);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [radius, setRadius] = React.useState({ inner: 0, outer: 0 });

  // You can also use separate handler for each item
  const handleItemClick = (event: any, index: any, data: any) => {
    console.log(event.clientX, event.clientY)
    console.log(`[MenuItem] ${data} clicked`);
    setShow(false); // you should handle your menu visibility yourself
  };
  const handleSubMenuClick = (event: any, index: any, data: any) => {
    console.log(`[SubMenu] ${data} clicked`);
  };
  const handleDisplayClick = (event:any, position:any) => {
    console.log(`[Display] ${position} clicked`);
  };

  useEffect(() => {
    const updatePosition = () => {
      
      const container = document.querySelector("#feelingsWheelContainer");
        
      if(!container)
        return;

      const containerRect = container.getBoundingClientRect();
  
      console.log("containerRect");
      console.log(containerRect);

      const center = { x: containerRect.x + containerRect.width / 2, y: containerRect.y + containerRect.height / 2 };

      console.log(center);

      const desiredRadius = Math.min(containerRect.width/2, containerRect.height/2)

      setPosition(center);
      setRadius({inner: Math.min(containerRect.width/4, containerRect.height/4), outer: Math.min(containerRect.width/2, containerRect.height/2)});
      //setRadius({inner:0, outer:20});

      setShow(true);
    }
  
    // Call once to set initial position
    updatePosition();
  
    // Add event listener for window resize
    window.addEventListener('resize', updatePosition);
  
    // Cleanup function to remove event listener
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  return (
    <div className="flex h-full w-full " id="feelingsWheelContainer" onClick={(e) => {console.log(e.clientX, e.clientY)}}>
        <Menu
            centerX={position.x}
            centerY={position.y}
            innerRadius={radius.inner}
            outerRadius={radius.outer}
            show={true}
            animation={["fade", "scale"]}
            animationTimeout={150}
        >
            {/* Populate your menu here */}
            <MenuItem onItemClick={handleItemClick} data="1. Item">
            1. Item
            </MenuItem>
            <SubMenu
            onDisplayClick={handleDisplayClick}
            onItemClick={handleSubMenuClick}
            itemView="2. Sub Menu"
            data="2. Sub Menu"
            displayPosition="bottom"
            >
            <MenuItem onItemClick={handleItemClick} data="2.1. Item">
                2.1. Item
            </MenuItem>
            <MenuItem onItemClick={handleItemClick} data="2.2. Item">
                2.2. Item
            </MenuItem>
            <MenuItem onItemClick={handleItemClick} data="2.3. Item">
                2.3. Item
            </MenuItem>
            <SubMenu
                onDisplayClick={handleDisplayClick}
                onItemClick={handleSubMenuClick}
                itemView="2.4. Sub Menu"
                data="2.4. Sub Menu"
                displayPosition="bottom"
            >
                <MenuItem onItemClick={handleItemClick} data="2.4.1. Item">
                2.4.1. Item
                </MenuItem>
                <MenuItem onItemClick={handleItemClick} data="2.4.2. Item">
                2.4.2. Item
                </MenuItem>
            </SubMenu>
            </SubMenu>
        </Menu>
    </div>
  );
}

export default FeelingsWheel;