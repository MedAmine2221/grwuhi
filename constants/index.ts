import { FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";

const NAV_LINKS = {
  "Site Map": [{name:"Home",href:"/"},{name: "Advices", href: "/advices"},{name: "Reviews", href: "/reviews"}],
  "Legal": [{name:"Privacy Policy", href:""},{name:"Terms of Service",},{name: "Cookie Policy", href:""},{name: "Disclaimer", href: ""}],
};

const SOCIAL = [
  { icon: FiLinkedin, label: "LinkedIn", link:"https://www.linkedin.com/in/mohamed-amine-lazreg-831b1817a/" },
  { icon: FiInstagram, label: "Instagram", link:"https://www.instagram.com/mouhamedaminelz/" },
  { icon: FiFacebook, label: "Facebook", link:"https://www.facebook.com/mouhamed.amine.lazreg/" },
];

const ADVICES = [
    
]

export { NAV_LINKS, SOCIAL }