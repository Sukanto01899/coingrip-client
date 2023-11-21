import { Switch, rem, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import { useState } from 'react';

function LightAndDarkButton() {
  const theme = useMantineTheme();
  const { setColorScheme, clearColorScheme } = useMantineColorScheme();
  const [checked, setChecked] = useState(true);

  const handleModeChange = (event)=>{
    setChecked(event.currentTarget.checked);

    if(checked){
        setColorScheme('light')
    }else{
        setColorScheme('dark')
    }
  }
  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  return <Switch checked={checked} onChange={handleModeChange} size="md" color="dark.4" onLabel={sunIcon} offLabel={moonIcon} />;
}

export default LightAndDarkButton;