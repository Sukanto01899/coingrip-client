import { Button } from '@mantine/core';
import { TwitterIcon } from '@mantine/ds';

const TwitterButton = (props) => {
    return (
        <Button
        loading={props?.loading}
        leftSection={<TwitterIcon style={{ width: '1rem', height: '1rem' }} color="#00ACEE" />}
        variant="default"
        {...props}
      />
    );
};

export default TwitterButton;