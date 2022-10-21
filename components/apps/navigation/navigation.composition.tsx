import { SearchOutlined, QuestionCircleOutlined, CheckCircleOutlined, CompassOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import React from 'react';
import { IButtonComponent, IlogoComponent, Navigation } from './navigation';
import image from './assets/logo-efsa.svg';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { Button } from 'antd';

const menuItems: {logoComponent: IlogoComponent, links: ItemType[], buttonComponent: IButtonComponent} = {
  logoComponent: {
      logo: image,
      title: "efsa-logo",
      minWidthOnWideScreens: 10,
      minWidthOnSmallScreens: 12
    }
  ,
  links : [
    {
      label: (
        <a href="https://open.efsa.europa.eu/questions" rel="noreferrer">
          Questions
        </a>
      ),
      key: 'questions',
      icon: <QuestionCircleOutlined />,
    },
    {
      label: (
        <a href="https://open.efsa.europa.eu/consultations" rel="noreferrer">
          Public Consultations
        </a>
      ),
      key: 'public-consultations',
      icon: <CheckCircleOutlined />,
    },
    {
      label: (
      <a href="https://open.efsa.europa.eu/experts" rel="noreferrer">
        Experts
      </a>
      ),
      key: 'experts',
      icon: <CompassOutlined />,
    }
  ],
  buttonComponent: {
    children: (
      <>
      <Button type="primary" icon={<SearchOutlined />} style={{margin: "1rem"}}>Search entire site</Button>
      <Button type="link" style={{margin: "1rem"}} href="#">Login</Button>
      </>
    )
  }
}

export const EfsaNavigation = () => {
  return (
    <>
      <Navigation menuItems={menuItems}/>
    </>
  )
}