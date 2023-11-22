import { Avatar, Combobox, Group, Input, InputBase, useCombobox } from '@mantine/core';

const SelectBox = ({label, assets, setValue, value: checkValue, valueFor, error}) => {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
      });
    
      const options = assets?.map((asset, i) => (
        <Combobox.Option value={asset.symbol} key={i}>
          <Group>
            <Avatar size='sm' src={asset.logo}/>
            {asset.name}
          </Group>
        </Combobox.Option>
      ));

     

    return (
        <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(valueFor, val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
        error={error && error}
        required
        size='md'
        description="Select asset"
         label={label}
          component="button"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
        >
          {checkValue || <Input.Placeholder>Select asset</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
          {options}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
    );
};

export default SelectBox;