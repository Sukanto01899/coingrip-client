import { useColorScheme } from "@mantine/hooks";
import ReCAPTCHA from "react-google-recaptcha";

const Captcha = ({captchaRef}) => {
    const colorScheme = useColorScheme();

    return <ReCAPTCHA
            style={{transform: "scale(0.77)", WebkitTransform: "scale(0.77)", }}
           theme={colorScheme}
           sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
           ref={captchaRef}
           size='normal'
           onExpired={()=> console.log('error')}
           onChange={()=> console.log('okkk')}
    />
};

export default Captcha;