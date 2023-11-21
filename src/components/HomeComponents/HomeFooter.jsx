import { Group, Text } from '@mantine/core';
import classes from './CSS/HomeFooter.module.css';

const data = [
    {
      title: 'About',
      links: [
        { label: 'Features', link: '#' },
        { label: 'Pricing', link: '#' },
        { label: 'Support', link: '#' },
        { label: 'Forums', link: '#' },
      ],
    },
    {
      title: 'Project',
      links: [
        { label: 'Contribute', link: '#' },
        { label: 'Media assets', link: '#' },
        { label: 'Changelog', link: '#' },
        { label: 'Releases', link: '#' },
      ],
    },
    {
      title: 'Community',
      links: [
        { label: 'Join Discord', link: '#' },
        { label: 'Follow on Twitter', link: '#' },
        { label: 'Email newsletter', link: '#' },
        { label: 'GitHub discussions', link: '#' },
      ],
    },
  ];
  

const HomeFooter = () => {
    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
          <Text
            key={index}
            className={classes.link}
            component="a"
            href={link.link}
            onClick={(event) => event.preventDefault()}
          >
            {link.label}
          </Text>
        ));
    
        return (
            <div className={classes.wrapper} key={group.title}>
              <Text className={classes.title}>{group.title}</Text>
              {links}
            </div>
          );
        });
      
      return (
        <footer className={classes.footer}>
         
            <Group align='center' justify='space-between' px={20}>{groups}</Group>
          
        </footer>
      );
};

export default HomeFooter;