import { useState } from 'react';
import AssetState from '../components/HomeComponents/AssetState';
import DetailsCard from '../components/HomeComponents/DetailsCard';
import Featured from '../components/HomeComponents/Featured';
import Header from '../components/HomeComponents/Header';
import HomeFooter from '../components/HomeComponents/HomeFooter';
import TrustReason from '../components/HomeComponents/TrustReason';

const Home = () => {
    const [showBalance, setShowBalance] = useState(true);
    
    return (
        <>
        <Header/>
        <AssetState/>
        <Featured/>
        <TrustReason/>
        <DetailsCard/>
        <HomeFooter/>
        </>
    );
};

export default Home;