import { Alert, Anchor, SimpleGrid } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";
import { useAuthState, useSendEmailVerification } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import toast from "../Toast/Toast";
import TransactionList from "../Transaction/TransactionList";
import AssetList from "./AssetList/AssetList";
import BalanceState from "./BalanceState/BalanceState";
import Services from "./Services/Services";

const DashboardHome = () => {
    const [showBalance, setShowBalance] = useState(true);
    const [user] = useAuthState(auth);
    const [sendEmailVerification, sending] = useSendEmailVerification(auth);
    const icon = <IconInfoCircle />;
    const emailVerified = user?.providerData[0]?.providerId === 'twitter.com' ? true : user?.emailVerified;

    const sendVerifyEmailAgain = async ()=>{
        try{
            await sendEmailVerification();
            toast.success({title: 'Successfully sent', message: 'Please check your email inbox or spam box'})
        }catch(err){
            toast.error({title: err.message, message: "please try again later"})
        }
    }
    
    return (
        <>
        {(user && !emailVerified) && <Alert radius='md' mb={16} title="Please verify you email!" py={5} color='red' icon={icon}>
                 <Anchor onClick={sendVerifyEmailAgain} component="button"  size='xs'>{sending ? "Sending..." : "Send verification email again"}</Anchor>
            </Alert>}

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