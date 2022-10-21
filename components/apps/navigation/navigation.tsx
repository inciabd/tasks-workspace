import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Menu, Button, Drawer, MenuProps } from 'antd';
import { useMediaQuery } from 'react-responsive'
import { MenuOutlined, SearchOutlined, QuestionCircleOutlined, CheckCircleOutlined, CompassOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import image from './assets/EFSA_logo.svg';

export interface INavigationProps {
  menuItems?: MenuItem;
}

export interface IlogoComponent {
  title?: string;
  logo?: string;
  minWidthOnWideScreens?: number;
  minWidthOnSmallScreens?: number;
}

export interface IButtonComponent {
  children?: ReactNode;
}

export interface MenuItem  {
  logoComponent: IlogoComponent;
  links: ItemType[];
  buttonComponent?: IButtonComponent;
}

export interface IDynamicIcon {
  type: string;
}


const Nav = styled.nav`
  display: flex;
  align-items: center;
  margin: 0 2rem;
`

const Logo = styled.img`
  display: block;
  min-width: ${({width}) => width}rem;
  margin-right: 2rem;
`

export function Navigation({ menuItems }: INavigationProps) {
  const [current, setCurrent] = useState('questions');
  const [open, setOpen] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1000px)'
  })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' })


  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const renderLogo = (logoComponent) => {
    if(!logoComponent.logo) {
      return <Logo src={image} alt="efsa-logo" width={10} style={{marginRight: "auto", padding: "1rem"}}></Logo>;
    }

    if(isDesktopOrLaptop) {
      return <Logo src={logoComponent.logo} alt={logoComponent.title} width={logoComponent.minWidthOnWideScreens}></Logo>
    }

    if(isTabletOrMobile) {
      return <Logo src={logoComponent.logo} alt={logoComponent.title} width={logoComponent.minWidthOnSmallScreens} style={{marginRight: "auto", padding: "1rem"}}></Logo>
    }
  }

  const GetIcon = ({type, ...rest}) => {

    const Component = type;
    return <Component {...rest} />;
  }

  const renderLinks = (links, buttonComponent) => {

    const mappedLinks = links.map((link) => ({
      ...link,
      icon: link?.icon && <GetIcon type={link?.icon} />
     }));

    if(isDesktopOrLaptop && links || isDesktopOrLaptop && buttonComponent) {
      return(
        <>
        <Menu onClick={onClick} selectedKeys={[current]} className="menuItem" mode="horizontal" items={links} style={{marginRight: "auto", padding: "0.5rem"}}/>
        {buttonComponent.children}
        </>
      )
    }

    if(isTabletOrMobile && links || isTabletOrMobile && buttonComponent) {
      return (
        <>
        <Button type="primary" onClick={showDrawer}>
          {<MenuOutlined />}
        </Button>

        <Drawer placement="right" onClose={onClose} open={open} closable={true}>
          {
            <Menu onClick={onClick} selectedKeys={[current]} mode="vertical" items={links}/>
          }

          {
            <div style={{display: "flex", flexDirection: "column"}}>{buttonComponent.children}</div>
          }
        </Drawer>
        </>
      )
    }
  }

  // const selectNavItem = ({key}) => {
  //   // navigate to page , use key
  //   //
  // }

  return (
    <Nav>
      {renderLogo(menuItems?.logoComponent)}
      {renderLinks(menuItems?.links, menuItems?.buttonComponent)}
    </Nav>
  );
}