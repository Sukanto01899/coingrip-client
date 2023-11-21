import { Carousel } from '@mantine/carousel';
import { Image, Stack, Text, Title, rem } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import img from '../../assets/sliderImg/img-1.png';

const arrowStyle = { 
  width: rem(30),
  height: rem(30),
  backgroundColor: '#848484', 
  borderRadius: '50%' }

const IntroSlider = () => {
    const autoplay = useRef(Autoplay({ delay: 3000 }));
  return (
    <Carousel
      w='100%'
      h={200}
      loop
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      nextControlIcon={<IconArrowRight style={arrowStyle} />}
      previousControlIcon={<IconArrowLeft style={arrowStyle} />}
    >
      <Carousel.Slide>
        <Stack align='center'>
            <Image w={{base: 200, md: 300}} src={img}></Image>
            <Title>Welcome To Money</Title>
            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. </Text>
        </Stack>
      </Carousel.Slide>
      <Carousel.Slide>
        <Stack align='center'>
            <Image w={{base: 200, md: 300}} src={img}></Image>
            <Title>Welcome To Money</Title>
            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. </Text>
        </Stack>
      </Carousel.Slide>
      <Carousel.Slide>
        <Stack align='center'>
            <Image w={{base: 200, md: 300}} src={img}></Image>
            <Title>Welcome To Money</Title>
            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. </Text>
        </Stack>
      </Carousel.Slide>
    </Carousel>
  );
};

export default IntroSlider;