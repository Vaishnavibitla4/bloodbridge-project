import { useState } from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import WhyDonate from '../components/WhyDonate';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';
import BecomeDonor from './BecomeDonor';
import NeedBlood from '../components/NeedBlood';
import EligibilityRequirements from '../components/EligibilityRequirements';
import TypesOfBloodDonations from '../components/TypesOfBloodDonations';
import LearnAboutBlood from '../components/LearnAboutBlood';
import BeforeDuringAfter from '../components/BloodDonationGuide';
import FirstTimeDonors from '../components/FirstTimeDonors';
import HealthAssessment from '../components/HealthAssessment';

const Home = () => {
  const [activeSection, setActiveSection] = useState(null);

  const renderDynamicComponent = () => {
    switch (activeSection) {
      case "become-donor": {
        const user = JSON.parse(localStorage.getItem("user"));
        return <BecomeDonor userId={user?._id} email={user?.email} />;
      }

      case "need-blood": return <NeedBlood />;
      case "eligibility": return <EligibilityRequirements />;
      case "types": return <TypesOfBloodDonations />;
      case "learn": return <LearnAboutBlood />;
      case "before-after": return <BeforeDuringAfter />;
      case "first-time": return <FirstTimeDonors />;
      case "health": return <HealthAssessment />;
      default: return null;
    }
  };

  return (
    <div className="pt-20">
      <NavBar onSectionChange={setActiveSection} />

      {/* If no dropdown is active, show homepage sections */}
      {!activeSection && (
        <>
          <section id="about"><Hero /></section>
          <section id="why-donate"><WhyDonate /></section>
          <section id="contact"><ContactUs /></section>
          <Footer />
        </>
      )}

      {/* If dropdown is active, show only that component below navbar */}
      {activeSection && (
        <div className="px-6 py-8">
          {renderDynamicComponent()}
        </div>
      )}
    </div>
  );
};

export default Home;