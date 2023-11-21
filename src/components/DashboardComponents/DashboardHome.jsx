import { SimpleGrid } from "@mantine/core";
import { useState } from "react";
import TransactionList from "../Transaction/TransactionList";
import AssetList from "./AssetList/AssetList";
import BalanceState from "./BalanceState/BalanceState";
import Services from "./Services/Services";

const DashboardHome = () => {
    const [showBalance, setShowBalance] = useState(true);
    
    return (
        <>
            <SimpleGrid cols={{base:'1', sm:'2'}}>
              <BalanceState showBalance={showBalance} setShowBalance={setShowBalance}/>
              <Services/>
            </SimpleGrid>
            <AssetList showBalance={showBalance}/>
            <TransactionList/>
        </>
    );
};

export default DashboardHome;