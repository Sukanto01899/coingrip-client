import { Button, Group, NumberInput, Select, Stack, Stepper } from '@mantine/core';
import React, { useState } from 'react';
import ServiceLayout from '../components/Layout/ServiceLayout';

const BuyCrypto = () => {
    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    return (
        <ServiceLayout title="Buy">
            <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
        <Stepper.Step label="First step" description="Create an account">
          <Stack>
           <Select
              label="Select asset"
              placeholder="Pick value"
              data={['React', 'Angular', 'Vue', 'Svelte']}
            />
             <NumberInput
               label="Enter amount"
               description="USD value"
               placeholder="Input placeholder"
             />
          </Stack>
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
        </ServiceLayout>
    );
};

export default BuyCrypto;