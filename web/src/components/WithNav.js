import React, { useContext } from 'react';
// import Header from './Header/Header';
// import Footer from './Footer/Footer';
import { Outlet } from 'react-router';
import { MenuWidthProvider, MenuWidthContext } from './MenuContext';
 const WithNav = () => {
  const { menuWidth } = useContext(MenuWidthContext);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header with dynamic marginLeft */}
      <div>
        {/* <Header /> */}
      </div>
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1, overflow: 'auto', marginTop: '20px', marginTop: "70px" }}>
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default () => (
  <MenuWidthProvider>
    <WithNav />
  </MenuWidthProvider>
);