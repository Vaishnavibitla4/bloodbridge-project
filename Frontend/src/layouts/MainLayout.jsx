import NavBar from '../components/NavBar';

const MainLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="pt-20">{children}</div> {/* Prevent overlap with fixed NavBar */}
    </>
  );
};

export default MainLayout;