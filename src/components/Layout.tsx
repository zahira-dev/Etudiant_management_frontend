import { PropsWithChildren } from 'react';

import { Link } from 'react-router-dom';
interface LayoutProps {
  title?: string;
}
const Layout = (props: PropsWithChildren<LayoutProps>) => {
  return (
    <div>
      <Link to="/">Home </Link>

      {props.children}
    </div>
  );
};

export default Layout;
