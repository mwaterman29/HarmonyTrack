"use client"

import React, { useEffect } from "react";
import { Menu, MenuItem, SubMenu } from "@spaceymonk/react-radial-menu";
import feelingsData from '../data/feelings.json';

function FeelingsWheel() {
  const [show, setShow] = React.useState(true);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [radius, setRadius] = React.useState({ inner: 0, outer: 0 });

  // You can also use separate handler for each item
  const handleItemClick = (event: any, index: any, data: any) => {

    /*
    console.log(event.clientX, event.clientY)
    console.log());
    console.log(`[MenuItem] ${data} clicked`);
    //setShow(false); // you should handle your menu visibility yourself
    */
    const feeling = secondOrder.find((feeling:any) => feeling.name === data);
    if(!feeling)
      return;

    fetch('/api/feelings', {
      method: 'POST',
      body: JSON.stringify({
        feeling: feeling.name,
        value: feeling.value
      })
    }).then(async (response) => {
      const json = await response.json();
      console.log(json);
    });
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

  const feelings = feelingsData.feelings;
  const firstOrder =  feelings.filter((feeling:any) => feeling.parent === null);
  const secondOrder = feelings.filter((feeling:any) => firstOrder.find(first => first.name === feeling.parent));

  //console.log(firstOrder);
  //console.log(secondOrder);

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
          {
            firstOrder.map((feeling:any) => {
              const subFeelings = secondOrder.filter((secondFeeling:any) => secondFeeling.parent === feeling.name);
              return (
                <SubMenu
                  key={feeling.name}
                  data={feeling.name}
                  itemView={<p key={feeling.name + "_display"}>{feeling.name}</p>}
                  onItemClick={handleSubMenuClick}
                  onDisplayClick={handleDisplayClick}
                  displayPosition="bottom"
                  className={feeling.name.toLowerCase() + "-bg"}
                >
                  {
                    subFeelings.map((subFeeling:any) => {
                      return (
                        <MenuItem
                          key={subFeeling.name}
                          data={subFeeling.name}
                          onItemClick={handleItemClick}
                        >
                          {<p key={subFeeling.name + "_display"}>{subFeeling.name}</p>}
                        </MenuItem>
                      )
                    })
                  }
                </SubMenu>
              )
            })
          }
        </Menu>
    </div>
  );
}

export default FeelingsWheel;